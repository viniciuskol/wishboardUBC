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
    <div id="start" >
        <div style="width: 50%; margin: 15px auto;">
            <div class="label">Flow rate:</div><div class="controller"  style="width: 70%;"><input type="range" min="0" max="255" step="1"></div>
        </div>
        <div style="width: 50%; margin: 15px auto;">
            <div class="label">Size Orb:</div><div class="controller"  style="width: 70%;"><input type="range" min="0" max="255" step="1"></div>
        </div>
        <div style="width: 50%; margin: 15px auto;">
            <div class="label">Position of the Orb:</div><div class="controller"  style="width: 70%;"><input type="range" min="0" max="255" step="1"></div>
        </div>
        <button onclick="start()" class="button" id="startButton">Update WishBoard</button>
    </div>
    <script>
    function newMessage(e) {
        var wish = JSON.parse(e.data);
        if (wish.hasOwnProperty('server') && wish.server.hasOwnProperty('stopSending')) {
            stopSending = wish.server.stopSending;
        }
    }
    </script>
</body>

</html>
