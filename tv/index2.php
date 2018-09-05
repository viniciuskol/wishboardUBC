<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>WishBoard</title>
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/css" href="css/wishes.css">
    <link rel="stylesheet" type="text/css" href="css/fonts.css">
    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/TweenMax.min.js"></script>
    <script type="text/javascript" src="js/d3.v3.min.js"></script>
    <script type="text/javascript" src="js/sketch.min.js"></script>
    <script type="text/javascript" src="js/socket.js"></script>
</head>

<body>
    <div class="shadow fullpage">
        <div class="container fullpage" id="main">
            <div class="blinkCircle"></div>
            <div class="fountainCircle"></div>
            <canvas class="canvas fullpage"></canvas>
            <div class="fullpage" id="wishingPool"></div>
        </div>
    </div>
    <div class="fullpage" id="background">
        <video id="waterBackground" width="100%" height="100%" preload="auto" loop="true" autoplay="true">
            <source src="bg.webm" type='video/webm'>
        </video>
    </div>
    <canvas class="fullpage" id="waterFountain"></canvas>
   <div class="advertisetxt"><div class="handshake" style="
    width: 75px;
    height: 85px;
    background: url('css/handshaking.png') no-repeat center center;
    background-size: contain;
    position: absolute;
    left: 245px;
    top: 3px;
"></div><div class="logo"></div>Please, make your wish at <br/><span class="url" style="
    color: #FCFF96;
    font-style: italic;
    font-family: serif;
    font-size: 26px;">shareyourwishes.ca</span></div>
   <div class="advertise"></div>

   <div class="advertisetxt right"><div class="" style="
    width: 25px;
    height: 45px;
    background: url('css/handshaking.png') no-repeat center center;
    background-size: contain;
    position: absolute;
    right: 0px;
    top: -14px;
"></div>Please, make your wish at <span class="url" style="
    color: #FCFF96;
    font-style: italic;
    font-family: serif;
    font-size: 24px;">shareyourwishes.ca</span></div>
   <div class="advertisetxt left"><div class="" style="
    width: 25px;
    height: 45px;
    background: url('css/handshaking.png') no-repeat center center;
    background-size: contain;
    position: absolute;
    right: 0px;
    top: -14px;
"></div>Please, make your wish at <span class="url" style="
    color: #FCFF96;
    font-style: italic;
    font-family: serif;
    font-size: 24px;">shareyourwishes.ca</span></div>
    <audio id="audiobackground" style="visibility: hidden; width: 0; height: 0" autoplay="true" loop preload="auto">
        <source src="water.mp3" />
    </audio>
    <audio id="audiocoin1" style="visibility: hidden; width: 0; height: 0" preload="auto">
        <source src="dropcoin1.mp3" />
    </audio>
    <audio id="audiocoin2" style="visibility: hidden; width: 0; height: 0" preload="auto">
        <source src="dropcoin2.mp3" />
    </audio>
    <audio id="audiocoin3" style="visibility: hidden; width: 0; height: 0" preload="auto">
        <source src="dropcoin3.mp3" />
    </audio>
    <audio id="audiolaunch" style="visibility: hidden; width: 0; height: 0" preload="auto">
        <source src="launch.mp3" />
    </audio>
    <audio id="audiofountain" style="visibility: hidden; width: 0; height: 0" preload="auto">
        <source src="fountain.mp3" />
    </audio>
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/wishes.js"></script>
    <script>
    var newWishes = [];
    var wishesFountain = [];
    var stopSending = false;
    var askingWishes = false;
    function newMessage(e) {
        var wish = JSON.parse(e.data);
        var randomplay = getRandomInt(1,3);
        if (wish.hasOwnProperty('type')) {
            if (wish.type == "fountain") {
                wishesFountain.push(wish);
            } else if (wish.type == "wish") { 
                if (document.getElementById("audiocoin"+ randomplay).paused) {
                   document.getElementById("audiocoin"+ randomplay).play();
                } else {
                   document.getElementById("audiocoin"+ randomplay).pause();
                   document.getElementById("audiocoin"+ randomplay).currentTime = 0;
                   document.getElementById("audiocoin"+ randomplay).play();
                }
                setTimeout(function(){
                    newWishes.push(wish);
                },2000);
            }
        } else if (wish.hasOwnProperty('server') && wish.server.hasOwnProperty('ready') && wish.server.refresh) {
            location.reload();
        }  else if (wish.hasOwnProperty('server') && wish.server.hasOwnProperty('blockcloudmessage') && wish.server.blockcloudmessage) {
                sinkWish(false, wish.server.id);
        } 
    }
    setInterval(function() {
        if (wishesOnThePool.length >= maxFloatingWishes) {
            stopSending = true;
            sendMessage(JSON.stringify({
                "server": {
                    "stopSending": true
                }
            }));
        } else if (stopSending && wishesOnThePool.length < maxFloatingWishes) {
            stopSending = false;
            sendMessage(JSON.stringify({
                "server": {
                    "stopSending": false
                }
            }));
        }
    }, 1000);
    </script>
</body>

</html>
	