<?php
// required headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once('../config/config.php');


class Library {

  private $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
  private $dbh;
  private $stmt;




  public function __construct() {

    $options = array(
      PDO::ATTR_PERSISTENT => true,
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    );

    try {
      $this->dbh = new PDO($this->dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
      echo $e->getMessage();
    }
  }




  public function getLibrary($user_id, $sortMethod, $filterMethod) {

    $sqlStart = 'SELECT * FROM library WHERE user_id = :id ';

    $sqlWhere = [
      'all' => '',
      'read' => 'AND is_read = 1 ',
      'notRead' => 'AND is_read = 0 '
    ];

    $sql = [
      'oldFirst' => $sqlStart . $sqlWhere[$filterMethod] . 'ORDER BY date_added ASC',
      'newFirst' => $sqlStart . $sqlWhere[$filterMethod] . 'ORDER BY date_added DESC',
      'title' => $sqlStart . $sqlWhere[$filterMethod] . 'ORDER BY title ASC',
      'author' => $sqlStart . $sqlWhere[$filterMethod] . 'ORDER BY author ASC'
    ];

    $this->stmt = $this->dbh->prepare($sql[$sortMethod]);
    $this->stmt->bindValue(':id', $user_id, PDO::PARAM_STR);
    $this->stmt->execute();

    return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
  }




  public function getBookByIsbn($isbn) {

    $this->stmt = $this->dbh->prepare('SELECT * FROM library WHERE isbn = :isbn');
    $this->stmt->execute(['isbn' => $isbn]);

    return $this->stmt->fetch(PDO::FETCH_OBJ);
  }




  public function getBookById($id) {

    $this->stmt = $this->dbh->prepare('SELECT * FROM library WHERE book_id = :id');
    $this->stmt->execute(['id' => $id]);

    return $this->stmt->fetch(PDO::FETCH_OBJ);
  }




  public function addBook($newBook) {

    $sql = "
    INSERT INTO library (isbn, title, author, pages, user_id, is_read, cover, date_added) 
    VALUES (:isbn, :title, :author, :pages, :userId, :bookIsRead, :cover, :date)";
    $this->stmt = $this->dbh->prepare($sql);
    $this->stmt->execute($newBook);
  }




  public function deleteBook($id) {
    
    $bookToDelete = ['id' => $id];
    $this->stmt = $this->dbh->prepare("DELETE FROM library WHERE book_id = :id");
    $this->stmt->execute($bookToDelete);
    
  }




  public function searchLibrary($query, $user) {
    
    $this->stmt = $this->dbh->prepare('
      SELECT * FROM library 
      WHERE user_id = :user
      AND (title LIKE :query OR author LIKE :query) 
    ');
    $this->stmt->bindValue(':query', '%' . $query . '%', PDO::PARAM_STR);
    $this->stmt->bindValue(':user', $user, PDO::PARAM_STR);
    $this->stmt->execute();

    return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
  }




  public function toggleReadStatus($id) {
    $currentBook = $this->getBookById($id);
    $currentReadStatus = ($currentBook->is_read == 1) ? '' : 1;
    
    $this->stmt = $this->dbh->prepare("UPDATE library SET is_read = :read WHERE book_id = :id");
    $this->stmt->execute(['read' => $currentReadStatus, 'id' => $id]);
  }
}




$library = new Library;
$action = !empty($_GET['action']) ? $_GET['action'] : false;
$query = !empty($_GET['query']) ? $_GET['query'] : false;



if ($action == 'getBook' && !empty($query)) {

  echo json_encode($library->getBookByIsbn($query),JSON_PRETTY_PRINT);




} elseif ($action == 'getLibrary' && !empty($query)) {

  $sortMethod = isset($_GET['sort']) ? $_GET['sort'] : 'title';
  $filterMethod = isset($_GET['filter']) ? $_GET['filter'] : 'all';

  echo json_encode($library->getLibrary($query, $sortMethod, $filterMethod), JSON_PRETTY_PRINT);

   
  



} elseif ($action == 'addBook') {

  $json = file_get_contents("php://input");
  $newBook = json_decode($json, true);

  $library->addBook($newBook);

  echo json_encode($newBook);




} elseif ($action == 'deleteBook') {

  if (!empty($query) && $library->getBookById($query)) {
      $library->deleteBook($query);
   }




} elseif ($action == 'searchLibrary') {

  $user = isset($_GET['user']) ? $_GET['user'] : false;

  if ( !empty($query) && !empty($user) ){
    echo json_encode( $library->searchLibrary($query, $user), JSON_PRETTY_PRINT );
  } else {
    echo 'Need a query and user argument';
  }




} elseif ($action == 'toggleReadStatus') {

  print_r($library->toggleReadStatus($query));




} else {

  echo 'Unknown Query';

}

?>