"use strict";

let printIt = require("./printToDom");
let $ = require("jquery");

function alertLaunch() {
    console.log("play audio");

    let x = document.getElementById("myAudio"); 
        x.play(); 
    }


    function intervalAlertLaunch() {
    console.log("play audio");

    let y = document.getElementById("myIntervalAudio"); 
        
        y.pause(); 
        y.play(); 
    }



module.exports = {alertLaunch, intervalAlertLaunch};