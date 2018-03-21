"use strict";
let $ = require("jquery");    
let printIt = require("./printToDom");
let startSit = require("./launchSit");
let sliders = require("./readSliderValue");
let soundAlerts = require("./playAudio");
var Timer = require('easytimer');
let timerTools = require('./timer');
require("./fb-config");
require("./interaction");
require("./addToFB");
let graphUserInfo = require('./graphData.js');

// Main Sit button at bottom of Home Page
let sitButton = document.getElementById("sit-btn");


printIt.printMainScreen();


// Launch Sit Button function
document.addEventListener("click", function(e){
    if(e.target.id === "sit-btn") {
        startSit.countdownScreen();
    }
});

