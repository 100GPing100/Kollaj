/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

//        admob.initAdmob("ca-app-pub-5520633259009545/7928666319","ca-app-pub-5520633259009545/7928666319");

        jQuery(document).ready(function() {
          jQuery("time.timeago").timeago();
        });

        var vTimeOut;

        window.localStorage.setItem("roffset", 0);
        window.localStorage.setItem("iAlreadyGotMyPermission", 0);
        window.localStorage.setItem("modal",0);

        var emailSecondPass = 0;

        // function identify(arr) -> identify.js

        //before anything else, logins
        // and registrations
        //regs first
        // but actually, we first verify if the user wasnt already logged in
        if (window.localStorage.getItem("loggedAs") !== null)
        {
        var arr = {canYou:"makeSureMeIsNotMiniMe", myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), devUuid: device.uuid, devModel: device.version, devPlatform:device.platform};
        identify(arr);
        }


        //defining variables
        var emailPass=0;
        var userPass=0;
        var pwPass=0;
        var tosCheck=0;

        // with some regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        function validateEmail(email) {
                var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            //if(re.test(email) && dbValEmail(myMail))
            if(re.test(email))
            { return true; }
            else
            { return false; }
        }
        // checkUp eMail @DB
        function dbValEmail (email)
        {
          var arr = {canYou:"emailCheck", myMail:email};
          identify(arr)
        }
        // checkUp userName @DB
        function dbValUname (uname)
        {
          var arr = {canYou:"userCheck", myName:uname};
          identify(arr)
          var re = /^@?([a-zA-Z0-9_]){1,17}$/;
          if (re.test(uname)) {
              return true
          }
          else {
              return false
          }
        }
        //emailPass
        $("#registerEmail").on("change paste keyup", function() {
           myMail=($(this).val());
            if(validateEmail(myMail))
            {
              dbValEmail(myMail)
              $(this).css({background:"rgba(0,255,0,0.4)"})
              emailPass=1;
            }
            else {
              $(this).css({background:"rgba(255,0,0,0.4)"})
              emailPass=0;
            }
        });
        //userPass
        $("#registerName").on("change paste keyup", function() {
           if( $("#registerName").val().length > 3 && dbValUname($(this).val()) ) {
             myUsername=($(this).val());
             userPass=1;
             $("#registerName").css({background:"rgba(0,255,0,0.4)"});
            }
            else {
              userPass=0;
              $("#registerName").css({background:"rgba(255,0,0,0.4)"})
            }
         });

         //pwPass
         $("#registerPassword").on("change paste keyup", function() {
            if( $("#registerPassword").val().length > 5) {
              myPass=($(this).val());
              pwPass=1;
              $("#registerPassword").css({background:"rgba(0,255,0,0.4)"});
             }
             else {
               pwPass=0;
               $("#registerPassword").css({background:"rgba(255,0,0,0.4)"})
             }
          });

        //registerButton click
        $("#registerButton").click(function(){
            var myUNRes = window.localStorage.getItem("unamePass");
            var myERes = window.localStorage.getItem("emailPass");
            if (myERes == "pass") { emailC = 1; } else { emailC = 0;}

          // send our stuff to DB
            if (myUNRes == "pass") { unC = 1; }

          if(emailC==1&&unC==1&&pwPass==1 && $('#tosCheck').is(':checked') )
          {
            //Here we register
              uname = $("#registerName").val();
              email = $("#registerEmail").val();
              password = $("#registerPassword").val();
              var renciptPass = keccak_384(password);
              var arr = { canYou: "makeMeDumpInstagram", myName: uname, myMail: email, myPass: renciptPass, devUuid: device.uuid, devModel: device.version, devPlatform: device.platform };
              identify(arr);
              $("#lipErrorText").slideUp(1000, "easeOutCirc");

            }
          else {
            $("#lipErrorText").slideDown(1000, "easeOutCirc");
          }
        });

        $("#goToReg").click(function(){
          $("#registerContainer").toggle();
          $("#linputContainer").toggle();
          window.localStorage.setItem("history", "loginContainer");
        });

        $("#showTOS").click(function(){
          $("#registerContainer").toggle();
          $("#tosContainer").toggle();
        });

        $("#tosNot").click(function(){
          $("#registerContainer").toggle();
          $("#tosContainer").toggle();
          $('#tosCheck').prop('checked', false);
        });

        $("#tosYes").click(function(){
          $("#registerContainer").toggle();
          $("#tosContainer").toggle();
          $('#tosCheck').prop('checked', true);
        });


        //LOGIN CHECKER WILL BE COMING HERE:
        $("#loginButton").click(function(){

          // checkUp loginInfo @DB
          function letMeIn(uname, password )
          {
            var landlordPass = keccak_384(password);
            var arr = {canYou:"letMeIn", myName:uname, myPass: landlordPass, devUuid: device.uuid, devModel: device.version, devPlatform:device.platform};
            identify(arr);
            return true;
          }

          if(letMeIn ($("#loginName").val(), $("#loginPassword").val()))
          {return true;}

        });

      //REGULAR SHITS HERE


      	  var h=$(window).height(),
      		w=$(window).width();
        $("#mainContainer").css({
          'width' : w+'px',
          'height' : h+'px'
          });

        var sendPicState = 0;
        var feedState = 0;
        var profileState = 0;
        var messageState = 0;
        var notificationState = 0;
        var chatState = 0;

