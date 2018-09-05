<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>WishBoard</title>
    <link rel="stylesheet" type="text/css" href="css/fonts.css">
    <link rel="stylesheet" type="text/css" href="css/screenshot.css">
    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/socket.js"></script>
    <script type="text/javascript" src="js/dom-to-image.min.js"></script>
</head>

<body>
    <div id="messageImg"></div>
    <div id="screenshot" class="screenshot hide">
        <div id="wish" class="wish"></div>
    </div>
    <div style="opacity: 0;position:absolute;">
        <span style="font-family: DJBAnnalisetheBrave"></span>
    </div>
    <script>
    var wishdiv = document.getElementById("wish");
    var screenshotdiv = document.getElementById("screenshot");
    var newWishes = [];
    var running = false;

    function newMessage(e) {
        var wish = JSON.parse(e.data);
        if (wish.hasOwnProperty('type')) {
            if (wish.type == "wish") {
                newWishes.push(wish);
            }
        } else if (wish.hasOwnProperty('server') && wish.server.ready && wish.server.refresh) {
            location.reload();
        }
    }

    setInterval(
        function() {
            if (newWishes.length > 0 && !running) {
                running = true;
                screenshotdiv.classList.remove("hide");
                var wish = newWishes.pop();
                wishdiv.innerHTML = prepareText( wish.message);
                screenshotdiv.classList.add(wish.color);
                saveImage(wish.id, wish.message);
            }
        }, 1000);


    $(document).ready(function() {
        function preloadImages(array) {
            if (!preloadImages.list) {
                preloadImages.list = [];
            }
            var list = preloadImages.list;
            for (var i = 0; i < array.length; i++) {
                var img = new Image();
                img.onload = function() {
                    var index = list.indexOf(this);
                    if (index !== -1) {
                        list.splice(index, 1);
                    }
                }
                list.push(img);
                img.src = array[i];
            }
        }
        preloadImages(["wishes/bg.jpg"]);
    });

    <!-- BEGIN: Ajax -->
    function sendRequest(url, callback, postData) {
        var req = createXMLHTTPObject();
        if (!req) return;
        var method = (postData) ? "POST" : "GET";
        req.open(method, url, true);
        if (postData)
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.onreadystatechange = function() {
            if (req.readyState != 4) return;
            if (req.status != 200 && req.status != 304) {
                return;
            }
            callback(req);
        }
        if (req.readyState == 4) return;
        req.send(postData);
    }
    var XMLHttpFactories = [
        function() {
            return new XMLHttpRequest()
        },
        function() {
            return new ActiveXObject("Msxml2.XMLHTTP")
        },
        function() {
            return new ActiveXObject("Msxml3.XMLHTTP")
        },
        function() {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }
    ];

    function createXMLHTTPObject() {
        var xmlhttp = false;
        for (var i = 0; i < XMLHttpFactories.length; i++) {
            try {
                xmlhttp = XMLHttpFactories[i]();
            } catch (e) {
                continue;
            }
            break;
        }
        return xmlhttp;
    }


"use strict";

function isEmoji(char) {
    var split = char.match(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
    if (split != null) {
        for (var i = 0; i < split.length; i++) {
            char = split[i]
            if (char !== "") {
                return 'emoji" data-emoji="' + encodeURIComponent(char);
            }
        }
    }
    return '';
};

function injectSpan(string, klass) {
    var finalText = '',
        i = 0,
        count = 0;
    var klass;
    for (let char of string) {
        klass = "char";
        if (char != " ") {
            count++;
            if (count > 10) {
                klass = "char break";
            }
        } else {
            count = 0;
        }
        finalText += '<span class="' + klass + " " + isEmoji(char) + '">' + char + '</span>';
        i++;
    }
    return finalText;
}

function prepareText(string) {
    text = injectSpan(string, 'char');
    return text;
}
    <!-- END: Ajax -->
    function saveImage(id, message) {
        var node = screenshotdiv;
        domtoimage.toPng(node)
            .then(function(dataUrl) {
                var data = [];
                data.push("id=" + encodeURIComponent(id));
                data.push("message=" + encodeURIComponent(message));
                data.push("saveimage=" + encodeURIComponent(dataUrl));
                sendRequest('saveimage.php', response, data.join("&"));
            })
            .catch(function(error) {
                screenshotdiv.className = "screenshot hide";
                wishdiv.innerHTML = "";
                running = false;
            });
    }

    function response(req) {
        if (req.responseText.indexOf("saved") > -1) {
            screenshotdiv.className = "screenshot hide";
            wishdiv.innerHTML = "";
            running = false;
        } else {
            screenshotdiv.className = "screenshot hide";
            wishdiv.innerHTML = "";
            running = false;
        }
    }
    </script>
</body>

</html>