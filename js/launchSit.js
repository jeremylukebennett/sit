"use strict";

let $ = require("jquery");    



function countdownScreen() {
    console.log("is this on?");

// Clears Home Page
    let mainContent = document.getElementById("mainContentDiv");
    let stopButton = `      <div class="text-center" id="sit-btn-container">
    <button class="btn btn-primary" id="stop-btn">Stop</button>
  </div>`;
    mainContent.innerHTML = ``;

    // mainContent.innerHTML = `<p>Hello</p>`;

    $(mainContent).append(stopButton);

}




module.exports = {countdownScreen};