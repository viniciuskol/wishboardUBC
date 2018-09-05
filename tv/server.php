<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>WishBoard</title>
    <link rel="stylesheet" type="text/css" href="css/server.css">
    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/socket.js"></script>
</head>

<body>
    <div id="status">Waiting...</div>
    <div id="start" style="visibility: hidden">
        <button onclick="start()" class="button" id="startButton">Start WishBoard</button>
    </div>
    <div class="screenshot">
        <iframe id="screenshot" onload="document.getElementById('start').style.visibility='visible'" src="screenshot.php" style="border:0px" width="1024" height="768">
        </iframe>
    </div>
    <iframe id="iframe" style="opacity: 0; visibility: hidden;" width="10" height="10">
    </iframe>
    <script>
    var newWishes = [];
    var wishesFountain = [];
    var firstTime = true;
    var loadingWishes = false;
    var stopSending = false;
    var lastId = 0;

    function newMessage(e) {
        var wish = JSON.parse(e.data);
        if (wish.hasOwnProperty('server') && wish.server.hasOwnProperty('wish')) {
            var message = {
                'id': wish.server.wish.id,
                'message': wish.server.wish.message,
                'color': wish.server.wish.color
            };
            wishesFountain.unshift(message);
        } else if (wish.hasOwnProperty('server') && wish.server.hasOwnProperty('stopSending')) {
            stopSending = wish.server.stopSending;
        }
    }

    function start() {
        clearAllTimeouts();
        sendMessage(JSON.stringify({
            "server": {
                "ready": true,
                "refresh": true
            }
        }));
        console.clear();
        setTimeout(function() {
            newWishes = [];
            wishesFountain = [];
            firstTime = true;
            loadingWishes = false;
            stopSending = false;
            lastId = 0;
            loadAllWishes();
        }, 5000);
    }

    function clearAllTimeouts() {
        if (typeof clearAllTimeouts.last == 'undefined') {
            clearAllTimeouts.last = setTimeout("||void", 0);
        }
        var mx = setTimeout("||void", 0);
        for (var i = clearAllTimeouts.last; i <= mx; i++) {
            clearTimeout(i);
        }
        clearAllTimeouts.last = i;
    }

    function loadAllWishes() {
        setInterval(function() {
            if (!loadingWishes)
                loadWishesFromAjax('allposts', 0, 0, lastId, 'descending');
            if (newWishes.length > 0) {
                sendLastWishToWishBoard(false);
            } else if (wishesFountain.length > 0) {
                if (!stopSending) {
                    sendLastWishToWishBoard(true);
                }
            }
        }, 1000);
    }

    function parseEmojis(text) {
        var ranges = ['\ud83c[\udf00-\udfff]', '\ud83d[\udc00-\ude4f]', '\ud83d[\ude80-\udeff]'];
        return text.replace(new RegExp(ranges.join('|'), 'g'), '<span class="emoji">$&</span>');
    }

    function loadWishesFromAjax(getfunction, start, total, idfinal, order) {
        loadingWishes = true;
        $.ajax({
            url: '../bd.php',
            data: {
                'function': getfunction,
                'start': start,
                'total': total,
                'idfinal': idfinal,
                'order': order
            },
            type: 'get',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            success: function(responseJSON) {
                $(responseJSON).each(function(i, wish) {
                    if (wish.hasOwnProperty('lastid')) {
                        if (lastId != parseInt(wish.lastid)) {
                            lastId = parseInt(wish.lastid);
                        }
                    }
                    if (wish.hasOwnProperty('prefix') && responseJSON[responseJSON.length - i - 1].posfix.length > 0) {
                        if (firstTime) {
                            wishesFountain.push(responseJSON[responseJSON.length - i - 1]);
                        } else {
                            newWishes.push(responseJSON[responseJSON.length - i - 1]);
                        }
                    }
                });
            },
            error: function() {
                console.log("error");
                loadingWishes = false;
            },
            complete: function() {
                firstTime = false;
                loadingWishes = false;
            }
        });
    }

    function hasNumber(myString) {
      return (
        /\d/.test(
          myString));
    }

    function sendLastWishToWishBoard(fountain) {
        if (isConnected()) {
            var wish, type;
            if (fountain) {
                wish = wishesFountain.pop();
                type = 'fountain';
            } else {
                wish = newWishes.pop();
                type = 'wish';
            }
            var message;
            if (wish.hasOwnProperty('posfix')) {
                message = wish.prefix + " " + wish.posfix;
            } else {
                message = wish.message;
            }
            var colorsArray = ["white", "orange", "yellow", "green", "blue", "pink", "red"];
            var color;
            if (hasNumber(wish.color)){
                color = colorsArray[wish.color];
            } else {
                color = wish.color;
            }
            var message = {
                'id': wish.id,
                'type': type,
                'message': message,
                'color': color
            }
            sendMessage(JSON.stringify(message));
        }
    }
    </script>
</body>

</html>
