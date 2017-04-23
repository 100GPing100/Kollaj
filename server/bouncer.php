<?php
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
// HEADERS SENT
mb_internal_encoding('UTF-8');
//TRY SETTING THE ENCODING TO ALWAYS BE UTF-8
// NOW CONNECT TO DB
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'kollajGribz');
define('DB_DATABASE', 'kollaj');
$db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
global $db;

//Ok, functions space is here

function killDaHackerz($string) {
  global $db;
    $string = mysqli_real_escape_string($db, $string);
    $string = htmlspecialchars($string);
    return $string;
}

//and no more special functions


/*$array = array(
    "success" => 1,
    "bar" => " foo",
);*/

if (isset($_GET['seekProfile']))
{
  $data = json_decode(file_get_contents('php://input'), true);
  if($data["canYou"]=='showMeMyProfile' && isset($data['myName']) )
  {
    $username = killDaHackerz($data['myName']);
    $tracker = killDaHackerz($data['tracker']);
    $proffset = 0;

    if(isset($data['proffset']))
    {
    $proffset = killDaHackerz($data['proffset']);
    $proffset = $proffset + 15;
    }

    $sql="SELECT * FROM users WHERE userName='$username'";

    $result2=mysqli_query($db,$sql);
    $drow=mysqli_fetch_assoc($result2);
    $userID = $drow['ID'];
    $userKollajDistance = $drow['kollajDistance'];

    $checker="SELECT * FROM register WHERE uniID='$tracker' && uid='$userID'";
    $resultChecker=mysqli_query($db,$checker);
    $crow=mysqli_fetch_assoc($resultChecker);
    $lastuuid = $crow['devUid'];
/*    if ($data['uuid'] !== $lastuuid)
    {
      echo ($data['uuid']);
      echo $checker;
    exit();
    }
    */

    if(isset($data['inEditor']))
  {
    $lowerThan = killDaHackerz($data['lowerThan']);
    $seekLowerThan = $lowerThan * $userKollajDistance;
//    $sql="SELECT * FROM post WHERE uid='$userID' AND ty>'$seekLowerThan' ORDER BY date ASC LIMIT 25";
    /*if ($userKollajDistance < 2)
     {
      $sql="SELECT * FROM post WHERE uid='$userID' AND ty<'1920' ORDER BY date ASC LIMIT 25";
    }*/

    $sql="SELECT * FROM post WHERE uid='$userID' ORDER BY date ASC";

  }
  else {
    $sql="SELECT * FROM post WHERE uid='$userID' ORDER BY date ASC LIMIT 0,15";
  }


    $result=mysqli_query($db,$sql);
    $return_arr = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        $row_array['id'] = $row['id'];
        $row_array['imgpath'] = "https://kollaj.net/uploads/".$row['imgpath'];
        $row_array['imgW'] = $row['imgW'];
        $row_array['imgH'] = $row['imgH'];
        $row_array['imgX'] = $row['imgX'];
        $row_array['imgY'] = $row['imgY'];
        $row_array['mask1'] = $row['mask1'];
        $row_array['mask2'] = $row['mask2'];
        $row_array['scale'] = $row['scale'];
        $row_array['angle'] = $row['angle'];
        $row_array['tx'] = $row['tx'];
        $row_array['ty'] = $row['ty'];
        $row_array['proffset'] = $proffset;
        array_push($return_arr,$row_array);
    }

    echo json_encode($return_arr);
    exit();
  }
}

