/** PARAMETERS **/
/** Screensize **/
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

/** Fountain Orb **/
var defaultClassForOrbColor = "orbcolor";
var maxParticlesWaterFountain = 9;
var sizeOrb = 110;
var percentagePosYOrb = 79;

/** Wishes **/
var maxFloatingWishes = 8;
var timerForCountingWishes = 10000;
var flowWishesRate = 1.2;
var percentagePosYNewWish = 28;


/** VARIABLES **/
var currentOrbColor = "rgba(255,255,255,1)";
var colorsArray = ["white", "orange", "yellow", "green", "blue", "pink", "red"];
var newWishFromFountain = false;
var showingWish = false;
var wishesOnThePool = [];

var fountainStartingX = screenWidth / 2;
var fountainStartingY = posxOrb + 10;
var posxNewWish = screenHeight * (percentagePosYNewWish/100);
var posxOrb = (screenHeight * (percentagePosYOrb/100)) - sizeOrb;

function init() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    canvas = document.getElementById('waterFountain');
    context = canvas.getContext("2d");
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    posxNewWish = screenHeight * (percentagePosYNewWish/100);
    posxOrb = (screenHeight * (percentagePosYOrb/100)) - sizeOrb;
    fountainStartingX = screenWidth / 2,
    fountainStartingY = posxOrb + 10;
    document.querySelector(".fountainCircle").style.top = posxOrb + "px";
    document.querySelector(".fountainCircle").style.width = sizeOrb + "px";
    document.querySelector(".fountainCircle").style.height = sizeOrb + "px";
}

window.onresize = init;
init();

function calcPercentage(x, y) {
    var totalX = screenWidth;
    var totalY = screenHeight;
    if (y == null) {
        return totalX * x / 100;
    } else {
        return totalY * y / 100;
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function updateCurrentColor(color) {
    currentOrbColor = getColorRgba(color);
}

function getColorRgba(color) {
    var rgbaColor;
    if ($("." + color + ":first").length > 0) {
        rgbaColor = $("." + color + ":first").css("color")
    } else {
        var $temp = $("<p class='" + color + "'></p>").hide().appendTo("body");
        rgbaColor = $("." + color + ":first").css("color");
        $temp.remove();
    }
    return rgbaColor;
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

function path2Array(node) {
    var pointsArray = new Array();
    var point, tx, ty, cordinatesXY;
    for (var i = 0; i < node.getTotalLength(); i += 0.2) {
        point = node.getPointAtLength(i);
        tx = Math.floor(point.x);
        ty = Math.floor(point.y);
        cordinatesXY = {
            x: tx,
            y: ty
        };
        pointsArray.push(cordinatesXY);
    }
    return pointsArray;
}
requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    setTimeout;

window.onload = function() {
    changeFountainColor(defaultClassForOrbColor, "fadeIn");
    // Initialise an empty canvas and place it on the page
    var canvas = document.getElementById('waterFountain');
    var context = canvas.getContext("2d");
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    particlesWaterFountain = maxParticlesWaterFountain;

    // Set up object to contain particles and track them
    // Settings object contains items to be adjusted in browser
    var particles = [],
        particleIndex = 0,
        settings = {
            particleSize: 2.7,
            gravity: .65
        };

    // Set up a function to create multiple particles
    function Particle() {
        // Establish starting positions and velocities
        this.x = fountainStartingX;
        this.y = fountainStartingY;
        particleIndex++;
        particles.push(this);
        this.id = particleIndex;
        this.life = 0;
        this.maxLife = getRandomInt(20, 28);
        this.sprinkle = false;
        this.alive = true;
        if (!newWishFromFountain) {
            this.vx = Math.random() * 12 - 6;
            this.vy = Math.random() * 10 - 5;
            if (getRandomInt(0, 10) > 9) {
                this.vy *= 2.5;
                this.sprinkle = true;
            }
            particlesWaterFountain = maxParticlesWaterFountain;
        } else {
            this.vx = getRandomInt(-10, 10);
            this.vy = getRandomInt(-18, -2);
            particlesWaterFountain = 20;
            this.sprinkle = true;
            this.maxLife = 58 - (Math.abs(this.vx) / Math.abs(this.vy * settings.gravity));
        }
    }

    // Some prototype methods for the particle function
    Particle.prototype.draw = function() {
        // Age the particle
        this.life++;
        var percentage = (this.y - fountainStartingY) / (screenHeight - fountainStartingY);
        if (this.sprinkle) {
            percentage = this.life / this.maxLife;
        }
        var calcParticleSize = settings.particleSize * ((percentage - 1) * -1);
        if (calcParticleSize < 0 || this.y > screenHeight * .96) {
            this.alive = false;
            return;
        }
        this.x += this.vx;
        this.y += this.vy;

        // Adjust for gravity
        this.vy += settings.gravity;

        var currentColorRgba = currentOrbColor.replace(')', ', ' + ((percentage - 1) * -1) + ')').replace('rgb', 'rgba');
        // Create the shapes
        context.beginPath();
        context.fillStyle = currentColorRgba;
        context.arc(this.x, this.y, calcParticleSize + .5, 0, 1, true);
        context.closePath();
        context.fill();
    }

    function render() {
        context.fillStyle = 'rgba(0,0,0,.7)';
        context.fillRect(0, 0, screenWidth, screenHeight);

        // Draw the particles
        for (var i = 0; i < getRandomInt(particlesWaterFountain/4, particlesWaterFountain); i++) {
            new Particle();
        }

        for (var i = particles.length - 1; i >= 0; i--) {
            if (particles[i].alive) {
                particles[i].draw();
            } else {
                particles.splice(i, 1);
            }
        }
    }

    setInterval(function() {
        requestAnimationFrame(render, context);
    }, 65);
};
