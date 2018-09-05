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
        //var postData = [{ 'function': 'allposts', 'start': start, 'total': total }];
        sendRequest('bd.php?function=allposts&start=' + start + '&total=' + total, handleRequest);
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
                var obj = readJson[i];
                var newDiv = document.createElement('div');
                count++;
                for (var key in obj) {
                    var attrName = key;
                    var attrValue = obj[key];
                    if (attrName === "prefix") prefix = attrValue
                    else if (attrName === "posfix") posfix = attrValue
                    else if (attrName === "color") color = attrValue;
                }
                newDiv.innerHTML = prefix + " " + posfix;
                if ((count - 1) % 2 == 0) {
                    newDiv.setAttribute('class', 'wish color-' + color);
                } else {
                    newDiv.setAttribute('class', 'wish color-' + color);
                }
                document.getElementById('wishes-table').appendChild(newDiv);
            }
            twemoji.size = '16x16';
            twemoji.parse(document.body);
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
    
    <!-- BEGIN: carrousel -->
    var box = document.querySelector('.carouselbox');
    var next = box.querySelector('.next');
    var prev = box.querySelector('.prev');
    var items = box.querySelectorAll('.carousel-content li');
    var counter = 0;
    var amount = items.length;
    var current = items[0];
    box.classList.add('carousel-active');
    function navigate(direction) {
        current.classList.remove('carousel-current');
        counter = counter + direction;
        if (direction === -1 && 
            counter < 0) { 
            counter = amount - 1; 
        }
        if (direction === 1 && 
            !items[counter]) { 
            counter = 0;
        }
        current = items[counter];
        current.classList.add('carousel-current');
    }
    setInterval(function(){ navigate(1) }, 5000);
    navigate(0);
    <!-- END: carrousel --> 
})();
