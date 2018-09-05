var wishCounter = 0;
/* ANIMATION FIREWORKS */
function Particle(x, y, radius) {
    this.init(x, y, radius);
}
Particle.prototype = {
    init: function(x, y, radius) {
        this.alive = true;
        this.radius = radius || 10;
        this.wander = 0.15;
        this.theta = random(TWO_PI);
        this.drag = 0.92;
        this.color = '#fff';
        this.x = x || 0.0;
        this.y = y || 0.0;
        this.vx = 0.0;
        this.vy = 0.0;
    },
    move: function() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= this.drag;
        this.vy *= this.drag;
        this.theta += random(-0.5, 0.5) * this.wander;
        this.vx += sin(this.theta) * 0.1;
        this.vy += cos(this.theta) * 0.1;
        this.radius *= 0.96;
        this.alive = this.radius > 0.5;
    },
    draw: function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

var particles = [];
var pool = [];
var sparkles = Sketch.create({
    container: document.querySelector(".container")
});
sparkles.setup = function() {};
sparkles.spawn = function(x, y, color, max_particles, radius, force) {
    if (particles.length >= max_particles)
        pool.push(particles.shift());
    particle = pool.length ? pool.pop() : new Particle();
    particle.init(x, y, radius);
    particle.wander = random(0.5, 2.0);
    particle.color = color;
    particle.drag = random(0.9, 0.99);
    theta = random(TWO_PI);
    particle.vx = sin(theta) * force;
    particle.vy = cos(theta) * force;
    particles.push(particle);
}
sparkles.update = function() {
    var i, particle;
    for (i = particles.length - 1; i >= 0; i--) {
        particle = particles[i];
        if (particle.alive) particle.move();
        else pool.push(particles.splice(i, 1)[0]);
    }
};
sparkles.draw = function() {
    //sparkles.globalCompositeOperation = 'lighter';
    for (var i = particles.length - 1; i >= 0; i--) {
        particles[i].draw(sparkles);
    }
   //fpsCalculate();
};


var filterStrength = 20;
var frameTime = 0,
    lastLoop = new Date,
    thisLoop;

setInterval(function() {
   //document.title = (1000 / frameTime).toFixed(1) + " fps - " + wishesOnThePool.length; 
   document.title = " WishBoard - " + wishesOnThePool.length;
}, 1000);

