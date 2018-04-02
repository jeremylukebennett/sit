"use strict";

let printIt = require("./printToDom");
let $ = require("jquery");



// I think if you want this to play separate files relative to the slider value you're gonna have to write a switch statement that checks the value of the slider and plays a divverent audio element with a particular id depending on the slider value...

function alertLaunch() {
    console.log("play audio");

    let x = document.getElementById("myAudioTone"); 
        x.play(); 
    }


    function intervalAlertLaunch() {
    console.log("play audio");

    let y = document.getElementById("myIntervalAudioTone"); 
        
        y.pause(); 
        y.play(); 
    }



module.exports = {alertLaunch, intervalAlertLaunch};