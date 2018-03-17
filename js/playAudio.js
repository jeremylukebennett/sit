"use strict";

let printIt = require("./printToDom");


let $ = require("jquery");

function alertLaunch() {
    console.log("play audio");
    // printIt.printAudioHTMLToPage();

    var x = document.getElementById("myAudio"); 
    x.play(); 
    // function playAudio() { 
    // } 
    
    // function pauseAudio() { 
    //     x.pause(); 
    // }






}



module.exports = {alertLaunch};