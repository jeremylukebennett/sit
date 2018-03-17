"use strict";
let printIt = require("./printToDom");
let $ = require("jquery");
var Timer = require('easytimer');
var userSliderValue = require("./readSliderValue");
let soundAlert = require("./playAudio");


let timerDiv = document.getElementById("countdownString");

// This is not working. Its meant to capture the value of the first range slider and send it into the timerInitialize function

let durationValues = [5, 10, 15, 20, 25, 30]; 


let myPick = $(window).on("load", function() {
     
    $("#slider1").change(function(){
        console.log(durationValues[this.value]);  
    });      
});



console.log(myPick);


// Countdown timer 
function timerInitialize() {
    console.log("timer function starts");


    var timer = new Timer();

        timer.start({countdown: true, startValues: {seconds: 5}});
        $('#countdownString .values').html(timer.getTimeValues().toString());

        timer.addEventListener('secondsUpdated', function (e) {
            $('#countdownString .values').html(timer.getTimeValues().toString());
        });

        timer.addEventListener('targetAchieved', function (e) {
            console.log("times up");
            soundAlert.alertLaunch();

        });

    }

    module.exports = {timerInitialize};