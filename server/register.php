<?php
require "init-api.php";

if ($data["canYou"] == "emailCheck") {
    // input
    //   email              : email
    // output
    //   <empty>
    // erors
    //   alreadyExists      : email already taken
    //   <init-api-errors>
    $email = killDaHackerz($data["email"]);

    $result = kollaj_query("
        SELECT email FROM users
        WHERE email='$email'
    ");

    if ($result->num_rows > 0) {
        $result->free();
        kollaj_error("alreadyExists");
    }
    $result->free();

    kollaj_finish(array(
        "success" => 1,
    ));
} else if ($data["canYou"] == "usernameCheck") {
    // input
    //   username           : username
    // output
    //   <empty>
    // errors
    //   alreadyExists      : username already taken
    //   <init-api-errors>
    $username = killDaHackerz($data["username"]);

    $result = kollaj_query("
        SELECT userName FROM users
        WHERE userName='$username'
    ");

    if ($result->num_rows > 0) {
        $result->free();
        kollaj_error("alreadyExists");
    }
    $result->free();

    kollaj_finish(array(
        "success" => 1,
    ));
} else if ($data["canYou"] == "makeMeDumpInstagram") {
    // input
    //   email              : email
    //   username           : username
    //   password           : password
    // output
    //   username           : username
    //   tracker            : session tracker
    //   kollajDistance     : (obsolete)
    // errors
    //   howDidYaGetHere    : username/email already taken
    //   <init-api-errors>
    $username = killDaHackerz($data["username"]);
    $email    = killDaHackerz($data["email"]);

    // check if already registered
    $result = kollaj_query("
        SELECT * FROM users
        WHERE userName='$username'
        OR email='$email'
    ");

    if ($result->num_rows > 0) {
        $result->free();
        kollaj_error("howDidYaGetHere");
    }
    $result->free();


    // register user
    $password       = password_hash(killDaHackerz($data["password"]), PASSWORD_DEFAULT);
    kollaj_query("
        INSERT INTO users (userName, email, passHash)
        VALUES ('$username', '$email', '$password')
    ");

    $userID         = $db->insert_id;
    $deviceUUID     = killDaHackerz($data["devUuid"]);
    $deviceModel    = killDaHackerz($data["devModel"]);
    $devicePlatform = killDaHackerz($data["devPlatform"]);
    $tracker        = md5($deviceUUID . "" . rand());

    kollaj_query("
        INSERT INTO register (ip, devUid, devVer, devPlatform, uniID, uid)
        VALUES ('$_SERVER[REMOTE_ADDR]', '$deviceUUID', '$deviceModel', '$devicePlatform', '$tracker', '$userID')
    ");


    // some posting stuff (first post?)
    $readFile = rand(0,24).".jpg";
    $newFile  = md5($userID . $readFile).".jpg";

    if(!copy("../rImgs/" . $readFile, "../uploads/" . $newFile)) {
        //echo "Cannot copy file";
    }

    kollaj_query("
        INSERT INTO post (uid, imgpath, imgH, imgW, imgX, imgY, mask1, mask2, angle, scale, tx, ty, special)
        VALUES (
            '$userID',
            '$newFile',
            '397',
            '705',
            '44.1',
            '160.99',
            'M 44.1 160.9 L 749.8 160.9 749.8 558 398.4 558 44.1 160.9 Z',
            'M 44.1 160.9 L 749.8 160.9 749.8 160.9 396.5 558 44.1 558 Z',
            '0',
            '1.1854855445575602',
            '0',
            '-510',
            '1'
        )
    ");

    if (file_exists("../quotes.txt")) {
        // add a chat between user(42) and the new user
        $lines = explode("\n", file_get_contents("../quotes.txt"));
        $line  = killDaHackerz($lines[mt_rand(0, count($lines) - 1)]);
        kollaj_query("
            INSERT INTO chats (sid, rid)
            VALUES ('42', '$userID')
        ");

        kollaj_query("
            INSERT INTO inbox (sid, rid, msg)
            VALUES('42', '$userID', '$line')
        ");

        kollaj_query("
            INSERT INTO outbox (sid, rid, msg)
            VALUES('42', '$userID', '$line')
        ");
    }

    // welcome notification
    kollaj_query("
        INSERT INTO notification (contact_ID, friend_ID, notifText, notifType, action, actionTo)
        VALUES ('1', '$userID', 'Aloha, and feel at home <3 !', '1', '1', 'SpaceWalkingNinja')
    ");


    kollaj_finish(array(
        "success" => 1,
        "username" => $username,
        "tracker" => $tracker,
        "kollajDistance" => 0,
    ));
}
?>
