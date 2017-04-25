<?php
//====================================================
// Copyright (c) 2016-2017 Kristian Atanasov
// Copyright (c) 2017 Luís Guimarães

require "init-api.php";


if ($data["canYou"] == "letMeIn") {
    // input:
    //   myName             : username
    //   myPass             : password
    //   devUuid            : device uuid
    //   devModel           : device model
    //   devPlatform        : device platform
    // output:
    //   loginUser          : username
    //   tracker            : session tracker
    //   kollajDistance     : (obsolete)
    // errors:
    //   noCookiesForYou    : missing username or password
    //   dontTalkToStrangers: invalid username or password
    //   <init-api-errors>
    $username       = killDaHackerz($data["myName"]);
    $password       = killDaHackerz($data["myPass"]);

    if ($username == "" || $password == "") {
        kollaj_error("noCookiesForYou");
    }

    $result = kollaj_query("SELECT * FROM users WHERE userName='{$username}'");
    $user   = $result->fetch_assoc();
    if (!$user) {
        $result->free();
        kollaj_error("dontTalkToStrangers");
    }

    if (!password_verify($password, $user['passHash'])) {
        $result->free();
        kollaj_error("dontTalkToStrangers");
    }

    $deviceUUID     = killDaHackerz($data["devUuid"]);
    $deviceModel    = killDaHackerz($data["devModel"]);
    $devicePlatform = killDaHackerz($data["devPlatform"]);
    $tracker        = md5($deviceUUID . "" . rand());

    kollaj_query("
        INSERT INTO register (uid, ip, devUid, devVer, devPlatform, uniID)
        VALUES(
            '{$user['ID']}',
            '$_SERVER[REMOTE_ADDR]',
            '$deviceUUID',
            '$deviceModel',
            '$devicePlatform',
            '$tracker')
    ");

    kollaj_finish(array(
        "success" => 1,
        "loginUser" => $username,
        "tracker" => $tracker,
        "kollajDistance" => $user["kollajDistance"]
    ));
} else if ($data["canYou"] == "makeSureMeIsNotMiniMe") {
    // input:
    //   myName             : username
    //   tracker            : session tracker
    //   devUuid            : devie uuid
    //   devModel           : device model
    //   devPlatform        : device platform
    // output:
    //   loginUser          : username
    //   tracker            : new session tracker
    //   kollajDistance     : (obsolete)
    // errors:
    //   dontTalkToStrangers: unknown username
    //   noCookiesForYou    : invalid session
    //   <init-api-errors>

    $username = killDaHackerz($data["myName"]);
    $result   = kollaj_query("SELECT * FROM users WHERE userName='$username'");
    if ($result->num_rows == 0) {
        $result->free();
        kollaj_error("dontTalkToStrangers");
    }

    $row            = $result->fetch_assoc();
    $userID         = $row["ID"];
    $kollajDistance = $row["kollajDistance"];
    $tracker        = killDaHackerz($data["tracker"]);
    $deviceUUID     = killDaHackerz($data["devUuid"]);
    $deviceModel    = killDaHackerz($data["devModel"]);
    $devicePlatform = killDaHackerz($data["devPlatform"]);

    $result->free();
    $result = kollaj_query(
        "SELECT * FROM register " .
        "WHERE uid='$userID' " .
        "AND devUid='$deviceUUID' " .
        "AND devVer='$deviceModel' " .
        "AND devPlatform='$devicePlatform' " .
        "AND uniID='$tracker'");

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

    kollaj_finish(array(
        "success" => 1,
        "loginUser" => $username,
        "tracker" => $newTracker,
        "kollajDistance" => $kollajDistance,
    ));
}

?>
