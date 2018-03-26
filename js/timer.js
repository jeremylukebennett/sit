"use strict";
// console.log("printIt before timeerInititalize", printIt);

let $ = require("jquery");
let firebase = require("firebase/app");
let fbConfig = require("./fb-config");
let fbInteractions = require("./interaction");
var Timer = require('easytimer');
var userSliderValue = require("./readSliderValue");
let soundAlert = require("./playAudio");
let timerDiv = document.getElementById("countdownString");

// Main alarm slider settings
let intervalFlag = true;
let durationValues = [5, 10, 15, 20, 25, 30];
let newDuration = 5;
let printIt = require("./printToDom");

$(document).on("change", "#slider1", ()=>{
    let newVal = $("#slider1").val();
    $("#slider1").attr("value", newVal);
    console.log(durationValues[newVal]);
    newDuration = durationValues[newVal];
});   

// Interval Slider Settings

let intervalDurationValues = [0, 1, 2, 3, 4, 5];
let newIntervalDuration;

$(document).on("change", "#slider2", ()=>{
    let newVal = $("#slider2").val();
    $("#slider2").attr("value", newVal);
    console.log(intervalDurationValues[newVal]);
    newIntervalDuration = intervalDurationValues[newVal];
});  

// Sound Slider Settings

let intervalSoundValues = ["audioFiles/singleBell.mp3", "audioFiles/singleBlock.mp3", "audioFiles/singleTone.mp3"];
let alarmSoundValues = ["audioFiles/gradualBells.mp3", "audioFiles/gradualBlock.mp3", "audioFiles/gradualTone.mp3"];
let newIntervalSound;
let newAlarmSound;

$(document).on("change", "#slider3", ()=>{
    let newVal = $("#slider3").val();
    $("#slider3").attr("value", newVal);

    newAlarmSound = alarmSoundValues[newVal];
    newIntervalSound = intervalSoundValues[newVal];
    

    $("#alertSource").attr("src", newAlarmSound);
    $("#intervalSource").attr("src", newIntervalSound);

    console.log(alarmSoundValues[newVal]);
    console.log(intervalSoundValues[newVal]);
});  
    






// Countdown timer 
function timerInitialize() {

    // console.log('printIt',printIt);
    console.log("timer function starts");

// Main Timer
    var timer = new Timer();

        timer.start({countdown: true, startValues: {seconds: newDuration}});
        $('#countdownString .values').html(timer.getTimeValues().toString());

        timer.addEventListener('secondsUpdated', function (e) {
            $('#countdownString .values').html(timer.getTimeValues().toString());
        });

        timer.addEventListener('targetAchieved', function (e) {
            console.log("times up");
            intervalFlag = false;
            soundAlert.alertLaunch();
            console.log("this is the value of the alarm that just completed: ", newDuration);

            // Add functionality here that checks if user is logged in. If so, add the date and duration of completed session to users progress

            firebase.auth().onAuthStateChanged(firebaseUser => {
                if(firebaseUser) {
                  console.log("yer users logged in and times up");
                // Now I need to add the users progress to the proper node.
// console.log('newDuration',newDuration);
                    let todaysDate = new Date();
                    let progressToLog = {
                        sessionDate : todaysDate,
                        sessionDuration : newDuration,
                        user : firebaseUser.uid
                    };
                fbInteractions.sendUserDurationAndDate(progressToLog);


                
                  
                } else {
                  // User not logged in
                  console.log("yer users NOT logged in and times up");
                }
              });
        });

        // This is a Pause function. Still need a back to home function.
        document.addEventListener("click", function(e){
            if(e.target.id === "pause-btn") {
                window.printIt.printResumeButtonToPage();

                timer.pause();
                intervalFlag = false;
            }
        });

        document.addEventListener("click", function(e){
            if(e.target.id === "resume-btn") {
                timer.start();
            }
        });

        document.addEventListener("click", function(e){
            
            if(e.target.id === "stop-btn") {
                timer.stop();
                intervalFlag = false;
                console.log("you clicked stop");

                window.printIt.printMainScreen();
            }
        });
// Interval Timer



    function runInterval() {
        if(intervalFlag) {
            var intervalTimer = new Timer();
            intervalTimer.start({countdown: true, startValues: {seconds: newIntervalDuration}});
            intervalTimer.addEventListener('targetAchieved', function (e) {
                console.log("INTERVAL");
                soundAlert.intervalAlertLaunch();
                runInterval();
            });
        }
    }

    runInterval();

}

    module.exports = {timerInitialize, newDuration};