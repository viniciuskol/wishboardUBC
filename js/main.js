var lastId = 0;

(function() {
    var blockclick = false;
    var blocksend = false;

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    function reset(){
        if (getCookie("consent") === "true" || getCookie("consent") === "false") {
            document.getElementById("consent").value = getCookie("consent");
        } else {
            document.getElementById("consent").value = "false";
        }
        document.getElementById("prefix").value = "";
        document.getElementById("posfix").value = "";
        document.getElementById("color").value = "";
        var classColor = document.getElementsByClassName("color");
        for (var i = 0; i < classColor.length; i++) {
                classColor[i].classList.remove("active");
        }
        blocksend = false;
        document.getElementById("form").classList.remove("sent");
        document.getElementById("prefix").className = "";
        document.getElementById("posfix").className = "";
        document.getElementById("coin").classList.add("disable");
        document.getElementById("coin-flip-cont").classList.add("disable");
        document.getElementById("dropdown-prefix").classList.add("actived");
        document.getElementById("dropdown-prefix").classList.add("first");
        lastId = 0;
    }

    window.onload = function() {
        if (getCookie("consent") === "true" || getCookie("consent") === "false") {
            document.getElementById("consent").value = getCookie("consent");
        } else {
            document.getElementById("consent").value = "false";
        }
    }

    <!-- BEGIN: Menu -->
    window.onclick = function(e) {
        if (e.target.classList.contains("menu") == true) {
            if (document.getElementById("menu").classList.contains("active") == true) {
                e.preventDefault();
                document.getElementById("menu-sandwich").classList.remove("active");
                document.getElementById("menu").classList.remove("active");
            }
        }
        if (e.target.classList.contains("modal") == true) {
            e.preventDefault();
            e.target.classList.remove("active");
            if (e.target == document.getElementById("modalConsent")) {
                reset();
            }
        }

        if (e.target.classList.contains("disable") == true) {
            e.preventDefault();
        }
    };

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

    <!-- BEGIN: Form -->
    var classPrefix = document.getElementsByClassName("prefix-text");
    for (var i = 0; i < classPrefix.length; i++) {
        classPrefix[i].addEventListener("click", function(e) {
            e.preventDefault();
            document.getElementById("prefix").value = this.text.replace(" ...", "");
            document.getElementById("linkwishes").classList.remove("disable");
            document.getElementById("dropdown-prefix").classList.remove("first");
            this.blur();
            document.getElementById("dropdown-prefix").blur();
            document.activeElement && document.activeElement.blur();
            setTimeout(function() {
                document.getElementById("dropdown-prefix").classList.remove("actived");
                blockclick = false;
                if (typeof document.getElementById("posfix").click() == 'function') { 
                    document.getElementById("posfix").click();
                }
                document.getElementById("posfix").focus();
            }, 200);
        });

        classPrefix[i].addEventListener("touchstart", function(e) {
            e.preventDefault();
            blockclick = true;
            document.getElementById("prefix").value = this.text.replace(" ...", "");
            this.blur();
            document.getElementById("dropdown-prefix").blur();
            document.activeElement && document.activeElement.blur();
        });

        classPrefix[i].addEventListener("touchend", function(e) {
            e.preventDefault();
            document.getElementById("dropdown-prefix").classList.remove("first");
            this.blur();
            document.getElementById("dropdown-prefix").blur();
            document.activeElement && document.activeElement.blur();
            document.getElementById("posfix").focus();
            setTimeout(function() {
                document.getElementById("dropdown-prefix").classList.remove("actived");
                blockclick = false;
            }, 200);
        });
    }

    document.getElementById("prefix").addEventListener("change", function(e) {
        validateForm();
    });

    document.getElementById("dropdown-prefix").addEventListener("click", function(e) {
        if (document.getElementById("dropdown-prefix").classList.contains("actived") && !document.getElementById("dropdown-prefix").classList.contains("first")) {
            document.getElementById("dropdown-prefix").classList.remove("actived");
            blockclick = false;
        } else {
            document.getElementById("dropdown-prefix").classList.add("actived");
            blockclick = true;
        }
    });

    document.getElementById("posfix").addEventListener("enter", function(e) {
        fitToContent(this);
        document.getElementById("dropdown-prefix").classList.remove("actived");
    });

    document.getElementById("posfix").addEventListener("change", function(e) {
        fitToContent(this);
        validateForm();
    });

    document.getElementById("posfix").addEventListener("blur", function(e) {
        fitToContent(this);
        validateForm();
    });

    document.getElementById("posfix").addEventListener("cut", function(e) {
        fitToContent(this);
        validateForm();
    });

    document.getElementById("posfix").addEventListener("paste", function(e) {
        fitToContent(this);
        validateForm();
    });

    document.getElementById("posfix").addEventListener("keypress", function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            document.getElementById("posfix").blur();
            document.activeElement && document.activeElement.blur();
        };
        fitToContent(this);
        validateForm();
    });

    document.getElementById("posfix").addEventListener("keyup", function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            document.getElementById("posfix").blur();
            document.activeElement && document.activeElement.blur();
        };
        fitToContent(this);
        validateForm();
    });

    function fitToContent(id) {
        var text = id && id.style ? id : document.getElementById(id);
        if (!text)
            return;
        text.style.height = '0';
        var newHeight = text.scrollHeight + 5;
        text.style.height = newHeight + 'px';
    }

    document.getElementById("posfix").addEventListener("click", function(e) {
        document.getElementById("dropdown-prefix").classList.remove("actived");
    });

    document.getElementById("coin").addEventListener("click", function(e) {
        if (blockclick || blocksend) return false;
        sendForm();
    });
    document.getElementById("hand").addEventListener("click", function(e) {
        if (blockclick || blocksend) return false;
        sendForm();
    });

    document.getElementById("coin").addEventListener("touchstart", function(e) {
        if (blockclick || blocksend) return false;
        sendForm();
    });
    document.getElementById("hand").addEventListener("touchstart", function(e) {
        if (blockclick || blocksend) return false;
        sendForm();
    });
    document.getElementById("dropdown-prefix").addEventListener("click", function(e) {
        document.getElementById("posfix").blur();
        document.activeElement && document.activeElement.blur();
        document.getElementById("dropdown-prefix").focus();
    });

    function validateForm() {
        if (document.getElementById("prefix").value.trim() != '' && document.getElementById("posfix").value.trim() != '' && document.getElementById("color").value.trim() != '' && document.getElementById("color").value >= 0 && document.getElementById("color").value <= 6) {
            document.getElementById("coin").classList.remove("disable");
            document.getElementById("coin-flip-cont").classList.remove("disable");
            return true;
        } else {
            document.getElementById("coin").classList.add("disable");
            document.getElementById("coin-flip-cont").classList.add("disable");
            return false;
        }
    }

    function formResponse(req) {
        document.getElementById("modalSending").classList.remove("successful");
        document.getElementById("modalSending").classList.remove("fail");
        if (req.responseText.indexOf("ok") > -1) {
            lastId = req.responseText.replace("ok", "");
            setTimeout(function() {
                if (getCookie("consent") === "true" || getCookie("consent") === "false") {
                    setTimeout(function() {
                        reset();
                    }, 1500);
                } else {
                    document.getElementById("modalConsent").classList.add("active");
                }
            }, 4000);
        } else {
            document.getElementById("modalSending").classList.add("active");
            document.getElementById("modalSending").classList.add("fail");
        }
    }

    function consentResponse(req) {
        document.getElementById("modalConsent").classList.remove("active");
        setTimeout(function() {
            reset();
        }, 1500);
    }

    function serialize() {
        var q = [];
        q.push(document.getElementById("prefix").name + "=" + encodeURIComponent(document.getElementById("prefix").value));
        q.push(document.getElementById("posfix").name + "=" + encodeURIComponent(document.getElementById("posfix").value));
        q.push(document.getElementById("color").name + "=" + encodeURIComponent(document.getElementById("color").value));
        q.push(document.getElementById("consent").name + "=" + encodeURIComponent(document.getElementById("consent").value));
        q.push(document.getElementById("function").name + "=" + encodeURIComponent(document.getElementById("function").value));
        return q.join("&");
    }

    function sendForm() {
        if (blockclick) return false;
        if (blocksend) return false;
        document.getElementsByClassName("color-picker")[0].classList.remove("shake");
        document.getElementById("posfix").classList.remove("shake");
        if (validateForm() && document.getElementById("coin").classList.contains("disable") === false) {
            document.getElementById("audiocoin").play();
            document.getElementById("form").classList.remove("sent");
            document.getElementById("form").classList.add("sent");
            var data = serialize();
            if (!blocksend) {
               blocksend = true;
               sendRequest('bd.php', formResponse, data);
            }
        } else {
            if (document.getElementById("posfix").value.trim() == '') {
                setTimeout(function() {
                    document.getElementById("posfix").classList.add("shake");
                }, 200);
            }
            if (document.getElementById("color").value.trim() == '' || document.getElementById("color").value <= 0 || document.getElementById("color").value >= 6) {
                setTimeout(function() {
                    document.getElementsByClassName("color-picker")[0].classList.add("shake");
                }, 200);
            }
        }
    }

    var classColor = document.getElementsByClassName("color");
    for (var i = 0; i < classColor.length; i++) {
        classColor[i].addEventListener("click", function(e) {
            e.preventDefault();
            document.getElementById("prefix").className = '';
            document.getElementById("posfix").className = '';
            document.getElementById("coin").className = 'flipcoin';
            for (var i = 0; i < classColor.length; i++) {
                classColor[i].classList.remove("active");
            }
            this.classList.add("active");
            if (this.classList.contains("white") === true) {
                document.getElementById("prefix").classList.add("white");
                document.getElementById("posfix").classList.add("white");
                document.getElementById("coin").classList.add("white");
                document.getElementById("color").value = '0';
            }
            if (this.classList.contains("orange") === true) {
                document.getElementById("prefix").classList.add("orange");
                document.getElementById("posfix").classList.add("orange");
                document.getElementById("coin").classList.add("orange");
                document.getElementById("color").value = '1';
            }
            if (this.classList.contains("yellow") === true) {
                document.getElementById("prefix").classList.add("yellow");
                document.getElementById("posfix").classList.add("yellow");
                document.getElementById("coin").classList.add("yellow");
                document.getElementById("color").value = '2';
            }
            if (this.classList.contains("green") === true) {
                document.getElementById("prefix").classList.add("green");
                document.getElementById("posfix").classList.add("green");
                document.getElementById("coin").classList.add("green");
                document.getElementById("color").value = '3';
            }
            if (this.classList.contains("blue") === true) {
                document.getElementById("prefix").classList.add("blue");
                document.getElementById("posfix").classList.add("blue");
                document.getElementById("coin").classList.add("blue");
                document.getElementById("color").value = '4';
            }
            if (this.classList.contains("purple") === true) {
                document.getElementById("prefix").classList.add("purple");
                document.getElementById("posfix").classList.add("purple");
                document.getElementById("coin").classList.add("purple");
                document.getElementById("color").value = '5';
            }
            if (this.classList.contains("red") === true) {
                document.getElementById("prefix").classList.add("red");
                document.getElementById("posfix").classList.add("red");
                document.getElementById("coin").classList.add("red");
                document.getElementById("color").value = '6';
            }
            validateForm();
        });
    }
    <!-- END: Form -->
    <!-- BEGIN: Consent -->
    document.getElementById("consent-ok").addEventListener("click", function(e) {
        document.getElementById("checkboxConsent").classList.add("active");
        document.getElementById("consent").value = "true";
        setCookie("consent", "true", 1);
        if (lastId > 0) {
            var data = [];
            data.push("id" + "=" + encodeURIComponent(lastId));
            data.push("consent" + "=" + encodeURIComponent("true"));
            data.push("function" + "=" + encodeURIComponent("consentpost"));
            data = data.join("&");
            sendRequest('bd.php', consentResponse, data);
        }
    });

    document.getElementById("consent-cancel").addEventListener("click", function(e) {
        document.getElementById("checkboxConsent").classList.remove("active");
        document.getElementById("modalConsent").classList.remove("active");
        document.getElementById("consent").value = "false";
        setCookie("consent", "false", 1);
        if (lastId > 0) {
            var data = [];
            data.push("id" + "=" + encodeURIComponent(lastId));
            data.push("consent" + "=" + encodeURIComponent("false"));
            data.push("function" + "=" + encodeURIComponent("consentpost"));
            data = data.join("&");
            sendRequest('bd.php', consentResponse, data);
        }
    });
    document.getElementById("read-consent").addEventListener("click", function(e) {
        e.preventDefault();
        if (document.getElementById("read-consent").classList.contains("active") === false) {
            document.getElementById("read-consent").classList.add("active");
            document.getElementById("short-consent").classList.add("hidden");
            document.getElementById("full-consent").classList.remove("hidden");
        } else {
            document.getElementById("read-consent").classList.remove("active");
            document.getElementById("short-consent").classList.remove("hidden");
            document.getElementById("full-consent").classList.add("hidden");
        }
    });
    <!-- END: Consent -->
})();
		