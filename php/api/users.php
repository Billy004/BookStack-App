<?php
// required headers
header("Access-Control-Allow-Origin: *");
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




  public function signUp($loginData) {

   
    $this->stmt = $this->dbh->prepare('INSERT INTO users (email, password) VALUES (:email, :password)');

    $this->stmt->execute($loginData);


    $user = $this->stmt->fetch(PDO::FETCH_OBJ);
    return $user;    


  }




  public function getUserByEmail($email) {
    $this->stmt = $this->dbh->prepare('SELECT * FROM users WHERE email = :email');
    $this->stmt->execute(['email' => $email]);

    return $this->stmt->fetch(PDO::FETCH_OBJ);
  }




  public function toggleUserSetting($newSetting) {

    if ($newSetting['setting'] == 'sort') {
      $sql = "UPDATE users SET sort_method = :method WHERE id = :id";
    }

    if($newSetting['setting'] == 'filter') {
      $sql = "UPDATE users SET filter_method = :method WHERE id = :id";
    }

    if (isset($sql)) {
      $this->stmt = $this->dbh->prepare($sql);
      $this->stmt->bindValue(':method', $newSetting['method'], PDO::PARAM_STR);
      $this->stmt->bindValue(':id', $newSetting['id'], PDO::PARAM_STR);
      $this->stmt->execute();
    }

  }




  public function getUserSettings($id) {
    $this->stmt = $this->dbh->prepare('SELECT sort_method, filter_method FROM users WHERE id = :id');
    $this->stmt->execute(['id' => $id]);

    return $this->stmt->fetch(PDO::FETCH_OBJ);
  }
}









$users = new Users;
$action = !empty($_GET['action']) ? $_GET['action'] : false;
$query = !empty($_GET['query']) ? $_GET['query'] : false;



if ($action == 'login') {

  $json = file_get_contents("php://input");
  $user = json_decode($json, true);

  $login_attempt = $users->login($user);

  if(!empty($login_attempt)) {
    echo json_encode($login_attempt, JSON_PRETTY_PRINT);
  } else {
    echo '0';

  }
  
  // TODO set user Session

  


} elseif ($action == 'logout') {
  echo 'Log Out';
  

  
  
} elseif ($action == 'signUp') {
  
  $json = file_get_contents("php://input");
  $user = json_decode($json, true);


  if( empty($users->getUserByEmail($user['email'])) ) {
    $sign_up_attempt = $users->signUp($user);

    $newUser = $users->getUserByEmail($user['email']);
    echo json_encode($newUser->email, JSON_PRETTY_PRINT);
  } else {
    echo 'duplicate';
  }



  
} elseif ($action == 'toggleUserSetting') {
  
  $json = file_get_contents("php://input");
  $newSetting = json_decode($json, true);

  $users->toggleUserSetting($newSetting);




} elseif ($action == 'getUserSettings') {

  $settings = $users->getUserSettings($query);
  
  print_r( json_encode($settings, JSON_PRETTY_PRINT));




} else {
  echo 'Unknown Query: ';
  echo $action;



}




?>