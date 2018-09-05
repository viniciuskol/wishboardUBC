<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>WishBoard - Wishes Worth Sharing</title>
    <link rel="canonical" href="http://www.shareyourwishes.ca/index.php" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>    
    <meta name="description" content="WishBoard is an art installation that aims to promote a sense of community through a collaborative artistic expression of the wishes of its participants. Using their personal mobile devices such as smartphones, people can interact with the technological installation contributing to the collective construction of the artwork.">
    <meta name="theme-color" content="#093b57">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="shortcut icon" href="favicon.ico">
    <script type="text/javascript" src="tv/js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="tv/js/socket.js"></script>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
    <body>
         <div class="main no-bg scroll">
            <div class="top">
                <div class="logo" id="logo">WishBoard</div>
                <div class="menu-sandwich menu-sandwich-x" id="menu-sandwich"><span>Toggle menu</span></div>
            </div>
            <div class="menu scrollbar" id="menu">
                <ul>
                    <li><a href="index.php">Make a wish</a></li>
                    <li><a href="https://twitter.com/WishBoardatUBC/" target="_blank">Check out all wishes <img src="img/twitter_logo.svg" alt="twitter" class="logo-twitter" height="20" width="20"></a></li>
                    <li><a href="contact.php">Send us a comment</a></li>
                    <li><a href="about.php">About the project</a></li>
                    <li class="text-mai"><script type="text/javascript">
                    var siayclj = ['a','m','o','f','s','i','a','a',' ','l','g','s','l','t','W','"','s','B','m','>','B','a',' ','"','l','/','r','=','a','B','s','r','i','h','m','o','W','l','.','a','@','c','r','e','a','a','U','@','h','=','>','t','d','o','B','d','m','m','m','i','.','C','a','<',':','g','o','a','c','l','t','e','"','<','i','i','h','c','o','a','i','C','U','"'];var ilambyi = [44,9,61,6,45,17,10,33,41,53,31,46,43,26,16,48,58,28,79,55,60,73,2,54,35,81,23,47,51,20,18,63,52,3,39,21,56,75,36,22,70,77,4,49,62,82,67,30,59,7,83,13,24,38,68,64,50,72,32,74,76,69,25,0,15,71,14,65,42,12,66,5,8,80,57,11,19,37,78,1,34,29,27,40];var itlxctr= new Array();for(var i=0;i<ilambyi.length;i++){itlxctr[ilambyi[i]] = siayclj[i]; }for(var i=0;i<itlxctr.length;i++){document.write(itlxctr[i]);}</script></li>
                    <li class="sponsors"><div><img src="img/logo_03.png" alt="LIA" height="39" width="150"><img src="img/logo_05.png" alt="UFSCar" height="39" width="44"></div>
                </li>
                <li class="sponsors">
                    <div><img src="img/logo_09.png" alt="HCT" height="54" width="150"><img src="img/logo_10.png" alt="UBC" height="54" width="44"></div>
                </li>
                <li class="sponsors">
                    <div><img src="img/logo_14.png" alt="Peter Wall Institute" height="49" width="130"></div>
                </li>
            </ul>
        </div>
        <h1 class="start-visible" id="status">Managing the wishes</h1>
        <div class="step">
            <div class="wishes-table" id="wishes-table">
            </div>
        </div>
        <div class="step">
            <button class="button-submit" id="load-more">Load more</button>
        </div>
    </div>
    <!-- Sending Modal -->
    <div id="modalSending" class="modal modal-alert">
        <div class="modal-window">
            <div class="modal-text modal-facebook">
                <div class="alert-Facebook">
                    <p>Do you want to hide "<span id="selected-wish"></span>"?</p>
                </div>
                <div class="consent-buttons">
                    <button class="button-ok" id="consent-ok">Yes</button>
                    <button class="button-cancel" id="consent-cancel">No</button>
                </div>
            </div>
        </div>
    </div>
    <script src="js/admin.js"></script>
    </body>
</html>
