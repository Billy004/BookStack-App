<?php
// required headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once('../config/config.php');

session_start();


class Users {

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




  public function login($loginData) {
      // $this->dbh->query("SELECT * FROM users WHERE email = :email");
      // $this->dbh->bind(':email', $email);

      // $user = $this->dbh->single();

      $email = $loginData["email"];

      $this->stmt = $this->dbh->prepare('SELECT * FROM users where email = :email');
      $this->stmt->execute(['email' => $email]);

      $user = $this->stmt->fetch(PDO::FETCH_OBJ);
      
      //Check if user found
      if (empty($user)) return false;
      // TODO: implement Hashed Passwords

      if ($loginData["password"] == $user->password) {
        return $user;
      } else {
        return false;
      }


  }

}




$users = new Users;
$action = !empty($_GET['action']) ? $_GET['action'] : false;



if ($action == 'login') {

  $json = file_get_contents("php://input");
  $user = json_decode($json, true);

  $login_attempt = $users->login($user);

  if(!empty($login_attempt)) {
    echo json_encode($login_attempt,JSON_PRETTY_PRINT);
    $_SESSION['user_id'] = $login_attempt->id;
  } else {
    echo '0';

  }
  
  // set user Session

  
} elseif ($action == 'logout') {
  echo 'Log Out';
  
  
  
} elseif ($action == 'signup') {
  echo 'Sign Up';
  
  
} else {
  echo 'Unknown Query';



}




?>