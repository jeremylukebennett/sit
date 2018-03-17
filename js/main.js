"use strict";
let $ = require("jquery");    
let printIt = require("./printToDom");
let startSit = require("./launchSit");
let sliders = require("./readSliderValue");

// Main Sit button at bottom of Home Page
let sitButton = document.getElementById("sit-btn");


printIt.printMainScreen();

// Launch Sit Button function
document.addEventListener("click", function(e){
    if(e.target.id === "sit-btn") {
        startSit.countdownScreen();
    }
});

// let durationValues = [5, 10, 15, 20, 25, 30]; 
// $("#slider1").change(function(){

//     // .text(values[this.value]);
// console.log(durationValues[this.value]);
// });


