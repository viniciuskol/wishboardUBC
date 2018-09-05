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
    <meta property="og:title" content="WishBoard - Wishes Worth Sharing">
    <meta property="og:type" content="website">
    <meta property="og:url" content="http://www.shareyourwishes.ca/">
    <meta property="og:image" content="http://www.shareyourwishes.ca/fbshare.jpg">
    <meta property="og:site_name" content="WishBoard">
    <meta property="og:description" content="WishBoard is an art installation that aims to promote a sense of community through a collaborative artistic expression of the wishes of its participants. Using their personal mobile devices such as smartphones, people can interact with the technological installation contributing to the collective construction of the artwork. ">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="shortcut icon" href="favicon.ico">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>

<body>
    <div class="main">
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
                <li class="text-mai">
                    <script type="text/javascript">
                    var siayclj = ['a', 'm', 'o', 'f', 's', 'i', 'a', 'a', ' ', 'l', 'g', 's', 'l', 't', 'W', '"', 's', 'B', 'm', '>', 'B', 'a', ' ', '"', 'l', '/', 'r', '=', 'a', 'B', 's', 'r', 'i', 'h', 'm', 'o', 'W', 'l', '.', 'a', '@', 'c', 'r', 'e', 'a', 'a', 'U', '@', 'h', '=', '>', 't', 'd', 'o', 'B', 'd', 'm', 'm', 'm', 'i', '.', 'C', 'a', '<', ':', 'g', 'o', 'a', 'c', 'l', 't', 'e', '"', '<', 'i', 'i', 'h', 'c', 'o', 'a', 'i', 'C', 'U', '"'];
                    var ilambyi = [44, 9, 61, 6, 45, 17, 10, 33, 41, 53, 31, 46, 43, 26, 16, 48, 58, 28, 79, 55, 60, 73, 2, 54, 35, 81, 23, 47, 51, 20, 18, 63, 52, 3, 39, 21, 56, 75, 36, 22, 70, 77, 4, 49, 62, 82, 67, 30, 59, 7, 83, 13, 24, 38, 68, 64, 50, 72, 32, 74, 76, 69, 25, 0, 15, 71, 14, 65, 42, 12, 66, 5, 8, 80, 57, 11, 19, 37, 78, 1, 34, 29, 27, 40];
                    var itlxctr = new Array();
                    for (var i = 0; i < ilambyi.length; i++) {
                        itlxctr[ilambyi[i]] = siayclj[i];
                    }
                    for (var i = 0; i < itlxctr.length; i++) {
                        document.write(itlxctr[i]);
                    }
                    </script>
                </li>
                <li class="sponsors">
                    <div><img src="img/logo_03.png" alt="LIA" height="39" width="150"><img src="img/logo_05.png" alt="UFSCar" height="39" width="44"></div>
                </li>
                <li class="sponsors">
                    <div><img src="img/logo_09.png" alt="HCT" height="54" width="150"><img src="img/logo_10.png" alt="UBC" height="54" width="44"></div>
                </li>
                <li class="sponsors">
                    <div><img src="img/ams.png" alt="Alma mater UBC" height="71" width="68"><img src="img/logo_14.png" alt="Peter Wall Institute" height="49" width="130"></div>
                </li>
            </ul>
        </div>
        <div id="form">
            <div class="fadeOutDown">
                <div id="hint" class="start-hidden"></div>
                <div class="prefix dropdown actived first" id="dropdown-prefix">
                    <div class="dropbtn">
                        <input id="prefix" name="prefix" type="text" autocomplete="off" autocorrect="off" contenteditable="false" required readonly value="" />
                    </div>
                    <div class="dropdown-content">
                        <a class="prefix-text">For this summer I wish ...</a>
                        <a class="prefix-text">For my future I wish ...</a>
                        <a class="prefix-text">One day I will ...</a>
                    </div>
                </div>
                <div class="posfix">
                    <textarea id="posfix" type="text" name="posfix" required maxlength="50" autocomplete="on" autocorrect="on" spellcheck="true" value="" autocapitalize="off" placeholder="type your wish here..."></textarea>
                </div>
            </div>
            <div class="fadeOut">
                <input id="color" name="color" type="hidden" required value="-1" />
                <ul class="color-picker">
                    <li>Colour:</li>
                    <li><a class="color white">White</a></li>
                    <li><a class="color orange">Orange</a></li>
                    <li><a class="color yellow">Yellow</a></li>
                    <li><a class="color green">Green</a></li>
                    <li><a class="color blue">Blue</a></li>
                    <li><a class="color purple">Purple</a></li>
                    <li><a class="color red">Red</a></li>
                </ul>
            </div>
            <div class="mycoin">
                <input id="function" name="function" type="hidden" value="savepost" />
                <audio id="audiocoin" class="hidden" preload="auto">
                    <source src="img/coin.mp3" />
                </audio>
                <div id="coin-flip-cont" class="disable">
                    <div class="hand" id="hand">
                    </div>
                    <div id="coin" class="disable flipcoin">
                        <div class="front"></div>
                    </div>
                </div>
                <!-- Sending Modal -->
                <div id="modalSending" class="modal modal-alert">
                    <div class="modal-window">
                        <div class="modal-text">
                            <div class="alert-fail">
                                <p><img src="img/ops2.svg" width="160" style="margin-top: 25px" height="116" class="shake" alt="Fail icon" /></p>
                                <br/>
                                <p class="space-bottom" id="msg-fail">Sorry, something went wrong!
                                    <br/>Try again later.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Sending Modal -->
                <div>
                    <input id="consent" name="consent" type="hidden" value="false" />
                    <span class="checkbox consent hidden" id="checkboxConsent"></span><a class="hidden" id="openConsent" href="#" target="_blank">I consent to participate in this study</a>
                    <!-- Consent Modal -->
                    <div id="modalConsent" class="modal">
                        <div class="modal-window">
                            <div class="modal-text">
                                <div id="short-consent" class="text-consent ">
                                    <p class="text-center question">Donate your wishes to our study</p>
                                    <ul class="text-left no-padding-left">
                                        <li>It is anonymous;</li>
                                        <li>You need to be over 19 years old;</li>
                                        <li>UBC Ethics Approval H16-00389;</li>
                                    </ul>
                                </div>
                                <p>Read the <a id="read-consent">consent form</a></p>
                                <div id="full-consent" class="hidden">
                                    <div class="text-consent">
                                        <div class="text-fullconsent scrollbar">
                                            <p>The WishBoard project attempts to investigate how a technological interactive artwork can extend the engagement with and within a certain space for a certain time. The purpose of this project is to gather information that can help to understand how technologies can transform a place in a period of time into a more active social space, improving the design of interactive technology for in situ socialization. WishBoard invites people to share their wishes in public. There is no high risks to individuals participating in this research.</p>
                                            <p>The identities of all people who participate will remain anonymous and will be kept confidential. Researchers might take photographs while you use the interactive artwork. These photographs will be made anonymous and you retain the right to ask to delete them. WishBoard supports protection of privacy and freedom of information in accordance with all applicable Canadian federal, provincial and local laws and statutes, including the Freedom of Information and Protection of Privacy Act, R.S.B.C. 1996, c. 165, sections 26(a) and 26(c). The information will be only used for artistic and research purposes. WishBoard may share and disclose de-identified information in reports, research papers, thesis documents, presentations, and on websites related to this project.</p>
                                            <p>We intend for your participation in this project to be pleasant and stress-free. Your participation is entirely voluntary and you may refuse to participate or withdraw from the study at any time.</p>
                                            <p>We are very grateful for your participation.</p>
                                            <p class="align-left">Dr. Sidney Fels, Prof., Dept. of Electrical &amp; Computer Engineering, UBC, ssfels@ece.ubc.ca, (604) 822-5338
                                                <br/>Dr. Junia Anacleto, Prof., Dept. of Computing, UFSCar - Brazil, junia@dc.ufscar.br
                                                <br/>MSc. Vinicius Ferreira, PhD Candidate, Dept. of Computing, UFSCar - Brazil, vinicius.ferreira@dc.ufscar.br.</p>
                                            <p>WishBoard: Investigating Transforming Third Places Using Interactive Public Displays
                                                <br/>UBC Ethics Approval H16-00389</p>
                                            <p>Contact Us</p>
                                            <p class="align-left">About the project: Vinicius Ferreira - vinicius.ferreira@dc.ufscar.br
                                                <br/>About the ethics procedures: UBC Office of Research Services - 604-822-8598.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-center">Do you consent to participate in our research by using WishBoard?</div>
                                <div class="consent-buttons">
                                    <button class="button-ok" id="consent-ok">I consent</button>
                                    <button class="button-cancel" id="consent-cancel">I do not consent</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer centered-text">
                <div style="margin-top: 30px;">
                    <a href="http://www.twitter.com/WishBoardatUBC" target="_blank" id="linkwishes">Check out all wishes at <br/><img src="img/twitter_logo.svg" alt="twitter" class="logo-twitter" height="14" width="21">/WishBoardatUBC</a>
                </div>
            </div>
        </div>
    </div>
    <script src="js/main.js"></script>
</body>

</html>