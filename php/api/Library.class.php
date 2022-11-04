<?php

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




public function getLibrary($user_id, $sortMethod="title", $filterMethod="all") {

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




public function getBookByUser($user, $isbn) {

  $this->stmt = $this->dbh->prepare('SELECT * FROM library WHERE user_id = :user AND isbn = :isbn');
  $this->stmt->bindValue(':user', $user, PDO::PARAM_STR);
  $this->stmt->bindValue(':isbn', $isbn, PDO::PARAM_STR);
  $this->stmt->execute();

  return( $this->stmt->fetch(PDO::FETCH_OBJ) );

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