//ok so the above variables are defining some initial states for a way to integrate jqueryUITabs with my secondary tabs.
//then for each we check:
// IF(#MenuItem is hidden) {menuItemState = hidden} else  {menuItemState = visible}
//and then
// IF(menuItemState == hidden) {#MenuItem.displayToggle}

        $("#feedLink").click(function(){
          window.localStorage.setItem("history", "feed");

          window.localStorage.setItem("modal", 0);
          $modal = $('.modal-frame');
          $overlay = $('.modal-overlay');
          $overlay.removeClass('state-show');
          $modal.removeClass('state-appear').removeClass('state-leave');

          $('#vibeView').css({"display":"none"});

          if($("#msg").is(":hidden")){messageState = 0}else{messageState = 1}
          if($("#vibes").is(":hidden")){notificationState = 0}else{notificationState = 1}
          if($("#chat").is(":visible")){chatState = 1}else{chatState = 0}

          if(messageState == 1) {$("#msg").toggle()};
          if(notificationState == 1) {$("#vibes").toggle()};
          if(chatState == 1) {$("#chat").css({"display":"none"});$(".chatbox").css({"display":"none"})};

          $("#profile").css({"display":"none"});
          $("#searchRes").css({"display":"none"});
          $("#feed").css({"display":"block"});
          $("#feedRes").css({"display":"block"});
          $("#mySvg").css({"display":"none"});

          var arr = {canYou:"showMeMyFeed", myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform, roffset:0};
          identify(arr);

        });

        //child: SEARCH

        $("#fsButton").click(function(){
          window.localStorage.setItem("history", "feed");
          $("#feedRes").css({"display":"none"});
          $("#searchRes").css({"display":"block"});
          $("#profile").css({"display":"none"});
          searchQuery = $("#searchQuery").val();
          var arr = {canYou:"findSmth", myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform, searchQuery:searchQuery};
          identify(arr);
        })
        $("#sendPicLink").click(function(){



            window.localStorage.setItem("modal", 0);
            $modal = $('.modal-frame');
            $overlay = $('.modal-overlay');
            $overlay.removeClass('state-show');
            $modal.removeClass('state-appear').removeClass('state-leave');




          if($("#msg").is(":hidden")){messageState = 0}else{messageState = 1}
          if($("#vibes").is(":hidden")){notificationState = 0}else{notificationState = 1}
          if($("#chat").is(":visible")){chatState = 1}else{chatState = 0}
          if($("#otherOptions").is(":visible")){otherOptsState = 1}else{otherOptsState = 0}
          if($("#profile").is(":visible")){profileState = 1}else{profileState = 0}

          if(messageState == 1) {$("#msg").toggle()};
          if(notificationState == 1) {$("#vibes").toggle()};
          if (chatState == 1) {
              $("#chat").css({ "display": "none" });
              $(".chatbox").css({ "display": "none" })
          };
          if(otherOptsState == 1) {$("#otherOptions").css({"display":"none"})};
           $("#profile").css({"display":"none"});
           $("#feed").css({ "display": "none" });

          $("#sendPicture").css({"display":"block"});
          $("#leNextStepper").css({"display":"block"});
          $("#detailsWindow").css({"display":"none"});
          
          document.getElementById("mySvg").innerHTML = "";
          $("#mySvg").css({ "opacity": "0" });
          $("#mySvg").css({ "display": "block" });
          $("#mySvg").css({ "height": "100%" });
          $("#mySvg").css({ "visibility": "visible" });

          var height = document.getElementById("mySvg").clientHeight;
          window.localStorage.setItem("originalHeight", height);

          $("#editorHolder").css({"display":"block"});
          $("#editorHolder").css({ "height": height + "px" });
          $("#editorHolder").css({ "visibility": "visible" });
          $("#editorHolder").css({ "opacity": "0" });

            //$("#mySvg").css({ "opacity": "1" });
          var lowerThan=window.localStorage.getItem("originalHeight");
          //console.log(":::: \n orig height :" + lowerThan);
          var arr = {canYou:"showMeMyProfile", myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, inEditor: "yes", lowerThan:lowerThan};
          // first we start loading pre-existing images so they are in the back

            var getProfile = $.ajax({
                  type: "POST",
                  url: "https://kollaj.net/bouncer.php?seekProfile="+window.localStorage.getItem("loggedAs"),
                  data: JSON.stringify(arr),
                  dataType: "json",
                  contentType: 'application/json',
                  success: function(resultData){
                  //console.log("we got success") ;
                  var arr = resultData;
                  // console.log(arr);

                  function calcDistance(x1, y1, x2, y2) {
                  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
                  }
                  var s = Snap("#mySvg");
                  s.clear();//just add this piece of magic....
                  //Crossbrowser window Width
                  var width = document.getElementById("mySvg").clientWidth;
                  //Crossbrowser window Height
                  var height = document.getElementById("mySvg").clientHeight;
                  var i =0;
                  var bottomMost = 0;
                  function welderEmbedded (ih, iw, ix, iy, iURI, m1, m2, ang, scl, itx, ity)
                  {

                    var myImg = s.image(iURI, ix, iy, iw, ih);
                    var mask1=s.path(m1).attr({fill:"white"});
                    var mask2=s.path(m2).attr({fill:"white"});
                    var maskGroups = s.group()

                    maskGroups.add(mask1);
                    maskGroups.attr({fill: "white"});

                    finalGroup = s.group(maskGroups, myImg);

                    myImg.attr({mask: maskGroups})
                    maskGroups.attr({mask: mask2});

                    maxWidth = width - (width/9);
                    scaleF = maxWidth/iw;
                    lftDis = itx*scaleF;
                    topDis = ity*scaleF;
                    if (topDis > bottomMost)
                    {
                      bottomMost = topDis;
                      //console.log("::::::::BOTTOMMOST-->"+bottomMost+"\n");
                    }
                    last_element = arr.length - 1;

                    absXCenter = (width/2);
                    absYCenter = (height/2);

                    var bb = finalGroup.getBBox();
                    var diffX = absXCenter - bb.cx;
                    var diffY = absYCenter - bb.cy;

                    finalGroup.transform('T' + diffX + ',' + diffY + 'S'+scaleF+'R0');

                    moveGroup=s.group(finalGroup);
            //          console.log("first move, follow secondmove");
                    moveGroup.transform('t' + lftDis + ',' + topDis + 's'+scl+'r'+ang);
                    if (i==0 && window.localStorage.getItem('kollajDistance') == 1)
                    {
                    // moveGroup.remove()
                    }
            //          console.log("in place!?");
              if(i == last_element)
              {
                var scrollDist = window.localStorage.getItem('originalHeight');

                //console.log(i + " and bottomMost " + bottomMost );
                window.localStorage.setItem("editorScrollTo",bottomMost);
                var edtHeight =  (parseInt( ( parseFloat(bottomMost) / parseInt(scrollDist) ) + 1.5 ) * parseInt( scrollDist )) + parseInt( scrollDist );

                //console.log("edtHeight should be "+edtHeight+"because (("+bottomMost+"+1080)/"+scrollDist+")*"+scrollDist+"="+edtHeight);
                window.localStorage.setItem("editorHeight",edtHeight);
                $("#mySvg").css({"height":edtHeight+"px"});
                $("#mySvg").css({"background-color":"white"});
              }
            }

                  for (i in arr)
                  {
                    nty = arr[i].ty;
                    //console.log('received img'+ i +' ty'+ arr[i].ty +' nty'+ nty +' desc'+arr[i].imgdesc);
                    welderEmbedded (arr[i].imgH, arr[i].imgW, arr[i].imgX, arr[i].imgY, arr[i].imgpath, arr[i].mask1, arr[i].mask2, arr[i].angle, arr[i].scale, arr[i].tx, nty );
                  }
                  //console.log('well at least i tried');
                  }
            });

            // then we take the photo
          navigator.camera.getPicture(onSuccess, onFail, {
            quality: 100,
            destinationType: Camera.DestinationType.NATIVE_URI,
            sourceType: 1,
            encodingType: Camera.EncodingType.JPEG,
            allowEdit: false,
            encodingType: 0,
            targetWidth: 1920,
            targetHeight: 1080,
            direction: 1,
            saveToPhotoAlbum: true
          });

          function onSuccess(imageData) {
//              alert("Congz!! You might've found a bug :( \n I'm fixing it! \n You can go back though.. or close & open Kollaj");
              //just to be sure
              $("#editorHolder").css({ "visibility": "visible" });
              $("#editorHolder").css({ "opacity": "1" });

            $("#otherOptions").css({ "display": "none" });
            $("#detailsWindow").css({ "display": "none" });
            $("#mySvg").css({ "visibility": "visible" });
            $("#mySvg").css({"opacity":"1"});
             //so witht the image path we will
              //first find cWidth & cHeight
              var img = new Image();
              img.onload = function() {
                var cWidth = this.width;
                var cHeight = this.height;
                //and then pass it to the Hobbit :) (ref ==>) http://codepen.io/spacewalkingninja/full/yVwqWQ/
                bringinTheEditor(imageData, this.width, this.height);
              }
              img.src = imageData;

          }

          function onFail(message) {
              $("#editorHolder").css({ "visibility": "hidden" });
              $("#editorHolder").css({ "opacity": "0" });

              $("#detailsWindow").css({"display":"none"})
              $("#otherOptions").toggle();
              $("#mySvg").css({"visibility":"hidden"})
              }

        });

        $("#selfieMode").click(function(){
          if($("#msg").is(":hidden")){messageState = 0}else{messageState = 1}
          if($("#vibes").is(":hidden")){notificationState = 0}else{notificationState = 1}
          if($("#chat").is(":visible")){chatState = 1}else{chatState = 0}

          if(messageState == 1) {$("#msg").toggle()};
          if(notificationState == 1) {$("#vibes").toggle()};
          if(chatState == 1) {$("#chat").css({"display":"none"});$(".chatbox").css({"display":"none"})};

          $("#sendPicture").css({"display":"block"});
          $("#detailsWindow").css({"display":"none"});
          $("#mySvg").css({ "visibility": "visible" });
          $("#mySvg").css({ "opacity": "1" });

          navigator.camera.getPicture(onSuccess, onFail, {
            quality: 100,
            destinationType: Camera.DestinationType.NATIVE_URI,
            sourceType: 1,
            encodingType: Camera.EncodingType.JPEG,
            allowEdit: false,
            encodingType: 0,
            targetWidth: 1920,
            targetHeight: 1080,
            direction: 0,
            saveToPhotoAlbum: true
          });

          function onSuccess(imageData) {
            //just to be sure
//              alert("Congz!! You might've found a bug :( \n I'm fixing it! \n You can go back though.. or close & open Kollaj");
              $("#otherOptions").css({ "display": "none" })
              $("#editorHolder").css({ "visibility": "visible" });
              $("#editorHolder").css({ "opacity": "1" });

              //so witht the image path we will
              //first find cWidth & cHeight
              var img = new Image();
              img.onload = function() {
                var cWidth = this.width;
                var cHeight = this.height;
                //and then pass it to the Hobbit :) (ref ==>) http://codepen.io/spacewalkingninja/full/yVwqWQ/
                bringinTheEditor(imageData, this.width, this.height);
              }
              img.src = imageData;

          }

          function onFail(message) {
            $("#editorHolder").css({"visibility":"hidden"});
            $("#mySvg").css({"visibility":"hidden"});
            $("#detailsWindow").css({ "display": "none" });
            $("#editorHolder").css({ "visibility": "hidden" });
            $("#editorHolder").css({ "opacity": "1" });

            if($("#otherOptions").is(":visible")){otherOptsState = 0}else{otherOptsState = 1}
            if(otherOptsState == 1) {$("#otherOptions").css({"display":"block"})};
          }

        });

        $("#galleryMode").click(function(){
          if($("#msg").is(":hidden")){messageState = 0}else{messageState = 1}
          if($("#vibes").is(":hidden")){notificationState = 0}else{notificationState = 1}
          if($("#chat").is(":visible")){chatState = 1}else{chatState = 0}

          if(messageState == 1) {$("#msg").toggle()};
          if(notificationState == 1) {$("#vibes").toggle()};
          if (chatState == 1) {
              $("#chat").css({ "display": "none" });
              $(".chatbox").css({ "display": "none" })
          };
          $("#feed").css({ "display": "none" });
          $("#profile").css({ "display": "none" });
          $("#detailsWindow").css({ "display": "none" });
          $("#sendPicture").css({"display":"block"});

          navigator.camera.getPicture(onSuccess, onFail, {
            quality: 100,
            destinationType: Camera.DestinationType.NATIVE_URI,
            sourceType: 0,
            encodingType: Camera.EncodingType.JPEG,
            allowEdit: false,
            encodingType: 0,
            targetWidth: 1920,
            targetHeight: 1080,
            direction: 0,
            saveToPhotoAlbum: true
          });

          function onSuccess(imageData) {
//              alert("Congz!! You might've found a bug :( \n I'm fixing it! \n You can go back though.. or close & open Kollaj");
              //just to be sure
              $("#editorHolder").css({ "opacity": "1" });
              $("#editorHolder").css({ "visibility": "visible" });

              $("#mySvg").css({ "visibility": "visible" });
              $("#mySvg").css({ "opacity": "1" });
            $("#otherOptions").css({"display":"none"})
              //so witht the image path we will
              //first find cWidth & cHeight
              var img = new Image();
              img.onload = function() {
                var cWidth = this.width;
                var cHeight = this.height;
                //and then pass it to the Hobbit :) (ref ==>) http://codepen.io/spacewalkingninja/full/yVwqWQ/
                bringinTheEditor(imageData, this.width, this.height);
              }
              img.src = imageData;

          }

          function onFail(message) {
              $("#editorHolder").css({ "visibility": "hidden" });
              $("#editorHolder").css({ "opacity": "0" });

            $("#mySvg").css({"visibility":"hidden"});
            $("#detailsWindow").css({"display":"none"});
            if($("#otherOptions").is(":visible")){otherOptsState = 0}else{otherOptsState = 1}
            if(otherOptsState == 1) {$("#otherOptions").css({"display":"block"})};
          }

        });

        $("#profLink").click(function(){

            window.localStorage.setItem("modal", 0);
            $modal = $('.modal-frame');
            $overlay = $('.modal-overlay');
            $overlay.removeClass('state-show');
            $modal.removeClass('state-appear').removeClass('state-leave');


            $("#mySvg").css({ "display": "none" });
            $("#feed").css({ "display": "none" });

          var arr1 = {canYou:"giveMeMyStats", myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform}
          identify (arr1);
          if($("#msg").is(":hidden")){messageState = 0}else{messageState = 1}
          if($("#vibes").is(":hidden")){notificationState = 0}else{notificationState = 1}
          if($("#chat").is(":visible")){chatState = 1}else{chatState = 0}
          if($("#takePicture").is(":visible")){takePictureState = 1}else{takePictureState = 0}

          if(messageState == 1) {$("#msg").toggle()};
          if(notificationState == 1) {$("#vibes").toggle()};
          if(chatState == 1) {$("#chat").css({"display":"none"});$(".chatbox").css({"display":"none"})};
          if(takePictureState == 1) {$("#takePicture").css({"display":"none"});};


          window.localStorage.setItem("mproffset", 0);

          $("#profileName").html("<div id='callProfAction' class='arrow' data-seeProf='"+window.localStorage.getItem("loggedAs")+"'>@"+window.localStorage.getItem("loggedAs")+"</div>");
          $("#callProfAction").click (function()
          {
            window.localStorage.setItem('history', 'profile');
            callDaProfileMenu(window.localStorage.getItem("loggedAs"));
          //console.log(window.localStorage.getItem("loggedAs"));
          });

          $("#profileFollowing").html(window.localStorage.getItem("myProfileFollowing"));
          $("#profileFollowers").html(window.localStorage.getItem("myProfileFollowers"));
            var arr = {canYou:"showMeMyProfile", myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, proffset:window.localStorage.getItem("mproffset")};

          $("#profile").css({"display":"block"});
          var getProfile = $.ajax({
                type: "POST",
                url: "https://kollaj.net/bouncer.php?seekProfile="+window.localStorage.getItem("loggedAs"),
                data: JSON.stringify(arr),
                dataType: "json",
                contentType: 'application/json',
                success: function(resultData){
                  $("#profileSVG").css({"height":"100%"});
                  document.getElementById("profileSVG").innerHTML = "";
                  window.localStorage.setItem("originalHeight", document.getElementById("profileSVG").clientHeight);
                  var OHght = window.localStorage.getItem("originalHeight");

                  var karr = {canYou:"getMyKollajDistance", myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid};
                  identify(karr);

                //make sure

                var arr = resultData;

                function calcDistance(x1, y1, x2, y2) {
                return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
                }



                var s = Snap("#profileSVG");
                s.clear();//just add this piece of magic....
                // found on stack @http://stackoverflow.com/questions/31825807/how-do-i-clear-an-snap-svg-canvus-after-snap-load by Lin Yuan

                //Crossbrowser window Width
                var width = document.getElementById("profileSVG").clientWidth;
                //Crossbrowser window Height
                var height = document.getElementById("profileSVG").clientHeight;
                var i =0;
                var lasTopDis = 0;
                var cordx = new Array;
                var cordy = new Array;
                var cordI = new Array;
                function welderEmbeddedMP (ih, iw, ix, iy, iURI, m1, m2, ang, scl, itx, ity)
                {
                  var OHght = window.localStorage.getItem("originalHeight");
                  var myImg = s.image(iURI, ix, iy, iw, ih);
                  var mask1=s.path(m1).attr({fill:"white"});
                  var mask2=s.path(m2).attr({fill:"white"});
                  var maskGroups = s.group()

                  maskGroups.add(mask1);
                  maskGroups.attr({fill: "white"});

                  finalGroup = s.group(maskGroups, myImg);

                  myImg.attr({mask: maskGroups})
                  maskGroups.attr({mask: mask2});

                  maxWidth = width - (width/9);
                  scaleF = maxWidth/iw;
                  lftDis = itx*scaleF;
                  topDis = ity*scaleF;
                  absXCenter = (width/2);
                  absYCenter = (OHght/2);

                  if (lasTopDis < topDis)
                  {
                  lasTopDis = topDis
                  }
                  var bb = finalGroup.getBBox();
                  var diffX = absXCenter - bb.cx;
                  var diffY = absYCenter - bb.cy;

                  finalGroup.transform('T' + diffX + ',' + diffY + 'S'+scaleF+'R0');

                  moveGroup=s.group(finalGroup).attr({style:"border:3px solid white"});
        //          console.log("first move, follow secondmove");

        //          console.log("in place!?");
                    moveGroup.transform('t' + lftDis + ',' + topDis + 's'+scl+'r'+ang);
                    if (i==0)
                    {
                       moveGroup.remove()
                       //console.log("aro!");
                    //    document.getElementById("whereuputurppic").innerHTML = "";
                       $("#whereuputurppic").css({"background-image":'url("'+iURI+'")'});
                    }
                    if (i>0)
                    {
                      var bb = moveGroup.getBBox();
                      cordx.push(bb.cx);
                      cordy.push(bb.cy);

                      iname = iURI.substring(iURI.lastIndexOf('/')+1);
                      cordI.push(iname);
                    }

                    if(i == resultData.length - 1)
                    {
                      nH = parseInt(lasTopDis) + 780;
                      $("#profileSVG").css({"height":nH+"px"});
                      window.localStorage.setItem("profileSVGHeight", nH);
                        //console.log("puttint it @"+nH);
                      if (i > 13) {

                          var text = s.text(30, (lasTopDis + 400), "click to load more..");
                          text.attr({
                              'font-size': "1.5rem",
                              'stroke': 'white',
                              'strokeWidth': 1,
                              'id': "loadMoreMProfile"
                          });
                          $("#loadMoreMProfile").click(function () {

                              var arr = { canYou: "showMeSomeProfile", myName: window.localStorage.getItem("loggedAs"), seeProfile: window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform, proffset: window.localStorage.getItem("mproffset") };
                              identify(arr);

                          });
                      }
                    }

        return false;
      }

                for (i in arr)
                {
                  window.localStorage.setItem("mproffset", arr[i].proffset);
                  welderEmbeddedMP (arr[i].imgH, arr[i].imgW, arr[i].imgX, arr[i].imgY, arr[i].imgpath, arr[i].mask1, arr[i].mask2, arr[i].angle, arr[i].scale, arr[i].tx, arr[i].ty);
                }
                commentsPoint=new Array;
                for (n in cordx)
                {

                  commentsPoint[n] = s.circle(cordx[n], cordy[n], 25).attr({fill: "rgba(255,255,255, 0.05)"});
                  commentsPoint[n].attr({
                    stroke: "rgba(255,255, 255,0.4)",
                    strokeWidth: 2,
                    strokeDasharray: 4
                  })

                  commentsPoint[n].attr({"data-img":cordI[n]});
                  commentsPoint[n].attr({"id":"profileCommPtL"+n})
                  commentsPoint[n].click(
                    function ()
                    {
                      window.localStorage.setItem('history', 'profile');
                      bringInThePostSeeWindow(this.attr("data-img"));
                    }
                  );
                }


                }
          });


        });


        $("#messages").click(function(){
            $("#mySvg").css({ "display": "none" });

          window.localStorage.setItem("modal", 0);
          $modal = $('.modal-frame');
          $overlay = $('.modal-overlay');
          $overlay.removeClass('state-show');
          $modal.removeClass('state-appear').removeClass('state-leave');


          if($("#vibes").is(":visible")){notificationState = 1}else{notificationState = 0}
          if($("#profile").is(":visible")){profileState = 1}else{profileState = 0}
          if($("#feed").is(":visible")){feedState = 1}else{feedState = 0}
          if($("#sendPicture").is(":visible")){sendPicState = 1}else{sendPicState = 0}
          if($("#chat").is(":visible")){chatState = 1}else{chatState = 0}

          if(notificationState == 1) {$("#vibes").toggle()};
          if(profileState == 1) {$("#profile").toggle()};
          if(feedState == 1) {$("#feed").toggle()};
          if(sendPicState == 1) {$("#sendPicture").toggle()};
          if(chatState == 1) {$("#chat").css({"display":"none"});$(".chatbox").css({"display":"none"})};

          $('#msg').slideDown(1000, "easeOutCirc");
//          var arr = {canYou:"checkMyInbox", myName:window.localStorage.getItem("loggedAs"), devUuid:device.uuid, tracker: window.localStorage.getItem("tracker")};
//          identify (arr);

          var arr = {canYou:"letMeKnowWhoShouldIBotherInsteadOfUDearServerOfMine", myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform};
          identify(arr);


        });

        $("#chatButton").click(function(){
          myMsg = $("#chatInput").val();
          if (myMsg.replace(/\s/g, '').length) {
            var arr = {canYou:"letMeSendAMsg", myName:window.localStorage.getItem("loggedAs"), myMsg: myMsg, myMsgIsGoingTo:window.localStorage.getItem("seeingMsgs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform};
            identify(arr);
          }
          myMsg = $("#chatInput").val("");
        });

        $(".contactBox").click(function(){
          window.localStorage.setItem('history', 'messages');

          $("#mySvg").css({"display":"none"});

          if($("#msg").is(":hidden")){messageState = 0}else{messageState = 1}
          if($("#vibes").is(":visible")){notificationState = 1}else{notificationState = 0}
          if($("#profile").is(":visible")){profileState = 1}else{profileState = 0}
          if($("#feed").is(":visible")){feedState = 1}else{feedState = 0}
          if($("#sendPicture").is(":visible")){sendPicState = 1}else{sendPicState = 0}

          if(notificationState == 1) {$("#vibes").toggle()};
          if(profileState == 1) {$("#profile").toggle()};
          if(feedState == 1) {$("#feed").toggle()};
          if(sendPicState == 1) {$("#sendPicture").toggle()};
          if(messageState == 1) {$("#msg").toggle()};

          var str = $(this).attr('id');
          var res = str.substring(5, 6);
          see = "#chatBox"+res;
          $("#chat").toggle(function(){
            $(see).slideDown(400, "easeInCirc");
          });

        });

        $("#notifications").click(function(){
          window.localStorage.setItem("history", "feed");
            $("#mySvg").css({"display":"none"});

            window.localStorage.setItem("modal", 0);
            $modal = $('.modal-frame');
            $overlay = $('.modal-overlay');
            $overlay.removeClass('state-show');
            $modal.removeClass('state-appear').removeClass('state-leave');

          if($("#msg").is(":visible")){messageState = 1}else{messageState = 0}
          if($("#profile").is(":visible")){profileState = 1}else{profileState = 0}
          if($("#feed").is(":visible")){feedState = 1}else{feedState = 0}
          if($("#sendPicture").is(":visible")){sendPicState = 1}else{sendPicState = 0}
          if($("#chat").is(":visible")){chatState = 1}else{chatState = 0}

          if(messageState == 1) {$("#msg").toggle()};
          if(profileState == 1) {$("#profile").toggle()};
          if(feedState == 1) {$("#feed").toggle()};
          if(sendPicState == 1) {$("#sendPicture").toggle()};
          if(chatState == 1) {$("#chat").css({"display":"none"});$(".chatbox").css({"display":"none"})};

          $('#vibes').css({"display":"block"});

          var arr = {canYou:"showMeMyVibes", myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform};
          identify(arr);
        });


          function calcDistance(x1, y1, x2, y2) {
            return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
          }

(function() {

var lineAttributes = {
  stroke: 'red',
  strokeWidth: 2,
  strokeDasharray: "5,5"
};

Snap.plugin(function(Snap, Element, Paper, global) {

  var ftOption = {
    handleFill: "rgba(0,0,0, 0.4)",
    handleStrokeDash: "5,5",
      handleStrokeWidth: "2",
    handleLength: 40,
    handleRadius: "18",
    handleLineWidth: 2,
  };

  Element.prototype.ftCreateHandles = function() {
    this.ftInit();
    var freetransEl = this;
    var bb = freetransEl.getBBox(0);
    var rotateDragger = this.paper.circle(bb.width - (ftOption.handleLength ), bb.cy, ftOption.handleRadius).attr({
      fill: "rgba(59,89,152, 0.8)"
    });

    var translateDragger = this.paper.circle(bb.cx, bb.cy, ftOption.handleRadius).attr({
      fill: "rgba(59,89,152, 0.4)"
    });

    var joinLine = freetransEl.ftDrawJoinLine(rotateDragger);
    var handlesGroup = this.paper.g(joinLine, rotateDragger, translateDragger);

    freetransEl.data("handlesGroup", handlesGroup);
    freetransEl.data("joinLine", joinLine);

    freetransEl.data("scaleFactor", calcDistance(bb.cx, bb.cy, rotateDragger.attr('cx'), rotateDragger.attr('cy')));

    translateDragger.drag(elementDragMove.bind(translateDragger, freetransEl),
      elementDragStart.bind(translateDragger, freetransEl),
      elementDragEnd.bind(translateDragger, freetransEl));

    freetransEl.undblclick();
    freetransEl.data("dblclick", freetransEl.dblclick(function() {
      this.ftRemoveHandles()
    }));

    rotateDragger.drag(
      dragHandleRotateMove.bind(rotateDragger, freetransEl),
      dragHandleRotateStart.bind(rotateDragger, freetransEl),
      dragHandleRotateEnd.bind(rotateDragger, freetransEl)
    );
    freetransEl.ftStoreInitialTransformMatrix();

    freetransEl.ftHighlightBB();
    return this;
  };

  Element.prototype.ftInit = function() {
    this.data("angle", 0);
    this.data("scale", 1);
    this.data("tx", 0);
    this.data("ty", 0);
    return this;
  };

  Element.prototype.ftCleanUp = function() {
    var myClosureEl = this;
    var myData = ["angle", "scale", "scaleFactor", "tx", "ty", "otx", "oty", "bb", "bbT", "initialTransformMatrix", "handlesGroup", "joinLine"];
    myData.forEach(function(el) {
      myClosureEl.removeData([el])
    });
    return this;
  };

  Element.prototype.ftStoreStartCenter = function() {
    this.data('ocx', this.attr('cx'));
    this.data('ocy', this.attr('cy'));
    return this;
  }

  Element.prototype.ftStoreInitialTransformMatrix = function() {
    this.data('initialTransformMatrix', this.transform().localMatrix);
    return this;
  };

  Element.prototype.ftGetInitialTransformMatrix = function() {
    return this.data('initialTransformMatrix');
  };

  Element.prototype.ftRemoveHandles = function() {
    this.undblclick();
    this.data("handlesGroup").remove();
    this.data("bbT") && this.data("bbT").remove();
    this.data("bb") && this.data("bb").remove();
    this.dblclick(function() {
      this.ftCreateHandles()
    });
    this.ftCleanUp();
    return this;
  };

  Element.prototype.ftDrawJoinLine = function(handle) { // note, handle could be either dragger or rotater
    var lineAttributes = {
      stroke: ftOption.handleFill,
      strokeWidth: ftOption.handleStrokeWidth,
      strokeDasharray: ftOption.handleStrokeDash
    };
    var rotateHandle = handle.parent()[1];
    var dragHandle = handle.parent()[2];

    var thisBB = this.getBBox(0);

    if (this.data("joinLine")) {
      this.data("joinLine").attr({
        x1: dragHandle.attr('cx'),
        y1: dragHandle.attr('cy'),
        x2: rotateHandle.attr('cx'),
        y2: rotateHandle.attr('cy')
      });
    } else {
      return this.paper.line(thisBB.cx, thisBB.cy, handle.attr('cx'), handle.attr('cy')).attr(lineAttributes);
    };

    return this;
  };

  Element.prototype.ftTransformedPoint = function(x, y) {
    var transform = this.transform().diffMatrix;
    return {
      x: transform.x(x, y),
      y: transform.y(x, y)
    };
  };

  Element.prototype.ftUpdateTransform = function() {
    var tstring = "t" + this.data("tx") + "," + this.data("ty") + this.ftGetInitialTransformMatrix().toTransformString() + "r" + this.data("angle") + 'S' + this.data("scale");
    this.attr({
      transform: tstring
    });
    this.data("bbT") && this.ftHighlightBB();
    return this;
  };

  Element.prototype.ftHighlightBB = function() {
    this.data("bbT") && this.data("bbT").remove();
    this.data("bb") && this.data("bb").remove();

    this.data("bbT", this.paper.rect(rectObjFromBB(this.getBBox(1)))
      .attr({
        fill: "none"
      }) //stroke: ftOption.handleFill, strokeDasharray: ftOption.handleStrokeDash
      //			handleStrokeDash: "5,5",
      //			handleStrokeWidth: "2",
      //strokeDasharray: 5,5
      .transform(this.transform().local.toString()));
    this.data("bb", this.paper.rect(rectObjFromBB(this.getBBox()))
      .attr({
        fill: "none"
      })); //stroke: ftOption.handleFill, strokeDasharray: ftOption.handleStrokeDash -
    return this;
  };

});

function rectObjFromBB(bb) {
  return {
    x: bb.x,
    y: bb.y,
    width: bb.width,
    height: bb.height
  }
}

function elementDragStart(mainEl, x, y, ev) {
  this.parent().selectAll('circle').forEach(function(el, i) {
    el.ftStoreStartCenter();
  });
  mainEl.data("otx", mainEl.data("tx") || 0);
  mainEl.data("oty", mainEl.data("ty") || 0);
};

function invTransformPoint(el, x, y) {
  var tdx, tdy;
  var snapInvMatrix = el.transform().diffMatrix.invert();
  snapInvMatrix.e = snapInvMatrix.f = 0;
  return {
    tx: snapInvMatrix.x(x, y),
    ty: snapInvMatrix.y(x, y)
  }
}

function elementDragMove(mainEl, dx, dy, x, y) {
  var dragHandle = this;
  var ip = invTransformPoint(this, dx, dy);

  this.parent().selectAll('circle').forEach(function(el, i) {
    el.attr({
      cx: +el.data('ocx') + ip.tx,
      cy: +el.data('ocy') + ip.ty
    });
  });
  mainEl.data("tx", mainEl.data("otx") + +ip.tx);
  mainEl.data("ty", mainEl.data("oty") + +ip.ty);

  mainEl.ftUpdateTransform();
  mainEl.ftDrawJoinLine(dragHandle);
}

function elementDragEnd(mainEl, dx, dy, x, y) {
  mY = parseInt( mainEl.data("ty") ) ;
  var $editorHolder = $("#editorHolder");
  $editorHolder.animate({ scrollTop: mY });

};

function dragHandleRotateStart(mainElement) {
  this.ftStoreStartCenter();
};

function dragHandleRotateEnd(mainElement) {};

function dragHandleRotateMove(mainEl, dx, dy, x, y, event) {
  var handle = this;
  var mainBB = mainEl.getBBox();
  var ip = invTransformPoint(this, dx, dy);

  handle.attr({
    cx: +handle.data('ocx') + ip.tx,
    cy: +handle.data('ocy') + ip.ty
  });

  mainEl.data("angle", Snap.angle(mainBB.cx, mainBB.cy, handle.attr('cx'), handle.attr('cy')) - 180);

  var distance = calcDistance(mainBB.cx, mainBB.cy, handle.attr('cx'), handle.attr('cy'));
  //console.log (distance);
  mainEl.data("scale", distance / mainEl.data("scaleFactor"));

  mainEl.ftUpdateTransform();
  mainEl.ftDrawJoinLine(handle);
};

function calcDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

})();

Snap.plugin(function(Snap, Element, Paper, glob) {
var elproto = Element.prototype;
elproto.toFront = function() {
  this.prependTo(this.paper);
};
elproto.toBack = function() {
  this.appendTo(this.paper);
};
});

Snap.plugin(function(Snap, Element, Paper, global) {
Paper.prototype.circlePath = function(cx, cy, r) {
  var p = "M" + cx + "," + cy;
  p += "m" + -r + ",0";
  p += "a" + r + "," + r + " 0 1,0 " + (r * 2) + ",0";
  p += "a" + r + "," + r + " 0 1,0 " + -(r * 2) + ",0";
  return this.path(p, cx, cy);

};
});

Snap.plugin(function(Snap, Element, Paper, global) {
Element.prototype.addTransform = function(t) {
  return this.transform(this.transform().localMatrix.toTransformString() + t);
};
});


function gridGen(wWidth, wHeight, actualHeight, s, colorA, colorB) {
  function isEven(n) {
    return n == parseFloat(n) ? !(n % 2) : void 0;
  }

  thirdWidth = wWidth / 6;
  vl = new Array;
  for (i = 1; i < 6; i++) {
    if (isEven(i)) {
      color = colorA;
      sW = 2;
    } else {
      color = colorB;
      sW = 1;
    }
    x1 = thirdWidth * i
    y1 = 0
    x2 = thirdWidth * i
    y2 = actualHeight;
    vl[i] = s.line(x1, 0, thirdWidth * i, actualHeight).attr({
      strokeWidth: sW,
      stroke: color,
      strokeLinecap: "round"
    })
  }
  hl = new Array;
  tlines = parseInt(actualHeight / thirdWidth) + 10;
  for (i = 1; i < tlines; i++) {
    if (isEven(i)) {
      color = colorA;
      sW = 2;
    } else {
      color = colorB;
      sW = 1;
    }
    x1 = 0;
    y1 = thirdWidth * i;
    x2 = wWidth;
    y2 = thirdWidth * i;
    hl[i] = s.line(x1, y1, x2, y2).attr({
      strokeWidth: sW,
      stroke: color
    })
  }
}

function bringinTheEditor(photoSrc, cWidth, cHeight) {

  window.localStorage.setItem("history", "feed");
  window.localStorage.setItem("photoSrcUndo",photoSrc);
  window.localStorage.setItem("photoCWidthUndo",cWidth);
  window.localStorage.setItem("photoCHeightUndo",cWidth);

  $("#header").css({"display":"none"});
  $("#mainNav").css({"visibility":"hidden"});
  $("#mySvg").css({"display":"block"});
  $("#editorHolder").css({"visibility":"visible"});
  $("#editorHelper").css({"display":"block"});
  $("#lesArrowHolder").css({"display":"none"});
  $("#leNextStepper").css({"display":"none"});

  if(window.localStorage.getItem("myCalibration") == "hateToMakeYouSadButUrOnUrOwn")
  {
    $("#calibrateHolder").css({"display":"block"});
  }

  var s = Snap("#mySvg");

  var width = document.getElementById("mySvg").clientWidth;
  var actualHeight = document.getElementById("mySvg").clientHeight;
  var height = parseInt(window.localStorage.getItem("originalHeight"));
  var maxWidth = width - (width / 9); // Max width for the image
  var maxHeight = height - (height * 0.3); // Max height for the image
  var ratio = 0; // Used for aspect ratio
  var imgWidth = cWidth; // Current image width
  var imgHeight = cHeight; // Current image height
  if (width > maxWidth) {
    ratio = maxWidth / imgWidth; // get ratio for scaling image
    imgHeight = imgHeight * ratio; // Reset height to match scaled image
    imgWidth = imgWidth * ratio; // Reset width to match scaled image
  }
  if (imgHeight > maxHeight) {
    ratio = maxHeight / imgHeight; // get ratio for scaling image
    imgWidth = imgWidth * ratio; // Reset width to match scaled image
    imgHeight = imgHeight * ratio; // Reset height to match scaled image
  }
  var ixCenter = parseInt((width - imgWidth) / 2);
  var iyCenter = parseInt((height - imgHeight) / 2);
  gridGen(width, height, actualHeight, s, "CornflowerBlue", "MediumTurquoise");
  var myImg = s.image(photoSrc, ixCenter, iyCenter, imgWidth, imgHeight).attr({id: "editImg"});

  var imgCorner = [];
	  var ixCorner = [];
	  var iyCorner = [];
	  var imgHandle = [];
	  ixCorner[0] = ixCenter;
	  ixCorner[1] = imgWidth + ixCenter;
	  ixCorner[2] = imgWidth + ixCenter;
	  ixCorner[3] = ixCenter;

	  iyCorner[0] = iyCenter;
	  iyCorner[1] = iyCenter;
	  iyCorner[2] = iyCenter + imgHeight;
	  iyCorner[3] = iyCenter + imgHeight;

	  var imgCx = ixCorner[0] + (imgWidth / 2);
	  var imgCy = iyCorner[0] + (imgHeight / 2);

	  var centerPoint = s.circle(imgCx, imgCy, 10).attr({fill: "rgba(250,89,152, 0)"});
	  imgHandle[0] = s.circle(ixCenter, iyCenter, 10).attr({fill: "rgba(59,89,152, 1)"});
	  imgHandle[1] = s.circle(imgWidth + ixCenter, iyCenter, 10).attr({fill: "rgba(59,89,152, 1)"});
	  imgHandle[2] = s.circle(imgWidth + ixCenter, iyCenter + imgHeight, 10).attr({fill: "rgba(59,89,152, 1)"});
	  imgHandle[3] = s.circle(ixCenter, iyCenter + imgHeight, 10).attr({fill: "rgba(59,89,152, 1)"});

	  var myLine = [];
	  var touches = 0;
    var touchCuts = 0 //this should be better than the touches counter to count the actual cuts only
	  var imgMask = []; //our mask paths
	  var maskGroups = s.group();
	  var m = 0; //our mask counter
    var myMaskFrag = []; //our mask fragments
	  var maskColor = "white"; //this is our mask color, we can change it here globally

    $("#mySvg").css({"position":"static"});
    $("#editorHolder").css({"overflow-y":"hidden"});
    $("#mySvg").on('touchstart mousedown', function(event) {
      //console.log(touches);
      gnStartX = event.touches[0].pageX;
      gnStartY = event.touches[0].pageY;
      gnStartX = parseInt(gnStartX);
      gnStartY = parseInt(gnStartY);
      cutTouchStart (event, s, touches, centerPoint, myLine, gnStartX, gnStartY);
    });
    $("#mySvg").on('touchmove mousemove', function(event) {
      gnEndX = event.touches[0].pageX;
      gnEndY = event.touches[0].pageY;
      gnEndX = parseInt(gnEndX);
      gnEndY = parseInt(gnEndY);
      cutTouchMove (event, s, touches, centerPoint, myLine, gnStartX, gnStartY, gnEndX, gnEndY);
    });
    $("#mySvg").on('touchend touchcancel mouseup', function(event) {

      	    centerPoint.attr({fill: "rgba(250,89,152, 0)"});
            //console.log("touchend")
      	    p1 = ("M " + gnStartX + " " + gnStartY + " L " + gnEndX + " " + gnEndY)
      	    p2 = ("M " + ixCorner[0] + " " + iyCorner[0] + " L " + ixCorner[1] + " " + iyCorner[1] + " " + ixCorner[2] + " " + iyCorner[2] + " " + ixCorner[3] + " " + iyCorner[3] + " Z")
            //console.log(p1+ " and " +p2 );
      	    var intersects = Snap.path.intersection(p1, p2); // intersection array
      	    var intersectPointX = []; //intersection point x's
      	    var intersectPointY = []; //and y's
      	    var intersectHandler = []; //just the graphical thingies
      	    var c = 0; //counter
            if (intersects[0] && intersects[1] && touchCuts <= 1) {
              window.localStorage.setItem("history", "callEd");
              touchCuts++;
              touches++;
              //console.log("touchCuts "+touchCuts +" touches"+ touches);
      	      intersects.forEach(function(el) {
      	        intersectHandler[c] = s.circle(el.x, el.y, 10).attr({fill: "rgba(250,89,152, 1)", class:"handleSwitcher"});
      	        intersectPointX[c] = el.x;
      	        intersectPointY[c] = el.y;
      	        c++;
                //console.log("intersection detected @"+el.x+","+el.y);
      	      });

      	      var fiPClassification = []
      	      var siPClassification = []
      	      if((intersectPointY[0]>iyCorner[0]-1 && intersectPointY[0]<iyCorner[0]+1)
                  ||
                (intersectPointY[0]>iyCorner[3]-1 && intersectPointY[0]<iyCorner[3]+1)){
      	        fiPClassification[0] = 0; //VerticalCut
      	        if (intersectPointY[0] > iyCorner[0] + imgHeight / 2) {
      	          fiPClassification[1] = 0; //BottomHalf
      	          if (intersectPointX[0] > ixCorner[0] + imgWidth / 2)
                  {fiPClassification[2] = 0;} else {fiPClassification[2] = 1;}
      	        } else {
      	          fiPClassification[1] = 1; //TopHalf
      	          if (intersectPointX[0] > ixCorner[0] + imgWidth / 2)
                  {fiPClassification[2] = 0;} else {fiPClassification[2] = 1;}
      	        }
              }
      	      else if (intersectPointY[0]) {
      	        fiPClassification[0] = 1; //HorizontalCut
      	        if (intersectPointY[0] > iyCorner[0] + imgHeight / 2) {
      	          fiPClassification[1] = 0; //BottomHalf
      	          if (intersectPointX[0] > ixCorner[0] + imgWidth / 2)
                  {fiPClassification[2] = 0;} else {fiPClassification[2] = 1;}
      	        } else {
      	          fiPClassification[1] = 1; //TopHalf
      	          if (intersectPointX[0] > ixCorner[0] + imgWidth / 2)
                  {fiPClassification[2] = 0;} else {fiPClassification[2] = 1;}
      	        }
      	      }
      	      	if((intersectPointY[1]>iyCorner[0]-1 && intersectPointY[1]<iyCorner[0]+1)
                  ||
                  (intersectPointY[1]>iyCorner[3]-1 && intersectPointY[1]<iyCorner[3]+1)){
      	        siPClassification[0] = 0; //VerticalCut
      	        if (intersectPointY[1] > iyCorner[0] + imgHeight / 2) {
      	          siPClassification[1] = 0; //BottomHalf
      	          if (intersectPointX[1] > ixCorner[0] + imgWidth / 2)
                  {siPClassification[2] = 0;} else {siPClassification[2] = 1;}
      	        } else {
      	          siPClassification[1] = 1; //TopHalf
      	          if (intersectPointX[1] > ixCorner[0] + imgWidth / 2)
                  {siPClassification[2] = 0;} else {siPClassification[2] = 1;}
      	        }
      	      } else if (intersectPointY[1]) {
      	        siPClassification[0] = 1; //HorizontalCut
      	        if (intersectPointY[1] > iyCorner[0] + imgHeight / 2) {
      	          siPClassification[1] = 0; //BottomHalf
      	          if (intersectPointX[1] > ixCorner[0] + imgWidth / 2)
                  {siPClassification[2] = 0;} else {siPClassification[2] = 1;}
      	        } else {
      	          siPClassification[1] = 1; //TopHalf
      	          if (intersectPointX[1] > ixCorner[0] + imgWidth / 2)
                  {siPClassification[2] = 0;} else {siPClassification[2] = 1;}
      	        }
      	      }

              //console.log(fiPClassification[0] + " " + fiPClassification[1] + " " + fiPClassification[2] + " \n " + siPClassification[0] + " " + siPClassification[1] + " " + siPClassification[2] + " ")

              if (fiPClassification[0] == 0 && fiPClassification[1] == 1 && fiPClassification[2] == 1 && siPClassification[0] == 1 && siPClassification[1] == 1 && siPClassification[2] == 1) {
      	        cutPath = ("M " + intersectPointX[0] + " " + intersectPointY[0] + " L " + ixCorner[1] + " " + iyCorner[1] + " " + ixCorner[2] + " " + iyCorner[2] + " " + ixCorner[3] + " " + iyCorner[3] + " " + intersectPointX[1] + " " + intersectPointY[1] + " Z");
      	        imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[0].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

              if (fiPClassification[0] == 0 && fiPClassification[1] == 1 && fiPClassification[2] == 1 && siPClassification[0] == 1 && siPClassification[1] == 0 && siPClassification[2] == 1) {
      	        cutPath = ("M " + intersectPointX[0] + " " + intersectPointY[0] + " L " + ixCorner[1] + " " + iyCorner[1] + " " + ixCorner[2] + " " + iyCorner[2] + " " + ixCorner[3] + " " + iyCorner[3] + " " + intersectPointX[1] + " " + intersectPointY[1] + " Z");
      	        imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[0].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

      	      if (fiPClassification[0] == 0 && fiPClassification[1] == 1 && fiPClassification[2] == 0 && siPClassification[0] == 1 && siPClassification[1] == 1 && siPClassification[2] == 1) {
      	        cutPath = ("M " + intersectPointX[0] + " " + intersectPointY[0] + " L " + ixCorner[1] + " " + iyCorner[1] + " " + ixCorner[2] + " " + iyCorner[2] + " " + ixCorner[3] + " " + iyCorner[3] + " " + intersectPointX[1] + " " + intersectPointY[1] + " Z");
      	        imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[0].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

      	      if (fiPClassification[0] == 0 && fiPClassification[1] == 1 && fiPClassification[2] == 0 && siPClassification[0] == 1 && siPClassification[1] == 0 && siPClassification[2] == 1) {
      	        cutPath = ("M " + intersectPointX[0] + " " + intersectPointY[0] + " L " + ixCorner[1] + " " + iyCorner[1] + " " + ixCorner[2] + " " + iyCorner[2] + " " + ixCorner[3] + " " + iyCorner[3] + " " + intersectPointX[1] + " " + intersectPointY[1] + " Z");
      	        imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[0].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

      	      if (fiPClassification[0] == 0 && fiPClassification[1] == 0 && fiPClassification[2] == 1 && siPClassification[0] == 1 && siPClassification[1] == 0 && siPClassification[2] == 1) {
      	        cutPath = ("M " + ixCorner[0] + " " + iyCorner[0] + " L " + ixCorner[1] + " " + iyCorner[1] + " " + ixCorner[2] + " " + iyCorner[2] + " " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " Z");
                imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[3].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

      	      if (fiPClassification[0] == 0 && fiPClassification[1] == 0 && fiPClassification[2] == 1 && siPClassification[0] == 1 && siPClassification[1] == 1 && siPClassification[2] == 1) {
      	        cutPath = ("M " + ixCorner[0] + " " + iyCorner[0] + " L " + ixCorner[1] + " " + iyCorner[1] + " " + ixCorner[2] + " " + iyCorner[2] + " " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " Z");
      	        imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[3].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

      	      if (fiPClassification[0] == 0 && fiPClassification[1] == 0 && fiPClassification[2] == 0 && siPClassification[0] == 1 && siPClassification[1] == 0 && siPClassification[2] == 1) {
      	        cutPath = ("M " + ixCorner[0] + " " + iyCorner[0] + " L " + ixCorner[1] + " " + iyCorner[1] + " " + ixCorner[2] + " " + iyCorner[2] + " " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " Z");
      	        imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[3].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

      	      if (fiPClassification[0] == 0 && fiPClassification[1] == 0 && fiPClassification[2] == 0 && siPClassification[0] == 1 && siPClassification[1] == 1 && siPClassification[2] == 1) {
      	        cutPath = ("M " + ixCorner[0] + " " + iyCorner[0] + " L " + ixCorner[1] + " " + iyCorner[1] + " " + ixCorner[2] + " " + iyCorner[2] + " " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " Z");
      	        imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[3].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

      	      if (fiPClassification[0] == 0 && fiPClassification[1] == 1 && fiPClassification[2] == 0 && siPClassification[0] == 1 && siPClassification[1] == 1 && siPClassification[2] == 0) {
      	        cutPath = ("M " + ixCorner[0] + " " + iyCorner[0] + " L " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " " + ixCorner[2] + " " + iyCorner[2] + " " + ixCorner[3] + " " + iyCorner[3] + " Z");
      	        imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[1].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

      	      if (fiPClassification[0] == 0 && fiPClassification[1] == 1 && fiPClassification[2] == 0 && siPClassification[0] == 1 && siPClassification[1] == 0 && siPClassification[2] == 0) {
      	        cutPath = ("M " + ixCorner[0] + " " + iyCorner[0] + " L " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " " + ixCorner[2] + " " + iyCorner[2] + " " + ixCorner[3] + " " + iyCorner[3] + " Z");
      	        imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[1].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

      	      if (fiPClassification[0] == 0 && fiPClassification[1] == 1 && fiPClassification[2] == 1 && siPClassification[0] == 1 && siPClassification[1] == 1 && siPClassification[2] == 0) {
      	        cutPath = ("M " + ixCorner[0] + " " + iyCorner[0] + " L " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " " + ixCorner[2] + " " + iyCorner[2] + " " + ixCorner[3] + " " + iyCorner[3] + " Z");
      	        imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[1].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

      	      if (fiPClassification[0] == 0 && fiPClassification[1] == 1 && fiPClassification[2] == 1 && siPClassification[0] == 1 && siPClassification[1] == 0 && siPClassification[2] == 0) {
      	        cutPath = ("M " + ixCorner[0] + " " + iyCorner[0] + " L " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " " + ixCorner[2] + " " + iyCorner[2] + " " + ixCorner[3] + " " + iyCorner[3] + " Z");
      	        imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[1].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

      	      if (fiPClassification[0] == 1 && fiPClassification[1] == 0 && fiPClassification[2] == 0 && siPClassification[0] == 0 && siPClassification[1] == 0 && siPClassification[2] == 0) {
      	        cutPath = ("M " + ixCorner[0] + " " + iyCorner[0] + " L " + ixCorner[1] + " " + iyCorner[1] + " " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " " + ixCorner[3] + " " + iyCorner[3] + " Z");
      	        imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[2].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

      	      if (fiPClassification[0] == 1 && fiPClassification[1] == 1 && fiPClassification[2] == 0 && siPClassification[0] == 0 && siPClassification[1] == 0 && siPClassification[2] == 0) {
      	        cutPath = ("M " + ixCorner[0] + " " + iyCorner[0] + " L " + ixCorner[1] + " " + iyCorner[1] + " " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " " + ixCorner[3] + " " + iyCorner[3] + " Z");
      	        imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[2].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

      	      if (fiPClassification[0] == 1 && fiPClassification[1] == 0 && fiPClassification[2] == 0 && siPClassification[0] == 0 && siPClassification[1] == 0 && siPClassification[2] == 1) {
      	        cutPath = ("M " + ixCorner[0] + " " + iyCorner[0] + " L " + ixCorner[1] + " " + iyCorner[1] + " " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " " + ixCorner[3] + " " + iyCorner[3] + " Z");
      	        imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[2].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

      	      if (fiPClassification[0] == 1 && fiPClassification[1] == 1 && fiPClassification[2] == 0 && siPClassification[0] == 0 && siPClassification[1] == 0 && siPClassification[2] == 1) {
      	        cutPath = ("M " + ixCorner[0] + " " + iyCorner[0] + " L " + ixCorner[1] + " " + iyCorner[1] + " " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " " + ixCorner[3] + " " + iyCorner[3] + " Z");
      	        imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[2].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

      	      if (fiPClassification[0] == 0 && fiPClassification[1] == 1 && fiPClassification[2] == 1 && siPClassification[0] == 0 && siPClassification[1] == 0 && siPClassification[2] == 1) {
      	        cutPath = ("M " + ixCorner[1] + " " + iyCorner[1] + " L " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " " + ixCorner[2] + " " + iyCorner[2] + " Z");
      	        imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[0].attr({fill:"rgba(0,0,0,0)"});
                imgHandle[3].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

              if (fiPClassification[0] == 0 && fiPClassification[1] == 1 && fiPClassification[2] == 0 && siPClassification[0] == 0 && siPClassification[1] == 0 && siPClassification[2] == 0) {
      	        cutPath = ("M " + ixCorner[0] + " " + iyCorner[0] + " L " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " " + ixCorner[3] + " " + iyCorner[3] + " Z");
      	        imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[1].attr({fill:"rgba(0,0,0,0)"});
                imgHandle[2].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

      	      if (fiPClassification[0] == 1 && fiPClassification[1] == 1 && fiPClassification[2] == 0 && siPClassification[0] == 1 && siPClassification[1] == 1 && siPClassification[2] == 1) {
      	        cutPath = ("M " + ixCorner[3] + " " + iyCorner[3] + " L " + ixCorner[2] + " " + iyCorner[2] + " " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " Z");
      	        imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[0].attr({fill:"rgba(0,0,0,0)"});
                imgHandle[1].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

              if (fiPClassification[0] == 1 && fiPClassification[1] == 0 && fiPClassification[2] == 0 && siPClassification[0] == 1 && siPClassification[1] == 0 && siPClassification[2] == 1) {
      	        cutPath = ("M " + intersectPointX[1] + " " + intersectPointY[1] + " L " + intersectPointX[0] + " " + intersectPointY[0] + " " + ixCorner[1] + " " + iyCorner[1] + " " + ixCorner[0] + " " + iyCorner[0] + " Z");
      	        imgMask[m] = s.path(cutPath).attr({fill: maskColor});
                imgHandle[2].attr({fill:"rgba(0,0,0,0)"});
                imgHandle[3].attr({fill:"rgba(0,0,0,0)"});
      	        m++;
      	      }

              if (fiPClassification[0] == 0 && fiPClassification[1] == 1 && fiPClassification[2] == 1 && siPClassification[0] == 0 && siPClassification[1] == 0 && siPClassification[2] == 0) {
      	        path1 = ("M " + ixCorner[0] + " " + iyCorner[0] + " L " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " " + ixCorner[3] + " " + iyCorner[3] + " Z");
      	        path2 = ("M " + ixCorner[1] + " " + iyCorner[1] + " L " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " " + ixCorner[2] + " " + iyCorner[2] + " Z");
      	        if (Snap.path.isPointInside(path1, imgCx, imgCy)) {
      	          imgMask[m] = s.path(path1).attr({fill: maskColor});
                  imgHandle[1].attr({fill:"rgba(0,0,0,0)"});
                  imgHandle[2].attr({fill:"rgba(0,0,0,0)"});
      	        } else if (Snap.path.isPointInside(path2, imgCx, imgCy)) {
      	          imgMask[m] = s.path(path2).attr({fill: maskColor});
                  imgHandle[0].attr({fill:"rgba(0,0,0,0)"});
                  imgHandle[3].attr({fill:"rgba(0,0,0,0)"});}
      	        m++;

      	      }

              if (fiPClassification[0] == 0 && fiPClassification[1] == 1 && fiPClassification[2] == 0 && siPClassification[0] == 0 && siPClassification[1] == 0 && siPClassification[2] == 1) {
      	        path1 = ("M " + ixCorner[0] + " " + iyCorner[0] + " L " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " " + ixCorner[3] + " " + iyCorner[3] + " Z");
      	        path2 = ("M " + ixCorner[1] + " " + iyCorner[1] + " L " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " " + ixCorner[2] + " " + iyCorner[2] + " Z");

      	        if (Snap.path.isPointInside(path1, imgCx, imgCy)) {
      	          imgMask[m] = s.path(path1).attr({fill: maskColor});
                  imgHandle[1].attr({fill:"rgba(0,0,0,0)"});
                  imgHandle[2].attr({fill:"rgba(0,0,0,0)"});
      	        } else if (Snap.path.isPointInside(path2, imgCx, imgCy)) {
      	          imgMask[m] = s.path(path2).attr({fill: maskColor});
                  imgHandle[0].attr({fill:"rgba(0,0,0,0)"});
                  imgHandle[3].attr({fill:"rgba(0,0,0,0)"});}
      	        m++;
      	      }

              if (fiPClassification[0] == 1 && fiPClassification[1] == 0 && fiPClassification[2] == 0 && siPClassification[0] == 1 && siPClassification[1] == 1 && siPClassification[2] == 1) {
      	        path1 = ("M " + ixCorner[0] + " " + iyCorner[0] + " L " + ixCorner[1] + " " + iyCorner[1] + " " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " Z");
      	        path2 = ("M " + ixCorner[3] + " " + iyCorner[3] + " L " + ixCorner[2] + " " + iyCorner[2] + " " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " Z");

      	        if (Snap.path.isPointInside(path1, imgCx, imgCy)) {
      	          imgMask[m] = s.path(path1).attr({fill: maskColor});
                  imgHandle[2].attr({fill:"rgba(0,0,0,0)"});
                  imgHandle[3].attr({fill:"rgba(0,0,0,0)"});
      	        } else if (Snap.path.isPointInside(path2, imgCx, imgCy)) {
      	          imgMask[m] = s.path(path2).attr({fill: maskColor});
                  imgHandle[0].attr({fill:"rgba(0,0,0,0)"});
                  imgHandle[1].attr({fill:"rgba(0,0,0,0)"});}
      	        m++;
      	      }

              if (fiPClassification[0] == 1 && fiPClassification[1] == 1 && fiPClassification[2] == 0 && siPClassification[0] == 1 && siPClassification[1] == 0 && siPClassification[2] == 1) {
      	        path1 = ("M " + ixCorner[0] + " " + iyCorner[0] + " L " + ixCorner[1] + " " + iyCorner[1] + " " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " Z");
      	        path2 = ("M " + ixCorner[3] + " " + iyCorner[3] + " L " + ixCorner[2] + " " + iyCorner[2] + " " + intersectPointX[0] + " " + intersectPointY[0] + " " + intersectPointX[1] + " " + intersectPointY[1] + " Z");

      	        if (Snap.path.isPointInside(path1, imgCx, imgCy)) {
      	          imgMask[m] = s.path(path1).attr({fill: maskColor});
                  imgHandle[2].attr({fill:"rgba(0,0,0,0)"});
                  imgHandle[3].attr({fill:"rgba(0,0,0,0)"});
      	        } else if (Snap.path.isPointInside(path2, imgCx, imgCy)) {
      	          imgMask[m] = s.path(path2).attr({fill: maskColor});
                  imgHandle[0].attr({fill:"rgba(0,0,0,0)"});
                  imgHandle[1].attr({fill:"rgba(0,0,0,0)"});}
      	        m++;
      	      }
              //console.log("got to post FI&SIP, got paths!.. ");

      	      minusm = m - 1;
                      //and here we add the mask to the exporting var:
      	      myMaskFrag[minusm] = imgMask[minusm].attr("d");

      	      if (touches == 2)
              {
                maskGroups.attr({mask: imgMask[minusm]});
              }
              if (touches == 1)
              {
      	        maskGroups.add(imgMask[minusm]);
      	        maskGroups.attr({fill: "white"});
                finalGroup = s.group(maskGroups, myImg);
                myImg.attr({mask: maskGroups});
              }

      	    }
              if (touchCuts == 2) {
                //console.log("touchCuts =  2 !!")
                  for(i=0; i<4; i++){
                    imgHandle[i].remove()
                  }
                  /*for(i=1; i<=touches; i++){
                    myLine[i].remove()
                  }*/
                  $(".handleSwitcher").addClass("unseen");
                  //myImgFrag = myImg.outerSVG();
                  $("#mySvg").off( "touchstart mousedown" );
                  $("#mySvg").off( "touchmove mousemove");
                  $("#mySvg").off( "touchend touchcancel mouseup");
                  finalGroup.data({maskF0:myMaskFrag[0],maskF2:myMaskFrag[1], imgURI:myImg.attr("href"), imgX:myImg.attr("x"), imgY:myImg.attr("y"),imgW:myImg.attr("width"),imgH:myImg.attr("height") });
                  finalGroup.ftCreateHandles();

                  $("#editorHolder").css({"overflow-y":"scroll"});
                  $("#leNextStepper").css({"display":"block"});


                  //console.log(myImgFrag);
                  //console.log(myMaskFrag);

                  //$("#mySvg").off();
                  //AND HERE, WE send the fragments & img data to the finalGroup

                  //console.log("the data is: ");console.log(finalGroup.data());
                  //  $("#mySvg").off( "touchend touchcancel mouseup", cutTouchEnd );
                }

      	      myLine[touches].remove();
              Ls=0;
              for (Ls in myLine)
              {
                myLine[Ls].remove();
              }
//      	      touches = touches - 1;

      	    gnStartX = "";
      	    gnStartY = "";
      	    gnEndX = "";
      	    gnEndY = "";
          });

            $("#detailStep").on("touchend mouseup", function(event)
          {

            $("#editorHolder").css({"visibility":"hidden"});
            $("#editorHelper").css({"display":"none"});

            $("#mySvg").css({"visibility":"hidden"});
            $("#mySvg").off( "touchend touchcancel mouseup");

            $("#detailsWindow").css({"display":"block"});
            $("#uploadMyPic").css({"display":"block"});
            $("#timerContainer").css({"display":"none"});

            //admob.cacheInterstitial();// load admob Interstitial

            if(AdMob) AdMob.prepareInterstitial( {adId:'ca-app-pub-5520633259009545/7928666319', autoShow:false} );

            $('#switchFDisplay').click(function(e){
              e.preventDefault(); // The flicker is a codepen thing
              $(this).toggleClass('toggle-on');
            });
          })

            $("#uploadMyPic").on("touchend mouseup", function(event)
            {
              $("#uploadMyPic").css({"display":"none"});
              $("#timerContainer").css({"display":"block"});

          var nextPager =0;

          feedCheck = 0;
          if($('#feedCheck').is(':checked') )
          {
          feedCheck = 1;
          }
          fullImgCheck=0;
          if($('#fullImgCheck').is(':checked') )
          {
          fullImgCheck = 1;
          }

          uploadPicDesc = $('#uploadPicDesc').val();


              function uploadPhoto(imgH, imgW, imgX, imgY, imageURI, mask1, mask2, scale, angle, tx, ty, nextPager) {
                  var options = new FileUploadOptions();
                  options.fileKey="file";
                  options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
                  options.mimeType="image/jpeg";
                  window.localStorage.setItem("lastPhotoUploadFName", (imageURI.substr(imageURI.lastIndexOf('/')+1)));

                  userCalibration = parseFloat(window.localStorage.getItem("myCalibration"));
                  sctpy = ty - (ty*userCalibration);

                  if(window.localStorage.getItem("myCalibration") == "hateToMakeYouSadButUrOnUrOwn")
                  {
                  sctpy = ty ;
                  }
                  window.localStorage.setItem("history", "feed");
                  //console.log("Sending TY = "+sctpy+"\n");
                  var params = new Object();
                  params.user = window.localStorage.getItem("loggedAs");
                  params.tracker = window.localStorage.getItem("tracker");
                  params.uuid = device.uuid;
                  params.devModel = device.version;
                  params.devPlatform = device.platform;
                  params.kollaj = "primary";
                  params.imgH = imgH;
                  params.imgW = imgW;
                  params.imgX = imgX;
                  params.imgY = imgY;
                  params.mask1 = mask1;
                  params.mask2 = mask2;
                  params.angle = angle;
                  params.scale = scale;
                  params.tx = tx;
                  params.ty = sctpy;
                  params.nextPager = nextPager;
                  params.feedCheck = feedCheck;
                  params.fullImgCheck = fullImgCheck;
                  params.uploadPicDesc = uploadPicDesc;


                  options.params = params;
                  options.chunkedMode = false;

                  var ft = new FileTransfer();
                  ft.upload(imageURI, "https://kollaj.net/bouncer.php", win, fail, options);
              }

              function win(r) {
          // here we redirect the user to the uploaded image, dont forget this XD

          //          alert("Code = " + r.responseCode.toString()+"\n");
          //        $("#uploadPicDesc").val("Response = " + r.response.toString()+"\n");
          //          alert("Sent = " + r.bytesSent.toString()+"\n");
                  //alert("Code Slayer!!!");
                  var the400kwh = Math.floor(Math.random()*(42-1+1)+1);
                  //alert (the400kwh);
                  if (the400kwh > 0)
                  {
                    if(AdMob) AdMob.showInterstitial();

                    window.localStorage.setItem("history", "feed");
                    if(window.localStorage.getItem("modal")==1)
                    {
                      window.localStorage.setItem("modal", 0);
                      $modal = $('.modal-frame');
                      $overlay = $('.modal-overlay');
                      $overlay.removeClass('state-show');
                      $modal.removeClass('state-appear').addClass('state-leave');
                    }

                    $('#vibeView').css({"display":"none"});

                    if($("#msg").is(":hidden")){messageState = 0}else{messageState = 1}
                    if($("#vibes").is(":hidden")){notificationState = 0}else{notificationState = 1}
                    if($("#chat").is(":visible")){chatState = 1}else{chatState = 0}

                    if(messageState == 1) {$("#msg").toggle()};
                    if(notificationState == 1) {$("#vibes").toggle()};
                    if(chatState == 1) {$("#chat").css({"display":"none"});$(".chatbox").css({"display":"none"})};

                    $("#profile").css({"display":"none"});
                    $("#searchRes").css({"display":"none"});
                    $("#feed").css({"display":"block"});
                    $("#feedRes").css({"display":"block"});
                    $("#mySvg").css({"display":"none"});

                    var arr = {canYou:"showMeMyFeed", myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform, roffset:0};
                    identify(arr);

                  }

                  stopper = 2;
                  $("#detailsWindow").css({"display":"none"});
                  $("#header").css({"display":"block"});
                  $("#mainNav").css({"visibility":"visible"});

                    $("#profile").css({"display":"none"});
                    $("#searchRes").css({"display":"none"});
                    $("#feed").css({"display":"block"});
                    $("#feedRes").css({"display":"block"});
                    $("#mySvg").css({"display":"none"});

              }

          // in case of error, we gotta say smth honestly lel SEE
              function fail(error) {
                  alert("An error has occurred: Code = " + error.code);

                  window.localStorage.setItem("history", "feed");

                  var arr = { canYou: "showMeMyFeed", myName: window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform: device.platform, roffset: 0 };
                  identify(arr);

                  $("#profile").css({ "display": "none" });
                  $("#searchRes").css({ "display": "none" });
                  $("#feed").css({ "display": "block" });
                  $("#feedRes").css({ "display": "block" });
                  $("#mySvg").css({ "display": "none" });

              }
              //console.log(window.localStorage.getItem("lastPhotoUploadFName")+ " and "+finalGroup.data("imgURI"));
              if(window.localStorage.getItem("lastPhotoUploadFName") != (finalGroup.data("imgURI").substr(finalGroup.data("imgURI").lastIndexOf('/')+1)) )
              {
              uploadPhoto(finalGroup.data("imgH") , finalGroup.data("imgW"), finalGroup.data("imgX") , finalGroup.data("imgY") , finalGroup.data("imgURI") , finalGroup.data("maskF0") , finalGroup.data("maskF2") , finalGroup.data("scale") , finalGroup.data("angle") , finalGroup.data("tx") , finalGroup.data("ty") , nextPager);
              $("#uploadMyPic").off("touchend mouseup");
              }

              return false;
            })

};
      function cutTouchStart (event, s, touches, centerPoint, myLine, gnStartX, gnStartY) {
	    myLine[touches] = s.line(gnStartX, gnStartY, gnStartX + 1, gnStartY + 1);
	    centerPoint.attr({
	      fill: "rgba(250,89,152, 0.2)"
	    });
	  };
	  function cutTouchMove(event, s, touches, centerPoint, myLine, gnStartX, gnStartY, gnEndX, gnEndY) {
      myLine[touches].attr({x1: gnStartX, y1: gnStartY, x2: gnEndX, y2: gnEndY, strokeWidth: 2, stroke: "rgba(0,0,0,0.4)",strokeLinecap: "round",strokeDasharray: 5});
	    centerPoint.attr({fill: "rgba(250,89,152, 0.5)"});
	  };




        var i=0;
        function welder (ih, iw, ix, iy, iURI, m1, m2, ang, scl, itx, ity)
        {
          function calcDistance(x1, y1, x2, y2) {
          return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
        }

          var s = Snap("#profileSVG");
          s.clear();//just add this piece of magic....
          //Crossbrowser window Width
          var width = document.getElementById("profileSVG").clientWidth;
          //Crossbrowser window Height
          var height = document.getElementById("profileSVG").clientHeight;

          var myImg = s.image(iURI, ix, iy, iw, ih);
          var mask1=s.path(m1).attr({fill:"white"});
          var mask2=s.path(m2).attr({fill:"white"});
          var maskGroups = s.group()

          maskGroups.add(mask1);
          maskGroups.attr({fill: "white"});

          finalGroup = s.group(maskGroups, myImg);

          myImg.attr({mask: maskGroups})
          maskGroups.attr({mask: mask2});

          var width = document.getElementById("profileSVG").clientWidth;
          var height = document.getElementById("profileSVG").clientHeight;

          maxWidth = width - (width/9);
          scaleF = maxWidth/iw;
          lftDis = itx*scaleF;
          topDis = ity*scaleF;
          absXCenter = (width/2);
          absYCenter = (height/2);

          var bb = finalGroup.getBBox();
          var diffX = absXCenter - bb.cx;
          var diffY = absYCenter - bb.cy;

          finalGroup.transform('T' + diffX + ',' + diffY + 'S'+scaleF+'R0');

          moveGroup=s.group(finalGroup);
//          console.log("first move, follow secondmove");
          moveGroup.transform('t' + lftDis + ',' + topDis + 's'+scl+'r'+ang);
          if (i==0)
          {
          var bb =moveGroup.getBBox();
          nd=(0-bb.cy)*2;
          //console.log(nd);
          moveGroup.transform('t' + lftDis + ',' + nd + 's'+scl+'r'+ang);
            i++;
          }
//         ("in place!?");
          return false;
        }

        function bringInTheAlertWindow()
        {
          window.localStorage.setItem("modal", 1);

          $("#whoAmIFollowing").css({"display":"none"});
          $("#whoAreMyFollowers").css({"display":"none"});

          $("#infiniteScrollModal").css({"display":"none"});
          $("#dasModal").css({"display":"block"});
          $("#dasModal").html("<p style='margin-top: 4rem;line-height: 1.4rem;font-size: 1.1rem; font-weight: 500;'> Thank you for the Alert! <br/> A human being will review this post very soon!</p>");
          $('.close').css({"top":"27%"});

          $modal = $('.modal-frame');
          $overlay = $('.modal-overlay');

           /* Need this to clear out the keyframe classes so they dont clash with each other between ener/leave. Cheers. */
           $modal.bind('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
             if($modal.hasClass('state-leave')) {
               $modal.removeClass('state-leave');
             }
           });

           $('.close').on('click', function(){
             window.localStorage.setItem("modal", 0);
             $overlay.removeClass('state-show');
             $modal.removeClass('state-appear').addClass('state-leave');
           });

           $overlay.addClass('state-show');
           $modal.removeClass('state-leave').addClass('state-appear');
        }


function bringInThePostSeeWindow(imgl)
{
  window.localStorage.setItem("modal", 1);

  $("#whoAmIFollowing").css({"display":"none"});
  $("#whoAreMyFollowers").css({"display":"none"});

  var arr = {canYou:"gimmeDatPostNfo", myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform, datPost:imgl};
  identify(arr);
  $("#infiniteScrollModal").css({"display":"none"});
  $("#dasModal").css({"display":"block"});
  $('.close').css({"top":"27%"});

  $modal = $('.modal-frame');
  $overlay = $('.modal-overlay');

   /* Need this to clear out the keyframe classes so they dont clash with each other between ener/leave. Cheers. */
   $modal.bind('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
     if($modal.hasClass('state-leave')) {
       $modal.removeClass('state-leave');
     }
   });

   $('.close').on('click', function(){
     window.localStorage.setItem("modal", 0);
     $overlay.removeClass('state-show');
     $modal.removeClass('state-appear').addClass('state-leave');
   });

   $overlay.addClass('state-show');
   $modal.removeClass('state-leave').addClass('state-appear');

  //console.log("trying to retrieve thePostSeeWindow for "+imgl);
}


function callDaProfileMenu(daProfile)
{
  $("#whoAmIFollowing").css({"display":"none"});
  $("#whoAreMyFollowers").css({"display":"none"});

  //lil' fix
  if (window.localStorage.getItem("history") == "profileMenu" || window.localStorage.getItem("history")=="profile" || window.localStorage.getItem("history"=="smProfile"))
  {
    window.localStorage.setItem("modal", 0);
  }

  if(window.localStorage.getItem("modal") != 0 && window.localStorage.getItem("modal") != 'null' )
  {
    //console.log("fireA")
    $modal = $('.modal-frame');
    $overlay = $('.modal-overlay');
    window.localStorage.setItem("modal", 0);
    $overlay.removeClass('state-show');
    $modal.removeClass('state-appear').addClass('state-leave');
  }
  else {
    //console.log("fireB")
    $("#whoAmIFollowing").css({"display":"none"});
    $("#whoAreMyFollowers").css({"display":"none"});
    window.localStorage.setItem("modal", 1);
    window.localStorage.setItem("forProfile", 0);

    $("#deepMenu").css({"display":"none"});
    $('.close').css({"top":"6.5rem"});
    $("#dasModal").html("");
    $("#infiniteScrollModal").css({"display":"block"});

    if (daProfile !== window.localStorage.getItem("loggedAs"))
    {
      window.localStorage.setItem('history', 'smProfile');
      window.localStorage.setItem('historyPMen', daProfile);
      //console.log("otherPplsProf");
      var arr = {canYou:"gimmeDatProfileNfo", myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform, datProfile:daProfile};
      identify(arr);
    }
    else {
      $("#section-one").html("Following <span style='font-weight:200'> > </span>");
      $("#section-two").html(" <span style='font-weight:200'> > </span> Followers");
      $("#section-three").html("Avatar, Bio & Settings");
      $("#section-four").html("Sign Out!");
      $("#last").html("About Kollaj");

      $("#last").css({"display":"block"});



      theCss = $("#whereuputurppic").css("background-image");
      $("#ppicindaModal").css({"background-image":theCss});

      $("#section-one").one('click',function()
      {
        if(window.localStorage.getItem("forProfile") != 1)
        {
          window.localStorage.setItem('history', 'profileMenu');
          window.localStorage.setItem('historyPMen', window.localStorage.getItem("loggedAs"));
          $("#infiniteScrollModal").css({"display":"none"});
          $("#dasModal").css({"display":"none"});
          $("#deepMenu").css({"display":"none"});
          $("#whoAmIFollowing").css({"display":"block"});
          $("#whoAreMyFollowers").css({"display":"none"});
          var arr = {canYou:"tellMeWhoIFollow", myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform};
          identify(arr);

          //console.log("profile-pic opt!");
        }
        return false;
      });
      $("#section-two").one('click',function()
      {
        if(window.localStorage.getItem("forProfile") != 1)
        {
          window.localStorage.setItem('history', 'profileMenu');
          window.localStorage.setItem('historyPMen', window.localStorage.getItem("loggedAs"));
          $("#infiniteScrollModal").css({"display":"none"});
          $("#dasModal").css({"display":"none"});
          $("#deepMenu").css({"display":"none"});
          $("#whoAmIFollowing").css({"display":"none"});
          $("#whoAreMyFollowers").css({"display":"block"});

          var arr = {canYou:"tellMeWhoFollowsMe", myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform};
          identify(arr);

          //console.log("profile-desc opt!");
          return false;
        }
        return false;
      });
      $("#section-three").one('click',function()
      {
        if(window.localStorage.getItem("forProfile") != 1)
        {
          window.localStorage.setItem('history', 'profileMenu');
          window.localStorage.setItem('historyPMen', window.localStorage.getItem("loggedAs"));
          $("#deepMenu").css({"display":"block"});
          $("#deepMenuChooser").css({"display":"block"});
          $("#myNameSet").css({"display":"none"});
          $("#myBioSet").css({"display":"none"});
          $("#myPassSet").css({"display":"none"});
          $("#myEmailSet").css({"display":"none"});
          //console.log("profile-security opt!");
          return false;
        }
      });
      $("#section-four").one('click',function()
      {
        if(window.localStorage.getItem("forProfile") != 1)
        {
          window.localStorage.setItem('history', 'profileMenu');
          window.localStorage.setItem('modal', 0);
          window.localStorage.setItem('historyPMen', window.localStorage.getItem("loggedAs"));
          //console.log("profile-sign-out opt!");
          var arr = {canYou:"sayBye", myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform};
          identify(arr);
          return false;
        }
      });
      $("#last").one('click',function()
      {
        if(window.localStorage.getItem("forProfile") != 1)
        {
          window.localStorage.setItem('history', 'profileMenu');
          window.localStorage.setItem('historyPMen', window.localStorage.getItem("loggedAs"));
          $("#mainContainer").css({"display":"none"});
          $(".modal-frame").css({"display":"none"});
          $("#header").css({"display":"none"});
          $("#abt").css({"display":"block"});
          //console.log("About Kollaj!");
          return false;
        }
      });


  }


      //console.log("ur profile");
  }


  $modal = $('.modal-frame');
  $overlay = $('.modal-overlay');

   /* Need this to clear out the keyframe classes so they dont clash with each other between ener/leave. Cheers. */
   $modal.bind('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
     if($modal.hasClass('state-leave')) {
       $modal.removeClass('state-leave');
     }
   });

   $('.close').on('click', function(){
     window.localStorage.setItem("modal", 0);
     $overlay.removeClass('state-show');
     $modal.removeClass('state-appear').addClass('state-leave');
   });

   $overlay.addClass('state-show');
   $modal.removeClass('state-leave').addClass('state-appear');

  //console.log("trying to retrieve daProfileMenu for "+daProfile);
}




window.localStorage.setItem('history', 'feed');
    //console.log("alo!");
      var rafID;

      var dragEl = document.getElementById('picker')
      var ulEl = document.getElementById('mood-list')
      var ulHeight = ulEl.offsetHeight
      var liEls = ulEl.querySelectorAll('li')
      var liCount = liEls.length
      var liHeight = ulHeight / liCount
      var currentActive = 9;
      var distance = 1;
      var position = ulHeight;
      var velocity = 5;
      var friction = 0.8;
      var isDragging = false;
      var dragPositionY = position;
      var targetBound = 15;
      var attractionStrength = 0.05;
      var topBound = 0;
      var bottomBound = ulHeight - liHeight;

      function inverse(num, min, max) {
        return (max + min) - num;
      }

      function animate() {
        update();
        render();
        // stop animation loop if inertia has ended
        if (Math.round(Math.abs(velocity) * 100) / 100 <= 0.01 && !isDragging) {
          //console.log("stopping  due to inertia");
          carefullyPutItBackThere()
        } else {
          rafID = requestAnimationFrame( animate );
        }
      }

      function getThatThingOutOfThere() {
        if (!rafID) {
          isDragging = true;
          animate();
        }
        cntr =1;
      }

      function carefullyPutItBackThere() {
        if (rafID) {
          cancelAnimationFrame(rafID);

          window.localStorage.setItem("currentVote",inverse(currentActive, 0, liCount));
          $("#thatThing").css({"display":"none"});
          $("#header").css({"display":"block"});
          vibes = window.localStorage.getItem("currentVote");
          imVibing = window.localStorage.getItem("gonnaVoteFor");

          if(imVibing != 0)
          {
            var arr = {canYou:"letMeVibeAPost", myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform, imVibing: imVibing, vibes:vibes};
            identify(arr);
          }

          window.localStorage.setItem("currentVote","NaN")
          window.localStorage.setItem("gonnaVoteFor", 0);
          rafID = undefined;
        }
      }


      function applyTopBoundForce() {
        if ( isDragging || position >= topBound ) {
          return;
        }
        // bouncing past bound
        var distance = topBound+1 - position;
        var force = distance * 0.1;
        // calculate resting position with this force
        var rest = position + ( velocity + force ) / ( 1 - friction );
        // apply force if resting position is out of bounds
        if ( rest <= topBound ) {
          applyForce( force );
          return;
        }
        // if in bounds, apply force to align at bounds
        force = distance * 0.1 - velocity;
        applyForce( force );
      }

      function applyBottomBoundForce() {
        if ( isDragging || position < bottomBound ) {
          return;
        }
        var distance = bottomBound - position;
        var force = distance * 0.1;
        var rest = position + ( velocity + force ) / ( 1 - friction );
        if ( rest > bottomBound ) {
          applyForce( force );
          return;
        }
        force = distance * 0.1 - velocity;
        applyForce( force );
      }


      function update() {
        applyTopBoundForce();
        applyBottomBoundForce();

        // create attraction points for each <li>
        for (var i = 0; i < liCount; i++) {
          var element = i * liHeight;
          currentActive = Math.round(position / liHeight);
          attract(element);


          // current active cant be less than 0
          if (currentActive < 0) {
            currentActive = 0
          }
          // current active cant be more than the number of <li>
          if (currentActive >= liCount) {
            currentActive = liCount - 1
          }


            // only change classes when inertia has come to rest to avoid dom thrash
          if (Math.floor(Math.abs(velocity)) !== 0) {
            liEls[i].classList.remove('active');
            liEls[currentActive].classList.add('active');

           if (currentActive==0)
             {
           $("#thatThing").css({"background":"#a91bb0"})
                 }
           if (currentActive==1)
             {
           $("#thatThing").css({"background":"#bd2867"})
                 }
           if (currentActive==2)
             {
           $("#thatThing").css({"background":"#b80808"})
                 }
           if (currentActive==3)
             {
           $("#thatThing").css({"background":"#f77a0c"})
                 }
           if (currentActive==4)
             {
           $("#thatThing").css({"background":"#f1ab00"})
               }
           if (currentActive==5)
             {
           $("#thatThing").css({"background":"#f8ea08"})
               }
           if (currentActive==6)
             {
           $("#thatThing").css({"background":"#b7f808"})
               }
           if (currentActive==7)
             {
           $("#thatThing").css({"background":"#73de3f"})
               }
           if (currentActive==8)
             {
           $("#thatThing").css({"background":"#1acf80"})
               }
           if (currentActive==9)
             {
           $("#thatThing").css({"background":"#07aeb0"})
               }

          }

        }

        // drag
        applyDragForce();
        // integrate physics
        velocity *= friction;
        position += velocity;
      }

      function attract( target ) {
        // attraction
        distance = target - position;
        // attract if within bounds
        var attraction = Math.abs( distance ) <= targetBound ? distance * attractionStrength : 0;
        applyForce( attraction );
      }

      function applyForce( force ) {
        velocity += force;
      }

      function applyDragForce() {
        if ( !isDragging ) {
          return;
        }
        var dragVelocity = dragPositionY - position;
        var dragForce = dragVelocity - velocity;
        applyForce( dragForce );
      }

      function render() {
        position = Math.round(position * 100) / 100
        dragEl.style.transform = `translateY(${position}px)`
      }


      // ----- interaction events ----- //

      var interactionY;
      var dragStartPositionY;

      dragEl.addEventListener( 'touchstart', function( event ) {
        cntr = 1;
        velocity = 1;

        getThatThingOutOfThere()
        isDragging = true;
        interactionY = event.touches[0].pageY;

        dragStartPositionY = position;
        setDragPosition( event );
        window.addEventListener( 'touchmove', setDragPosition );
        window.addEventListener( 'touchend', onInteractionEnd );
      });

      dragEl.addEventListener( 'mousedown', function( event ) {

        velocity = 1;

        getThatThingOutOfThere()
        isDragging = true;
        interactionY = event.pageY;
        dragStartPositionY = position;


        setDragPosition( event );
        window.addEventListener( 'mousemove', setDragPosition );
        window.addEventListener( 'mouseup', onInteractionEnd );
      });

      function setDragPosition( event ) {
        var move;
        if (event.type === 'touchmove' || event.type === 'touchstart') {
          move = event.touches[0].pageY - interactionY;
        } else {
          move = event.pageY - interactionY;
        }
        dragPositionY = dragStartPositionY + move;
        //event.preventDefault();
        return false;
      }

      function onInteractionEnd() {
        isDragging = false;
        window.removeEventListener( 'mousemove', setDragPosition );
        window.removeEventListener( 'mouseup', onInteractionEnd );
        window.removeEventListener( 'touchmove', setDragPosition );
        window.removeEventListener( 'touchend', onInteractionEnd );
      }
      getThatThingOutOfThere();
      $("#thatThing").css({"display":"none"});
      $("#mySvg").css({"display":"none"});


      $("#questionIcon").on('touchend touchcancel mouseup', function(event) {
        if($("#helpHolder").is(":hidden")){hHolder = 0}else{hHolder = 1}
        if(hHolder == 0)
        {
          $("#helpHolder").css({"display":"block"});
        }
        if(hHolder == 1)
        {
          $("#helpHolder").css({"display":"none"});
        }

        if($("#calibrateHolder").is(":hidden")){cHolder = 0}else{cHolder = 1}
        if(cHolder == 1)
        {
          $("#calibrateHolder").css({"display":"none"});
        }

        //console.log("THEY ARE CALLING ME!!!!");
        event.preventDefault();
      });
      $("#calibrationTool").on('touchend touchcancel mouseup', function(event) {
        if($("#calibrateHolder").is(":hidden")){cHolder = 0}else{cHolder = 1}
        if(cHolder == 0)
        {
          $("#calibrateHolder").css({"display":"block"});
        }
        if(cHolder == 1)
        {
          $("#calibrateHolder").css({"display":"none"});
        }

        if($("#helpHolder").is(":hidden")){hHolder = 0}else{hHolder = 1}
        if(hHolder == 1)
        {
          $("#helpHolder").css({"display":"none"});
        }

        event.preventDefault();
      });

      if(window.localStorage.getItem('myCalibration') === null || window.localStorage.getItem('myCalibration') == "undefined" || window.localStorage.getItem('myCalibration') == "hateToMakeYouSadButUrOnUrOwn")
      {
        var arr = {canYou:"calibrateMePLZ", uuid: device.uuid, model: device.model, manufacturer:device.manufacturer};
        identify(arr);
      }

      var calibrationRanger = document.querySelector('#calibrationRanger');

      var rangeValue = function(){
        var newValue = calibrationRanger.value;
        var target = document.querySelector('.calibrationValue');
        target.innerHTML = newValue;
      }

      var rangeUpdate = function(){
        if(window.localStorage.getItem('myCalibration') != newValue )
        {
          var newValue = calibrationRanger.value;
          window.localStorage.setItem("myCalibration", newValue);
          var arr = {canYou:"letMeCalibrateThisShit", myName:window.localStorage.getItem("loggedAs"), whatShallBeIt: newValue, tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform, model: device.model, manufacturer: device.manufacturer};
          identify(arr);
        }
      }

      calibrationRanger.addEventListener("input", rangeValue);
      calibrationRanger.addEventListener("touchend", rangeUpdate);
      calibrationRanger.addEventListener("mouseup", rangeUpdate);

      $("#setMyAvatar").on('touchend mouseup', function(event) {

        navigator.camera.getPicture(onSuccess, onFail, {
          quality: 100,
          destinationType: Camera.DestinationType.NATIVE_URI,
          sourceType: 0,
          encodingType: Camera.EncodingType.JPEG,
          allowEdit: false,
          encodingType: 0,
          targetWidth: 1920,
          targetHeight: 1080,
          direction: 0,
          saveToPhotoAlbum: true
        });

        function onSuccess(imageData) {
          //just to be sure

            function setRepresenter(imageURI) {
                var options = new FileUploadOptions();
                options.fileKey="file";
                options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
                options.mimeType="image/jpeg";

                var params = new Object();
                params.user = window.localStorage.getItem("loggedAs");
                params.tracker = window.localStorage.getItem("tracker");
                params.uuid = device.uuid;
                params.devModel = device.version;
                params.devPlatform = device.platform;
                params.iHave = "choosenToRepresent";

                options.params = params;
                options.chunkedMode = false;

                var ft = new FileTransfer();
                ft.upload(imageURI, "https://kollaj.net/bouncer.php", win, fail, options);
            }

            function win(r) {
        // here we redirect the user to the uploaded image, dont forget this XD
        $modal = $('.modal-frame');
        $overlay = $('.modal-overlay');
        window.localStorage.setItem("modal", 0);
        $overlay.removeClass('state-show');
        $modal.removeClass('state-appear').addClass('state-leave');
        var arr = {canYou:"showMeSomeProfile", myName:window.localStorage.getItem("loggedAs"), seeProfile:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform, proffset: window.localStorage.getItem("mproffset") };
        identify(arr);
        //          alert("Code = " + r.responseCode.toString()+"\n");
        //        $("#uploadPicDesc").val("Response = " + r.response.toString()+"\n");
        //          alert("Sent = " + r.bytesSent.toString()+"\n");
                //alert("Code Slayer!!!");
            }

        // in case of error, we gotta say smth honestly lel SEE
            function fail(error) {
                alert("An error has occurred: Code = " + error.code);
            }

            setRepresenter(imageData);
            $("#deepMenu").css({"display":"none"});

        }

        function onFail(message) {
            $("#deepMenu").css({"display":"none"});
        }

        return false;
      });

            $("#setMyName").on('touchend mouseup', function(event) {
              $("#deepMenuChooser").css({"display":"none"});
              $("#myNameSet").css({"display":"block"});
              if (window.localStorage.getItem("realName") != null)
              {
              $("#myNameIs").val(window.localStorage.getItem("realName"))
              }
              else {
                var arr = {canYou:"giveMeMyName", myName:window.localStorage.getItem("loggedAs"), seeProfile:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform };
                identify(arr);
              }
              return false;
            });

            $("#myNameSaver").on('touchend mouseup', function(event) {
              myNewName = $("#myNameIs").val();
              var arr = {canYou:"setMyName", myNewName:myNewName, myName:window.localStorage.getItem("loggedAs"), seeProfile:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform };
              identify(arr);
              $("#deepMenuChooser").css({"display":"block"});
              $("#myNameSet").css({"display":"none"});
              $("#deepMenu").css({"display":"none"});
              $modal = $('.modal-frame');
              $overlay = $('.modal-overlay');
              window.localStorage.setItem("modal", 0);
              $overlay.removeClass('state-show');
              $modal.removeClass('state-appear').addClass('state-leave');
              return false;
            });


            $("#setMyBio").on('touchend mouseup', function(event) {
              $("#deepMenuChooser").css({"display":"none"});
              $("#myBioSet").css({"display":"block"});
              if (window.localStorage.getItem("myBio") != null)
              {
              $("#currentBio").html(window.localStorage.getItem("myBio"))
              }
              else {
                var arr = {canYou:"giveMeMyBio", myName:window.localStorage.getItem("loggedAs"), seeProfile:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform };
                identify(arr);
              }
              return false;
            });


            $("#myBioSaver").on('touchend mouseup', function(event) {
              myNewBio = $("#myBioIs").val();
              var arr = {canYou:"setMyBio", myNewBio:myNewBio, myName:window.localStorage.getItem("loggedAs"), seeProfile:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform };
              identify(arr);
              $("#deepMenuChooser").css({"display":"block"});
              $("#myBioSet").css({"display":"none"});
              $("#deepMenu").css({"display":"none"});
              $modal = $('.modal-frame');
              $overlay = $('.modal-overlay');
              window.localStorage.setItem("modal", 0);
              $overlay.removeClass('state-show');
              $modal.removeClass('state-appear').addClass('state-leave');
              return false;
            });


            $("#setMyEmail").on('touchend mouseup', function(event) {
              $("#deepMenuChooser").css({"display":"none"});
              $("#myEmailSet").css({"display":"block"});
              if (window.localStorage.getItem("myEmail") != null)
              {
              $("#myEmailIs").val(window.localStorage.getItem("myEmail"))
              }
              else {
                var arr = {canYou:"giveMeMyMail", myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform };
                identify(arr);
              }
              return false;
            });

            $("#myEmailIs").on("change paste keyup", function() {
            email =$(this).val();
            var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if(re.test(email))
            {
              $(this).css({background:"rgba(0,255,0,0.4)"})
              emailPass=1;
            }
            else {
              $(this).css({background:"rgba(255,0,0,0.4)"})
              emailPass=0;
            }

            if(emailPass == 1)
            {
              var arr = {canYou:"doEmailThings", iWanna:"justSearch", myNewEmail:email, myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform };
              identify(arr);
            }
            });


            $("#myEmailSaver").on('touchend mouseup', function(event) {
              if(window.localStorage.getItem("emailCheck") == "yes")
              {
                myNewEmail = $("#myEmailIs").val();
                var arr = {canYou:"doEmailThings", myNewEmail:myNewEmail, iWanna:"imGonnaUpdate", myName:window.localStorage.getItem("loggedAs"), seeProfile:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform };
                identify(arr);
                $("#deepMenuChooser").css({"display":"block"});
                $("#myNameSet").css({"display":"none"});
                $("#deepMenu").css({"display":"none"});
                $modal = $('.modal-frame');
                $overlay = $('.modal-overlay');
                window.localStorage.setItem("modal", 0);
                $overlay.removeClass('state-show');
                $modal.removeClass('state-appear').addClass('state-leave');
                return false;

              }
              });

              $("#setMyPass").on('touchend mouseup', function(event) {
                $("#deepMenuChooser").css({"display":"none"});
                $("#myPassSet").css({"display":"block"});
                return false;
              });

              $("#myPassSaver").on('touchend mouseup', function(event) {
                myOldPass = $("#myOldPass").val();
                myNewPass = $("#myNewPass").val();
                ohAndMyOldPassCryptedAsWell = keccak_384(myOldPass)
                myNewSuperCryptoMegaPassYoMaMen = keccak_384(myNewPass);
                var arr = {canYou:"changeMyPass", myOldPass:ohAndMyOldPassCryptedAsWell, myNewPass:myNewSuperCryptoMegaPassYoMaMen, myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform };
                identify(arr);
                return false;
              });

              if(window.localStorage.getItem('modal') == 0)
              {
                $modal = $('.modal-frame');
                $overlay = $('.modal-overlay');
                window.localStorage.setItem("modal", 0);
                $overlay.removeClass('state-show');
                $modal.removeClass('state-appear').removeClass('state-leave');
              }

              document.addEventListener("backbutton", function(e){
              ahistory = window.localStorage.getItem('history');
              //console.log ("automated goto: " + ahistory);
              if(ahistory == "exit") {
                navigator.app.backHistory()
              }
              if(ahistory == "loginContainer")
              {
                $("#registerContainer").toggle();
                $("#linputContainer").toggle();
                window.localStorage.setItem("history", "exit");
              }
              if(ahistory == "thatThing")
              {
                carefullyPutItBackThere();
                window.localStorage.setItem("history", "feed");
                if(window.localStorage.getItem("modal")==1)
                {
                  window.localStorage.setItem("history", "smProfile");
                }
              }
              if(ahistory == "feed"){
                  e.preventDefault();
                  window.localStorage.setItem('history', "exit");

                  $("#header").css({"display":"block"});
                  $("#mainNav").css({"visibility":"visible"});
                  $("#mySvg").css({"display":"none"});
                  $("#editorHolder").css({"visibility":"hidden"});
                  $("#editorHelper").css({"display":"none"});
                  $("#lesArrowHolder").css({"display":"none"});
                  $("#leNextStepper").css({"display":"none"});

                  if(window.localStorage.getItem("modal")==1)
                  {
                    window.localStorage.setItem("modal", 0);
                    $modal = $('.modal-frame');
                    $overlay = $('.modal-overlay');
                    $overlay.removeClass('state-show');
                    $modal.removeClass('state-appear').addClass('state-leave');
                  }
                  $('#vibeView').css({"display":"none"});
                  if($("#msg").is(":hidden")){messageState = 0}else{messageState = 1}
                  if($("#vibes").is(":hidden")){notificationState = 0}else{notificationState = 1}
                  if($("#chat").is(":visible")){chatState = 1}else{chatState = 0}
                  if(messageState == 1) {$("#msg").toggle()};
                  if(notificationState == 1) {$("#vibes").toggle()};
                  if(chatState == 1) {$("#chat").css({"display":"none"});$(".chatbox").css({"display":"none"})};
                  $("#profile").css({"display":"none"});
                  $("#searchRes").css({"display":"none"});
                  $("#feed").css({"display":"block"});
                  $("#feedRes").css({"display":"block"});
                  $("#mySvg").css({"display":"none"});
              }
              if(ahistory == "search")
              {
                e.preventDefault();
                window.localStorage.setItem('history', "feed");
                if(window.localStorage.getItem("modal")==1)
                {
                  window.localStorage.setItem("modal", 0);
                  $modal = $('.modal-frame');
                  $overlay = $('.modal-overlay');
                  $overlay.removeClass('state-show');
                  $modal.removeClass('state-appear').addClass('state-leave');
                }
                $('#vibeView').css({"display":"none"});
                if($("#msg").is(":hidden")){messageState = 0}else{messageState = 1}
                if($("#vibes").is(":hidden")){notificationState = 0}else{notificationState = 1}
                if($("#chat").is(":visible")){chatState = 1}else{chatState = 0}
                if(messageState == 1) {$("#msg").toggle()};
                if(notificationState == 1) {$("#vibes").toggle()};
                if(chatState == 1) {$("#chat").css({"display":"none"});$(".chatbox").css({"display":"none"})};
                $("#feed").css({"display":"block"});
                $("#mySvg").css({"display":"none"});
                $("#feedRes").css({"display":"none"});
                $("#searchRes").css({"display":"block"});
                $("#profile").css({"display":"none"});
              }
              if(ahistory == "smProfile")
              {
                $modal = $('.modal-frame');
                $overlay = $('.modal-overlay');
                window.localStorage.setItem("modal", 0);
                $overlay.removeClass('state-show');
                $modal.removeClass('state-appear').addClass('state-leave');
              }
              if(ahistory == "profile")
              {
                if(window.localStorage.getItem("modal") != 0 && window.localStorage.getItem("modal") != 'null' )
                {
                  $modal = $('.modal-frame');
                  $overlay = $('.modal-overlay');
                  window.localStorage.setItem("modal", 0);
                  $overlay.removeClass('state-show');
                  $modal.removeClass('state-appear').addClass('state-leave');
                }

                $("#mySvg").css({"display":"none"});
                var arr1 = {canYou:"giveMeMyStats", myName:window.localStorage.getItem("loggedAs"), tracker: window.localStorage.getItem("tracker"), uuid: device.uuid, devModel: device.version, devPlatform:device.platform}
                identify (arr1);
                if($("#msg").is(":hidden")){messageState = 0}else{messageState = 1}
                if($("#vibes").is(":hidden")){notificationState = 0}else{notificationState = 1}
                if($("#chat").is(":visible")){chatState = 1}else{chatState = 0}
                if($("#takePicture").is(":visible")){takePictureState = 1}else{takePictureState = 0}
                if(messageState == 1) {$("#msg").toggle()};
                if(notificationState == 1) {$("#vibes").toggle()};
                if(chatState == 1) {$("#chat").css({"display":"none"});$(".chatbox").css({"display":"none"})};
                if(takePictureState == 1) {$("#takePicture").css({"display":"none"});};
                $("#profileName").html("<div id='callProfAction' class='arrow' data-seeProf='"+window.localStorage.getItem("loggedAs")+"'>@"+window.localStorage.getItem("loggedAs")+"</div>");
                $("#callProfAction").click (function()
                {
                  callDaProfileMenu(window.localStorage.getItem("loggedAs"));
                  //console.log(window.localStorage.getItem("loggedAs"));
                });
                $("#profileFollowing").html(window.localStorage.getItem("myProfileFollowing"));
                $("#profileFollowers").html(window.localStorage.getItem("myProfileFollowers"));
                $("#profile").css({"display":"block"});

              }
              if (ahistory == 'profileMenu')
              {
                $("#mainContainer").css({"display":"block"});
                $(".modal-frame").css({"display":"block"});
                $("#header").css({"display":"block"});
                $("#abt").css({"display":"none"});
                callDaProfileMenu(window.localStorage.getItem("historyPMen"));
              }
              if(ahistory == "notifications")
              {
                window.localStorage.setItem("history", "feed");
                $("#mySvg").css({"display":"none"});

              if(window.localStorage.getItem("modal")==1)
              {
                window.localStorage.setItem("modal", 0);
                $modal = $('.modal-frame');
                $overlay = $('.modal-overlay');
                $overlay.removeClass('state-show');
                $modal.removeClass('state-appear').addClass('state-leave');
              }

              if($("#msg").is(":visible")){messageState = 1}else{messageState = 0}
              if($("#profile").is(":visible")){profileState = 1}else{profileState = 0}
              if($("#feed").is(":visible")){feedState = 1}else{feedState = 0}
              if($("#sendPicture").is(":visible")){sendPicState = 1}else{sendPicState = 0}
              if($("#chat").is(":visible")){chatState = 1}else{chatState = 0}

              if(messageState == 1) {$("#msg").toggle()};
              if(profileState == 1) {$("#profile").toggle()};
              if(feedState == 1) {$("#feed").toggle()};
              if(sendPicState == 1) {$("#sendPicture").toggle()};
              if(chatState == 1) {$("#chat").css({"display":"none"});$(".chatbox").css({"display":"none"})};

              $('#vibes').css({"display":"block"});
              }

              if(ahistory == "callEd")
              {
                var s = Snap("#mySvg");
                myImgToDelete = Snap.select("#editImg");
                myImgToDelete.remove();
                photoSrc = window.localStorage.getItem("photoSrcUndo");
                cWidth = window.localStorage.getItem("photoCWidthUndo");
                cHeight = window.localStorage.getItem("photoCHeightUndo");
                bringinTheEditor(photoSrc, cWidth, cHeight);
                window.localStorage.setItem("history", "feed");
                var $editorHolder = $("#editorHolder");
                $editorHolder.animate({ scrollTop: 0 });
              }

              }, false);

              $("#callProfAction").click(function(){
                  if($(".modal-frame").hasClass("state-appear"))
                {
                  $modal = $('.modal-frame');
                  $overlay = $('.modal-overlay');
                  window.localStorage.setItem("modal", 0);
                  $overlay.removeClass('state-show');
                  $modal.removeClass('state-appear').addClass('state-leave');
                }
              });

      $(".modal-frame").removeClass("state-leave");

      var arr = { canYou: "tellMeIfMyVerIsOk", client: 11, uuid: device.uuid, devModel: device.version, devPlatform: device.platform };
      identify(arr);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {//console.log('Received Event: ' + id);
  }

};