function fpsCalculate() {
    var thisFrameTime = (thisLoop = new Date) - lastLoop;
    frameTime += (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;
}

function changeFountainColor(color, fade) {
    currentOrbColor = getColorRgba(color);
    document.querySelector(".blinkCircle").className = "blinkCircle";
    document.querySelector(".blinkCircle").classList.add("bg_" + color);
    document.querySelector(".fountainCircle").className = "fountainCircle";
    document.querySelector(".fountainCircle").classList.add("bg_" + color);
    document.getElementById("waterBackground").style.opacity = 0.3;
    setTimeout(function() {
        document.getElementById("background").className = "";
        if (fade == "fadeOut") {
            document.getElementById("background").classList.add("hue_white");
            document.querySelector(".blinkCircle").classList.remove("active");
        } else {
            document.getElementById("background").classList.add("hue_" + color);
            document.querySelector(".blinkCircle").classList.add("active");
        }
        document.getElementById("waterBackground").style.opacity = 0.6;
    }, 500);
}

function newWish(string, color, id) {
    showingWish = true;
    particles = [];
    pool = [];
    changeFountainColor(color, "fadeIn");
    document.querySelector(".blinkCircle").classList.add("active");

    var i, x, y, total;
    var startX, startY, endY;
    startX = screenWidth * 0.5;
    startY = posxOrb;
    endY = posxNewWish;
    i = 0;
    total = 13;
    if (document.getElementById("audiolaunch").paused) {
          document.getElementById("audiolaunch").play();
    } else {
          document.getElementById("audiolaunch").pause();
          document.getElementById("audiolaunch").currentTime = 0;
          document.getElementById("audiolaunch").play();
    }
    var lauching = setInterval(function() {
        if (i < total) {
            for (var j = 0; j < 12; j++) {
                x = startX + random((screenWidth * 0.1) * -1, (screenWidth * 0.1)) * i * 1.35 / total;
                y = startY + (endY - startY) * i / total;
                sparkles.spawn(x, y, currentOrbColor, 150, getRandomInt(5, 20), getRandomInt(2, 8));
            }
            i++;
        } else {
            clearInterval(lauching);
            document.querySelector(".container").insertAdjacentHTML('afterend', '<div class="newWish ' + color + '"><div class="centerdiv">' + prepareText(string) + '</div></div>');
            var newWish = document.querySelector(".newWish")
            newWish.classList.add("active");
            setTimeout(function() {
                if (wishesOnThePool.length >= maxFloatingWishes) sinkWish(true, null);
                changeFountainColor(defaultClassForOrbColor, "fadeOut");
                newWish.classList.remove("active");
                newWish.classList.add("inactive");
                setTimeout(function() {
                    wishCounter++;
                    newDropOnTheWater(screenWidth * 0.5, screenHeight * 0.88, 0, false);
                    newDropOnTheWater(screenWidth * 0.5, screenHeight * 0.88, 1000, false);
                    newWishOnTheWater(string, color, screenWidth * .45+getRandomInt((screenWidth * .01)*-1, screenWidth * .007), screenHeight * .94, wishCounter, id, false);
                    setTimeout(function() {
                        moveWishes(true);
                    }, 1000);
                    setTimeout(function() {
                        moveWishes(true);
                    }, 2000);
                    newWish.remove();
                    showingWish = false;
                    particles = [];
                    pool = [];
                }, 5000);
            }, 8000);
            for (i = 0; i < 500; i++) {
                x = (screenWidth * 0.5) + getRandomInt((screenWidth * 0.40) * -1, screenWidth * 0.40);
                y = posxNewWish + getRandomInt(-80, 80);
                sparkles.spawn(x, y, currentOrbColor, 200, getRandomInt(5, 20), getRandomInt(2, 8));
            }
        }
    }, 50);
}

setInterval(function() {
var askMessagesArray = ['Add your wish here with your phone', 'What are your wishes?', 'Wish hard. Dream big. Share it here.', 'We all have wishes, make a wish at shareyourwishes.ca', 'Make a wish and add it here with your phone', 'Wishes worth sharing, make a wish with your phone', 'Making a wish here is faster than you think', 'Wishing is the first step for achieving', 'Everything starts with a wish', 'Follow us on Twitter. @WishBoardatUBC'];
if (!showingWish)
seeNewWishes(getRandom(askMessagesArray), getRandom(colorsArray), 100000);
}, 40000);

function seeNewWishes(string, color, id) {
    showingWish = true;
    particles = [];
    pool = [];
    changeFountainColor(color, "fadeIn");
    document.querySelector(".blinkCircle").classList.add("active");

    var i, x, y, total;
    var startX, startY, endY;
    startX = screenWidth * 0.5;
    startY = posxOrb;
    endY = posxNewWish;
    i = 0;
    total = 13;
    if (document.getElementById("audiolaunch").paused) {
          document.getElementById("audiolaunch").play();
    } else {
          document.getElementById("audiolaunch").pause();
          document.getElementById("audiolaunch").currentTime = 0;
          document.getElementById("audiolaunch").play();
    }
    var lauching = setInterval(function() {
        if (i < total) {
            for (var j = 0; j < 12; j++) {
                x = startX + random((screenWidth * 0.1) * -1, (screenWidth * 0.1)) * i * 1.35 / total;
                y = startY + (endY - startY) * i / total;
                sparkles.spawn(x, y, currentOrbColor, 150, getRandomInt(5, 20), getRandomInt(2, 8));
            }
            i++;
        } else {
            clearInterval(lauching);
            document.querySelector(".container").insertAdjacentHTML('afterend', '<div class="newWish ' + color + '"><div class="centerdiv">' + prepareText(string) + '</div></div>');
            var newWish = document.querySelector(".newWish")
            newWish.classList.add("active");
            setTimeout(function() {
                if (wishesOnThePool.length >= maxFloatingWishes) sinkWish(true, null);
            for (i = 0; i < 150; i++) {
                x = (screenWidth * 0.5) + getRandomInt((screenWidth * 0.40) * -1, screenWidth * 0.40);
                y = posxNewWish + getRandomInt(-80, 80);
                sparkles.spawn(x, y, currentOrbColor, 200, getRandomInt(3, 8), getRandomInt(2, 8));
            }
                changeFountainColor(defaultClassForOrbColor, "fadeOut");
                newWish.classList.remove("active");
                newWish.classList.add("fadingOut");
                setTimeout(function() {
                    newWish.remove();
                    showingWish = false;
                    particles = [];
                    pool = [];
                }, 4500);
            }, 8000);
            for (i = 0; i < 500; i++) {
                x = (screenWidth * 0.5) + getRandomInt((screenWidth * 0.40) * -1, screenWidth * 0.40);
                y = posxNewWish + getRandomInt(-80, 80);
                sparkles.spawn(x, y, currentOrbColor, 200, getRandomInt(5, 20), getRandomInt(2, 8));
            }
        }
    }, 50);
}


function newWishFromTheFountain(string, color, id) {
    newWishFromFountain = true;
    var svg = d3.select("#main").append("svg")
        .attr("width", "100%")
        .attr("height", "100%");
    var lastX = 0;
    var lastY = 0;
    var lastX2 = 0;
    var lastY2 = 0;
    var position;

    wishCounter++;
    var counter = wishCounter;
    var idPath = "fall" + wishCounter;

    if (wishCounter % 2 === 0)
        position = 'even'
    else position = 'odd';
    var pathinfo = [];

    if (position === 'even') {
        lastX = calcPercentage(getRandomInt(10, 30), null);
        lastY = calcPercentage(null, 90);
        pathinfo.push({
            "x": lastX,
            "y": lastY
        });
        lastX2 = getRandomInt(35, 45);
        lastY2 = getRandomInt(10, 40);
        lastY2 = 40;
        pathinfo.push({
            "x": calcPercentage(lastX2, null),
            "y": calcPercentage(null, lastY2)
        });
        pathinfo.push({
            "x": calcPercentage(50, null),
            "y": posxOrb + 50
        });
    } else {
        pathinfo.push({
            "x": calcPercentage(50, null),
            "y": posxOrb + 50
        });
        lastX2 = getRandomInt(55, 65);
        lastY2 = getRandomInt(10, 40);
        lastY2 = 40;
        pathinfo.push({
            "x": calcPercentage(lastX2, null),
            "y": calcPercentage(null, lastY2)
        });
        lastX = calcPercentage(getRandomInt(65, 85), null);
        lastY = calcPercentage(null, 90);
        pathinfo.push({
            "x": lastX,
            "y": lastY
        });
    }
    var line = d3.svg.line()
        .x(function(d) {
            return d.x;
        })
        .y(function(d) {
            return d.y;
        })
        .interpolate("basis");
    if (position === 'even') {
    newDropOnTheWater(lastX, lastY, 5000, true);} else {
    newDropOnTheWater(lastX, lastY, 6800, true);}
    if (document.getElementById("audiofountain").paused) {
          document.getElementById("audiofountain").play();
    } else {
          document.getElementById("audiofountain").pause();
          document.getElementById("audiofountain").currentTime = 0;
          document.getElementById("audiofountain").play();
    }
    var transitions = 0;
    svg.append("path")
        .attr("id", idPath)
        .attr("d", line(pathinfo))
        .attr("sidex", lastX2 - 50)
        .attr("sidey", lastY2 - 30)
        .attr("class", "fountainText")
        .style("fill", "none")
        .style("stroke", "none");
    if (position === 'even') {
        svg.append("text")
            .append("textPath")
            .attr("xlink:href", "#" + idPath)
            .style("text-anchor", "left")
            .attr("startOffset", "850px")
            .attr("font-family", "DJBAnnalisetheBrave, symbola")
            .attr("font-size", getRandomInt(32, 42) + "px")
            .attr("class", color)
            .text(string.replace(/(<([^>]+)>)/ig, ""))
            .transition()
            .duration(10000)
            .ease("linear")
            .attr('startOffset', "-900px")
            .each("start", function() {
                if (transitions === 0) {
                   setTimeout(function (){newWishOnTheWater(string, color, lastX, lastY, counter, id, true);},9000);                
                }
                transitions++;
            })
            .each('end', function() {
                d3.select(this)
                    .transition();
                if (--transitions === 0) {
                    svg.remove();
                    //newWishOnTheWater(string, color, lastX, lastY, counter, id, true);
                    newWishFromFountain = false;
                }
            });
    } else {
        svg.append("text")
            .append("textPath")
            .attr("xlink:href", "#" + idPath)
            .style("text-anchor", "left")
            .attr("startOffset", "-900px")
            .attr("font-family", "DJBAnnalisetheBrave, symbola")
            .attr("font-size", getRandomInt(32, 42) + "px")
            .attr("class", color)
            .text(string.replace(/(<([^>]+)>)/ig, ""))
            .transition()
            .duration(10000)
            .ease("linear")
            .attr('startOffset', "850px")
            .each("start", function() {
               if (transitions === 0) {
                   setTimeout(function (){newWishOnTheWater(string, color, lastX, lastY, counter, id, true);},9000);                   
                }
                transitions++;
            })
            .each('end', function() {
                d3.select(this)
                    .transition();
                if (--transitions === 0) {
                    svg.remove();
                    newWishFromFountain = false;
                }
            });
    }
}

function newWishOnTheWater(string, color, x, y, counter, id, fountain) {
    var wishId = 'wishOverWater-' + counter;
    wishesOnThePool.push(wishId);
    var divInsert;
    if (fountain) {
        divInsert = '<div id="' + wishId + '" wish-id="' + id + '" wish-color="' + color + '" wish-message="' + string + '" final-position="' + Math.floor(getRandomInt(calcPercentage(null, 13) * -1, calcPercentage(null, 37)) * 4) + '" velocity="' + Math.floor(getRandomInt(1, 3)) + '" class="wishOverWater ' + color + '" style="left:' + x + 'px; top:' + y + 'px; margin-left: -' + calcPercentage(null, 20) / 2 + 'px; animation: animateWishEmerging' + color + "-" + getRandomInt(1, 5) + ' .6s forwards linear;"><div class="wishdiv"><div class="wish"  style="animation: shake-opacity ' + getRandomInt(8, 14) + 's .7s infinite ease-in-out;"><span style="transform: scale(' + getRandomFloat(.75, .99) + ');">' + prepareText(string) + '</span></div></div></div>';
        moveWishes(false);
    } else {
        divInsert = '<div id="' + wishId + '" wish-id="' + id + '" wish-color="' + color + '" wish-message="' + string + '" final-position="' + Math.floor(getRandomInt(calcPercentage(null, 13) * -1, calcPercentage(null, 37)) * 4) + '" velocity="' + Math.floor(getRandomInt(1, 3)) + '" class="wishOverWater ' + color + '" style="left:' + x + 'px; top:' + y + 'px; margin-left: -' + calcPercentage(null, 20) / 2 + 'px; animation: animateWishEmerging' + color + "-" + getRandomInt(1, 5) + ' 0s forwards linear;"><div class="wishdiv"><div class="wish" style="animation: shake-opacity ' + getRandomInt(8, 14) + 's .7s infinite ease-in-out;"><span style="transform: scale(' + getRandomFloat(.75, .99) + ');">' + prepareText(string) + '</span></div></div></div>';
    }
    document.getElementById("wishingPool").insertAdjacentHTML('beforeEnd', divInsert);
}

function newDropOnTheWater(x, y, delay, fountain) {
    var div = document.createElement("div");
    div.style.left = x + "px";
    div.style.top = y + "px";
    div.style.position = "absolute";
    if (fountain) {
        div.innerHTML = "<div class='wave'></div>";
    } else {
        div.innerHTML = "<div class='bigwave'></div>";

    }
    setTimeout(function() {
        document.getElementById("background").appendChild(div);
        setTimeout(function() {
            div.remove();
        }, 4000);
    }, delay);
}


function createCssAnimations() {
    var newCssClass = "";
    for (var index = 0; index < colorsArray.length; ++index) {
        var color = getColorRgba(colorsArray[index]);
        for (var i = 1; i <= 5; i++) {
            newCssClass += "@keyframes animateWishEmerging" + colorsArray[index] + "-" + i + "{\n from { -webkit-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1); text-shadow: 0px 0px 80px " + color + "; opacity:.1; color: transparent;} 50% { -webkit-transform: scale3d(1.05, 1.05, 1.05); transform: scale3d(1.05, 1.05, 1.05) rotate(" + getRandomInt(-4, 4) + "deg); text-shadow: 0px 0px 50px " + color + "; opacity:.5; color: transparent} to { -webkit-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1) rotate(" + getRandomInt(-2, 2) + "deg); text-shadow: 0px 3px 10px #000; color: " + color + ";}}\n";
        }
    }
    document.head.appendChild(document.createElement("style")).insertAdjacentHTML("beforeEnd", newCssClass);
}
createCssAnimations();

countWishesOnThePool(timerForCountingWishes);

setInterval(function() {
    if (!showingWish) {
        if (newWishes.length > 0) {
            var wish = newWishes.shift();
            newWish(wish.message, wish.color, wish.id);
        }
    }
}, 300);

function countWishesOnThePool(timeout) {
    var timer = setTimeout(function() {
                if (getRandomInt(1, 4) <= 1 && wishesOnThePool.length + 1 <= maxFloatingWishes && wishesFountain.length > 0) {
                        var wish = wishesFountain.pop();
                        newWishFromTheFountain(wish.message, wish.color, wish.id);
                        countWishesOnThePool(getRandomInt(1500,3500)/flowWishesRate);
                } else {
                   countWishesOnThePool((timeout + getRandomInt(0, timeout * .1))/flowWishesRate);
                } 
        },
        timeout);
}

function getRotationValue(el) {
    var st = window.getComputedStyle(el, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform");
    var values = tr.split('(')[1].split(')')[0].split(',');
    var values = tr.split('(')[1].split(')')[0].split(',');
    var a = values[0];
    var b = values[1];
    var c = values[2];
    var d = values[3];
    var scale = Math.sqrt(a * a + b * b);
    var sin = b / scale;
    var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    return angle;
}

function recountWishes(){
    wishesOnThePool = [];
var divs = document.querySelectorAll('div');
[].forEach.call(divs, function(div) {
if (div.classList.contains("wishOverWater") && div.id != null) {
        wishesOnThePool.push(div.id);   
}
});
}

function sinkWish(sendtowishboard, id = null) {
    var self, wishid, message, color;
    if (id !== null && id > 0) {
        for (var z = 0; z < wishesOnThePool.length; z++) {
            if (document.getElementById(wishesOnThePool[z]) !== null && id == document.getElementById(wishesOnThePool[z]).getAttribute("wish-id")) {
                self = document.getElementById(wishesOnThePool[z]);
                self.classList.add("sink");
                wishid = self.getAttribute("wish-id");
                message = self.getAttribute("wish-message");
                color = self.getAttribute("wish-color");
                wishesOnThePool.splice(z,1);
                setTimeout(function() {
                    self.remove();
                    recountWishes();
                }, 1200);
                break;
            }
        }
    } else {
        self = document.getElementById(wishesOnThePool[0]);
        self.classList.add("sink");
        wishid = self.getAttribute("wish-id");
        message = self.getAttribute("wish-message");
        color = self.getAttribute("wish-color");
        wishesOnThePool.shift();
        setTimeout(function() {
            self.remove();
            recountWishes();
        }, 1200);
    }
    if (sendtowishboard && wishid > 0) {
        var post = {
            "server": {
                "wish": {
                    "id": wishid,
                    "message": message,
                    "color": color
                }
            }
        };
        sendMessage(JSON.stringify(post));
    }
}

function moveWishes(newWish) {
    for (var i = 0; i < wishesOnThePool.length; i++) {
        var width, height, newleft, newtop, newrotate, oldleft, oldtop, oldrotate, rdmleft, rdmtop, rndmrotate;
        var self = document.getElementById(wishesOnThePool[i]);
        if (self === null || self.classList.contains("sink")) continue;
        var selfWish = self.querySelector(".wishdiv");
        var side = "+=";
        var movementTop = 100 
        var movementLeft = 150;
        movementTop = movementTop + ((movementTop/5)* parseFloat(self.getAttribute("velocity")));
        movementLeft = movementLeft + ((movementLeft/5)*parseFloat(self.getAttribute("velocity")));
        var curTransform = new WebKitCSSMatrix(window.getComputedStyle(selfWish).webkitTransform);
       oldtop = parseFloat(self.style.top.replace("px", "")) + parseFloat(curTransform.m42);
        if (oldtop < -800) {
            self.classList.add("sink");
            sinkWish(true, self.getAttribute("wish-id"));
            break;
        }
        oldleft = parseFloat(self.style.left.replace("px", "")) + parseFloat(curTransform.m41);
        //self.setAttribute("oldleft", oldleft);        

        if (newWish) {
            if (self.id == wishesOnThePool[wishesOnThePool.length - 1]) {
                continue;
            }
            if (oldtop >= screenHeight * 0.88) {
                rdmtop = 0;
            } else {
                rdmtop = (movementTop / 2) * -1;
            }
            if (oldleft >= screenWidth * 0.6) {
                rdmleft = movementLeft / 2;
            } else if (oldleft <= screenWidth * 0.3) {
                rdmleft = (movementLeft / 2) * -1;
            }
        } else {
            if (oldtop >= screenHeight * 0.65) {
                if (oldleft >= (screenWidth * 0.39) && oldleft <= (screenWidth * 0.55)) {
                    rdmtop = -5;
                } else {
                    rdmtop = getRandomInt((movementTop *-2), 2);
                }
            } else {
                rdmtop = getRandomInt((movementTop * -1), 5);
                if (oldtop <= screenHeight * 0.2) {
                    rdmtop = getRandomInt((movementTop * -3), (movementTop * -3)/2) 
                    if (oldtop <= -200) rdmtop = getRandomInt((movementTop * -6), (movementTop * -6)/2);
                    if (oldtop <= -100 && !self.classList.contains("inactive")) {
                        self.classList.add("inactive");
                    }
                }
            }
            if (oldtop >= screenHeight * 0.65 && oldleft >= (screenWidth * 0.3) && oldleft <= (screenWidth * 0.7)) {
                if (oldleft <= (screenWidth * 0.45)) {
                    rdmleft = getRandomInt((movementLeft) * -2, ((movementLeft) * -1)/2);
                } else {
                    rdmleft = getRandomInt(movementLeft/2, movementLeft*2);
                }
            } else {
                if (oldleft > parseFloat(self.getAttribute("final-position"))) {
                    rdmleft = getRandomInt((movementLeft * -1), 0);
                } else {
                    rdmleft = getRandomInt(0, movementLeft);
                }
            }
           rdmrotate = getRandomInt(1, 30);
            var rndm =  getRandomInt(1, 10);
            if(rndm >=6) {
                 side = "-=";
            } 
            if(rndm>=5 && rndm <= 6) {
                rdmrotate = rdmrotate*1.5;
            }
        }
        if (oldtop + rdmtop >= screenHeight) {
            rdmtop = getRandomInt((movementTop * -1), 0);
        }
        rdmtop = rdmtop * flowWishesRate;
        rdmleft = rdmleft * flowWishesRate;
        rdmrotate = rdmrotate * flowWishesRate;

        if (newWish) {
            TweenMax.to(selfWish, 20/flowWishesRate, { y: "+=" + rdmtop, x: "+=" + rdmleft, rotation: side + rdmrotate, ease: SlowMo.ease.config(0.7, 0.7, false), overwrite: "all" });
        } else {
            TweenMax.to(selfWish, 15/flowWishesRate, { y: "+=" + rdmtop, x: "+=" + rdmleft, rotation: side + rdmrotate, ease: Power0.easeNone, overwrite: "all" });
        }
    }
    setTimeout(function() { moveWishes(false); }, 5000/flowWishesRate);
}
moveWishes(false);		