if (isset($_FILES["file"]))
{


//print_r($_FILES);
//print_r($_POST['params']);
//print_r($_POST['options']);
$username = killDaHackerz($_POST['user']);
$uuid = killDaHackerz($_POST["uuid"]);
$dModel = killDaHackerz($_POST["devModel"]);
$devPlatform = killDaHackerz($_POST["devPlatform"]);
$tracker = killDaHackerz($_POST["tracker"]);

$sql="SELECT * FROM users WHERE userName='$username'";
$result2=mysqli_query($db,$sql);
$drow=mysqli_fetch_assoc($result2);
$userID = $drow['ID'];

    $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
    $result=mysqli_query($db,$query);
    $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
    if(mysqli_num_rows($result) == 1 )
    {
    $nname = md5($username."".time());
    $new_image_name = $nname.".jpg";
    move_uploaded_file($_FILES["file"]["tmp_name"], "uploads/".$new_image_name);
      if(isset($_POST['iHave']))
      {
        $avatar_sql="SELECT id FROM post WHERE uid='$userID' ORDER BY date ASC LIMIT 1;";
        $avatar_result=mysqli_query($db,$avatar_sql);
        $drow=mysqli_fetch_assoc($avatar_result);
        $uimg = $drow['id'];

        $sql = "UPDATE post SET imgpath='$new_image_name' WHERE uid = '$userID' AND id = '$uimg'";
        $result=mysqli_query($db,$sql);
      }
      else {
        mysqli_set_charset($db, "utf8");
        $imgH = killDaHackerz($_POST['imgH']);
        $imgW = killDaHackerz($_POST['imgW']);
        $imgX = killDaHackerz($_POST['imgX']);
        $imgY = killDaHackerz($_POST['imgY']);
        $mask1 = killDaHackerz($_POST['mask1']);
        $mask2 = killDaHackerz($_POST['mask2']);
        $angle = killDaHackerz($_POST['angle']);
        $scale = killDaHackerz($_POST['scale']);
        $tx = killDaHackerz($_POST['tx']);
        $ty = killDaHackerz($_POST['ty']);
        $feedCheck = killDaHackerz($_POST['feedCheck']);
        $fullImgCheck = killDaHackerz($_POST['fullImgCheck']);
        $uploadPicDesc = killDaHackerz($_POST['uploadPicDesc']);
        $query = mysqli_query($db, "INSERT INTO post (uid, imgpath, imgH, imgW, imgX, imgY, mask1, mask2, angle, scale, tx, ty, sof, sfimg, imgdesc)VALUES ('$userID', '$new_image_name', '$imgH', '$imgW', '$imgX', '$imgY', '$mask1', '$mask2', '$angle', '$scale', '$tx', '$ty', '$feedCheck', '$fullImgCheck', '$uploadPicDesc')");
      }
    }

}
else {
  //decode our data
  $data = json_decode(file_get_contents('php://input'), true);

  if ($data["canYou"] == "emailCheck")
  {
    $email = mysqli_real_escape_string($db, $data["myMail"]);
    $sql="SELECT email FROM users WHERE email='$email'";
    $result=mysqli_query($db,$sql);
    $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
      if(mysqli_num_rows($result) == 1)
      {
        $array = array(
            "success" => 1,
            "email" => "gotTheSame",
        );
      }
    else
      {
        $array = array(
            "success" => 1,
            "email" => "pass",
        );
      }
  }

  if ($data["canYou"] == "userCheck")
  {
    $username = killDaHackerz($data["myName"]);
    $sql="SELECT userName FROM users WHERE userName='$username'";
    $result=mysqli_query($db,$sql);
    $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
      if(mysqli_num_rows($result) == 1)
      {
        $array = array(
            "success" => 1,
            "uname" => "gotTheSame",
        );
      }
    else
      {
        $array = array(
            "success" => 1,
            "uname" => "pass",
        );
      }
  }


  if($data["canYou"] == "calibrateMePLZ")
  {
    $uuid = killDaHackerz($data["uuid"]);
    $model = killDaHackerz($data["model"]);
    $manufacturer = killDaHackerz($data["manufacturer"]);

    $sql="SELECT * FROM editor_calibrate_index WHERE deviceUUID='$uuid'";
    $result2=mysqli_query($db,$sql);
    $drow=mysqli_fetch_assoc($result2);
    if(isset($drow['calibration']))
    {
      $array = array(
          "success" => 1,
          "urCalibration" => $drow['calibration'],
      );
    }
    else {
      $sql=" SELECT calibration, deviceModel, deviceManufacturer, COUNT(calibration) AS mostCommon ";
      $sql.="FROM editor_calibrate_index ";
      $sql.="WHERE deviceManufacturer = '$manufacturer' AND deviceModel = '$model' ";
      $sql.="GROUP BY calibration ";
      $sql.="ORDER BY COUNT(calibration) DESC ";
      $sql.="LIMIT 1 ";

      $result2=mysqli_query($db,$sql);
      $drow=mysqli_fetch_assoc($result2);
      if(isset($drow['calibration']))
      {
        $calibration = $drow['calibration'];
        $sql = "INSERT INTO editor_calibrate_index (calibration, deviceUUID, deviceModel, deviceManufacturer)VALUES ('$calibration', '$uuid', '$model', '$manufacturer')";
        $result2=mysqli_query($db,$sql);

        $array = array(
            "success" => 1,
            "urCalibration" => $drow['calibration'],
        );
      }
      else {
        $array = array(
            "success" => 1,
            "urCalibration" => "hateToMakeYouSadButUrOnUrOwn",
        );
      }
    }

  }


  if($data["canYou"] == "getMyKollajDistance")
  {
    $username = killDaHackerz($data['myName']);
    $uuid = killDaHackerz($data["uuid"]);
    $tracker = killDaHackerz($data["tracker"]);

    $sql="SELECT * FROM users WHERE userName='$username'";
    $result2=mysqli_query($db,$sql);
    $drow=mysqli_fetch_assoc($result2);
    $userID = $drow['ID'];
    $urKollajDistance = $drow['kollajDistance'];

    $array = array(
        "success" => 1,
        "urKollajDistance" => $urKollajDistance,
    );
  }

  if ($data["canYou"] == "findSmth")
  {
    //make sure user is logged in, with current device, autologin/logout
      $username = killDaHackerz($data["myName"]);
      $uuid = killDaHackerz($data["uuid"]);
      $dModel = killDaHackerz($data["devModel"]);
      $devPlatform = killDaHackerz($data["devPlatform"]);
      $tracker = killDaHackerz($data["tracker"]);
      $searchQuery=killDaHackerz($data['searchQuery']);

          $sql="SELECT * FROM users WHERE userName='$username'";
          $result=mysqli_query($db,$sql);
          $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
          $result2=mysqli_query($db,$sql);
          $drow=mysqli_fetch_assoc($result2);
          if(mysqli_num_rows($result) == 1 )
            {//everything checked out, let them in
              $userID = $drow['ID'];
              $loginName = $drow['userName'];
              $kollajDistance =$drow['kollajDistance'];
              $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
              $result=mysqli_query($db,$query);
              $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
              if(mysqli_num_rows($result) == 1 )
              {
                $sessId = md5($uuid."".rand());
                $sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
                $result=mysqli_query($db,$sql);

                //nextStep



                $srch_sql="SELECT ID, userName, realName FROM users WHERE ( ( userName LIKE '%$searchQuery%' ) OR ( realName LIKE '%$searchQuery%' ) ) AND privateState < 2;";
                $srch_result=mysqli_query($db,$srch_sql);

                $return_arr = array();
                while ($row = mysqli_fetch_array($srch_result, MYSQLI_ASSOC)) {
                    $row_array['username'] = $row['userName'];


                    $avatar_sql="SELECT imgpath FROM post WHERE uid='$row[ID]' ORDER BY date ASC LIMIT 1;";
                    $avatar_result=mysqli_query($db,$avatar_sql);
                    $drow=mysqli_fetch_assoc($avatar_result);
                    $uimg = $drow['imgpath'];


                    $row_array['avatar'] = "https://kollaj.net/uploads/".$uimg;
                    $row_array['name'] = htmlentities(utf8_encode($row['realName']));
                    array_push($return_arr,$row_array);
                }

                $array = array(
                    "success" => 1,
                    "loginQuery" => "imLettingYa",
                    "loginUser" => $loginName,
                    "tracker" => $sessId,
                    "kollajDistance" => $kollajDistance,
                    "searchResult"=>$return_arr
                );
              }
              else {
                $array = array(
                    "success" => 1,
                    "loginQuery" => "noCookiesForYou",
                    "reasoning"=>2
                );
              }
            }
          else
            {//naaaaaaaaaaaaah no cookies for you
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
                  "reasoning"=>1
              );
            }


  }

  if ($data["canYou"] == "showMeSomeProfile")
  {
    //make sure user is logged in, with current device, autologin/logout
      $username = killDaHackerz($data["myName"]);
      $uuid = killDaHackerz($data["uuid"]);
      $dModel = killDaHackerz($data["devModel"]);
      $devPlatform = killDaHackerz($data["devPlatform"]);
      $tracker = killDaHackerz($data["tracker"]);
      $seeProfile=killDaHackerz($data['seeProfile']);
      $proffset =killDaHackerz($data['proffset']);
      $proffset = $proffset + 15;

          $sql="SELECT * FROM users WHERE userName='$username'";
          $result=mysqli_query($db,$sql);
          $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
          $result2=mysqli_query($db,$sql);
          $drow=mysqli_fetch_assoc($result2);
          if(mysqli_num_rows($result) == 1 )
            {//everything checked out, let them in
              $userID = $drow['ID'];
              $loginName = $drow['userName'];
              $kollajDistance =$drow['kollajDistance'];
              $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
              $result=mysqli_query($db,$query);
              $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
              if(mysqli_num_rows($result) == 1 )
              {
                $sessId = md5($uuid."".rand());
                $sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
                $result=mysqli_query($db,$sql);

                //nextStep



                $sql="SELECT * FROM users WHERE userName='$seeProfile' AND privateState < 1;";
                $result2=mysqli_query($db,$sql);
                $drow=mysqli_fetch_assoc($result2);
                $seekUid = $drow['ID'];
                $seeKollajDistance = $drow['kollajDistance'];


                $following=mysqli_query($db,"SELECT count(*) as total from contacts WHERE contact_ID = '$seekUid' AND accepted ='1'");
                $fres=mysqli_fetch_assoc($following);
                $userFollowing = $fres['total'];

                $ASKfollowsMe=mysqli_query($db,"SELECT count(*) as total from contacts WHERE contact_ID = '$seekUid' AND friend_ID = '$userID' AND accepted ='1'");
                $fres=mysqli_fetch_assoc($ASKfollowsMe);
                $followsMe = $fres['total'];

                $followers=mysqli_query($db,"SELECT count(*) as total from contacts WHERE friend_ID = ' $seekUid' AND accepted ='1'");
                $fres=mysqli_fetch_assoc($followers);
                $userFollowers = $fres['total'];

                $ASKiFollow=mysqli_query($db,"SELECT count(*) as total from contacts WHERE contact_ID = '$userID' AND friend_ID = '$seekUid' AND accepted ='1'");
                $fres=mysqli_fetch_assoc($ASKiFollow);
                $iFollow = $fres['total'];



                if($userID == $seekUid)
                {
                  $seeingSame = 1;
                }
                else {
                  $seeingSame = 0;
                }
                $sql="SELECT * FROM post WHERE uid='$seekUid' ORDER BY date ASC LIMIT 0,$proffset";
                $result=mysqli_query($db,$sql);
                $return_arr = array();
                while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

                    $row_array['id'] = $row['id'];
                    $row_array['imgpath'] = "https://kollaj.net/uploads/".$row['imgpath'];
                    $row_array['imgW'] = $row['imgW'];
                    $row_array['imgH'] = $row['imgH'];
                    $row_array['imgX'] = $row['imgX'];
                    $row_array['imgY'] = $row['imgY'];
                    $row_array['mask1'] = $row['mask1'];
                    $row_array['mask2'] = $row['mask2'];
                    $row_array['scale'] = $row['scale'];
                    $row_array['angle'] = $row['angle'];
                    $row_array['tx'] = $row['tx'];
                    $row_array['ty'] = $row['ty'];
                    array_push($return_arr,$row_array);


                }


                $array = array(
                    "success" => 1,
                    "loginQuery" => "imLettingYa",
                    "loginUser" => $loginName,
                    "tracker" => $sessId,
                    "kollajDistance" => $kollajDistance,
                    "seeRes"=>$return_arr,
                    "seeKollajDistance"=>$seeKollajDistance,
                    "following"=>$userFollowing,
                    "followers"=>$userFollowers,
                    "iFollow" => $iFollow,
                    "followsMe" => $followsMe,
                    "seeing" => $seeProfile,
                    "proffset" => $proffset,
                    "seeingSame" => $seeingSame
                );
              }
              else {
                $array = array(
                    "success" => 1,
                    "loginQuery" => "noCookiesForYou",
                );
              }
            }
          else
            {//naaaaaaaaaaaaah no cookies for you
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }


  }



  if ($data["canYou"] == "letMeBeSneaky")
  {
    //make sure user is logged in, with current device, autologin/logout
      $username = killDaHackerz($data["myName"]);
      $uuid = killDaHackerz($data["uuid"]);
      $dModel = killDaHackerz($data["devModel"]);
      $devPlatform = killDaHackerz($data["devPlatform"]);
      $tracker = killDaHackerz($data["tracker"]);
      $seePic=killDaHackerz($data['postImage']);

          $sql="SELECT * FROM users WHERE userName='$username'";
          $result=mysqli_query($db,$sql);
          $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
          $result2=mysqli_query($db,$sql);
          $drow=mysqli_fetch_assoc($result2);
          if(mysqli_num_rows($result) == 1 )
            {//everything checked out, let them in
              $userID = $drow['ID'];
              $loginName = $drow['userName'];
              $kollajDistance =$drow['kollajDistance'];
              $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
              $result=mysqli_query($db,$query);
              $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
              if(mysqli_num_rows($result) == 1 )
              {
                $sessId = md5($uuid."".rand());
                $sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
                $result=mysqli_query($db,$sql);

                //nextStep



                $sql="SELECT * FROM post WHERE imgpath='$seePic';";
                $result2=mysqli_query($db,$sql);
                $drow=mysqli_fetch_assoc($result2);
                $seekPid = $drow['id'];
                $seekUid = $drow['uid'];

                $sql="SELECT * FROM users WHERE ID='$seekUid';";
                $result2=mysqli_query($db,$sql);
                $drow=mysqli_fetch_assoc($result2);
                $private = $drow['privateState'];

                $ASKiFollow=mysqli_query($db,"SELECT count(*) as total from contacts WHERE contact_ID = '$userID' AND friend_ID = '$seekUid' AND accepted ='1'");
                $fres=mysqli_fetch_assoc($ASKiFollow);
                $iFollow = $fres['total'];

                //if user already follows OR, if user ID = toBeFollowed ID
                if ($iFollow < 1 && $private > 1 )
                {
                  $array = array(
                      "success" => 1,
                      "loginQuery" => "imLettingYa",
                      "loginUser" => $loginName,
                      "tracker" => $tracker,
                  );
                }
                else {

                  $sql=" SELECT reaction.uid, reaction.pid, users.userName, users.ID ";
                  $sql.="FROM kollaj.reaction ";
                  $sql.="JOIN users on (reaction.uid = users.ID) ";
                  $sql.="WHERE reaction.pid = '$seekPid' ";
                  $sql.="ORDER BY date DESC LIMIT 420"; // gotta put a nice limit aint it true mate?

                  $result=mysqli_query($db,$sql);
                  $return_arr = array();
                  while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                        $row_array['vibedBy'] = $row['userName'];

                        $queryAvatar=mysqli_query($db,"SELECT imgpath FROM post WHERE uid = '$row[uid]' ORDER BY date ASC LIMIT 1");
                        $res=mysqli_fetch_assoc($queryAvatar);
                        $row_array['usrAvatar'] = $res['imgpath'];

                        array_push($return_arr,$row_array);
                    }

                  $array = array(
                      "success" => 1,
                      "loginQuery" => "imLettingYa",
                      "loginUser" => $loginName,
                      "tracker" => $sessId,
                      "thePpzDatVibedDatCut"=>$return_arr,
                  );


                }
              }
              else {
                $array = array(
                    "success" => 1,
                    "loginQuery" => "noCookiesForYou",
                );
              }
            }
          else
            {//naaaaaaaaaaaaah no cookies for you
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }


  }



