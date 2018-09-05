(function() {
    <!-- BEGIN: Menu -->
    window.onclick = function(e) {
        if (e.target.classList.contains("menu") == true) {
            if (document.getElementById("menu").classList.contains("active") == true) {
                e.preventDefault();
                document.getElementById("menu-sandwich").classList.remove("active");
                document.getElementById("menu").classList.remove("active");
            }
        }
    };

    document.getElementById("logo").addEventListener("click", function(e) {
        e.preventDefault();
        document.location.href = 'index.php';
    });
if (document.getElementById("modalSending")!= null){
    document.getElementById("modalSending").addEventListener("click", function(e) {
        e.preventDefault();
        reset();
        document.getElementById("modalSending").classList.remove("active");
    });
}
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
                formResponse("Fail");
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

    var buttoncomments = document.getElementById("button-submit-comment");
    if (buttoncomments) {
        buttoncomments.addEventListener("click", function(e) {
            e.preventDefault();
            if (validateForm()) {
                var data = [];
                data.push("name" + "=" + encodeURIComponent(document.getElementById("name").value));
                data.push("email" + "=" + encodeURIComponent(document.getElementById("email").value));
                data.push("country" + "=" + encodeURIComponent(""));
                data.push("message" + "=" + encodeURIComponent(document.getElementById("message").value));
                data = data.join("&");
                sendRequest('http://egocriativo.com.br/sendwishboard.php', commentResponse, data);
            }
        });
    }
    function reset(){
        document.getElementById("name").value ="";
        document.getElementById("email").value ="";
        document.getElementById("message").value ="";
    }

    function commentResponse(req) {
        document.getElementById("modalSending").classList.remove("successful");
        document.getElementById("modalSending").classList.remove("fail");
        if (req.responseText.indexOf("ok") > -1) {
            document.getElementById("modalSending").classList.add("successful");
            reset();
        } else {
            document.getElementById("modalSending").classList.add("fail");
        }
        document.getElementById("modalSending").classList.add("active");
        setTimeout(function() {
            document.getElementById("modalSending").classList.remove("active");
        }, 3000);
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validateForm() {
        if (document.getElementById("message").value.trim() != '') {
            return true;
        } else {
            if (document.getElementById("message").value.trim() == '') {
                document.getElementById("label-message").classList.add("shake");
            }
            setTimeout(function() {
                document.getElementById("label-message").classList.remove("shake");
            }, 1500);
            return false;
        }
    }
    <!-- END: Menu -->
})();