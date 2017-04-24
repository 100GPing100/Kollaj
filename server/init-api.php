<?php
//====================================================
// Copyright (c) 2016-2017 Kristian Atanasov
// Copyright (c) 2017 Luís Guimarães
//
// errors:
//   whatAreYouDoingHere    : no data was given
//   quantumPhysicsIsHard   : internal error (such as database)


// !!! ONLY FOR DEBUGGING !!!
error_reporting(E_ALL);
ini_set('display_errors', 'on');

//====================================================
// Headers
if (isset($_SERVER['HTTP_ORIGIN'])) {
   header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
   header('Access-Control-Allow-Credentials: true');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
   if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
       header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

   if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
       header("Access-Control-Allow-Headers:{$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

   exit(0);
}

header("Access-Control-Allow-Origin", "*");
header("Access-Control-Allow-Methods", "POST, GET");
header("Access-Control-Max-Age", "3600");
header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

mb_internal_encoding('UTF-8');


//====================================================
// Database connection
$db = new mysqli("localhost", "root", "kollajGribz", "kollaj");
global $db;

if ($db->connect_errno) {
    printf("Connect failed: %s\n", $db->connect_error);
    exit();
}

function killDaHackerz($string) {
    global $db;
    $string = $db->real_escape_string($string);
    $string = htmlspecialchars($string);
    return $string;
}


//====================================================
// Helpers and get $data
function kollaj_finish($data) {
    echo(json_encode($data));
    require "free-api.php";
    exit();
}

function kollaj_error($error) {
    kollaj_finish(array(
        "success" => 0,
        "error" => $error,
    ));
}

function kollaj_query($query) {
    global $db;
    $result = $db->query($query);
    if (!$result) {
        kollaj_error("quantumPhysicsIsHard");
    }
    return $result;
}

function kollaj_checklogin($username, $deviceUUID, $deviceModel, $devicePlatform, $tracker) {
    $result = kollaj_query("
        SELECT * FROM users
        WHERE userName='$username'
    ");

    if ($result->num_rows == 0) {
        $result->free();
        kollaj_error("dontTalkToStrangers");
    }

    $row            = $result->fetch_assoc();
    $userID         = $row["ID"];
    $kollajDistance = $row["kollajDistance"];

    $result->free();
    $result = kollaj_query("
        SELECT * FROM register
        WHERE uid='$userID'
        AND devUid='$deviceUUID'
        AND devVer='$deviceModel'
        AND devPlatform='$devicePlatform'
        AND uniID='$tracker'
    ");

    if ($result->num_rows == 0) {
        $result->free();
        kollaj_error("noCookiesForYou");
    }

    $result->free();
    $newTracker = md5($deviceUUID . "" . rand());

    kollaj_query("
        UPDATE register SET uniID='$newTracker'
        WHERE uid='$userID'
        AND uniID='$tracker'
    ");

    return array(
        "ID" => $userID,
        "kollajDistance" => $kollajDistance,
        "tracker" => $newTracker,
    );
}


$data = json_decode(file_get_contents("php://input"), true);
global $data;

if (!$data) {
    kollaj_error("whatAreYouDoingHere");
}

?>