// Follow a profile
if ($data["canYou"] == "letMeFollowThem")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
    $seeProfile=killDaHackerz($data['seeProfile']);

        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);
        if(mysqli_num_rows($result) == 1 )
          {//everything checked out, let them in
            $userID = $drow['ID'];
            $loginName = $drow['userName'];
            $kollajDistance =$drow['kollajDistance'];
            $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
            $result=mysqli_query($db,$query);
            $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
            if(mysqli_num_rows($result) == 1 )
            {

              //nextStep



              $sql="SELECT * FROM users WHERE userName='$seeProfile' AND privateState < 2;";
              $result2=mysqli_query($db,$sql);
              $drow=mysqli_fetch_assoc($result2);
              $seekUid = $drow['ID'];
              $private = $drow['privateState'];

              $ASKiFollow=mysqli_query($db,"SELECT count(*) as total from contacts WHERE contact_ID = '$userID' AND friend_ID = '$seekUid' AND accepted ='1'");
              $fres=mysqli_fetch_assoc($ASKiFollow);
              $iFollow = $fres['total'];

              //if user already follows OR, if user ID = toBeFollowed ID
              if ($iFollow > 0 || $userID == $seekUid)
              {
                $array = array(
                    "success" => 1,
                    "loginQuery" => "imLettingYa",
                    "loginUser" => $loginName,
                    "tracker" => $tracker,
                );
              }
              else {
                if($private < 1)
                {
                $query = mysqli_query($db, "INSERT INTO contacts (contact_ID, friend_ID, accepted)VALUES ('$userID', '$seekUid', '1')");
                $text = $username." is now following you!";
                $notificationQ = mysqli_query($db, "INSERT INTO notification (contact_ID, friend_ID, notifText, notifType, action, actionTo)VALUES ('$userID', '$seekUid', '$text', '1', '1', '$username')");
                $iFollow = 1;
                }
                if($private > 0)
                {
                $query = mysqli_query($db, "INSERT INTO contacts (contact_ID, friend_ID, accepted)VALUES ('$userID', '$seekUid', '0')");
                $text = $username." requested to follow you!";
                $notificationQ = mysqli_query($db, "INSERT INTO notification (contact_ID, friend_ID, notifText, notifType, action, actionTo)VALUES ('$userID', '$seekUid', '$text', '1', '4', '$username')");
                $iFollow = 2;
                }
                if($query)
                {
                $array = array(
                    "success" => 1,
                    "loginQuery" => "imLettingYa",
                    "loginUser" => $loginName,
                    "tracker" => $tracker,
                    "myDecisionAboutYourFollowing" => $iFollow,
                    "seeing" => $seeProfile,
                );
                }
              }
            }
            else {
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }
          }
        else
          {//naaaaaaaaaaaaah no cookies for you
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }


}
//unfollow a profile
if ($data["canYou"] == "makeMeUnfollowThem")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
    $seeProfile=killDaHackerz($data['seeProfile']);

        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);
        if(mysqli_num_rows($result) == 1 )
          {//everything checked out, let them in
            $userID = $drow['ID'];
            $loginName = $drow['userName'];
            $kollajDistance =$drow['kollajDistance'];
            $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
            $result=mysqli_query($db,$query);
            $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
            if(mysqli_num_rows($result) == 1 )
            {
              $sessId = md5($uuid."".rand());
              $sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
              $result=mysqli_query($db,$sql);

              //nextStep



              $sql="SELECT * FROM users WHERE userName='$seeProfile'";
              $result2=mysqli_query($db,$sql);
              $drow=mysqli_fetch_assoc($result2);
              $seekUid = $drow['ID'];

              $ASKiFollow=mysqli_query($db,"SELECT count(*) as total from contacts WHERE contact_ID = '$userID' AND friend_ID = '$seekUid' AND accepted ='1'");
              $fres=mysqli_fetch_assoc($ASKiFollow);
              $iFollow = $fres['total'];

              //if user already follows OR, if user ID = toBeFollowed ID
              if ($iFollow < 1 || $userID == $seekUid)
              {
                die();
              }
              else {
                $query = mysqli_query($db, "DELETE FROM contacts where contact_ID = '$userID' AND friend_ID='$seekUid'");
                $text = $username." stopped following you!";
                $notificationQ = mysqli_query($db, "INSERT INTO notification (contact_ID, friend_ID, notifText)VALUES ('$userID', '$seekUid', '$text')");
                $iFollow = 0;
                }
                if($query)
                {
                $array = array(
                    "success" => 1,
                    "loginQuery" => "imLettingYa",
                    "loginUser" => $loginName,
                    "tracker" => $sessId,
                    "didILetYouUnfollow" => $iFollow,
                    "seeing" => $seeProfile,
                );
                }
            }
            else {
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }
          }
        else
          {//naaaaaaaaaaaaah no cookies for you
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }


}



//show the Stats
if ($data["canYou"] == "giveMeMyStats")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);

        if(mysqli_num_rows($result) == 1 )
          {//everything checked out, let them in
            $userID = $drow['ID'];

            $following=mysqli_query($db,"SELECT count(*) as total from contacts WHERE contact_ID = '$userID' AND accepted ='1'");
            $fres=mysqli_fetch_assoc($following);
            $userFollowing = $fres['total'];

            $followers=mysqli_query($db,"SELECT count(*) as total from contacts WHERE friend_ID = '$userID' AND accepted ='1'");
            $sres=mysqli_fetch_assoc($followers);
            $userFollowers = $sres['total'];

              $array = array(
                  "success" => 1,
                  "urFollowersAtm" => $userFollowers,
                  "uFollowingAtm" => $userFollowing,
              );
            }

            else {
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }
}


if ($data["canYou"] == "letMeCalibrateThisShit")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);

            if(mysqli_num_rows($result) == 1 )
              {//everything checked out, let them in
                $userID = $drow['ID'];
                $loginName = $drow['userName'];
                $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
                $result=mysqli_query($db,$query);
                $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
                if(mysqli_num_rows($result) == 1 )
                {
                  //nextStep
                  $model = killDaHackerz($data["model"]);
                  $manufacturer = killDaHackerz($data["manufacturer"]);
                  $newCalibration = killDaHackerz($data["whatShallBeIt"]);

                  $sql="SELECT * FROM editor_calibrate_index WHERE deviceUUID='$uuid'";
                  $result2=mysqli_query($db,$sql);
                  $drow=mysqli_fetch_assoc($result2);
                  if(isset($drow['calibration']))
                  {
                  $sql = mysqli_query($db,"UPDATE editor_calibrate_index SET calibration='$newCalibration' WHERE deviceUUID = '$uuid'");
                  }
                  else {
                  $sql = "INSERT INTO editor_calibrate_index (calibration, deviceUUID, deviceModel, deviceManufacturer)VALUES ('$newCalibration', '$uuid', '$model', '$manufacturer')";
                  $result2=mysqli_query($db,$sql);
                  }
            }

          else {
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }
        }
      else
        {//naaaaaaaaaaaaah no cookies for you
          $array = array(
              "success" => 1,
              "loginQuery" => "noCookiesForYou",
          );
        }


}




if ($data["canYou"] == "letMeSeeMyDesc")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);

            if(mysqli_num_rows($result) == 1 )
              {//everything checked out, let them in
                $userID = $drow['ID'];
                $loginName = $drow['userName'];
                $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
                $result=mysqli_query($db,$query);
                $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
                if(mysqli_num_rows($result) == 1 )
                {
                  //nextStep



            $userID = $drow['ID'];
            $seekDesc = " ".htmlentities($drow['userDesc']);
              $array = array(
                  "success" => 1,
                  "urDescMate" => $seekDesc,
              );
            }

          else {
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }
        }
      else
        {//naaaaaaaaaaaaah no cookies for you
          $array = array(
              "success" => 1,
              "loginQuery" => "noCookiesForYou",
          );
        }


}


if ($data["canYou"] == "letMeChangeMyDesc")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);

            if(mysqli_num_rows($result) == 1 )
              {//everything checked out, let them in
                $userID = $drow['ID'];
                $loginName = $drow['userName'];
                $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
                $result=mysqli_query($db,$query);
                $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
                if(mysqli_num_rows($result) == 1 )
                {
                  $sessId = md5($uuid."".rand());
                  $sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
                  $result=mysqli_query($db,$sql);

                  //nextStep



            $newDesc = killDaHackerz($data["whatShallBeIt"]);
            $sql = mysqli_query($db,"UPDATE users SET userDesc='$newDesc' WHERE ID = '$userID'");
            $seekDesc = " ".$newDesc;
              $array = array(
                  "success" => 1,
                  "urDescMate" => $seekDesc,
                  "loginQuery" => "imLettingYa",
                  "loginUser" => $loginName,
                  "tracker" => $sessId
              );
            }

          else {
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }
        }
      else
        {//naaaaaaaaaaaaah no cookies for you
          $array = array(
              "success" => 1,
              "loginQuery" => "noCookiesForYou",
          );
        }


}


if ($data["canYou"] == "giveMeMyName")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);

            if(mysqli_num_rows($result) == 1 )
              {//everything checked out, let them in
                $userID = $drow['ID'];
                $loginName = $drow['userName'];
                $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
                $result=mysqli_query($db,$query);
                $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
                if(mysqli_num_rows($result) == 1 )
                {
                  //nextStep



            $userID = $drow['ID'];
            $seekDesc = htmlentities($drow['realName'])." ";
              $array = array(
                  "success" => 1,
                  "urNameMate" => $seekDesc,
              );
            }

          else {
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }
        }
      else
        {//naaaaaaaaaaaaah no cookies for you
          $array = array(
              "success" => 1,
              "loginQuery" => "noCookiesForYou",
          );
        }


}


