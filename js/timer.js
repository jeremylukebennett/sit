"use strict";
let printIt = require("./printToDom");
let $ = require("jquery");
var Timer = require('easytimer');


let timerDiv = document.getElementById("countdownString");

// Countdown timer 
function timerInitialize() {
    console.log("timer function starts");
    // console.log(myDiv);

    // printIt.printTimerToPage();


    var timer = new Timer();

// console.log(document.getElementById("countdownString"));

        timer.start({countdown: true, startValues: {seconds: 5}});
        $('#countdownString .values').html(timer.getTimeValues().toString());

        timer.addEventListener('secondsUpdated', function (e) {
            $('#countdownString .values').html(timer.getTimeValues().toString());
        });

        timer.addEventListener('targetAchieved', function (e) {
        
        });
    }

    module.exports = {timerInitialize};