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
    




function alertLaunch() {
console.log("LAUNCH ALERT LAUNCH FUNCTION");
    // let soundValue = $("#slider3").val();
    // console.log('soundValue',newVal);
console.log("THIS IS THE newVal !!!!!?: ", newVal);
    if(newVal === "0") {
// play bell
console.log("play bell alarm PLAY ALRM ALASDLASDJAHSKDJHAKSJDHAKJSDH");
    }
    else if(newVal === "1") {
// play black
console.log("play block alarm");
    }
    else if(newVal === "2") {
        // play tone
        console.log("play tone alarm");
        let toneAlarm = document.getElementById("myAudioTone"); 
        toneAlarm.play(); 
    }



    let toneAlarm = document.getElementById("myAudioTone"); 
        toneAlarm.play(); 
    }


    function intervalAlertLaunch() {
    console.log("play audio");

    let toneInterval = document.getElementById("myIntervalAudioTone"); 
        
    toneInterval.pause(); 
    toneInterval.play(); 
    }



module.exports = {alertLaunch, intervalAlertLaunch};