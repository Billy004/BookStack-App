<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once('../config/config.php');

require_once('./Users.class.php');

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