if ($data["canYou"] == "setMyName")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);

            if(mysqli_num_rows($result) == 1 )
              {//everything checked out, let them in
                $userID = $drow['ID'];
                $loginName = $drow['userName'];
                $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
                $result=mysqli_query($db,$query);
                $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
                if(mysqli_num_rows($result) == 1 )
                {
                  $sessId = md5($uuid."".rand());
                  $sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
                  $result=mysqli_query($db,$sql);

                  //nextStep



            $newDesc = killDaHackerz($data["myNewName"]);
            $sql = mysqli_query($db,"UPDATE users SET realName='$newDesc' WHERE ID = '$userID'");
            $seekDesc = $newDesc;
              $array = array(
                  "success" => 1,
                  "urNameMate" => $seekDesc,
                  "loginQuery" => "imLettingYa",
                  "loginUser" => $loginName,
                  "tracker" => $sessId
              );
            }

          else {
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }
        }
      else
        {//naaaaaaaaaaaaah no cookies for you
          $array = array(
              "success" => 1,
              "loginQuery" => "noCookiesForYou",
          );
        }


}

if ($data["canYou"] == "giveMeMyBio")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);

            if(mysqli_num_rows($result) == 1 )
              {//everything checked out, let them in
                $userID = $drow['ID'];
                $loginName = $drow['userName'];
                $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
                $result=mysqli_query($db,$query);
                $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
                if(mysqli_num_rows($result) == 1 )
                {
                  //nextStep



            $userID = $drow['ID'];
            $seekDesc = htmlentities($drow['userDesc'])." ";
              $array = array(
                  "success" => 1,
                  "urBioMate" => $seekDesc,
              );
            }

          else {
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }
        }
      else
        {//naaaaaaaaaaaaah no cookies for you
          $array = array(
              "success" => 1,
              "loginQuery" => "noCookiesForYou",
          );
        }


}


if ($data["canYou"] == "setMyBio")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);

            if(mysqli_num_rows($result) == 1 )
              {//everything checked out, let them in
                $userID = $drow['ID'];
                $loginName = $drow['userName'];
                $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
                $result=mysqli_query($db,$query);
                $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
                if(mysqli_num_rows($result) == 1 )
                {
                  $sessId = md5($uuid."".rand());
                  $sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
                  $result=mysqli_query($db,$sql);

                  //nextStep



            $newDesc = killDaHackerz($data["myNewBio"]);
            $sql = mysqli_query($db,"UPDATE users SET userDesc='$newDesc' WHERE ID = '$userID'");
            $seekDesc = $newDesc;
              $array = array(
                  "success" => 1,
                  "urBioMate" => $seekDesc,
                  "loginQuery" => "imLettingYa",
                  "loginUser" => $loginName,
                  "tracker" => $sessId
              );
            }

          else {
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }
        }
      else
        {//naaaaaaaaaaaaah no cookies for you
          $array = array(
              "success" => 1,
              "loginQuery" => "noCookiesForYou",
          );
        }


}




if ($data["canYou"] == "changeMyPass")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);

            if(mysqli_num_rows($result) == 1 )
              {//everything checked out, let them in
                $userID = $drow['ID'];
                $userPassAtm = $drow['passHash'];
                $loginName = $drow['userName'];
                $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
                $result=mysqli_query($db,$query);
                $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
                if(mysqli_num_rows($result) == 1 )
                {
                  $sessId = md5($uuid."".rand());
                  $sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
                  $result=mysqli_query($db,$sql);

                  //nextStep



            $oldPass =killDaHackerz($data["myOldPass"]) ;

              if( password_verify($oldPass, $userPassAtm))
              {
                $newPass = password_hash (killDaHackerz($data["myNewPass"]), PASSWORD_DEFAULT);
                $sql = mysqli_query($db,"UPDATE users SET passHash='$newPass' WHERE ID = '$userID'");
                  $array = array(
                      "success" => 1,
                      "urPassChange" => "done",
                      "loginQuery" => "imLettingYa",
                      "loginUser" => $loginName,
                      "tracker" => $sessId
                  );

              }
              else {
                  die();
              }
            }

          else {
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }
        }
      else
        {//naaaaaaaaaaaaah no cookies for you
          $array = array(
              "success" => 1,
              "loginQuery" => "noCookiesForYou",
          );
        }


}




if ($data["canYou"] == "giveMeMyMail")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);

            if(mysqli_num_rows($result) == 1 )
              {//everything checked out, let them in
                $userID = $drow['ID'];
                $loginName = $drow['userName'];
                $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
                $result=mysqli_query($db,$query);
                $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
                if(mysqli_num_rows($result) == 1 )
                {
                  //nextStep



            $userID = $drow['ID'];
            $seekDesc = $drow['email'];
              $array = array(
                  "success" => 1,
                  "urEmailMate" => $seekDesc,
              );
            }

          else {
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }
        }
      else
        {//naaaaaaaaaaaaah no cookies for you
          $array = array(
              "success" => 1,
              "loginQuery" => "noCookiesForYou",
          );
        }


}


if ($data["canYou"] == "doEmailThings")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);

            if(mysqli_num_rows($result) == 1 )
              {//everything checked out, let them in
                $userID = $drow['ID'];
                $loginName = $drow['userName'];
                $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
                $result=mysqli_query($db,$query);
                $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
                if(mysqli_num_rows($result) == 1 )
                {


                  //nextStep



            $newDesc = killDaHackerz($data["myNewEmail"]);
            $state = killDaHackerz($data["iWanna"]);
            if($state == "justSearch")
            {
              $sql="SELECT email FROM users WHERE email='$newDesc' AND ID != '$userID' ";
              $result=mysqli_query($db,$sql);
              $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
                if(mysqli_num_rows($result) == 1)
                {//users trying to submit, in an awkward manner, an email thats in the db already,  just ignore him
                  $array = array(
                      "success" => 1,
                      "urEmailSearch" => "gotTheSame",
                  );
                }
                else
                {
                  $array = array(
                      "success" => 1,
                      "urEmailSearch" => "isValidMate",
                  );
                }
            }
            if($state == "imGonnaUpdate")
            {
              $sessId = md5($uuid."".rand());
              $sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
              $result=mysqli_query($db,$sql);

              $sql="SELECT email FROM users WHERE email='$newDesc'";
              $result=mysqli_query($db,$sql);
              $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
                if(mysqli_num_rows($result) == 1)
                {//users trying to submit, in an awkward manner, an email thats in the db already,  just ignore him
                  $array = array(
                      "success" => 1,
                      "urEmailSearch" => "gotTheSame",
                      "loginQuery" => "imLettingYa",
                      "loginUser" => $loginName,
                      "tracker" => $sessId
                  );
                }
                else
                {
                  $sql = mysqli_query($db,"UPDATE users SET email='$newDesc' WHERE ID = '$userID'");
                  $seekDesc = $newDesc;
                  $array = array(
                    "success" => 1,
                    "urEmailMate" => $seekDesc,
                    "loginQuery" => "imLettingYa",
                    "loginUser" => $loginName,
                    "tracker" => $sessId
                  );
                }
              }

            }

          else {
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }
        }
      else
        {//naaaaaaaaaaaaah no cookies for you
          $array = array(
              "success" => 1,
              "loginQuery" => "noCookiesForYou",
          );
        }
}




if ($data["canYou"] == "sayBye")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);

            if(mysqli_num_rows($result) == 1 )
              {//everything checked out, let them in
                $userID = $drow['ID'];
                $loginName = $drow['userName'];
                $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
                $result=mysqli_query($db,$query);
                $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
                if(mysqli_num_rows($result) == 1 )
                {
                  //nextStep

                  $query = "UPDATE register SET uniID = 'babaye' WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
                  $result=mysqli_query($db,$query);

            $userID = $drow['ID'];
            $seekDesc = " ".htmlentities($drow['userDesc']);
              $array = array(
                  "success" => 1,
                  "bye" => "bye",
              );
            }

          else {
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }
        }
      else
        {//naaaaaaaaaaaaah no cookies for you
          $array = array(
              "success" => 1,
              "loginQuery" => "noCookiesForYou",
          );
        }


}





//remind user who them follow
if ($data["canYou"] == "tellMeWhoFollowsMe")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);
        if(mysqli_num_rows($result) == 1 )
          {//everything checked out, let them in
            $userID = $drow['ID'];
            $loginName = $drow['userName'];
            $kollajDistance =$drow['kollajDistance'];
            $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
            $result=mysqli_query($db,$query);
            $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
            if(mysqli_num_rows($result) == 1 )
            {
              //nextStep
              // the as feed is the first thing the user sees , why not give them the
              // stats for their topLeft heartBeat monitor :p ?

              $sql=" SELECT contacts.contact_ID, contacts.friend_ID, contacts.accepted, users.userName ";
              $sql.="FROM kollaj.contacts ";
              $sql.="JOIN users on(contacts.contact_ID = users.ID) ";
              $sql.="WHERE friend_ID = '$userID' ";
              $sql.="ORDER BY acon DESC LIMIT 420"; // gotta put a nice limit aint it true mate?

              $result=mysqli_query($db,$sql);
              $return_arr = array();
              while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                    $row_array['userUrFollowing'] = $row['userName'];
                    if ($row['accepted'] == 1)
                    {
                      $row_array['uVeBinAccepted'] = '1';
                    }
                    else {
                      $row_array['uVeBinAccepted'] = '0';
                    }

                    $queryAvatar=mysqli_query($db,"SELECT imgpath FROM post WHERE uid = '$row[friend_ID]' ORDER BY date ASC LIMIT 1");
                    $res=mysqli_fetch_assoc($queryAvatar);
                    $row_array['usrAvatar'] = $res['imgpath'];

                    array_push($return_arr,$row_array);
                }

              $array = array(
                  "success" => 1,
                  "loginQuery" => "imLettingYa",
                  "loginUser" => $loginName,
                  "tracker" => $tracker,
                  "thePpzDatReFollingU"=>$return_arr,
              );
            }

            else {
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }
          }
        else
          {//naaaaaaaaaaaaah no cookies for you
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }


}






