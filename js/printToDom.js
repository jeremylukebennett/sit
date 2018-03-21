"use strict";
let $ = require("jquery");
let firebase = require("firebase/app");
let graphUserInfo = require("./graphData");
require("./fb-config");

let mainContainer = document.getElementById("mainContentDiv");




// This prints the main content to the screen on initial load.
function printMainScreen() {

    mainContainer.innerHTML = `    
    <form id="sliderData1">

        <div class="form-group" id="testing-width">
        <label for="duration-setting" class="slider-titles">Duration:</label>
        <input id="slider1" type="range" min="0" max="5" value="0">
        <span></span>
        <ul class="rangeSliderLabels">
            <li class="sliderListItemsDuration">5</li> 
            <li class="sliderListItemsDuration">10</li> 
            <li class="sliderListItemsDuration">15</li> 
            <li class="sliderListItemsDuration">20</li> 
            <li class="sliderListItemsDuration">25</li> 
            <li class="sliderListItemsDuration">30</li>
        </ul>
        </div>

    </form>
    
    <form id="sliderData2">

        <div class="form-group" id="testing-width">
          <label for="interval-setting" class="slider-titles">Interval:</label>
          <input id="slider2" type="range" min="0" max="5" value="0">
          <span></span>
          <ul class="rangeSliderLabels">
              <li class="sliderListItemsInterval" id="noneOption">None</li> 
              <li class="sliderListItemsInterval">1</li> 
              <li class="sliderListItemsInterval">2</li> 
              <li class="sliderListItemsInterval">3</li> 
              <li class="sliderListItemsInterval">4</li> 
              <li class="sliderListItemsInterval">5</li>
          </ul>
        </div>

      </form>
      
      
      
      <form id="sliderData3">

        <div class="form-group" id="testing-width">
          <label for="sound-setting" class="slider-titles">Sound:</label>
          <input id="slider3" type="range" min="0" max="2" value="0">
          <span></span>
          <ul class="rangeSliderLabels">
            <li class="sliderListItemsSound">Bell</li> 
            <li class="sliderListItemsSound">Block</li> 
            <li class="sliderListItemsSound">Tone</li> 
          </ul>
        </div>

      </form>
      

      
      
      <div class="text-center" id="sit-btn-container">
        <button type="button" class="btn btn-primary" id="sit-btn">Sit!</button>
      </div>`;

}

// function printButtonToPage() {

// }

function printTimerToPage() {
  console.log("are we getting to the print dunction");
  mainContainer.innerHTML = `<div id="countdownString">
                              <div class="values text-center" id="countdownTime"></div>
                            </div>`;

  mainContainer.innerHTML += `<div class="text-center" id="sit-btn-container">
                                <button class="btn btn-primary" id="pause-btn">Pause</button>
                              </div>`;

mainContainer.innerHTML += `<div class="text-center" id="sit-btn-container">
                                <button class="btn btn-primary" id="stop-btn">Stop</button>
                            </div>`;
}

function printResumeButtonToPage() {
  console.log("resume yet?");
  mainContainer.innerHTML += `<div class="text-center" id="sit-btn-container">
                                <button class="btn btn-primary" id="resume-btn">Resume</button>
                            </div>`;
}

function printAudioHTMLToPage() {
  console.log("audio function");

  // mainContainer.innerHTML += `<audio id="myAudio">
  //                               <source src="audioFiles/gradualTone.mp3" type="audio/mpeg id="alertSource">
  //                               Your browser does not support the audio element.
  //                             </audio>`;

  // mainContainer.innerHTML += `<audio id="myIntervalAudio">
  //                               <source src="audioFiles/singleTone.mp3" type="audio/mpeg id="intervalSource">
  //                               Your browser does not support the audio element.
  //                             </audio>`;
}


function printHowToUse() {
  mainContainer.innerHTML = ``;
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    mainContainer.innerHTML += `<p>You're signed in!</p>`;
    
  } else {
    // No user is signed in.
    mainContainer.innerHTML += `<p>You're NOT signed in!</p>`;
  }
});


function printGraphData() {
  mainContainer.innerHTML = ``;
  mainContainer.innerHTML += `<canvas class="hide" id="myChart"></canvas>`;
  console.log("should make button and should be below");
  
  
  
  
  



  	
$( "#myChart" ).after( "<div class='text-center'><button class='btn btn-primary' id='back-btn'>Back</button></div>" );
  // mainContainer.innerHTML += `<button>Back</button>`;

}

function refillLoginModal() {
  document.getElementById("loginModalBox").innerHTML = `<form>
  <div class="form-group">
    <label for="user-email" class="col-form-label">Email:</label>
    <input type="text" class="form-control" id="user-email">
  </div>
  <div class="form-group">
    <label for="user-password" class="col-form-label">Password:</label>
    <input class="form-control" id="user-password"></input>
  </div>
</form>`;

}

// function testOfPrintModule() {
//   console.log("does the print module work???");
// }

module.exports = {printMainScreen, printTimerToPage, printAudioHTMLToPage, printResumeButtonToPage, printHowToUse, printGraphData, refillLoginModal};