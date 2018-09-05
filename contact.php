<!DOCTYPE html>
<html amp lang="en">
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
        <?php if (stristr($_SERVER[ "HTTP_USER_AGENT"], 'facebook')) { ?>
        <meta property="og:title" content="WishBoard - Wishes Worth Sharing">
        <meta property="og:type" content="website">
        <meta property="og:url" content="http://www.shareyourwishes.ca/">
        <meta property="og:image" content="http://www.shareyourwishes.ca/fbshare.jpg">
        <meta property="og:site_name" content="WishBoard">
        <meta property="og:description" content="WishBoard is an art installation that aims to promote a sense of community through a collaborative artistic expression of the wishes of its participants. Using their personal mobile devices such as smartphones, people can interact with the technological installation contributing to the collective construction of the artwork. ">
        <?php } ?>
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="shortcut icon" href="favicon.ico">
        <script async src="https://cdn.ampproject.org/v0.js"></script>
    </head>
    <body>
        <div class="main no-bg text-15">
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
                    <div><img src="img/ams.png" alt="Alma mater UBC" height="71" width="68"><img src="img/logo_14.png" alt="Peter Wall Institute" height="49" width="130"></div>
                </li>
            </ul>
        </div>
        <h1 id="title">SEND US A COMMENT</h1>
        <div class="step two-columns text-left">
            <form>
                <label class="input-text" id="label-message">Message <textarea name="message" id="message" rows="5" required></textarea></label>
                <label class="input-text" id="label-name">Name <span>(optional)</span> <input id="name" name="name" type="text" value="" /></label>
                <label class="input-text" id="label-email">E-mail <span>(optional)</span><input id="email" name="email" type="email" value="" /></label>
                <input id="country" name="country" type="hidden" required value="Canada" />
                <button class="button-submit" id="button-submit-comment">Send</button>
            </form>
        </div>
        <!-- Sending Modal -->
        <div id="modalSending" class="modal modal-alert">
            <div class="modal-window">
                <div class="modal-text">
                    <div class="alert-successful">
                        <p><img src="img/ok2.svg" width="160" style="margin-top: 25px" height="116" alt="Success icon"/></p>
                        <br/>
                        <p class="space-bottom" id="msg-successful">Thank you for sending!</p>
                    </div>
                    <div class="alert-fail">
                        <p><img src="img/ops2.svg" width="160" style="margin-top: 25px" height="116" class="shake" alt="Fail icon"/></p>
                        <br/>
                        <p class="space-bottom" id="msg-fail">Sorry, something went wrong!
                        <br/>Try again later.</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Sending Modal -->
    </div>
    <script src="js/menu.js"></script>
</body>
</html>