//remind user who them follow
if ($data["canYou"] == "tellMeWhoIFollow")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);
        if(mysqli_num_rows($result) == 1 )
          {//everything checked out, let them in
            $userID = $drow['ID'];
            $loginName = $drow['userName'];
            $kollajDistance =$drow['kollajDistance'];
            $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
            $result=mysqli_query($db,$query);
            $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
            if(mysqli_num_rows($result) == 1 )
            {
              //nextStep
              // the as feed is the first thing the user sees , why not give them the
              // stats for their topLeft heartBeat monitor :p ?

              $sql=" SELECT contacts.contact_ID, contacts.friend_ID, contacts.accepted, users.userName ";
              $sql.="FROM kollaj.contacts ";
              $sql.="JOIN users on(contacts.friend_ID = users.ID) ";
              $sql.="WHERE contact_ID = '$userID' ";
              $sql.="ORDER BY acon DESC LIMIT 420"; // gotta put a nice limit aint it true mate?

              $result=mysqli_query($db,$sql);
              $return_arr = array();
              while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                    $row_array['userUrFollowing'] = $row['userName'];
                    if ($row['accepted'] == 1)
                    {
                      $row_array['uVeBinAccepted'] = '1';
                    }
                    else {
                      $row_array['uVeBinAccepted'] = '0';
                    }

                    $queryAvatar=mysqli_query($db,"SELECT imgpath FROM post WHERE uid = '$row[friend_ID]' ORDER BY date ASC LIMIT 1");
                    $res=mysqli_fetch_assoc($queryAvatar);
                    $row_array['usrAvatar'] = $res['imgpath'];

                    array_push($return_arr,$row_array);
                }

              $array = array(
                  "success" => 1,
                  "loginQuery" => "imLettingYa",
                  "loginUser" => $loginName,
                  "tracker" => $tracker,
                  "thePpzUrFollowingAre"=>$return_arr,
              );
            }

            else {
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }
          }
        else
          {//naaaaaaaaaaaaah no cookies for you
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }


}




//give user them vibez
if ($data["canYou"] == "showMeMyVibes")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);
        if(mysqli_num_rows($result) == 1 )
          {//everything checked out, let them in
            $userID = $drow['ID'];
            $loginName = $drow['userName'];
            $kollajDistance =$drow['kollajDistance'];
            $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
            $result=mysqli_query($db,$query);
            $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
            if(mysqli_num_rows($result) == 1 )
            {
              //nextStep
              // the as feed is the first thing the user sees , why not give them the
              // stats for their topLeft heartBeat monitor :p ?

              $queryReactions=mysqli_query($db,"SELECT count(*) as total from reaction WHERE tid = '$userID'");
              $res=mysqli_fetch_assoc($queryReactions);
              $urTotalVibes = $res['total'];

              $queryReactions=mysqli_query($db,"SELECT SUM(reaction) AS reactionSum from reaction WHERE tid = '$userID'");
              $res=mysqli_fetch_assoc($queryReactions);
              if($urTotalVibes>0)
              {
              $VibeOMeter = round($res['reactionSum']/$urTotalVibes, 0);
              }
              else
              {
              $VibeOMeter = 0;
              }



              $sql="SELECT * FROM notification WHERE friend_ID='$userID' AND seen = 0 AND notifType = 1 ORDER BY date DESC;";
              $result=mysqli_query($db,$sql);
              $return_arr = array();
              while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                    $row_array['nText'] = $row['notifText'];
                    $row_array['isUsableFor'] = $row['action'];
                    $row_array['withThis'] = $row['actionTo'];

                    $queryReactions=mysqli_query($db,"SELECT imgpath FROM post WHERE uid = '$row[contact_ID]' ORDER BY date ASC LIMIT 1");
                    $res=mysqli_fetch_assoc($queryReactions);
                    $row_array['notifImage'] = $res['imgpath'];
                    $row_array['notifOn'] = $row['date']." +00";

                    array_push($return_arr,$row_array);
                }

              $array = array(
                  "success" => 1,
                  "loginQuery" => "imLettingYa",
                  "loginUser" => $loginName,
                  "tracker" => $tracker,
                  "notifRes"=>$return_arr,
                  "vibeOMeter"=>$VibeOMeter
              );
            }

            else {
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }
          }
        else
          {//naaaaaaaaaaaaah no cookies for you
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }


}



//show the feed
if ($data["canYou"] == "showMeMyFeed")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
    $croffset = killDaHackerz($data["roffset"]);
    $croffset = $croffset*30;
        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);
        if(mysqli_num_rows($result) == 1 )
          {//everything checked out, let them in
            $userID = $drow['ID'];
            $loginName = $drow['userName'];
            $kollajDistance =$drow['kollajDistance'];
            $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
            $result=mysqli_query($db,$query);
            $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
            if(mysqli_num_rows($result) == 1 )
            {
              $sessId = md5($uuid."".rand());
              $sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
              $result=mysqli_query($db,$sql);

              //nextStep
              // the as feed is the first thing the user sees , why not give them the
              // stats for their topLeft heartBeat monitor :p ?
              $queryReactions=mysqli_query($db,"SELECT count(*) as total from reaction WHERE tid = '$userID'");
              $res=mysqli_fetch_assoc($queryReactions);
              $urTotalVibes = $res['total'];

              $queryReactions=mysqli_query($db,"SELECT SUM(reaction) AS reactionSum from reaction WHERE tid = '$userID'");
              $res=mysqli_fetch_assoc($queryReactions);
              if($urTotalVibes>0)
              {
              $VibeOMeter = round($res['reactionSum']/$urTotalVibes, 0);
              }
              else
              {
              $VibeOMeter = 0;
              }



              $sql="SELECT * FROM contacts WHERE contact_ID='$userID' AND accepted = 1;";
              $result=mysqli_query($db,$sql);
              $friendsID = "uid='".$userID."'";
              while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                $friendsID = $friendsID." OR uid='$row[friend_ID]'";
              }
                $sql="SELECT * FROM post WHERE sof='1' AND ($friendsID) ORDER BY date DESC LIMIT $croffset,30";
                $result=mysqli_query($db,$sql);
                $return_arr = array();
              while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                    $row_array['id'] = $row['id'];

                    $queryReactions=mysqli_query($db,"SELECT count(*) as total from reaction WHERE pid = '$row[id]'");
                    $res=mysqli_fetch_assoc($queryReactions);
                    $row_array['totalVibes'] = $res['total'];

                    if($row['uid'] == $userID)
                    {
                      $queryReactions=mysqli_query($db,"SELECT SUM(reaction) AS reactionSum from reaction WHERE pid = '$row[id]'");
                      $res=mysqli_fetch_assoc($queryReactions);
                      if($row_array['totalVibes']>0)
                      {
                      $row_array['yourMark'] = round($res['reactionSum']/$row_array['totalVibes'], 0);
                      }
                      else
                      {
                        $row_array['yourMark'] = 0;
                      }
                    }
                    else {
                      $row_array['yourMark'] = 0;
                    }



                    $sql="SELECT * FROM users WHERE ID = $row[uid];";
                    $result2=mysqli_query($db,$sql);
                    $drow=mysqli_fetch_assoc($result2);
                    $row_array['feedUName'] = $drow['userName'];

                    $row_array['imgpath'] = "https://kollaj.net/uploads/".$row['imgpath'];
                    $row_array['imgW'] = $row['imgW'];
                    $row_array['imgH'] = $row['imgH'];
                    $row_array['imgX'] = $row['imgX'];
                    $row_array['imgY'] = $row['imgY'];
                    $row_array['mask1'] = $row['mask1'];
                    $row_array['mask2'] = $row['mask2'];
                    $row_array['scale'] = $row['scale'];
                    $row_array['angle'] = $row['angle'];
                    $row_array['tx'] = $row['tx'];
                    $row_array['ty'] = $row['ty'];
                    $row_array['idesc'] = " ".htmlentities(utf8_encode($row['imgdesc']));
                    $row_array['fullIPage'] = $row['sfimg'];

                    $commentsQ=mysqli_query($db,"SELECT count(*) as total from comments WHERE pid = '$row[id]'");
                    $cRes=mysqli_fetch_assoc($commentsQ);

                    $row_array['commentsC'] = $cRes['total'];

                    array_push($return_arr,$row_array);
                }




              $array = array(
                  "success" => 1,
                  "loginQuery" => "imLettingYa",
                  "loginUser" => $loginName,
                  "tracker" => $sessId,
                  "feedRes"=>$return_arr,
                  "vibeOMeter"=>$VibeOMeter
              );
            }

            else {
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }
          }
        else
          {//naaaaaaaaaaaaah no cookies for you
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }


}


