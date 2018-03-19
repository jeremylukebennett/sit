"use strict";
let printIt = require("./printToDom");
let $ = require("jquery");
var Timer = require('easytimer');
var userSliderValue = require("./readSliderValue");
let soundAlert = require("./playAudio");


let timerDiv = document.getElementById("countdownString");

// This is not working. Its meant to capture the value of the first range slider and send it into the timerInitialize function

let durationValues = [5, 10, 15, 20, 25, 30];




// Countdown timer 
function timerInitialize() {
    console.log("timer function starts");
    
    // $(document).on("load", "#slider1", ()=>{
    //     let newVal = $("#slider1").val();
    //     console.log(durationValues[newVal]);
        
        // $(document).on("change", "#slider1", ()=>{
            //     let newVal = $("#slider1").val();
            //     console.log(durationValues[newVal]);
            // });   
            
            
            // console.log("are we this far?");

    // var testVal = document.getElementById("slider1").value;
    // console.log(testVal);


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


        // This is a Pause function. Still need a back to home function.
        document.addEventListener("click", function(e){
            if(e.target.id === "pause-btn") {
                printIt.printResumeButtonToPage();
                timer.pause();
                // $("#pause-id").hide();
                // printIt.printMainScreen();
            }
        });

        document.addEventListener("click", function(e){
            if(e.target.id === "resume-btn") {
                timer.start();
                // printIt.printMainScreen();
            }
        });




        document.addEventListener("click", function(e){
            if(e.target.id === "stop-btn") {
                timer.stop();
                printIt.printMainScreen();
            }
        });

    // }); 

    }

    module.exports = {timerInitialize};