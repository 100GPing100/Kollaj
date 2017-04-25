function fadeFromTo(from, to) {
    $(from).fadeOut(() => {
        $(to).fadeIn();
    });
    window.localStorage.setItem('history', to);
}

function tosButton_onclick(yesno) {
    fadeFromTo('#tosContainer', '#registerContainer');
    $('#tosCheck').prop('checked', yesno);
}

function btnLogin_onclick() {
    kollaj_login(
        $('#loginName').val(),
        $('#loginPassword').val(),
        (data) => {
            if (data.success) {
                window.localStorage.setItem("loggedAs", data.loginUser);
                window.localStorage.setItem("tracker", data.tracker);
                window.localStorage.setItem("kollajDistance", data.kollajDistance);

                window.location.replace("index.html");
            } else {
                switch(data.error) {
                    case "noCookiesForYou":
                    case "dontTalkToStrangers":
                        fadeFromTo('#quantumPhysics', '#loginError');
                        break;
                    //case "quantumPhysicsIsHard":
                    //case "whatAreYouDoingHere":
                    default:
                        fadeFromTo('#loginError', '#quantumPhysics');
                }
            }
        });
}

var app = {
    initialize: function() {
        document.addEventListener(
            'deviceready',
            this.onDeviceReady,
            false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        $(document).ready(function() {
            $('time.timeago').timeago();
        });

        window.localStorage.setItem("iAlreadyGotMyPermission", 0);

        if (window.localStorage.getItem("loggedAs") !== null) {
            kollaj_autologin(
                window.localStorage.getItem("loggedAs"),
                window.localStorage.getItem("tracker"),
                (data) => {
                    if (data.success == 0) {
                        fadeFromTo("#splashScreen", "#loginContainer");
                    } else {
                        window.localStorage.setItem("loggedAs", data.loginUser);
                        window.localStorage.setItem("tracker", data.tracker);
                        window.localStorage.setItem("kollajDistance", data.kollajDistance);

                        window.location.replace("index.html");
                    }
                });
        } else {
            fadeFromTo("#splashScreen", "#loginContainer");
        }

        /*$('#loginButton').click(function() {
            kollaj_login(
                $('#loginName').val(),
                $('#loginPassword').val(),
                (data) => {
                    if (data.success) {
                        window.localStorage.setItem("loggedAs", data.loginUser);
                        window.localStorage.setItem("tracker", data.tracker);
                        window.localStorage.setItem("kollajDistance", data.kollajDistance);
                    } else {
                        switch(data.error) {
                            case "noCookiesForYou":
                            case "dontTalkToStrangers":
                                fadeFromTo('#quantumPhysics', '#loginError');
                                break;
                            //case "quantumPhysicsIsHard":
                            //case "whatAreYouDoingHere":
                            default:
                                fadeFromTo('#loginError', '#quantumPhysics');
                        }
                    }
                });
                
            return true;
        });*/

        var emailPass;
        var userPass;
        var passwordPass;

        $('#registerEmail').on('change paste keyup', function() {
            var expr = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            var email = $(this).val();

            if ((emailPass = expr.test(email))) {
                kollaj_emailCheck(
                    email,
                    (data) => {
                        emailPass = data.success;
                        $(this).css(emailPass
                            ? { background: 'rgba(0,255,0,0.4)' }
                            : { background: 'rgba(255,0,0,0.4)' });
                    });
            } else {
                $(this).css({
                    background: 'rgba(255,0,0,0.4)'
                });
            }
        });

        $('#registerName').on('change paste keyup', function() {
            var username = $(this).val();

            userPass = (username.length > 3);
            $(this).css(userPass
                ? { background: 'rgba(0,255,0,0.4)' }
                : { background: 'rgba(255,0,0,0.4)' });
            
            if (userPass) {
                kollaj_usernameCheck(
                    username,
                    (data) => {
                        userPass = data.success;
                        $(this).css(userPass
                            ? { background: 'rgba(0,255,0,0.4)' }
                            : { background: 'rgba(255,0,0,0.4)' });
                    });
            }
        });

        $('#registerPassword').on('change paste keyup', function() {
            passwordPass = ($(this).val().length > 5);
            $(this).css(passwordPass
                ? { background: 'rgba(0,255,0,0.4)' }
                : { background: 'rgba(255,0,0,0.4)' });
        });

        $('#registerButton').click(function() {
            if (emailPass && userPass && passwordPass && $('#tosCheck').is(':checked')) {
                $('#registerError').fadeOut();

                kollaj_register(
                    $('#registerEmail').val(),
                    $('#registerName').val(),
                    $('#registerPassword').val(),
                    (data) => {
                        if (data.success == 0) {
                            // rare
                            console.log("Failed to register [" + data.error + "]");
                            return;
                        }
                        
                        window.localStorage.setItem("loggedAs", data.username);
                        window.localStorage.setItem("tracker", data.tracker);
                        window.localStorage.setItem("kollajDistance", data.kollajDistance);
                        window.location.replace("index.html");
                    });
            } else {
                $('#registerError').fadeIn();
            }
        });
    },

    receivedEvent: function(id) {
        console.log('receivedEvent(' + id + ')');
    },
};
