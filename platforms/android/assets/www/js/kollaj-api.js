//====================================================
// Copyright (c) 2016-2017 Kristian Atanasov
// Copyright (c) 2017 Luís Guimarães

function kollaj_request(where, arr, callback) {
    arr.devUuid = device.uuid;
    arr.devModel = device.version;
    arr.devPlatform = device.platform;

    $.ajax({
        type: "POST",
        url: "https://kollaj.net/api/" + where + ".php",
        data: JSON.stringify(arr),
        contentType: "application/json",
        success: callback, 
    });
}

function kollaj_autologin(username, tracker, callback) {
    kollaj_request("login", {
        canYou:     "makeSureMeIsNotMiniMe",
        myName:     username,
        tracker:    tracker,
    }, callback);
}

function kollaj_login(username, password, callback) {
    kollaj_request("login", {
        canYou:     "letMeIn",
        myName:     username,
        myPass:     keccak_384(password),
    }, callback);
}

function kollaj_register(email, username, password, callback) {
    kollaj_request("register", {
        canYou:     "makeMeDumpInstagram",
        email:      email,
        username:   username,
        password:   keccak_384(password),
    }, callback);
}

function kollaj_emailCheck(email, callback) {
    kollaj_request("register", {
        canYou:     "emailCheck",
        email:      email,
    }, callback);
}

function kollaj_usernameCheck(username, callback) {
    kollaj_request("register", {
        canYou:     "usernameCheck",
        username:   username,
    }, callback);
}
