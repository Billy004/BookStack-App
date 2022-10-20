<?php

class Database {

  public $dsn;
  public $options;
  public $dbh;

  public function __construct() {

    $this->dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
    $this->options = array(
      PDO::ATTR_PERSISTENT => true,
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    );
    
    try {
      $this->dbh = new PDO($dsn, DB_USER, DB_PASS, $this->options);
    } catch (PDOException $e) {
      echo $e->getMessage();
    }

  }

}


?>