// Follow a profile
if ($data["canYou"] == "letMeVibeAPost")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
    $post=killDaHackerz($data['imVibing']);
    $vibes=killDaHackerz($data['vibes']);
        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);
        if(mysqli_num_rows($result) == 1 )
          {//everything checked out, let them in
            $userID = $drow['ID'];
            $loginName = $drow['userName'];
            $kollajDistance =$drow['kollajDistance'];
            $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
            $result=mysqli_query($db,$query);
            $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
            if(mysqli_num_rows($result) == 1 )
            {
              $sessId = md5($uuid."".rand());
              $sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
              $result=mysqli_query($db,$sql);

              //nextStep
              $sql="SELECT * FROM post WHERE imgpath='$post';";
              $result2=mysqli_query($db,$sql);
              $drow=mysqli_fetch_assoc($result2);
              $seekPostId = $drow['id'];
              $seekUserId = $drow['uid'];

              $ASKiDidIt=mysqli_query($db,"SELECT count(*) as total from reaction WHERE pid = '$seekPostId' AND uid = '$userID' AND tid ='$seekUserId'");
              $res=mysqli_fetch_assoc($ASKiDidIt);
              $iVoted = $res['total'];

              //if user already follows OR, if user ID = toBeFollowed ID
              if ($iVoted > 0 || $userID == $seekUserId)
              {
                if($iVoted == 1)
                {
                  $query = mysqli_query($db, "UPDATE reaction SET reaction='$vibes' WHERE uid = '$userID' AND pid='$seekPostId' AND tid='$seekUserId'");
                }
              }
              else
              {
                $query = mysqli_query($db, "INSERT INTO reaction (pid, uid, tid, reaction)VALUES ('$seekPostId', '$userID', '$seekUserId', '$vibes')");
                $text = $username." vibed your photo!";
                $notificationQ = mysqli_query($db, "INSERT INTO notification (contact_ID, friend_ID, notifText, notifType, action, actionTo)VALUES ('$userID', '$seekUserId', '$text', '1', '2', '$post')");
              }
              if($query)
                {
                $array = array(
                    "success" => 1,
                    "loginQuery" => "imLettingYa",
                    "loginUser" => $loginName,
                    "tracker" => $sessId,
                    "yourVibe" => "hasBeenVibed",
                );
                }

            }
            else {
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }
          }
        else
          {//naaaaaaaaaaaaah no cookies for you
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }


}



//show the comments
if ($data["canYou"] == "giveMeTheCommentsOfThisPost")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);

        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);
        if(mysqli_num_rows($result) == 1 )
          {//everything checked out, let them in
            $userID = $drow['ID'];
            $loginName = $drow['userName'];
            $kollajDistance =$drow['kollajDistance'];
            $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
            $result=mysqli_query($db,$query);
            $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
            if(mysqli_num_rows($result) == 1 )
            {
              $sessId = md5($uuid."".rand());
              $sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
              $result=mysqli_query($db,$sql);

              //nextStep

              $postImage = killDaHackerz($data["postImage"]);

              $sql="SELECT * FROM post WHERE imgpath='$postImage';";
              $result=mysqli_query($db,$sql);
              $prow=mysqli_fetch_assoc($result);
              $postID = $prow['id'];

                $sql="SELECT * FROM comments WHERE pid='$postID' ORDER BY date ASC";
                $result=mysqli_query($db,$sql);
                $return_arr = array();
                while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                    $sql="SELECT * FROM users WHERE ID = '$row[uid]';";
                    $result2=mysqli_query($db,$sql);
                    $drow=mysqli_fetch_assoc($result2);
                    $row_array['commenter'] = $drow['userName'];

                    $row_array['comment'] =htmlentities(utf8_encode($row['comment'])) ;

                    array_push($return_arr,$row_array);
                }




              $array = array(
                  "success" => 1,
                  "loginQuery" => "imLettingYa",
                  "loginUser" => $loginName,
                  "tracker" => $sessId,
                  "commentsRes"=>$return_arr,
                  "gbt" => $data['gbt']
              );
            }

            else {
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }
          }
        else
          {//naaaaaaaaaaaaah no cookies for you
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }


}

//give post details
if ($data["canYou"] == "gimmeDatPostNfo")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
    $datPost = killDaHackerz($data["datPost"]);

        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);
        if(mysqli_num_rows($result) == 1 )
          {//everything checked out, let them in
            $userID = $drow['ID'];
            $loginName = $drow['userName'];
            $kollajDistance =$drow['kollajDistance'];
            $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
            $result=mysqli_query($db,$query);
            $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
            if(mysqli_num_rows($result) == 1 )
            {
              $sessId = md5($uuid."".rand());
              $sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
              $result=mysqli_query($db,$sql);
              //nextStep

                $sql="SELECT * FROM post WHERE imgpath='$datPost'";
                $result=mysqli_query($db,$sql);
                $return_arr = array();
                while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                    $row_array['id'] = $row['id'];
                    $queryReactions=mysqli_query($db,"SELECT count(*) as total from reaction WHERE pid = '$row[id]'");
                    $res=mysqli_fetch_assoc($queryReactions);
                    $row_array['totalVibes'] = $res['total'];

                    if($row['uid'] == $userID)
                    {
                      $queryReactions=mysqli_query($db,"SELECT SUM(reaction) AS reactionSum from reaction WHERE pid = '$row[id]'");
                      $res=mysqli_fetch_assoc($queryReactions);
                      if($row_array['totalVibes']>0)
                      {
                      $row_array['yourMark'] = round($res['reactionSum']/$row_array['totalVibes'], 0);
                      }
                      else
                      {
                      $row_array['yourMark'] = 0;
                      }

                    }
                    else {
                      $row_array['yourMark'] = 0;
                    }

                    $sql="SELECT * FROM users WHERE ID = $row[uid];";
                    $result2=mysqli_query($db,$sql);
                    $drow=mysqli_fetch_assoc($result2);
                    $row_array['feedUName'] = $drow['userName'];

                    $row_array['imgpath'] = "https://kollaj.net/uploads/".$row['imgpath'];
                    $row_array['imgW'] = $row['imgW'];
                    $row_array['imgH'] = $row['imgH'];
                    $row_array['imgX'] = $row['imgX'];
                    $row_array['imgY'] = $row['imgY'];
                    $row_array['mask1'] = $row['mask1'];
                    $row_array['mask2'] = $row['mask2'];
                    $row_array['scale'] = $row['scale'];
                    $row_array['angle'] = $row['angle'];
                    $row_array['tx'] = $row['tx'];
                    $row_array['ty'] = $row['ty'];
                    $row_array['idesc'] = " ".htmlentities(utf8_encode($row['imgdesc']));
                    $row_array['fullIPage'] = $row['sfimg'];

                    $commentsQ=mysqli_query($db,"SELECT count(*) as total from comments WHERE pid = '$row[id]'");
                    $cRes=mysqli_fetch_assoc($commentsQ);

                    $row_array['commentsC'] = $cRes['total'];
                    $sql="SELECT * FROM comments WHERE pid='$row[id]' ORDER BY date ASC";
                    $result=mysqli_query($db,$sql);
                    $return_arr_inception = array();
                    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                        $sql="SELECT * FROM users WHERE ID = '$row[uid]';";
                        $result2=mysqli_query($db,$sql);
                        $drow=mysqli_fetch_assoc($result2);
                        $row_array_incepted['commenter'] = $drow['userName'];

                        $row_array_incepted['comment'] =htmlentities(utf8_encode($row['comment'])) ;

                        array_push($return_arr_inception,$row_array_incepted);
                    }
                    $row_array['commentsForUrDelight'] = $return_arr_inception;


                    array_push($return_arr,$row_array);
                }




              $array = array(
                  "success" => 1,
                  "loginQuery" => "imLettingYa",
                  "loginUser" => $loginName,
                  "tracker" => $sessId,
                  "datPostRes"=>$return_arr,
              );
            }

            else {
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }
          }
        else
          {//naaaaaaaaaaaaah no cookies for you
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }


}



//user wants to comment
if ($data["canYou"] == "listenToMeCarefully")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);

        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);
        if(mysqli_num_rows($result) == 1 )
          {//everything checked out, let them in
            $userID = $drow['ID'];
            $loginName = $drow['userName'];
            $kollajDistance =$drow['kollajDistance'];
            $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
            $result=mysqli_query($db,$query);
            $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
            if( (mysqli_num_rows($result) == 1) || (strlen(trim(killDaHackerz($data["myComment"]))) != 0)  )
            {
              //nextStep
              $postImage = killDaHackerz($data["postImage"]);

              $sql="SELECT * FROM postalerts WHERE imgAlerted='$postImage' AND fromUsr='$username';";
              $result=mysqli_query($db,$sql);
              $prow=mysqli_fetch_assoc($result);
              if(!isset($prow['id']))
              {
                $query = mysqli_query($db, "INSERT INTO postalerts (imgAlerted, fromUsr)VALUES ('$postImage', '$username' )");
                if($query)
                {
                  //full beauty behind this pregmatch @ http://stackoverflow.com/questions/4424179/how-to-validate-a-twitter-username-using-regex?noredirect=1&lq=1
                  $array = array(
                      "success" => 1,
                      "thanksForTheWarning" => 'mate'
                  );
                }
              }
              else {
                $array = array(
                    "success" => 1
                  );

              }
            }

            else {
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }
          }
        else
          {//naaaaaaaaaaaaah no cookies for you
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }


}



if ($data["canYou"] == "wellYeahIWantUToUndoMyShit")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);

        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);
        if(mysqli_num_rows($result) == 1 )
          {//everything checked out, let them in
            $userID = $drow['ID'];
            $loginName = $drow['userName'];
            $kollajDistance =$drow['kollajDistance'];
            $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
            $result=mysqli_query($db,$query);
            $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
            if( (mysqli_num_rows($result) == 1) || (strlen(trim(killDaHackerz($data["myComment"]))) != 0)  )
            {
              $sessId = md5($uuid."".rand());
              $sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
              $result=mysqli_query($db,$sql);

              //nextStep
              $postImage = killDaHackerz($data["postImage"]);

              $sql="SELECT * FROM post WHERE imgpath='$postImage';";
              $result=mysqli_query($db,$sql);
              $prow=mysqli_fetch_assoc($result);
              $postID = $prow['id'];
              $posterID = $prow['uid'];

              if($userID == $posterID)
              {
                $query = mysqli_query($db, "DELETE FROM post where id='$postID' AND uid='$userID'");
                if($query)
                {
                  //full beauty behind this pregmatch @ http://stackoverflow.com/questions/4424179/how-to-validate-a-twitter-username-using-regex?noredirect=1&lq=1
                  $array = array(
                      "success" => 1,
                      "loginQuery" => "imLettingYa",
                      "loginUser" => $loginName,
                      "tracker" => $sessId,
                  );
                }
              }
              else {
                  die();
              }

            }

            else {
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }
          }
        else
          {//naaaaaaaaaaaaah no cookies for you
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }


}





