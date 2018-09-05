var ip = "egocriativo.com.br";
var websocketPort = 8080;
var connection;

$(document).ready(function () {
    $.getScript("js/reconnecting-websocket.js", function () {
        connection = new ReconnectingWebSocket('ws://' + ip + ':' + websocketPort + '/', null, {debug: false, reconnectInterval: 3000});
        connect();
    });
});

function connect() {
    var statusdiv = document.getElementById("status");
    connection.onopen = function () {
        document.title = "CONNECTED";
        if (statusdiv) {
            statusdiv.innerHTML = "<span style='color:#99ff99'>Connected</span>";
        }
    };

    connection.onclose = function (error) {
        document.title = "DISCONNECTED";
        if (statusdiv) {
            statusdiv.innerHTML = "<span style='color:#ff9999'>Disconnected</span>";
        }
    };

    connection.onmessage = function (e) {
        console.log("Received " + e.data);
        try {
            newMessage(e);
        } catch (e) {}
    };
}

function sendMessage(str) {
    if (isConnected()) {
        connection.send(str);
    }
}

function isConnected() {
    if (typeof connection != 'undefined' && typeof connection.readyState != 'undefined' && connection.readyState == 1) {
        return true;
    } else {
        return false;
    }
}

function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}