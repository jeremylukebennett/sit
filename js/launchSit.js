"use strict";

let $ = require("jquery");   
let printIt = require("./printToDom");
 
let sitCountdown = require("./timer");    



function countdownScreen() {
    console.log("is this on?");

    console.log("should've printed");
// Clears Home Page
    let mainContent = document.getElementById("mainContentDiv");
//     let stopButton = `      <div class="text-center" id="sit-btn-container">
//     <button class="btn btn-primary" id="stop-btn">Stop</button>
//   </div>`;


    mainContent.innerHTML = ``;

    // mainContent.innerHTML = `<p>Hello</p>`;

    // $(mainContent).append(stopButton);
    printIt.printTimerToPage();

    // sitCountdown.timerInitialize(createCountdownDiv);

}




module.exports = {countdownScreen};