//user wants to comment
if ($data["canYou"] == "letMeCommentAPost")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);

        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);
        if(mysqli_num_rows($result) == 1 )
          {//everything checked out, let them in
            $userID = $drow['ID'];
            $loginName = $drow['userName'];
            $kollajDistance =$drow['kollajDistance'];
            $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
            $result=mysqli_query($db,$query);
            $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
            if( (mysqli_num_rows($result) == 1) || (strlen(trim(killDaHackerz($data["myComment"]))) != 0)  )
            {
              $sessId = md5($uuid."".rand());
              $sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
              $result=mysqli_query($db,$sql);

              //nextStep
              $postImage = killDaHackerz($data["postImage"]);
              $myComment = killDaHackerz($data["myComment"]);

              $sql="SELECT * FROM post WHERE imgpath='$postImage';";
              $result=mysqli_query($db,$sql);
              $prow=mysqli_fetch_assoc($result);
              $postID = $prow['id'];
              $posterID = $prow['uid'];

              mysqli_set_charset($db, "utf8");
              $query = mysqli_query($db, "INSERT INTO comments (uid, pid, comment)VALUES ('$userID', '$postID', '$myComment')");
              if($query)
              {
                //full beauty behind this pregmatch @ http://stackoverflow.com/questions/4424179/how-to-validate-a-twitter-username-using-regex?noredirect=1&lq=1
                preg_match_all('/@([A-Za-z0-9_]{1,17})(?![.A-Za-z])/', $myComment, $usernames);
                foreach ($usernames[1] as $username)
                {
                  if($username !== $loginName)
                  {
                    $text = $loginName." mentioned you in a comment!";
                    $sql="SELECT ID FROM users WHERE userName='$username'";
                    $result2=mysqli_query($db,$sql);
                    $drow=mysqli_fetch_assoc($result2);
                    $maFrendId = $drow['ID'];
                    $notificationQ = mysqli_query($db, "INSERT INTO notification (contact_ID, friend_ID, notifText, notifType, action, actionTo)VALUES ('$userID', '$maFrendId', '$text', '1', '3', '$postImage')");
                  }
                }
                if($posterID !== $userID)
                {
                $text = $loginName." commented: ".$myComment;
                $notificationQ = mysqli_query($db, "INSERT INTO notification (contact_ID, friend_ID, notifText, notifType, action, actionTo)VALUES ('$userID', '$posterID', '$text', '1', '3', '$postImage')");
                }
                $array = array(
                    "success" => 1,
                    "loginQuery" => "imLettingYa",
                    "loginUser" => $loginName,
                    "tracker" => $sessId,
                    "urNewComment"=>$myComment,
                    "ncGbt" => $data['gbt']
                );
              }
            }

            else {
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }
          }
        else
          {//naaaaaaaaaaaaah no cookies for you
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }


}

//give user modal details
if ($data["canYou"] == "gimmeDatProfileNfo")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);
    $seeProfile=killDaHackerz($data['datProfile']);

        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);
        if(mysqli_num_rows($result) == 1 )
          {//everything checked out, let them in
            $userID = $drow['ID'];
            $loginName = $drow['userName'];
            $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
            $result=mysqli_query($db,$query);
            $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
            if(mysqli_num_rows($result) == 1 )
            {
              $sessId = md5($uuid."".rand());
              $sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
              $result=mysqli_query($db,$sql);

              //nextStep



              $sql="SELECT * FROM users WHERE userName='$seeProfile' AND privateState < 2;";
              $result2=mysqli_query($db,$sql);
              $drow=mysqli_fetch_assoc($result2);
              $seekUid = $drow['ID'];
              $seekDesc = " ".htmlentities($drow['userDesc']);

              $following=mysqli_query($db,"SELECT count(*) as total from contacts WHERE contact_ID = '$seekUid' AND accepted ='1'");
              $fres=mysqli_fetch_assoc($following);
              $userFollowing = $fres['total'];

              $ASKfollowsMe=mysqli_query($db,"SELECT count(*) as total from contacts WHERE contact_ID = '$seekUid' AND friend_ID = '$userID' AND accepted ='1'");
              $fres=mysqli_fetch_assoc($ASKfollowsMe);
              $followsMe = $fres['total'];

              $followers=mysqli_query($db,"SELECT count(*) as total from contacts WHERE friend_ID = ' $seekUid' AND accepted ='1'");
              $fres=mysqli_fetch_assoc($followers);
              $userFollowers = $fres['total'];

              $ASKiFollow=mysqli_query($db,"SELECT count(*) as total from contacts WHERE contact_ID = '$userID' AND friend_ID = '$seekUid' AND accepted ='1'");
              $fres=mysqli_fetch_assoc($ASKiFollow);
              $iFollow = $fres['total'];



              if($userID == $seekUid)
              {
                $seeingSame = 1;
              }
              else {
                $seeingSame = 0;
              }


              $array = array(
                  "success" => 1,
                  "loginQuery" => "imLettingYa",
                  "loginUser" => $loginName,
                  "tracker" => $sessId,
                  "following"=>$userFollowing,
                  "followers"=>$userFollowers,
                  "iFollow" => $iFollow,
                  "followsMe" => $followsMe,
                  "seeing" => $seeProfile,
                  "usrDesc" => $seekDesc,
                  "datUserRes" => $seeingSame
              );
            }
            else {
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }
          }
        else
          {//naaaaaaaaaaaaah no cookies for you
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }


}



//queies:
/*
Select all msgs in inbox of some user:

SELECT chats.id, chats.sid, chats.rid, inbox.msg, users.userName, inbox.date
FROM chats
JOIN inbox
ON (inbox.chatID=chats.id AND inbox.sid = 1) OR (inbox.chatID=chats.id AND inbox.rid = 1)
JOIN users
ON (inbox.sid=users.ID)
ORDER BY date DESC;



*/



//see chats
if ($data["canYou"] == "letMeKnowWhoShouldIBotherInsteadOfUDearServerOfMine")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);

        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);
        if(mysqli_num_rows($result) == 1 )
          {//everything checked out, let them in
            $userID = $drow['ID'];
            $loginName = $drow['userName'];
            $kollajDistance =$drow['kollajDistance'];
            $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
            $result=mysqli_query($db,$query);
            $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
            if(mysqli_num_rows($result) == 1 )
            {
              $sessId = md5($uuid."".rand());
              $sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
              $result=mysqli_query($db,$sql);

              //nextStep

                $sql="SELECT chats.id, users.userName";
                $sql.=" FROM chats";
                $sql.=" JOIN users ON (chats.sid=users.ID)";
                $sql.=" WHERE (chats.rid = '$userID')";
                $sql.=" UNION";
                $sql.=" SELECT chats.id, users.userName";
                $sql.=" FROM chats";
                $sql.=" JOIN users ON (chats.rid=users.ID)";
                $sql.=" WHERE (chats.sid = '$userID')";
                $sql.=" ORDER BY id DESC";
                $result=mysqli_query($db,$sql);
                $return_arr = array();
                while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                    $sql="SELECT users.userName, users.realName, post.imgpath";
                    $sql.=" FROM users";
                    $sql.=" JOIN post ON (post.uid=users.ID)";
                    $sql.=" WHERE users.userName='$row[userName]'";
                    $sql.=" ORDER BY date ASC LIMIT 1";
                    $result2=mysqli_query($db,$sql);
                    $drow=mysqli_fetch_assoc($result2);
                    $row_array['uRname'] = htmlentities(utf8_encode($drow['realName']));
                    $row_array['username'] = $drow['userName'];
                    $row_array['avatar'] =$drow['imgpath'] ;
                    array_push($return_arr,$row_array);
                    }




              $array = array(
                  "success" => 1,
                  "loginQuery" => "imLettingYa",
                  "loginUser" => $loginName,
                  "tracker" => $sessId,
                  "youCanBother"=>$return_arr
              );
            }

            else {
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }
          }
        else
          {//naaaaaaaaaaaaah no cookies for you
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }


}




