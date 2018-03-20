"use strict";
let $ = require("jquery");    
let printIt = require("./printToDom");
let startSit = require("./launchSit");
let sliders = require("./readSliderValue");
let soundAlerts = require("./playAudio");
var Timer = require('easytimer');
let timerTools = require('./timer');


// Main Sit button at bottom of Home Page
let sitButton = document.getElementById("sit-btn");


printIt.printMainScreen();

// Launch Sit Button function
document.addEventListener("click", function(e){
    if(e.target.id === "sit-btn") {
        startSit.countdownScreen();
    }
});

// document.addEventListener("click", function(e){
//     if(e.target.id === "menu1") {
//         console.log("How to Use");
//         printIt.printHowToUse();



//     }
// });

// document.addEventListener("click", function(e){
//     if(e.target.id === "menu2") {
//         console.log("menu2 clicked");
//     }
// });

// document.addEventListener("click", function(e){
//     if(e.target.id === "menu3") {
//         console.log("menu3 clicked");
//     }
// });




// let durationValues = [5, 10, 15, 20, 25, 30]; 
// $("#slider1").change(function(){

//     // .text(values[this.value]);
// console.log(durationValues[this.value]);
// });


