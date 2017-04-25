function identify(arr) {
    function actionCall(obj) {
        console.log(obj);
        if (!obj) {
            return;
        }

        //register email
        if (obj.email == "gotTheSame") {
            window.localStorage.setItem("emailPass", "gotTheSame");
        } else if (obj.email == "pass") {
            window.localStorage.setItem("emailPass", "pass");
        }
        //register username
        if (obj.uname == "gotTheSame") {
            window.localStorage.setItem("unamePass", "gotTheSame");
        } else if (obj.uname == "pass") {
            window.localStorage.setItem("unamePass", "pass");
        }
        //registrationQuery
        if (obj.loginQuery == "imLettingYaOnLogin") {
            console.log("wtf am I doing here?");
            window.localStorage.setItem("loginQuery", "pass")
            window.localStorage.setItem("loggedAs", obj.loginUser);
            window.localStorage.setItem("tracker", obj.tracker);
            window.localStorage.setItem("kollajDistance", obj.kollajDistance);
            var arr1 = { canYou: "giveMeMyStats", myName: window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform }
            identify(arr1);
            var arr = { canYou: "showMeMyFeed", myName: window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform, roffset: 0 };
            identify(arr);
            window.localStorage.setItem("iAlreadyGotMyPermission", 1);
        }

        if (typeof obj.bye != "undefined") {
            localStorage.clear();
            location.reload();
        }

        if (typeof obj.urPassChange != "undefined") {
            $("#deepMenuChooser").css({ "display": "block" });
            $("#myPassSet").css({ "display": "none" });
            $("#deepMenu").css({ "display": "none" });
            $modal = $('.modal-frame');
            $overlay = $('.modal-overlay');
            window.localStorage.setItem("modal", 0);
            $overlay.removeClass('state-show');
            $modal.removeClass('state-appear').addClass('state-leave');
        }

        if (typeof obj.urNameMate != "undefined") {
            window.localStorage.setItem("realName", obj.urNameMate);
            $("#myNameIs").val(obj.urNameMate);
        }

        if (typeof obj.urBioMate != "undefined") {
            window.localStorage.setItem("myBio", obj.urBioMate);
            $("#currentBio").html(obj.urBioMate);
        }

        if (obj.urEmailSearch == "gotTheSame") {
            $("#myEmailIs").css({ background: "rgba(255,0,0,0.4)" })
            window.localStorage.setItem("emailCheck", "no");
        }

        if (obj.urEmailSearch == "isValidMate") {
            $("#myEmailIs").css({ background: "rgba(0,255,0,0.4)" });
            window.localStorage.setItem("emailCheck", "yes");
        }

        if (typeof obj.urEmailMate != "undefined") {
            window.localStorage.setItem("myEmail", obj.urEmailMate);
            $("#myEmailIs").val(obj.urEmailMate);
        }

        if (typeof obj.client != "undefined") {
            alert("It is imperative ou update Kollaj so you can continue using it. \n Thanks for da understanding yo!");
            $abt = $("#abt");
            $abt.html("");
            $abt.append('<br/><br/><br/><br/><br/><br/><br/><br/><br/><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 468.228 117.552" overflow="visible" zoomAndPan="disable"><path fill="none" d="M0 0h468.23v117H0z"/><path fill="#02343F" d="M113.1 94.24H101L68.7 51.32l-9.27 8.23v34.7h-10.3V5.75h10.3V49.6L99.6 5.72h12.17L76.17 44.2l36.94 50.06zm82.78-44.4c0 14.16-3.58 25.3-10.74 33.42S168 95.43 155.26 95.43c-13.04 0-23.1-4-30.18-11.96-7.08-7.97-10.63-19.23-10.63-33.76 0-14.4 3.56-25.55 10.66-33.5s17.2-11.9 30.3-11.9c12.7 0 22.65 4.05 29.8 12.1 7.14 8.1 10.7 19.24 10.7 33.44zm-70.53 0c0 12 2.56 21.1 7.66 27.3s12.55 9.3 22.28 9.3c9.8 0 17.2-3.1 22.22-9.28 5-6.18 7.5-15.3 7.5-27.32 0-11.92-2.5-20.95-7.48-27.1-4.98-6.17-12.35-9.25-22.12-9.25-9.8 0-17.26 3.1-22.37 9.3s-7.65 15.2-7.65 27.02zm84.08 44.4V5.74h10.3v79.2h39.06v9.3h-49.4zm58.17 0V5.74h10.3v79.2h39.05v9.3H267.6zm119.9 0l-11.02-28.2h-35.5l-10.9 28.2h-10.42l35-88.88h8.67l34.83 88.88H387.5zM373.27 56.8l-10.3-27.4c-1.34-3.48-2.7-7.74-4.12-12.78-.9 3.87-2.16 8.13-3.82 12.77L344.6 56.8h28.67z"/><path fill="#02343F" d="M397.4 117.55c-3.8 0-6.78-.54-8.96-1.63v-8.77c2.87.8 5.86 1.2 8.96 1.2 4 0 7.04-1.2 9.12-3.62 2.07-2.42 3.1-5.9 3.1-10.47V5.74h10.3V93.4c0 7.67-1.93 13.6-5.8 17.82-3.88 4.22-9.45 6.33-16.72 6.33z"/><path fill="#FFF" d="M316.95 94.25h-6.44l3.7-9.38h2.8"/><path fill="#FFF" d="M315.23 81.2s-2.97 14.24-3.97 14.93 4.4 7.5 6.72-.75 5.97-13.16 2.84-13.66-5.6-.53-5.6-.53z"/></svg> <br/> <br/> <br/><br/><h1> PLEASE UPDATE </h1> <br/><br/><h2> So you can use all of them new features. <br/> To do this, please go to Google </h2><br/><br/><br/><br/> ');
            $("#loginContainer").css({ "display": "none" });
            $("#mainNav").css({ "display": "none" });
            $abt.css({ "display": "block" });
        }

        if (typeof obj.urKollajDistance != "undefined") {
            window.localStorage.setItem("kollajDistance", obj.urKollajDistance);
            var myNewHeight = window.localStorage.getItem("originalHeight") * obj.urKollajDistance;
            //$("#profile").css({"height":myNewHeight+"px"});
            //$("#profileSVG").css({"height":myNewHeight+"px"});
            //console.log("refreshed kdistance, "+window.localStorage.getItem('kollajDistance'))
        }

        if (typeof obj.urFollowersAtm != "undefined") {
            window.localStorage.setItem("myProfileFollowing", obj.uFollowingAtm);
            window.localStorage.setItem("myProfileFollowers", obj.urFollowersAtm);

            $("#profileFollowing").html(obj.uFollowingAtm);
            $("#profileFollowers").html(obj.urFollowersAtm);
        }

        if (typeof obj.urCalibration != "undefined") {
            window.localStorage.setItem("myCalibration", obj.urCalibration);
            $(".calibrationValue").html(obj.urCalibration);
            $("#calibrationRanger").val(obj.urCalibration);
        }

        if (typeof obj.thanksForTheWarning != "undefined") {
            bringInTheAlertWindow();
        }

        if (obj.urCalibration == "hateToMakeYouSadButUrOnUrOwn") {
            window.localStorage.setItem("myCalibration", "hateToMakeYouSadButUrOnUrOwn");
            $(".calibrationValue").html("0.0");
            $("#calibrationRanger").val("0.00");
            $("#calibrateMsg").text(" - The good news is that you'll have to calibrate manually, \n your phone is new to Kollaj! \n ");
        }


        if (obj.yourVibe == "hasBeenVibed") {
            //console.log("BAM");
        }


        if (typeof obj.thePpzDatReFollingU != "undefined") {

            window.localStorage.setItem("modal", 0);

            $whoAreMyFollowers = $("#whoAreMyFollowers");
            $whoAreMyFollowers.html("");
            arr = obj.thePpzDatReFollingU;
            for (i in arr) {
                flwState = " follows you!"
                if (arr[i].uVeBinAccepted != 1) {
                    flwState = "- pending approval!"
                }
                $whoAreMyFollowers.append("" +
                    "<div class='notifHolder' id='usrFollowRes" + i + "' data-openuser='" + arr[i].userUrFollowing + "'>" +
                    "  <div class='notifPPHolder'>" +
                    "    <div class='cropSRes' id='usrFollowResImg" + i + "' > </div>" +
                    "  </div>" +
                    "  <p>@" + arr[i].userUrFollowing + " " + flwState + "</p>" +
                    "</div>");

                $("#usrFollowResImg" + i).css({ "background-image": "url('https://kollaj.net/uploads/" + arr[i].usrAvatar + "')" });

                // child: searchResCLICK
                $("#usrFollowRes" + i).click(function () {
                    var seekProfile = $(this).data("openuser");
                    //console.log(seekProfile);
                    $("#profileName").html("<div id='callProfAction' class='arrow' data-seeProf='" + seekProfile + "'>@" + seekProfile + "</div>");
                    $("#callProfAction").click(function () {
                        seeProf = seekProfile;
                        callDaProfileMenu(seeProf);
                        window.localStorage.setItem("history", "smProfile");
                    });
                    var arr = { canYou: "showMeSomeProfile", myName: window.localStorage.getItem("loggedAs"), seeProfile: seekProfile, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform, proffset: 0 };
                    identify(arr);
                    $("#profile").css({ "display": "block" });
                    $("#whoAmIFollowing").css({ "display": "none" });
                    $modal = $('.modal-frame');
                    $overlay = $('.modal-overlay');
                    window.localStorage.setItem("modal", 0);
                    $overlay.removeClass('state-show');
                    $modal.removeClass('state-appear').addClass('state-leave');

                });

            }
        }



        if (typeof obj.thePpzUrFollowingAre != "undefined") {

            window.localStorage.setItem("modal", 0);

            $whoAmIFollowing = $("#whoAmIFollowing");
            $whoAmIFollowing.html("");
            arr = obj.thePpzUrFollowingAre;
            for (i in arr) {
                flwState = "Following "
                if (arr[i].uVeBinAccepted != 1) {
                    flwState = "Pending approval - "
                }
                $whoAmIFollowing.append("" +
                    "<div class='notifHolder' id='usrFollowRes" + i + "' data-openuser='" + arr[i].userUrFollowing + "'>" +
                    "  <div class='notifPPHolder'>" +
                    "    <div class='cropSRes' id='usrFollowResImg" + i + "' > </div>" +
                    "  </div>" +
                    "  <p>" + flwState + "@" + arr[i].userUrFollowing + "</p>" +
                    "</div>");

                $("#usrFollowResImg" + i).css({ "background-image": "url('https://kollaj.net/uploads/" + arr[i].usrAvatar + "')" });

                // child: searchResCLICK
                $("#usrFollowRes" + i).click(function () {
                    var seekProfile = $(this).data("openuser");
                    //console.log(seekProfile);
                    $("#profileName").html("<div id='callProfAction' class='arrow' data-seeProf='" + seekProfile + "'>@" + seekProfile + "</div>");
                    $("#callProfAction").click(function () {
                        seeProf = seekProfile;
                        callDaProfileMenu(seeProf);
                    });
                    var arr = { canYou: "showMeSomeProfile", myName: window.localStorage.getItem("loggedAs"), seeProfile: seekProfile, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform, proffset: 0 };
                    identify(arr);
                    $("#profile").css({ "display": "block" });
                    $("#whoAmIFollowing").css({ "display": "none" });
                    $modal = $('.modal-frame');
                    $overlay = $('.modal-overlay');
                    window.localStorage.setItem("modal", 0);
                    $overlay.removeClass('state-show');
                    $modal.removeClass('state-appear').addClass('state-leave');

                });

            }
        }

        if (typeof obj.urDescMate != "undefined") {

            function getMessage(messages) {
                return messages[Math.floor(Math.random() * messages.length)];
            }
            var stngsStrng = ["Settings", "%SystemDrive%", "class.[usrDesc]", "::SettsKollaj", "Control Panel", "::RootConfigs", "root/memes/"];
            var sepStrng = [" :: ", " / ", " > ", " <> ", " >> ", " blah ", " // ", " ", " -----> ", " idk, "];
            var descStrng = ["Profile Description", "[changeProfDescription]", "{settingDesc}", "your description", "description", "editDescription"];
            var nDescStrng = ["42", "A brand new description", "haha i changed it", "[[insert new description]]", "I can tell you a story... A story of.. No I can't, sry.", "**description in french**"];
            myRandStngs = getMessage(stngsStrng);
            myRandSep = getMessage(sepStrng);
            myRandDesc = getMessage(descStrng);
            myRandFubar = getMessage(nDescStrng);

            $("#dasModal").html("" +
                "<div class='fSvgResH'>" +
                "<p class='fSvgResUn'> <br/> </p>" +
                "<p class='fSvgResD' id='modalCurrentSelfDesc'>" + obj.urDescMate + "</p>" +
                "<p class='fSvgResCL'>" + myRandStngs + "" + myRandSep + "" + myRandDesc + "</p> " +
                "<div id='modalChangeMyDesc' class='feedCommentForm' style='display:block !important;'>" +
                "<input id='myNewDesc' class='feedCommentInput' type='text' placeholder='" + myRandFubar + "'>" +
                "<input id='myNewDescSender' class='feedCommentBtn' type='button' value='> save <'>" +
                "</div> </div> ");

            $("#myNewDescSender").click(function () {
                myNewDesc = $("#myNewDesc").val();
                var arr = { canYou: "letMeChangeMyDesc", myName: window.localStorage.getItem("loggedAs"), whatShallBeIt: myNewDesc, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform };
                identify(arr);
                return false;
            });
            return false;
        }

        if (obj.myDecisionAboutYourFollowing == 1) {
            $("#profileFollowers").data("iFollow", 1);
            $("#profileFollowers").css({ "background": "rgba(100, 149, 237, 0.7)" })
            $("#profileFollowers").css({ "color": "ghostwhite" });
        }

        if (obj.myDecisionAboutYourFollowing == 2) {
            //alert ("Wait untill they accept you!");
        }

        if (obj.didILetYouUnfollow == 0) {
            $("#profileFollowers").data("iFollow", 0);
            $("#profileFollowers").css({ "background": "white" })
            $("#profileFollowers").css({ "color": "#003440" })
        }

        if (typeof obj.commentsRes != "undefined") {
            var arr = obj.commentsRes;
            $("#feedComments" + obj.gbt).html("")
            $("#feedComments" + obj.gbt).css({ "display": "none" })
            for (i in arr) {
                $("#feedComments" + obj.gbt).append("<p> <span id='p" + obj.gbt + "comment" + i + "' data-uname='" + arr[i].commenter + "'>@" + arr[i].commenter + "</span> " + arr[i].comment + "</p>");

                $("#p" + obj.gbt + "comment" + i).click(function () {
                    gtlink = $(this).data("uname");
                    window.localStorage.setItem("history", "feed");
                    $("#profileName").html("<div id='callProfAction' class='arrow' data-seeProf='" + gtlink + "'>@" + gtlink + "</div>");
                    var arr = { canYou: "showMeSomeProfile", myName: window.localStorage.getItem("loggedAs"), seeProfile: gtlink, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform, proffset: 0 };
                    identify(arr);
                    return false;
                })

            }
            $("#feedComments" + obj.gbt).data("toggled", 1);
            $("#feedComments" + obj.gbt).slideToggle();
            $("#feedComForm" + obj.gbt).slideToggle();

        }

        if (typeof obj.youCanBother != "undefined") {
            $("#msgresholder").css({ "display": "block" });
            $("#chatbox").css({ "display": "none" });
            $("#chat").css({ "display": "none" });

            $msg = $('#msgresholder');
            $msg.html("")
            var arr = obj.youCanBother;
            for (i in arr) {
                $msg.append("" +
                    "<div id='msgRes" + i + "' class='mrid' data-uname='" + arr[i].username + "'>" +
                    "<div class='pinfo'>" + arr[i].uRname +
                    "<span class='psm'> @" + arr[i].username + "</span>" +
                    "</div>   <div class='searchResCnt'>" +
                    "<div class='cropSRes' id='cropMRes" + i + "' > </div>" +
                    "</div></div>");
                $("#cropMRes" + i).css({ "background-image": "url('https://kollaj.net/uploads/" + arr[i].avatar + "')" });
            }

            $(".mrid").click(function () {
                $("#msgresholder").css({ "display": "none" });
                var seekProfile = $(this).data("uname");
                //console.log(seekProfile);
                window.localStorage.setItem("seeingMsgs", seekProfile);
                window.localStorage.setItem("firstReload", 1);
                var arr = { canYou: "STOPiMadeUpMyMind", myName: window.localStorage.getItem("loggedAs"), illBeBothering: seekProfile, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform };
                identify(arr);
                return false;
            });
        }

        if (typeof obj.hahaOkUCanTry != "undefined") {

            $("#chatbox").css({ "display": "block" });
            $("#chat").css({ "display": "block" });
            $chatThing = $("#theChatThing");
            $chatThing.html("");

            var arr = obj.hahaOkUCanTry;
            for (i in arr) {
                //console.log("here...");
                if (arr[i].guilty != 1) {
                    username = arr[i].uname;
                    window.localStorage.setItem("msgSendTo", username);
                    style = "style='color:crimson;'";
                }
                else {
                    username = window.localStorage.getItem("loggedAs");
                    style = "style='color:CornflowerBlue;'";
                }
                $chatThing.append("<p><span id='chatMsgId" + i + "' " + style + " data-uname='" + username + "'>@" + username + " </span> <time class='timeago' " + style + " datetime='" + arr[i].on + "'>" + arr[i].on + "</time>:</p> <p>" + arr[i].msg + "<p>");
            }

            jQuery("time.timeago").timeago();
            $msg = $("#msg");

            $(function () {
                var vTimeOut = setTimeout(startRefresh, 7500)
            });

            function startRefresh() {
                clearInterval(vTimeOut);

                if ($msg.is(":hidden")) { messageState = 0 } else { messageState = 1 }
                if (messageState != 0) {
                    vTimeOut = setTimeout(startRefresh, 7500);
                    checkMessagesWith = window.localStorage.getItem("seeingMsgs");
                    daTime = parseInt(window.localStorage.getItem("checkedMsgsAt")) + 7250;
                    if (daTime < Date.now()) {
                        window.localStorage.setItem("checkedMsgsAt", Date.now());
                        var arr = { canYou: "STOPiMadeUpMyMind", myName: window.localStorage.getItem("loggedAs"), illBeBothering: checkMessagesWith, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform };
                        identify(arr);
                    }
                }

                $mrH = $("#msgresholder");
                if ($mrH.is(":hidden")) { cbState = 0 } else { cbState = 1 }
                //console.log(cbState)
                if (cbState == 1) {
                    clearInterval(vTimeOut);
                    $("#chatbox").css({ "display": "none" });
                    $("#chat").css({ "display": "none" });
                }

            }

            $mrH = $("#msgresholder");
            if ($mrH.is(":hidden")) { cbState = 0 } else { cbState = 1 }
            //console.log(cbState)
            if (cbState == 1) {
                clearInterval(vTimeOut);
                $("#chatbox").css({ "display": "none" });
                $("#chat").css({ "display": "none" });
            }
            if (window.localStorage.getItem("firstReload") == 1) {
                var objDiv = document.getElementById("chatbox");
                objDiv.scrollTop = objDiv.scrollHeight;
                window.localStorage.setItem("firstReload", 0);
            }
        }
        if (typeof obj.ncGbt != "undefined") {

            $("#feedComments" + obj.ncGbt).append("<p> <span>@" + obj.loginUser + "</span> " + obj.urNewComment + "</p>");

        }
        if (typeof obj.datUserRes != "undefined") {

            function getMessage(messages) {
                return messages[Math.floor(Math.random() * messages.length)];
            }

            //console.log("here!");
            if (obj.datUserRes != 1) {
                //console.log(obj.seeing);
                theCss = $("#whereuputurppic").css("background-image");
                //console.log(theCss);

                $("#last").css({ "display": "none" });

                $("#ppicindaModal").css({ "background-image": theCss });

                window.localStorage.setItem("seeProfFollowing", obj.following);
                window.localStorage.setItem("seeProfFollowers", obj.followers);

                $("#section-one").html("<h1>" + obj.following + " ></h1>");
                $("#section-two").html("<h1>> " + obj.followers + " [follow]</h1>");
                window.localStorage.setItem("seeProfName", obj.seeing);

                if (obj.iFollow == 1) {
                    window.localStorage.setItem("seeProfIFollow", 1);
                    var messages = ["<h1>> you and " + obj.followers + " people [UNFOLLOW]</h1>", "<h1>> followed by " + obj.followers + ", and you</h1>", "<h1>> you and " + obj.followers + "in the vibe</h1>", "<h1>" + obj.followers + " [unvibe]</h1>"];
                    if (obj.followers == 1) {
                        var messages = ["<h1>> you and you</h1>", "<h1>> followed only by you</h1>", "<h1>> you'll be the last unviber</h1>", "<h1>> " + obj.followers + " :( [unvibe]</h1>"];
                    }
                }
                if (obj.iFollow == 0) {
                    window.localStorage.setItem("seeProfIFollow", 0);
                    var messages = ["<h1>" + obj.followers + " in the vibe [FOLLOW]</h1>", "<h1>followed by " + obj.followers + "</h1>", "<h1>" + obj.followers + "</h1>", "<h1>" + obj.followers + " [VIBE]</h1>"];
                    if (obj.followers == 0) {
                        var messages = ["<h1>you could be the 1st follower</h1>", "<h1>followed by no one :(</h1>", "<h1>vibe me?</h1>", "<h1>follow..</h1>"];
                    }
                    if (window.localStorage.getItem("loggedAs") == "_allexaa" && obj.seeing == "spacewalkingninja") {
                        var messages = ["<h1>aloha, in the vibe?</h1>", "<h1>aloha, click to follow</h1>", "<h1>not a joke, click to follow</h1>"];
                    }
                }

                myRandSt = getMessage(messages);
                $("#section-two").html(myRandSt);

                if (obj.followsMe == 1) {
                    var messages = ["<h1>> we are working on block...</h1>", "<h1>> follows " + obj.following + " people</h1>", "<h1>> " + obj.following + "</h1>", "<h1>>  in " + obj.followers + " vibes</h1>", "<h1>> in the same vibe</h1>"];
                    if (obj.following == 1) {
                        var messages = ["<h1>we ARE working on block... ></h1>", "<h1>stalks only you ></h1>", "<h1>it is awkward ></h1>", "<h1>follows you and only you <3 ></h1>"];
                    }

                }
                if (obj.followsMe == 0) {
                    var messages = ["<h1>is from a distant galaxy ></h1>", "<h1>follows " + obj.following + " people  ></h1>", "<h1>" + obj.following + ", but not you :/ ></h1>", "<h1> in " + obj.followers + " vibes ></h1>", "<h1>in other vibes ></h1>"];
                    if (obj.following == 0) {
                        var messages = ["<h1>is from a VERY distant galaxy ></h1>", "<h1>follows NO people ></h1>", "<h1>NO ONE! ></h1>", "<h1>not in the vibe ></h1>", "<h1>nah.. ></h1>"];
                    }
                }
                myRandSo = getMessage(messages);
                $("#section-one").html(myRandSo);
                usrDesc = "";
                if (typeof obj.usrDesc != "undefined") {
                    usrDesc = obj.usrDesc
                }
                $("#section-three").html("<h1 style='line-height: 0.9rem;padding: 0.5rem 0;font-size: 0.8rem;'>" + obj.usrDesc + "</h1>");
                $("#section-four").html("<h1> message </h1> ");

                window.localStorage.setItem("forProfile", 1);

                $("#section-one").one('click', function () {
                    if (window.localStorage.getItem("forProfile") == 1) {
                        return false;
                    }
                });
                $("#section-two").one('click', function () {
                    if (window.localStorage.getItem("forProfile") == 1) {
                        seeProfName = window.localStorage.getItem("seeProfName");
                        cFollowers = window.localStorage.getItem("seeProfFollowers");
                        iFollow = window.localStorage.getItem("seeProfIFollow");

                        if (iFollow == 1) {
                            var arr = { canYou: "makeMeUnfollowThem", myName: window.localStorage.getItem("loggedAs"), seeProfile: seeProfName, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform };
                            identify(arr);
                            //console.log("[unfollow]"+seeProfName);
                            var messages = ["<h1>well, you did it..</h1>", "<h1>[[unvibed]]</h1>", "<h1>aye, captain!</h1>", "<h1>bye :(</h1>", "<h1>nah..</h1>"];
                        }
                        if (iFollow == 0) {
                            var arr = { canYou: "letMeFollowThem", myName: window.localStorage.getItem("loggedAs"), seeProfile: seeProfName, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform };
                            identify(arr);
                            var messages = ["<h1>trying..</h1>", "<h1>[[vibing]]</h1>", "<h1>aye, captain!</h1>", "<h1>aloha!</h1>", "<h1>:)</h1>"];

                            if (window.localStorage.getItem("loggedAs") == "_allexaa" && seeProfName == "spacewalkingninja") {
                                var messages = ["<h1>aloha.. is this a joke?</h1>", "<h1>ok, this is a joke</h1>"];
                            }

                            //console.log("[follow]"+seeProfName);
                        }

                        myRandAnswer = getMessage(messages);
                        $("#section-two").html(myRandAnswer);

                        //console.log("trying to follow/unfollow");
                        return false;
                    }
                });
                $("#section-three").one('click', function () {
                    if (window.localStorage.getItem("forProfile") == 1) {
                        return false;
                    }
                });
                $("#section-four").one('click', function () {
                    if (window.localStorage.getItem("forProfile") == 1) {
                        var seeProfName = window.localStorage.getItem("seeProfName");
                        window.localStorage.setItem('history', 'profileMenu');
                        window.localStorage.setItem('historyPMen', seeProfName);

                        $("#infiniteScrollModal").css({ "display": "none" });
                        $("#dasModal").css({ "display": "block" });
                        $('.close').css({ "top": "6.5rem" });

                        $("#dasModal").html("" +
                            "<div class='fSvgResH'>" +
                            "<p class='fSvgResUn'> <br/> </p>" +
                            "<p class='fSvgResCL'> Sending a message to " + seeProfName + "</p> " +
                            "<div id='modalChangeMyDesc' class='feedCommentForm' style='display:block !important;'>" +
                            "<input id='myNewMsg' class='feedCommentInput' type='text' placeholder='" + myRandFubar + "'>" +
                            "<input id='myNewMsgSender' class='feedCommentBtn' type='button' value='> SEND <'>" +
                            "</div> </div> ");

                        $("#myNewMsgSender").click(function () {
                            myMsg = $("#myNewMsg").val();
                            var arr = { canYou: "letMeSendAMsg", myName: window.localStorage.getItem("loggedAs"), myMsg: myMsg, myMsgIsGoingTo: seeProfName, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform };
                            identify(arr);

                            $modal = $('.modal-frame');
                            $overlay = $('.modal-overlay');
                            window.localStorage.setItem("modal", 0);
                            $overlay.removeClass('state-show');
                            $modal.removeClass('state-appear').addClass('state-leave');

                            return false;
                        });

                        //console.log("message");
                        return false;
                    }
                });
                $("#last").one('click', function () {
                    if (window.localStorage.getItem("forProfile") == 1) {
                        return false;
                    }
                });

            }

        }
        if (typeof obj.datPostRes != "undefined") {
            $("#dasModal").html("");
            var arr = obj.datPostRes;

            function getMessage(messages) {
                return messages[Math.floor(Math.random() * messages.length)];
            }
            for (i in arr) {
                theImg = "";
                if (arr[i].fullIPage == 1) {
                    theImg = '<img class="imagesThatAppearInModals" src="' + arr[i].imgpath + '" >';
                }
                $("#dasModal").append("<div class='fSvgResH'>" + theImg + " <p class='fSvgResD' id='mSvgResD" + i + "'> <br/> " + arr[i].idesc + "</p> <p class='fSvgResCL' style='font-size:0.7rem' id='mSvgResCL" + i + "' data-img='" + arr[i].imgpath + "' data-i='" + i + "'>[[ " + arr[i].commentsC + " comments. ]]</p> <div id='modalComments" + i + "' class='feedCommentsHolder'>");


                var carr = arr[i].commentsForUrDelight;
                for (n in carr) {
                    $("#modalComments" + i).append("<p> <span id='mp" + i + "comment" + n + "' data-uname='" + carr[n].commenter + "'>@" + carr[n].commenter + "</span> " + carr[n].comment + "</p>");
                    $("#mp" + i + "comment" + n).click(function () {
                        window.localStorage.setItem("history", "feed");
                        gtlink = $(this).data("uname");
                        $("#profileName").html("<div id='callProfAction' class='arrow' data-seeProf='" + gtlink + "'>@" + gtlink + "</div>");
                        var arr = { canYou: "showMeSomeProfile", myName: window.localStorage.getItem("loggedAs"), seeProfile: gtlink, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform, proffset: 0 };
                        identify(arr);
                        $modal = $('.modal-frame');
                        $overlay = $('.modal-overlay');
                        $overlay.removeClass('state-show');
                        $modal.removeClass('state-appear').addClass('state-leave');
                        return false;

                    })

                }

                $("#dasModal").append("</div> <div id='modalComForm" + i + "' class='feedCommentForm' style='display:block !important;'> <input id='mcfInput" + i + "' class='feedCommentInput' data-i='" + i + "' type='text' placeholder='You can say something!'> <input id='mcfButton" + i + "' data-i='" + i + "' data-img='" + arr[i].imgpath + "' class='feedCommentBtn' type='button' value='> send <'>  </div> </div> ");

                $("#mcfInput" + i).click(function () {
                    window.scrollTo(0, 0);
                })

                $("#mSvgResD" + i).shorten();

                if (arr[i].commentsC == 0) {
                    var messages = ["[[nothing yet]]", "[[Error 404]]", "[[No comments yet :(]]", "[[Be the first to comment this!]]", "[[Nobody has said anything yet!]]", "[[So, what do you think :) ?]]"];
                    myRandRet = getMessage(messages);
                    $("#mSvgResCL" + i).html("[[" + myRandRet + "]]");
                }
                if (arr[i].commentsC == 1) {
                    var messages = ["[[1 comment!]]", "[[Hurry, you can be the second!]]", "[[Somebody wrote something!]]", "[[There's exactly 1 comment!]]", "[[At least 1 comment!]]", "[[0 Comments!.. 1 Now!]]"];
                    myRandRet = getMessage(messages);
                    $("#mSvgResCL" + i).html("[[" + myRandRet + "]]");
                }

                theLevel = "";
                if (typeof arr[i].yourMark != "undefined") {
                    theLevel = "level" + arr[i].yourMark;
                }


                if (arr[i].feedUName !== window.localStorage.getItem("loggedAs")) {
                    warningIcon = "<span class='circleSpanBase csbWarning' data-img='" + arr[i].imgpath + "' id='anotherKindOfAlertOurTeamAbout" + i + "'></span>";
                }
                else {
                    warningIcon = "<span class='circleSpanBase csbDeleteLocked' data-img='" + arr[i].imgpath + "' id='thisIsTheDeleteButtonNumber" + i + "'></span>";
                }

                $("#mSvgResCL" + i).append(warningIcon + "<span class='circleSpanCounter " + theLevel + "' id='feedCsp" + theLevel + "' data-postPh='" + arr[i].imgpath + "'>" + arr[i].totalVibes + "</span>");

                $("#thisIsTheDeleteButtonNumber" + i).click(function () {
                    if ($(this).hasClass('csbDeleteUnlocked')) {
                        imgImAlerting = $(this).data("img");
                        theImg = imgImAlerting.substring(imgImAlerting.lastIndexOf('/') + 1);
                        var arr = { canYou: "wellYeahIWantUToUndoMyShit", myName: window.localStorage.getItem("loggedAs"), postImage: theImg, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform };
                        identify(arr);
                        $modal = $('.modal-frame');
                        $overlay = $('.modal-overlay');
                        window.localStorage.setItem("modal", 0);
                        $overlay.removeClass('state-show');
                        $modal.removeClass('state-appear').addClass('state-leave');
                    }
                    if ($(this).hasClass('csbDeleteLocked')) {
                        $(this).addClass('csbDeleteUnlocked');
                        $(this).removeClass('csbDeleteLocked');
                    }
                    //console.log("delClicked!");
                });


                $("#anotherKindOfAlertOurTeamAbout" + i).click(function () {
                    imgImAlerting = $(this).data("img");
                    theImg = imgImAlerting.substring(imgImAlerting.lastIndexOf('/') + 1);
                    var arr = { canYou: "listenToMeCarefully", myName: window.localStorage.getItem("loggedAs"), postImage: theImg, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform };
                    identify(arr);
                });

                $("#postEyeSee" + i).click(function () {
                    imgIWannaSee = $(this).data("img");

                    var img = document.createElement("IMG");
                    img.src = imgIWannaSee;
                    $('#picViewerFull').html(img);

                    $('#picViewerFull').show().delay(5000).queue(function (n) {
                        $('#picViewerFull').hide();
                        n();
                    });

                    //console.log("you are trying to see "+imgIWannaSee)
                })

                if (arr[i].feedUName !== window.localStorage.getItem("loggedAs")) {
                    $("#mSvgResCL" + i).append("<input type='button' id='lbutton" + i + "' data-i='" + arr[i].imgpath + "' class='hrtButton'>");

                    $("#lbutton" + i).bind('touchstart mousedown', function (event) {
                        $(".mood-listitem").removeClass('active');
                        var obj = event.target;
                        obj = $(this);
                        // | great thingie by mboeckle / khanhvdv
                        //http://stackoverflow.com/questions/12925585/get-element-on-touchstart
                        $("#thatThing").css({ "display": "block" });
                        $("#header").css({ "display": "none" });

                        window.localStorage.setItem("gonnaVoteFor", $(this).data("i").substring($(this).data("i").lastIndexOf('/') + 1));
                        getThatThingOutOfThere();
                        window.localStorage.setItem("history", "thatThing");

                        event.preventDefault();
                        return false;
                    });

                }

                $("#mcfButton" + i).click(function () {
                    ifuri = $(this).data("img");
                    gbt = $(this).data("i");
                    commentVal = $("#mcfInput" + gbt).val();
                    iname = ifuri.substring(ifuri.lastIndexOf('/') + 1);
                    if (commentVal.replace(/\s/g, '').length) {
                        var arr = { canYou: "letMeCommentAPost", myName: window.localStorage.getItem("loggedAs"), postImage: iname, myComment: commentVal, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform, gbt: 150000000 };
                        identify(arr);
                        $("#mcfInput" + gbt).val("");
                        $("#modalComments" + gbt).append("<p> <span>@" + window.localStorage.getItem("loggedAs") + "</span> " + commentVal + "</p>");
                    }
                });

            }
        }

        if (typeof obj.vibeOMeter != "undefined") {
            $("#header").css({ "display": "block" });
            s = Snap("#header");
            pulsar = s.select('#pulsar');

            if (obj.vibeOMeter == 0) {
                pulsar.attr({ "stroke": "#003440" });
            }
            if (obj.vibeOMeter == 1) {
                pulsar.attr({ "stroke": "#07aeb0" });
            }
            if (obj.vibeOMeter == 2) {
                pulsar.attr({ "stroke": "#1acf80" });
            }
            if (obj.vibeOMeter == 3) {
                pulsar.attr({ "stroke": "#73de3f" });
            }
            if (obj.vibeOMeter == 4) {
                pulsar.attr({ "stroke": "#b7f808" });
            }
            if (obj.vibeOMeter == 5) {
                pulsar.attr({ "stroke": "#f8ea08" });
            }
            if (obj.vibeOMeter == 6) {
                pulsar.attr({ "stroke": "#f1ab00" });
            }
            if (obj.vibeOMeter == 7) {
                pulsar.attr({ "stroke": "#f77a0c" });
            }
            if (obj.vibeOMeter == 8) {
                pulsar.attr({ "stroke": "#b80808" });
            }
            if (obj.vibeOMeter == 9) {
                pulsar.attr({ "stroke": "#bd2867" });
            }
            if (obj.vibeOMeter == 10) {
                pulsar.attr({ "stroke": "#a91bb0" });
            }

        }


        if (typeof obj.uCanDiscoverThemPpz != "undefined") {
            //console.log("notifications toglged");
            window.localStorage.setItem("history", "notifications");
            var arr = obj.uCanDiscoverThemPpz;
            $vibes = $("#vibes");
            $vibes.html("");


            for (i in arr) {
                $vibes.append("" +
                    "<div class='notifHolder' id='potif" + i + "' data-raction='1' data-actionTo='" + arr[i].themUserNamz + "'>" +
                    "<div class='notifPPHolder'> <div class='cropSRes' id='notifProfileP" + i + "'> </div> </div>" +
                    "<p>" + arr[i].themUserNamz + " <br/> " + arr[i].themReelzNamz + " " +
                    "</p> </div>")
                $("#notifProfileP" + i).css({ "background-image": 'url("' + arr[i].avatar + '")' });

                $("#potif" + i).click(function () {
                    window.localStorage.setItem("history", "notifications");
                    //PROFILES

                    //console.log("got here")
                    var seekProfile = $(this).data("actionto");
                    $("#profileName").html("<div id='callProfAction' class='arrow' data-seeProf='" + seekProfile + "'>@" + seekProfile + "</div>");
                    $("#callProfAction").click(function () {
                        seeProf = seekProfile;
                        callDaProfileMenu(seeProf);
                        //console.log(seeProf);
                    }
                    );
                    var arr = { canYou: "showMeSomeProfile", myName: window.localStorage.getItem("loggedAs"), seeProfile: seekProfile, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform, proffset: 0 };
                    identify(arr);
                    $("#vibes").css({ "display": "none" });
                    $("#profile").css({ "display": "block" });


                    // POSTS


                    //TO DO!

                });


            }
        }

        if (typeof obj.notifRes != "undefined") {
            //console.log("notifications toglged");
            var arr = obj.notifRes;
            $vibes = $("#vibes");
            $vibes.html("");
            $vibes.append("" +
                "<div class='notifHolder' id='discoverPplzClickable' >" +
                "<p style='width:100% !important; margin: 0.5rem auto !important;'> Discover people? <br/> </p>" +
                "</div>");
            $("#discoverPplzClickable").click(function () {
                window.localStorage.setItem("history", "notifications");
                //PROFILES

                //console.log("got here")

                //                $("#profileName").html("<div id='callProfAction' class='arrow' data-seeProf='"+seekProfile+"'>@"+seekProfile+"</div>");
                //                $("#callProfAction").click (function(){
                //                  seeProf = seekProfile;
                //                  callDaProfileMenu(seeProf);
                //                  console.log(seeProf);
                //                });
                var arr = { canYou: "makeMeDiscoverPpz", myName: window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform };
                identify(arr);
                $("#vibes").css({ "display": "block" });
            });


            for (i in arr) {
                $vibes.append("" +
                    "<div class='notifHolder' id='notif" + i + "' data-raction='" + arr[i].isUsableFor + "' data-actionTo='" + arr[i].withThis + "'>" +
                    "<div class='notifPPHolder'> <div class='cropSRes' id='notifProfileP" + i + "'> </div> </div>" +
                    "<p>" + arr[i].nText + " <br/>" +
                    "<time class='timeago' datetime='" + arr[i].notifOn + "'>" + arr[i].on + "</time>" +
                    "</p> </div>")
                $("#notifProfileP" + i).css({ "background-image": 'url("https://kollaj.net/uploads/' + arr[i].notifImage + '")' });

                $("#notif" + i).click(function () {
                    window.localStorage.setItem("history", "notifications");
                    //PROFILES
                    if ($(this).data("raction") == 1) {
                        //console.log("got here")
                        var seekProfile = $(this).data("actionto");
                        $("#profileName").html("<div id='callProfAction' class='arrow' data-seeProf='" + seekProfile + "'>@" + seekProfile + "</div>");
                        $("#callProfAction").click(function () {
                            seeProf = seekProfile;
                            callDaProfileMenu(seeProf);
                            //console.log(seeProf);
                        }
                        );
                        var arr = { canYou: "showMeSomeProfile", myName: window.localStorage.getItem("loggedAs"), seeProfile: seekProfile, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform, proffset: 0 };
                        identify(arr);
                        $("#vibes").css({ "display": "none" });
                        $("#profile").css({ "display": "block" });
                    }

                    // POSTS
                    if ($(this).data("raction") == 3 || $(this).data("raction") == 2)
                        bringInThePostSeeWindow($(this).data("actionto"));
                });

                //TO DO!

            }
            jQuery("time.timeago").timeago();

        }

        if (typeof obj.feedRes != "undefined") {
            var arr = obj.feedRes;

            function calcDistance(x1, y1, x2, y2) {
                return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
            }
            document.getElementById("feedRes").innerHTML = "";
            // found on stack @http://stackoverflow.com/questions/31825807/how-do-i-clear-an-snap-svg-canvus-after-snap-load by Lin Yuan

            //Crossbrowser window Width
            var width = document.getElementById("feedRes").clientWidth;
            //Crossbrowser window Height
            //Clear everything beforehand
            $("#feedRes").html("");
            var i = 0;
            function welderEmbeddedFP(ih, iw, ix, iy, iURI, m1, m2, ang, scl, itx, ity, i, feedUname) {
                var height = document.getElementById("FeedSVG" + i).clientHeight;
                var s = Snap("#FeedSVG" + i);
                s.clear();//just add this piece of magic....
                var myImg = s.image(iURI, ix, iy, iw, ih);
                var mask1 = s.path(m1).attr({ fill: "white" });
                var mask2 = s.path(m2).attr({ fill: "white" });
                var maskGroups = s.group()

                maskGroups.add(mask1);
                maskGroups.attr({ fill: "white" });

                finalGroup = s.group(maskGroups, myImg);

                myImg.attr({ mask: maskGroups })
                maskGroups.attr({ mask: mask2 });

                maxWidth = width;
                scaleF = maxWidth / iw;
                lftDis = itx * scaleF;
                topDis = ity * scaleF;
                absXCenter = (width / 2);
                absYCenter = (height / 2);

                var bb = finalGroup.getBBox();
                var diffX = absXCenter - bb.cx;
                var diffY = absYCenter - bb.cy;

                finalGroup.transform('T' + diffX + ',' + diffY + 'S' + scaleF + 'R' + ang);

                moveGroup = s.group(finalGroup);

                var bb = moveGroup.getBBox();
                moveGroup.attr({ id: "fg" + i });
                //M10 10 H 90 V 90 H 10 L 10 10
                moveGroup.attr({ "data-img": iURI })
                moveGroup.attr({ class: "gardar" });

                if (feedUname !== window.localStorage.getItem("loggedAs")) {
                    var tapped = false;
                    var pressTimer = "";
                    $("#fg" + i).bind('touchstart mousedown', function (event) {
                        gnStartX = event.pageX;
                        gnStartY = event.pageY;
                        if (gnStartX == null) {
                            gnStartX = event.touches[0].pageX;
                            gnStartY = event.touches[0].pageY;
                        }

                        // http://stackoverflow.com/questions/24058241/touch-device-single-and-double-tap-events-handler-jquery-javascript
                        if (!tapped) { //if tap is not set, set up single tap
                            tapped = setTimeout(function () {
                                tapped = null
                                //insert things you want to do when single tapped
                            }, 300);   //wait 300ms then run single click code
                        } else {    //tapped within 300ms of last tap. double tap
                            clearTimeout(tapped); //stop single tap callback
                            tapped = null;
                            //console.log("doubleTap! @"+gnStartX+","+gnStartY+" and "+$(this).data("img"));
                            //insert things you want to do when double tapped
                        }

                        pressTimer = window.setTimeout(function () {
                            window.localStorage.setItem("gonnaVoteFor", iURI.substring(iURI.lastIndexOf('/') + 1));
                            $("#thatThing").css({ "display": "block" });
                            $("#header").css({ "display": "none" });
                            getThatThingOutOfThere();
                            window.localStorage.setItem("history", "thatThing");
                        }, 450)
                    });
                    $("#fg" + i).bind('touchmove mousemove', function (event) {
                        gnEndX = event.pageX;
                        gnEndY = event.pageY;
                        if (gnEndX == null) {
                            gnEndX = event.touches[0].pageX;
                            gnEndY = event.touches[0].pageY;
                        }

                        if (calcDistance(gnStartX, gnStartY, gnEndX, gnEndY) > 20) {
                            //console.log(gnStartX+","+gnStartY+"\n"+gnEndX+","+gnEndY);
                            //console.log(">20pxMove, cancel")
                            clearTimeout(pressTimer);
                        }

                    });
                    $("#fg" + i).bind('touchend touchcancel mouseup', function (event) {
                        clearTimeout(pressTimer);
                    });
                }
                return false;
            }

            function getMessage(messages) {
                return messages[Math.floor(Math.random() * messages.length)];
            }

            for (i in arr) {
                theLevel = "";
                if (typeof arr[i].yourMark != "undefined") {
                    theLevel = "level" + arr[i].yourMark;
                }
                //feed
                counter = "<span class='circleSpanCounter " + theLevel + "' id='postCsp" + i + "' data-postPh='" + arr[i].imgpath + "'>" + arr[i].totalVibes + "</span> ";

                sfimg = arr[i].fullIPage;
                if (sfimg == 1) {
                    eyeIcon = "<span class='circleSpanBase csbEye' id='feedEyeSee" + i + "' data-img='" + arr[i].imgpath + "'> </span>";

                }

                if (sfimg == 0) {
                    eyeIcon = "<span class='circleSpanBase csbEye-Off'> </span>";
                }
                if (arr[i].feedUName !== window.localStorage.getItem("loggedAs")) {
                    warningIcon = "<span class='circleSpanBase csbWarning' data-img='" + arr[i].imgpath + "' id='alertOurTeamAbout" + i + "'></span>";
                }
                else {
                    warningIcon = "";
                }
                icons = counter + " " + eyeIcon;
                $("#feedRes").append("<div class='fSvgResH'><svg id='FeedSVG" + i + "' class='feedSvgItem' data-img='" + arr[i].imgpath + "'></svg> <p class='fSvgResUn'>" + warningIcon + " <span id='frSvgResUn" + i + "' data-uname='" + arr[i].feedUName + "'>@" + arr[i].feedUName + "</span> " + icons + " </p> <p class='fSvgResD' id='fSvgResD" + i + "'> " + arr[i].idesc + "</p> <p class='fSvgResCL' id='fSvgResCL" + i + "' data-img='" + arr[i].imgpath + "' data-i='" + i + "'>[[ " + arr[i].commentsC + " comments. ]]</p> <div id='feedComments" + i + "' class='feedCommentsHolder'></div> <div id='feedComForm" + i + "' class='feedCommentForm'> <input id='fcfInput" + i + "' class='feedCommentInput' data-i='" + i + "' type='text' placeholder='You can say something!'> <input id='fcfButton" + i + "' data-i='" + i + "' data-img='" + arr[i].imgpath + "' class='feedCommentBtn' type='button' value='> send <'>  </div> </div> ");
                $("#postCsp" + i).click(function () {
                    imgImRequing = $(this).data("postph");
                    theImg = imgImRequing.substring(imgImRequing.lastIndexOf('/') + 1);
                    var arr = { canYou: "letMeBeSneaky", myName: window.localStorage.getItem("loggedAs"), postImage: theImg, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform };
                    identify(arr);
                    $('#vibeView').css({ "display": "block" });
                    window.localStorage.setItem("history", "feed");

                });

                $("#fSvgResD" + i).shorten();

                $("#alertOurTeamAbout" + i).click(function () {
                    imgImAlerting = $(this).data("img");
                    theImg = imgImAlerting.substring(imgImAlerting.lastIndexOf('/') + 1);
                    var arr = { canYou: "listenToMeCarefully", myName: window.localStorage.getItem("loggedAs"), postImage: theImg, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform };
                    identify(arr);
                    window.localStorage.setItem("history", "feed");
                });

                $("#feedEyeSee" + i).click(function () {
                    imgIWannaSee = $(this).data("img");

                    var img = document.createElement("IMG");
                    img.src = imgIWannaSee;
                    $('#picViewer').html(img);
                    $('#feedRes').css({ "opacity": "0" });
                    $('#searchF').css({ "opacity": "0" });
                    $('#picViewer').show().delay(5000).queue(function (n) {
                        window.localStorage.setItem("history", "feed");
                        $('#picViewer').hide();
                        $('#feedRes').css({ "opacity": "1" });
                        $('#searchF').css({ "opacity": "1" });
                        n();
                    });

                    //console.log("you are trying to see "+imgIWannaSee)
                })

                if (arr[i].commentsC == 0) {
                    var messages = ["[[nothing yet]]", "[[Error 404]]", "[[No comments yet :(]]", "[[Be the first to comment this!]]", "[[Nobody has said anything yet!]]", "[[So, what do you think :) ?]]"];
                    myRandRet = getMessage(messages);
                    $("#fSvgResCL" + i).html(myRandRet);
                }
                if (arr[i].commentsC == 1) {
                    var messages = ["[[1 comment!]]", "[[Hurry, you can be the second!]]", "[[Somebody wrote something!]]", "[[There's exactly 1 comment!]]", "[[At least 1 comment!]]", "[[0 Comments!.. 1 Now!]]"];
                    myRandRet = getMessage(messages);
                    $("#fSvgResCL" + i).html(myRandRet);
                }

                $("#fcfButton" + i).click(function () {
                    ifuri = $(this).data("img");
                    gbt = $(this).data("i");
                    commentVal = $("#fcfInput" + gbt).val();
                    if (commentVal.replace(/\s/g, '').length) {
                        iname = ifuri.substring(ifuri.lastIndexOf('/') + 1);
                        $("#fcfInput" + gbt).val("");
                        var arr = { canYou: "letMeCommentAPost", myName: window.localStorage.getItem("loggedAs"), postImage: iname, myComment: commentVal, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform, gbt: gbt };
                        identify(arr);
                    }

                });

                $("#frSvgResUn" + i).click(function () {
                    gtlink = $(this).data("uname");
                    $("#profileName").html("<div id='callProfAction' class='arrow' data-seeProf='" + gtlink + "'>@" + gtlink + "</div>");
                    var arr = { canYou: "showMeSomeProfile", myName: window.localStorage.getItem("loggedAs"), seeProfile: gtlink, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform, proffset: 0 };
                    identify(arr);
                    return false;
                })

                $("#fSvgResCL" + i).click(function () {
                    ifuri = $(this).data("img");
                    gbt = $(this).data("i");
                    iname = ifuri.substring(ifuri.lastIndexOf('/') + 1);

                    if ($("#feedComments" + gbt).data("toggled") == 1) {
                        $("#feedComForm" + gbt).slideToggle();
                        $("#feedComments" + gbt).slideToggle();
                        $("#feedComments" + gbt).data("toggled", 0)
                    }
                    else {
                        var arr = { canYou: "giveMeTheCommentsOfThisPost", myName: window.localStorage.getItem("loggedAs"), postImage: iname, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform, gbt: gbt };
                        identify(arr);
                    }
                    return false;
                });
                welderEmbeddedFP(arr[i].imgH, arr[i].imgW, arr[i].imgX, arr[i].imgY, arr[i].imgpath, arr[i].mask1, arr[i].mask2, arr[i].angle, arr[i].scale, arr[i].tx, arr[i].ty, i, arr[i].feedUName);
            }
            croffset = window.localStorage.getItem("roffset");
            croffset++;
            croffset = window.localStorage.setItem("roffset", croffset);

            function getMessage(messages) {
                return messages[Math.floor(Math.random() * messages.length)];
            }

            var nDescStrng = ["I Want More", "nah, not enough", "MORE!", "[[click here for more]]", "this is where you click", "**kollaj is a meme**", "just tap here", "DO NOT PRESS THE BUTTON"];
            myRandFubar = getMessage(nDescStrng);

            $("#feedRes").append("<div id='growMyFeed' class='fSvgResH'> <p class='fSvgResUn'> " + myRandFubar + " </p> </div>");
            $("#growMyFeed").click(function () {
                var arr = { canYou: "showMeMyFeed", myName: window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform, roffset: window.localStorage.getItem("roffset") };
                identify(arr);
            })

        }

        if (typeof obj.thePpzDatVibedDatCut != "undefined") {
            hist = window.localStorage.getItem("history");
            if (hist == "feed") {
                $("#feedRes").css({ "display": "none" });
                $appendable = $("#vibeView");
                $appendable.html("");
                arr = obj.thePpzDatVibedDatCut;
                for (i in arr) {
                    $appendable.append("" +
                        "<div class='notifHolder' id='usrVibedPostRes" + i + "' data-openuser='" + arr[i].vibedBy + "'>" +
                        "  <div class='notifPPHolder'>" +
                        "    <div class='cropSRes' id='usrVibedPostResImg" + i + "' > </div>" +
                        "  </div>" +
                        "  <p>@" + arr[i].vibedBy + "</p>" +
                        "</div>");

                    $("#usrVibedPostResImg" + i).css({ "background-image": "url('https://kollaj.net/uploads/" + arr[i].usrAvatar + "')" });

                    // child: searchResCLICK
                    $("#usrVibedPostRes" + i).click(function () {
                        var seekProfile = $(this).data("openuser");
                        //console.log(seekProfile);
                        $("#profileName").html("<div id='callProfAction' class='arrow' data-seeProf='" + seekProfile + "'>@" + seekProfile + "</div>");
                        $("#callProfAction").click(function () {
                            seeProf = seekProfile;
                            callDaProfileMenu(seeProf);
                        });
                        var arr = { canYou: "showMeSomeProfile", myName: window.localStorage.getItem("loggedAs"), seeProfile: seekProfile, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform, proffset: 0 };
                        identify(arr);
                        $("#profile").css({ "display": "block" });
                        $("#vibeView").css({ "display": "none" });
                        $("#feed").css({ "display": "none" });
                    });

                }
            }
        }

        if (typeof obj.seeRes != "undefined") {



            var arr = obj.seeRes;
            var dataArray = new Array;
            for (var o in arr) {
                dataArray.push(arr[o]);
            }
            $("#feed").css({ "display": "none" });
            $("#profile").css({ "display": "block" });

            $("#profileName").html("<div id='callProfAction' class='arrow' data-seeProf='" + obj.seeing + "'>@" + obj.seeing + "</div>");

            $("#callProfAction").click(function () {
                seeProf = obj.seeing;
                callDaProfileMenu(seeProf);
                //console.log(seeProf);
            }
            );

            $("#profileFollowing").html(obj.following);
            $("#profileFollowers").html(obj.followers);

            if (obj.iFollow == 1) {
                $("#profileFollowers").data("uname", obj.seeing)
                $("#profileFollowers").data("iFollow", obj.iFollow);
                $("#profileFollowers").css({ "background": "rgba(100, 149, 237, 0.7)" })
                $("#profileFollowers").css({ "color": "ghostwhite" })
            }
            if (obj.iFollow == 0) {
                $("#profileFollowers").data("uname", obj.seeing);
                $("#profileFollowers").data("iFollow", obj.iFollow);
                $("#profileFollowers").css({ "background": "white" })
                $("#profileFollowers").css({ "color": "#003440" })
            }
            if (obj.followsMe == 1) {
                $("#profileFollowing").data("uname", obj.seeing)
                $("#profileFollowing").data("followsMe", obj.followsMe);
                $("#profileFollowing").css({ "background": "rgba(193, 4, 53, 0.7)" })
                $("#profileFollowing").css({ "color": "ghostwhite" })
            }
            if (obj.followsMe == 0) {
                $("#profileFollowing").data("uname", obj.seeing);
                $("#profileFollowing").data("followsMe", obj.followsMe);
                $("#profileFollowing").css({ "background": "white" })
                $("#profileFollowing").css({ "color": "#003440" })
            }

            if (obj.seeingSame == 1) {
                var karr = { canYou: "getMyKollajDistance", myName: window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid };
                identify(karr);
            }


            if (obj.seeingSame < 1) {
                //  console.log("not ur p");
                $("#profileFollowing").click(function () {
                    seekProfile = $(this).data("uname");
                    followsMe = $(this).data("followsMe");
                    if (followsMe == 1) {
                        var arr = { canYou: "showMeWhoDoTheyFollow", myName: window.localStorage.getItem("loggedAs"), seeProfile: seekProfile, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform };
                        identify(arr);
                        //              $("#profile").css({"display":"block"});
                    }
                    return false;
                });
                $("#profileFollowers").one('click', function () {
                    seekProfile = $(this).data("uname");
                    iFollow = $(this).data("iFollow");
                    if (iFollow == 1) {
                        var arr = { canYou: "makeMeUnfollowThem", myName: window.localStorage.getItem("loggedAs"), seeProfile: seekProfile, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform };
                        identify(arr);

                        //              $("#profile").css({"display":"block"});
                    }
                    if (iFollow == 0) {
                        var arr = { canYou: "letMeFollowThem", myName: window.localStorage.getItem("loggedAs"), seeProfile: seekProfile, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform };
                        identify(arr);

                        //              $("#profile").css({"display":"block"});
                    }
                    return false;
                });
            }

            function calcDistance(x1, y1, x2, y2) {
                return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
            }
            $("#profileSVG").css({ "height": "100%" });
            document.getElementById("profileSVG").innerHTML = "";
            window.localStorage.setItem("originalHeight", document.getElementById("profileSVG").clientHeight);
            var OHght = window.localStorage.getItem("originalHeight");




            var s = Snap("#profileSVG");
            s.clear();//just add this piece of magic....
            // found on stack @http://stackoverflow.com/questions/31825807/how-do-i-clear-an-snap-svg-canvus-after-snap-load by Lin Yuan


            //Crossbrowser window Width
            var width = document.getElementById("profileSVG").clientWidth;
            //Crossbrowser window Height
            var height = document.getElementById("profileSVG").clientHeight;


            var sprivate = 1;
            var text = s.text(30, 50, "This Kollaj is private.");
            var text2 = s.text(30, 90, "Try following them ;) !");
            text.attr({
                'font-size': "1.5rem"
            });
            text2.attr({
                'font-size': "1.5rem"
            });
            var cordx = new Array;
            var cordy = new Array;
            var cordI = new Array;
            var i = 0;
            var lasTopDis = 0;
            function welderEmbeddedSP(ih, iw, ix, iy, iURI, m1, m2, ang, scl, itx, ity) {
                var OHght = window.localStorage.getItem("originalHeight");
                var myImg = s.image(iURI, ix, iy, iw, ih);
                var mask1 = s.path(m1).attr({ fill: "white" });
                var mask2 = s.path(m2).attr({ fill: "white" });
                var maskGroups = s.group()

                maskGroups.add(mask1);
                maskGroups.attr({ fill: "white" });

                finalGroup = s.group(maskGroups, myImg);

                myImg.attr({ mask: maskGroups })
                maskGroups.attr({ mask: mask2 });

                maxWidth = width - (width / 9);
                scaleF = maxWidth / iw;
                lftDis = itx * scaleF;
                topDis = ity * scaleF;
                absXCenter = (width / 2);
                absYCenter = (OHght / 2);

                if (lasTopDis < topDis) {
                    lasTopDis = topDis;
                }

                var bb = finalGroup.getBBox();
                var diffX = absXCenter - bb.cx;
                var diffY = absYCenter - bb.cy;

                finalGroup.transform('T' + diffX + ',' + diffY + 'S' + scaleF + 'R0');

                moveGroup = s.group(finalGroup).attr({ style: "border:3px solid white" });
                //          console.log("first move, follow secondmove");
                moveGroup.transform('t' + lftDis + ',' + topDis + 's' + scl + 'r' + ang);

                if (i == obj.seeRes.length - 1) {
                    nH = parseInt(lasTopDis) + 780;
                    window.localStorage.setItem("profileSVGHeight", nH);
                    $("#profileSVG").css({ "height": nH + "px" });
                    //console.log("puttint it @"+nH);
                    if (i > 13) {
                        var textSm = s.text(30, (lasTopDis + 400), "click to load more..");
                        textSm.attr({
                            'font-size': "1.5rem",
                            'stroke': 'white',
                            'strokeWidth': 1,
                            'id': "loadMoreSProfile"
                        });
                        $("#loadMoreSProfile").click(function () {
                            var arr = { canYou: "showMeSomeProfile", myName: window.localStorage.getItem("loggedAs"), seeProfile: obj.seeing, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform, proffset: obj.proffset };
                            identify(arr);
                        });

                    }
                }

                /*
                moveGroup.click(function(evt){
                pt.x = evt.clientX;
                pt.y = evt.clientY;
                console.log(pt.x + "\n"+pt.y )
                /                  seekProfile = $(this).data("uname");
                $("#profileName").html("@"+seekProfile);
                var arr = {canYou:"showMeSomeProfile", myName:window.localStorage.getItem("loggedAs"), seeProfile: seekProfile, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform};
                identify(arr);
                $("#profile").css({"display":"block"});
                /
                console.log(this.data("img"));
                return false;
                });
                */

                if (i == 0) {
                    moveGroup.remove()
                    //    document.getElementById("whereuputurppic").innerHTML = "";
                    $("#whereuputurppic").css({ "background-image": 'url("' + iURI + '")' });
                }
                else {
                    var bb = moveGroup.getBBox();
                    moveGroup.attr({ id: "g" + i });
                    //M10 10 H 90 V 90 H 10 L 10 10
                    moveGroup.attr({ "data-img": iURI })
                    moveGroup.attr({ class: "gardar" });

                    cordx.push(bb.cx);
                    cordy.push(bb.cy);

                    iname = iURI.substring(iURI.lastIndexOf('/') + 1);
                    cordI.push(iname);


                    if (obj.seeingSame < 1) {


                    }

                }

                if (iw > 0) { sprivate = 0; }
                if (sprivate < 1) {
                    text.remove();
                    text2.remove();
                }
                //          console.log("in place!?");

                return false;
            }


            for (i in arr) {
                welderEmbeddedSP(arr[i].imgH, arr[i].imgW, arr[i].imgX, arr[i].imgY, arr[i].imgpath, arr[i].mask1, arr[i].mask2, arr[i].angle, arr[i].scale, arr[i].tx, arr[i].ty);
            }
            commentsPoint = new Array;
            for (n in cordx) {
                commentsPoint[n] = s.circle(cordx[n], cordy[n], 25).attr({ fill: "rgba(255,255,255, 0.05)" });
                commentsPoint[n].attr({
                    stroke: "rgba(255,255, 255,0.4)",
                    strokeWidth: 2,
                    strokeDasharray: 4
                })
                commentsPoint[n].attr({ "data-img": cordI[n] });
                commentsPoint[n].attr({ "id": "profileCommPtL" + n })
                commentsPoint[n].click(
                    function () {
                        window.localStorage.setItem("history", "smProfile");
                        bringInThePostSeeWindow(this.attr("data-img"));
                    }
                );
            }





            var myNewHeight = window.localStorage.getItem("profileSVGHeight");

            if (sprivate != "0") {
                var myNewHeight = window.localStorage.getItem("originalHeight");
            }

            //console.log ("got here but"+ myNewHeight+"px aint enough OR, sprivate is "+sprivate);

            $("#profileSVG").css({ "height": myNewHeight + "px" });

        }

        if (obj.searchResult !== "") {
            var arr = obj.searchResult;
            var dataArray = new Array;
            for (var o in arr) {
                dataArray.push(arr[o]);
            }

            $("#searchRes").html("");

            for (i in dataArray) {
                $("#searchRes").append(" <div id='searchRes" + i + "' class='srid' data-uname='" + dataArray[i].username + "' >   <div class='pinfo'>" + dataArray[i].name + " <span class='psm'> @" + dataArray[i].username + " </span> </div>   <div class='searchResCnt'> <div class='cropSRes' id='cropSRes" + i + "'></div></div></div>");
                $("#cropSRes" + i).css({ "background-image": "url('" + dataArray[i].avatar + "')" });
                $("#cropSRes" + i).addClass("cropSRes");
            }

            // child: searchResCLICK
            $(".srid").click(function () {
                window.localStorage.setItem("history", "search");
                var seekProfile = $(this).data("uname");
                $("#profileName").html("<div id='callProfAction' class='arrow' data-seeProf='" + seekProfile + "'>@" + seekProfile + "</div>");

                $("#callProfAction").click(function () {
                    seeProf = seekProfile;
                    callDaProfileMenu(seeProf);
                    //console.log(seeProf);
                }
                );
                var arr = { canYou: "showMeSomeProfile", myName: window.localStorage.getItem("loggedAs"), seeProfile: seekProfile, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform, proffset: 0 };
                identify(arr);
                $("#profile").css({ "display": "block" });
            });

            return false;
        }

        if (obj.userAddError == 'addUser') {
        }

        if (obj.emailAddError == 'addEmail') {
        }

        if (obj.urFeeling == 'daNewGenerationArtisticShit') {
            window.localStorage.setItem("username", obj.urArtistName);
            //console.log(window.localStorage.getItem("sessHash"));
            location.reload();
        }
    }
    var result = "undefined";
    var saveData = $.ajax({
        type: "POST",
        url: "https://kollaj.net/bouncer.php",
        data: JSON.stringify(arr),
        dataType: "json",
        contentType: 'application/json',
        success: function (resultData) {
            var obj = resultData;
            actionCall(obj);
        }
    });

};