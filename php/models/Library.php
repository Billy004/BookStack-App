<?php
// required headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
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

  public function addBook() {

  }

  public function deleteBook() {

  }

  public function searchLibrary() {

  }
}

$library = new Library;

$action = !empty($_GET['action']) ? $_GET['action'] : false;
$isbn = !empty($_GET['isbn']) ? $_GET['isbn'] : false;


if ($action == 'getBook' && !empty($isbn)) {

  echo json_encode($library->getBook($isbn));

} elseif ($action == 'getLibrary' ) {

  echo json_encode($library->getLibrary(), JSON_PRETTY_PRINT);

} else {

  echo 'Unknown Query';

}

?>