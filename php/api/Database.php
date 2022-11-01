<?php

class Database {

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
}


?>