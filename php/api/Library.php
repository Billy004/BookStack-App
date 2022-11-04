<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once('../config/config.php');

require_once('./Library.class.php');

$library = new Library;
$action = !empty($_GET['action']) ? $_GET['action'] : false;
$query = !empty($_GET['query']) ? $_GET['query'] : false;



if ($action == 'getBook' && !empty($query)) {

  echo json_encode($library->getBookByIsbn($query), JSON_PRETTY_PRINT);



} elseif($action == 'getBookByUser') {

    $user = $query;
    $isbn = $_GET['isbn'];

    $bookData = $library->getBookByUser($user, $isbn);

    
    echo json_encode($bookData, JSON_PRETTY_PRINT);



} elseif ($action == 'getLibrary' && !empty($query)) {

  $sortMethod = !empty($_GET['sort']) ? $_GET['sort'] : 'title';
  $filterMethod = !empty($_GET['filter']) ? $_GET['filter'] : 'all';


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