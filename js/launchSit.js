"use strict";

// let $ = require("jquery");   
let printIt = require("./printToDom");
let sitCountdown = require("./timer");    



function countdownScreen() {

    let mainContent = document.getElementById("mainContentDiv");

    mainContent.innerHTML = ``;

    // Prints the Timer and Stop button to the DOM
    printIt.printTimerToPage();
    printIt.printAudioHTMLToPage();
    sitCountdown.timerInitialize();
}




module.exports = {countdownScreen};