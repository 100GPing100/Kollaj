<?php
//====================================================
// Copyright (c) 2017 Luís Guimarães

require "init-api.php";

if ($data["canYou"] == "saveMyToken") {
    // input:
    //   username           : username
    //   devUuid            : device uuid
    //   devModel           : device model
    //   devPlatform        : device platform
    //   tracker             : session tracker
    //   token              : firebase token
    // output:
    //   tracker            : (new) session tracker
    // errors:
    //   noCookiesForYou    : invalid session
    //   dontTalkToStrangers: invalid username
    //   <init-api-errors>
    $user = kollaj_checklogin(
        killDaHackerz($data["username"]),
        killDaHackerz($data["devUuid"]),
        killDaHackerz($data["devModel"]),
        killDaHackerz($data["devPlatform"]),
        killDaHackerz($data["tracker"])
    );

    $token = killDaHackerz($data["token"]);

    kollaj_query("
        UPDATE users SET firebase='$token'
        WHERE uid='{$user["ID"]}'
    ");

    kollaj_notif(
        $token,
        "From SERVER",
        "We got your new token, thanks!",
        ""
    );

    kollaj_finish([
        "success" => 1,
        "tracker" => $user["tracker"],
    ]);
}

?>
