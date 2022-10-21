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




  public function searchLibrary() {

  }
}




$library = new Library;
$action = !empty($_GET['action']) ? $_GET['action'] : false;
$isbn = !empty($_GET['isbn']) ? $_GET['isbn'] : false;




if ($action == 'getBook' && !empty($isbn)) {

  echo json_encode($library->getBook($isbn),JSON_PRETTY_PRINT);




} elseif ($action == 'getLibrary' ) {

  echo json_encode($library->getLibrary(), JSON_PRETTY_PRINT);




} elseif ($action == 'addBook') {

  $json = file_get_contents("php://input");
  $newBook = json_decode($json, true);

  $library->addBook($newBook);

  echo json_encode($newBook);




} elseif ($action == 'deleteBook') {

  if (!empty($isbn) && $library->getBook($isbn)) {
      $library->deleteBook($isbn);
      echo $isbn;
  }
  echo 'deleting book';




} else {

  echo 'Unknown Query';

}

?>