"use strict";

let printIt = require("./printToDom");
let $ = require("jquery");



// I think if you want this to play separate files relative to the slider value you're gonna have to write a switch statement that checks the value of the slider and plays a divverent audio element with a particular id depending on the slider value...


// Sound Slider Settings

let intervalSoundValues = ["audioFiles/singleBell.mp3", "audioFiles/singleBlock.mp3", "audioFiles/singleTone.mp3"];
let alarmSoundValues = ["audioFiles/gradualBells.mp3", "audioFiles/gradualBlock.mp3", "audioFiles/gradualTone.mp3"];
let newIntervalSound;
let newAlarmSound;

var newVal = null;

$(document).on("change", "#slider3", ()=>{
    newVal = $("#slider3").val();
    $("#slider3").attr("value", newVal);

    newAlarmSound = alarmSoundValues[newVal];
    newIntervalSound = intervalSoundValues[newVal];
    

    $("#alertSource").attr("src", newAlarmSound);
    $("#intervalSource").attr("src", newIntervalSound);

    console.log(alarmSoundValues[newVal]);
    console.log(intervalSoundValues[newVal]);
});  
    



// ALARM FUNCTION:
function alertLaunch() {
console.log("LAUNCH ALERT LAUNCH FUNCTION");
console.log("THIS IS THE newVal !!!!!?: ", newVal);
    if(newVal === "0") {
        // play bell

        let bellAlarm = document.getElementById("myAudioBell"); 
        bellAlarm.play();
    }
    else if(newVal === "1") {
        // play block
        console.log("play block alarm");

        let blockAlarm = document.getElementById("myAudioBlock"); 
        blockAlarm.play();

    }
    else if(newVal === "2") {
        // play tone
        console.log("play tone alarm");
        let toneAlarm = document.getElementById("myAudioTone"); 
        toneAlarm.play(); 
    }
}

// INTERVAL
    function intervalAlertLaunch() {

        if(newVal === "0") {
            console.log("play bell interval");

            let bellInterval = document.getElementById("myIntervalAudioBell"); 
                
            // bellInterval.pause(); 
            bellInterval.play(); 
        }
        else if(newVal === "1") {
            console.log("play block interval");

            let blockInterval = document.getElementById("myIntervalAudioBlock"); 
                
            blockInterval.pause(); 
            blockInterval.play(); 
        }
        else if(newVal === "2") {
            console.log("play tone interval");

            let toneInterval = document.getElementById("myIntervalAudioTone"); 
                
            toneInterval.pause(); 
            toneInterval.play(); 
        }
    console.log("play interval audio");

    }



module.exports = {alertLaunch, intervalAlertLaunch};