//user wants send a msg
if ($data["canYou"] == "letMeSendAMsg")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);

        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);
        if(mysqli_num_rows($result) == 1 )
          {//everything checked out, let them in
            $userID = $drow['ID'];
            $loginName = $drow['userName'];
            $kollajDistance =$drow['kollajDistance'];
            $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
            $result=mysqli_query($db,$query);
            $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
            if( (mysqli_num_rows($result) == 1) || (strlen(trim(killDaHackerz($data["myMsg"]))) != 0)  )
            {
              $sessId = md5($uuid."".rand());
              $sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
              $result=mysqli_query($db,$sql);

              //nextStep
              $toUser = killDaHackerz($data["myMsgIsGoingTo"]);

              $myMsg = killDaHackerz(" ".$data["myMsg"]);

              $sql="SELECT * FROM users WHERE userName='$toUser';";
              $result=mysqli_query($db,$sql);
              $prow=mysqli_fetch_assoc($result);
              $toUserID = $prow['ID'];

              // and set mysql to UTF8 as well...
              mysqli_set_charset($db, "utf8");

              if($toUserID !== $userID)
              {
              $text = $loginName." messaged you: ".$myMsg;
              $notificationQ = mysqli_query($db, "INSERT INTO notification (contact_ID, friend_ID, notifText, notifType)VALUES ('$userID', '$toUserID', '$myMsg', '2')");

              $following=mysqli_query($db,"SELECT count(*) as total from chats WHERE (sid='$userID' AND rid='$toUserID') OR (rid='$userID' AND sid='$toUserID')");
              $fres=mysqli_fetch_assoc($following);
              $userChatting = $fres['total'];
              if ($userChatting == 0)
              {
                $query = mysqli_query($db, "INSERT INTO chats (sid, rid)VALUES ('$userID', '$toUserID')");
              }

              $query = mysqli_query($db, "INSERT INTO inbox (sid, rid, msg)VALUES ('$userID', '$toUserID', '$myMsg')");
              $query = mysqli_query($db, "INSERT INTO outbox (sid, rid, msg)VALUES ('$userID', '$toUserID', '$myMsg')");
              if ($toUser == "theBigLebowski")
              {
                $lines = explode("\n", file_get_contents('quotes.txt'));
                $line = htmlspecialchars(killDaHackerz($lines[mt_rand(0, count($lines) - 1)]));
                $query = mysqli_query($db, "INSERT INTO inbox (sid, rid, msg)VALUES ('$toUserID', '$userID', '$line')");
                $query = mysqli_query($db, "INSERT INTO outbox (sid, rid, msg)VALUES ('$toUserID', '$userID', '$line')");
              }
              $sql="SELECT users.userName, inbox.msg, inbox.sid, inbox.date";
              $sql.=" FROM users";
              $sql.=" JOIN inbox ON (users.ID=inbox.sid)";
              $sql.=" WHERE users.userName='$toUser' AND inbox.rid='$userID'";
              $sql.=" UNION";
              $sql.=" SELECT users.userName, inbox.msg, inbox.sid, inbox.date";
              $sql.=" FROM users";
              $sql.=" JOIN inbox ON (users.ID=inbox.rid)";
              $sql.=" WHERE users.userName='$toUser' AND inbox.sid='$userID'";
              $sql.=" ORDER BY date ASC;";
                $result=mysqli_query($db,$sql);
                $return_arr = array();
                while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
                {
                    $row_array['msg'] = htmlentities($row['msg']);
                    $row_array['on'] = $row['date']." +00";
                    if($userID == $row['sid'])
                    {$row_array['guilty']=1;}
                    else
                    {$row_array['guilty']=0;}
                    $row_array['uname']=$row['userName'];
                    array_push($return_arr,$row_array);
                }

              if($query)
              {
                $array = array(
                    "success" => 1,
                    "loginQuery" => "imLettingYa",
                    "loginUser" => $loginName,
                    "tracker" => $sessId,
                    "urMsg"=>$myMsg,
                    "wentTo" => $toUser,
                    "hahaOkUCanTry" => $return_arr
                );
              }

              }


            }

            else {
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }
          }
        else
          {//naaaaaaaaaaaaah no cookies for you
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }


}




/*
SELECT users.userName, inbox.msg, inbox.sid, inbox.date
FROM users
JOIN inbox ON (users.ID=inbox.sid)
WHERE users.userName='gothqueen' AND inbox.rid='1'
UNION
SELECT users.userName, inbox.msg, inbox.sid, inbox.date
FROM users
JOIN inbox ON (users.ID=inbox.rid)
WHERE users.userName='gothqueen' AND inbox.sid='1'
ORDER BY date ASC
*/



if ($data["canYou"] == "STOPiMadeUpMyMind")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);

        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);
        if(mysqli_num_rows($result) == 1 )
          {//everything checked out, let them in
            $userID = $drow['ID'];
            $loginName = $drow['userName'];
            $kollajDistance =$drow['kollajDistance'];
            $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
            $result=mysqli_query($db,$query);
            $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
            if(mysqli_num_rows($result) == 1 )
            {
              //$sessId = md5($uuid."".rand());
              //$sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
              //$result=mysqli_query($db,$sql);

              //nextStep
              $botheredPerson = killDaHackerz($data["illBeBothering"]);
              mysqli_set_charset($db, "utf8");
              $sql="SELECT users.userName, inbox.msg, inbox.sid, inbox.date";
              $sql.=" FROM users";
              $sql.=" JOIN inbox ON (users.ID=inbox.sid)";
              $sql.=" WHERE users.userName='$botheredPerson' AND inbox.rid='$userID'";
              $sql.=" UNION";
              $sql.=" SELECT users.userName, inbox.msg, inbox.sid, inbox.date";
              $sql.=" FROM users";
              $sql.=" JOIN inbox ON (users.ID=inbox.rid)";
              $sql.=" WHERE users.userName='$botheredPerson' AND inbox.sid='$userID'";
              $sql.=" ORDER BY date ASC;";
                $result=mysqli_query($db,$sql);
                $return_arr = array();
                while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                    $row_array['msg'] = htmlentities($row['msg']);
                    $row_array['on'] = $row['date']." +00";
                    if($userID == $row['sid'])
                    {$row_array['guilty']=1;}
                    else
                    {$row_array['guilty']=0;}
                    $row_array['uname']=$row['userName'];
                    array_push($return_arr,$row_array);
                    }
              $array = array(
                  "success" => 1,
                  "loginQuery" => "imLettingYa",
                  "loginUser" => $loginName,
                  "tracker" => $tracker,
                  "hahaOkUCanTry"=>$return_arr
              );
            }

            else {
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }
          }
        else
          {//naaaaaaaaaaaaah no cookies for you
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }


}



if ($data["canYou"] == "makeMeDiscoverPpz")
{
  //make sure user is logged in, with current device, autologin/logout
    $username = killDaHackerz($data["myName"]);
    $uuid = killDaHackerz($data["uuid"]);
    $dModel = killDaHackerz($data["devModel"]);
    $devPlatform = killDaHackerz($data["devPlatform"]);
    $tracker = killDaHackerz($data["tracker"]);

        $sql="SELECT * FROM users WHERE userName='$username'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $result2=mysqli_query($db,$sql);
        $drow=mysqli_fetch_assoc($result2);
        if(mysqli_num_rows($result) == 1 )
          {//everything checked out, let them in
            $userID = $drow['ID'];
            $loginName = $drow['userName'];
            $kollajDistance =$drow['kollajDistance'];
            $query = "SELECT * FROM register WHERE uid='$userID' AND devUid = '$uuid' AND devVer = '$dModel' AND devPlatform = '$devPlatform' AND uniID = '$tracker' ";
            $result=mysqli_query($db,$query);
            $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
            if(mysqli_num_rows($result) == 1 )
            {
              //$sessId = md5($uuid."".rand());
              //$sql = "UPDATE register SET uniID='$sessId' WHERE uid = '$userID' AND uniID = '$tracker'";
              //$result=mysqli_query($db,$sql);

              //nextStep
              $sql="SELECT contacts.contact_ID, contacts.friend_ID ";
              $sql.="FROM contacts ";
              $sql.="WHERE contacts.contact_ID='$userID' AND contacts.accepted='1' LIMIT 100";

                $result=mysqli_query($db,$sql);
                $sql="SELECT contacts.friend_ID, SUM(accepted) AS points ";
                $sql.="FROM contacts ";
                $sql.="WHERE (";
                $switch = 1;
                while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
                {
                  if($switch == 1)
                  {
                  $sql.=" contacts.contact_ID='$row[friend_ID]'";
                  $switch = 0;
                  }
                  else {
                    $sql.=" OR contacts.contact_ID='$row[friend_ID]'";
                  }
                }
                $sql.=") ";
                $sql.="AND contacts.accepted='1' ";
                $sql.="AND friend_ID!='1' ";
                $sql.="GROUP BY (contacts.friend_ID) ";
                $sql.="ORDER BY points DESC";
                $result=mysqli_query($db,$sql);
                $sql="SELECT users.ID,  users.userName, users.realName ";
                $sql.="FROM users WHERE (";
                $switch = 1;
                while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
                  {
                    if ($switch == 1)
                    {
                      $sql.=" users.ID='$row[friend_ID]'";
                      $switch = 0;
                    }
                    else {
                    $sql.=" OR users.ID='$row[friend_ID]'";
                    }
                  }
                $sql.=") ORDER BY regDate DESC";

                $result=mysqli_query($db,$sql);
                $return_arr = array();
                while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
                {

                  $avatar_sql="SELECT imgpath FROM post WHERE uid='$row[ID]' ORDER BY date ASC LIMIT 1;";
                  $avatar_result=mysqli_query($db,$avatar_sql);
                  $drow=mysqli_fetch_assoc($avatar_result);
                  $uimg = $drow['imgpath'];
                  $row_array['avatar'] = "https://kollaj.net/uploads/".$uimg;
                  
                  $row_array['themReelzNamz'] = htmlentities($row['realName']);
                  $row_array['themUserNamz'] = $row['userName'];
                  array_push($return_arr,$row_array);
                }
                $array = array(
                  "success" => 1,
                  "loginQuery" => "imLettingYa",
                  "loginUser" => $loginName,
                  "tracker" => $tracker,
                  "uCanDiscoverThemPpz"=>$return_arr
                );
              }
            else {
              $array = array(
                  "success" => 1,
                  "loginQuery" => "noCookiesForYou",
              );
            }
          }
        else
          {//naaaaaaaaaaaaah no cookies for you
            $array = array(
                "success" => 1,
                "loginQuery" => "noCookiesForYou",
            );
          }


}



//register into kollaj

  



  //
  //LOGIN
  //
  // Found a good query on stack,
  /*
  SELECT COUNT(UserName)
  FROM TableName
  WHERE UserName = 'User' AND
         Password = 'Pass'
  LIMIT 0, 1
  ??????????????????????????
  http://stackoverflow.com/questions/5285388/mysql-check-if-username-and-password-matches-in-database
  thx to "ArrayOutOfBound"
  */


  echo (json_encode($array));

}
//print_r($data);

?>

