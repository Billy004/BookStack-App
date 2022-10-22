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




  public function getLibrary() {
    $this->stmt = $this->dbh->query('SELECT * FROM library');
    return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
  }




  public function getBook($isbn) {

    $this->stmt = $this->dbh->prepare('SELECT * FROM library WHERE isbn = :isbn');
    $this->stmt->execute(['isbn' => $isbn]);

    return $this->stmt->fetch(PDO::FETCH_OBJ);
  }




  public function addBook($newBook) {

    $sql = "
    INSERT INTO library (isbn, title, author, pages, user_id, is_read, cover, date_added) 
    VALUES (:isbn, :title, :author, :pages, :userId, :bookIsRead, :cover, :date)";
    $this->stmt = $this->dbh->prepare($sql);
    $this->stmt->execute($newBook);
  }




  public function deleteBook($isbn) {
    $bookToDelete = ['isbn' => $isbn];
    $this->stmt = $this->dbh->prepare("DELETE FROM library WHERE isbn = :isbn");
    $this->stmt->execute($bookToDelete);
  }




  public function searchLibrary($query) {
    $this->stmt = $this->dbh->prepare('SELECT * FROM library WHERE title LIKE :query OR author LIKE :query');
    
    $this->stmt->bindValue(':query', '%' . $query . '%', PDO::PARAM_STR);
    $this->stmt->execute();

    return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
  }




  public function toggleReadStatus($isbn) {
    $currentBook = $this->getBook($isbn);
    $currentReadStatus = $currentBook->is_read;

    $currentReadStatus = [
      'read' => $currentReadStatus == 1 ? '' : 1,
      'isbn' => $isbn
    ];
    

    $this->stmt = $this->dbh->prepare("UPDATE library SET is_read = :read WHERE isbn = :isbn");
    $this->stmt->execute($currentReadStatus);
  }
}




$library = new Library;
$action = !empty($_GET['action']) ? $_GET['action'] : false;
$query = !empty($_GET['query']) ? $_GET['query'] : false;



if ($action == 'getBook' && !empty($query)) {

  echo json_encode($library->getBook($query),JSON_PRETTY_PRINT);




} elseif ($action == 'getLibrary' ) {

  echo json_encode($library->getLibrary(), JSON_PRETTY_PRINT);




} elseif ($action == 'addBook') {

  $json = file_get_contents("php://input");
  $newBook = json_decode($json, true);

  $library->addBook($newBook);

  echo json_encode($newBook);




} elseif ($action == 'deleteBook') {

  if (!empty($query) && $library->getBook($query)) {
      $library->deleteBook($query);
      echo $isbn;
  }




} elseif ($action == 'searchLibrary') {

  if (empty($query)){
    echo json_encode($library->getLibrary(), JSON_PRETTY_PRINT);
  } else {
    echo json_encode( $library->searchLibrary($query), JSON_PRETTY_PRINT );
  }




} elseif ($action == 'toggleReadStatus') {

  $library->toggleReadStatus($query);




} else {

  echo 'Unknown Query';

}

?>