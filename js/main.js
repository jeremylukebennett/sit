"use strict";
let $ = require("jquery");    
let printIt = require("./printToDom");
let startSit = require("./launchSit");

// Main Sit button at bottom of Home Page
let sitButton = document.getElementById("sit-btn");


printIt.printMainScreen();

// Launch Sit Button function
document.addEventListener("click", function(e){
    if(e.target.id === "sit-btn") {
        startSit.countdownScreen();
    }
});