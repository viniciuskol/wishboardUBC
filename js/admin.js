(function() {
    var activeObject;
    <!-- BEGIN: Menu -->
    window.onclick = function(e) {
        if (e.target.classList.contains("menu") == true) {
            if (document.getElementById("menu").classList.contains("active") == true) {
                e.preventDefault();
                document.getElementById("menu-sandwich").classList.remove("active");
                document.getElementById("menu").classList.remove("active");
            }
        }

        if (e.target.classList.contains("button-hide") == true) {
            e.preventDefault();
            document.getElementById("selected-wish").innerHTML = e.target.innerHTML;
            document.getElementById("modalSending").classList.add("active");
            activeObject = e.target;
        } else if (e.target.classList.contains("button-show") == true) {
            e.preventDefault();
            activeObject = e.target;
            var data = [];
            var color = activeObject.classList + "";
            data.push("block=" + encodeURIComponent("false"));
            data.push("id=" + encodeURIComponent(activeObject.getAttribute("wish-id")));
            data.push("function=" + encodeURIComponent("blockpost"));
            sendRequest('bd.php', blockResponse,  data.join("&"));
        }
    };

    document.getElementById("logo").addEventListener("click", function(e) {
        e.preventDefault();
        document.location.href='index.php';
    });
    
    document.getElementById("menu-sandwich").addEventListener("click", function(e) {
        e.preventDefault();
        if (this.classList.contains("active") === true) {
            this.classList.remove("active");
            document.getElementById("menu").classList.remove("active");
        } else {
            this.classList.add("active");
            document.getElementById("menu").classList.add("active");
        }
    });
    <!-- END: Menu -->

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
    <!-- END: Ajax -->

    var count = 0;
    var start = 0;
    var total = 20;

    function loadPosts() {
        sendRequest('bd.php?function=allposts&start=' + start + '&total=' + total+ '&blocked=true', handleRequest);
        start = start + total;
    }

    function handleRequest(req) {
        var readJson = JSON.parse(req.responseText);
        if (readJson.length <= 0) {
            document.getElementById("load-more").classList.add('hidden');
        } else {
            for (var i = 0; i < readJson.length; i++) {
                var prefix = '';
                var posfix = '';
                var color = '';
                var blocked = '';
                var id = '';
                var obj = readJson[i];
                var newDiv = document.createElement('div');
                count++;
                for (var key in obj) {
                    var attrName = key;
                    var attrValue = obj[key];
                    if (attrName === "prefix") prefix = attrValue
                    else if (attrName === "posfix") posfix = attrValue
                    else if (attrName === "color") color = attrValue
                    else if (attrName === "id") id = attrValue
                    else if (attrName === "blocked") blocked = attrValue;
                }
                newDiv.innerHTML = prefix + " " + posfix;
                if (blocked == '0'){
                    newDiv.setAttribute('class', 'wish button-hide color-' + color);
                    newDiv.setAttribute('wish-id', id);
                } else {
                    newDiv.setAttribute('class', 'wish button-show color-' + color);
                    newDiv.setAttribute('wish-id', id);
                }
                document.getElementById('wishes-table').appendChild(newDiv);
            }
        }
    }

    window.addEventListener("load", function(e) {
        loadPosts();
    });

    window.addEventListener("scroll", function(e) {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        var div = document.getElementById("load-more").scrollTop;
        if (top >= div - 10) {
            loadPosts();
        }
    });

    document.getElementById("load-more").addEventListener("click", function(e) {
        e.preventDefault();
        loadPosts();
    });

    document.getElementById("consent-ok").addEventListener("click", function(e) {
        e.preventDefault();
        if (activeObject != null){
            var data = [];
            data.push("block=" + encodeURIComponent("true"));
            data.push("id=" + encodeURIComponent(activeObject.getAttribute("wish-id")));
            data.push("function=" + encodeURIComponent("blockpost"));
            sendRequest('bd.php', blockResponse,  data.join("&"));
            var message = {
                'server': {
                    'blockcloudmessage': true,
                    'id': activeObject.getAttribute("wish-id")
                }
            }
            sendMessage(JSON.stringify(message));
        }
    });

    function blockResponse(req) {
        if (req.responseText.indexOf("unblocked") > -1) {
            if (activeObject != null){
                activeObject.classList.remove("button-show");
                activeObject.classList.add("button-hide");
            }
        } else if (req.responseText.indexOf("blocked") > -1) {
            if (activeObject != null){
                activeObject.classList.remove("button-hide");
                activeObject.classList.add("button-show");
            }
        }
        document.getElementById("modalSending").classList.remove("active");
    }

    document.getElementById("consent-cancel").addEventListener("click", function(e) {
        e.preventDefault();
        document.getElementById("modalSending").classList.remove("active");
    });
})();
