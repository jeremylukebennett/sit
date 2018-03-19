"use strict";
let $ = require("jquery");

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

  mainContainer.innerHTML += `<audio id="myAudio">
                                <source src="audioFiles/gradualBells.mp3" type="audio/mpeg">
                                Your browser does not support the audio element.
                              </audio>`;
}

module.exports = {printMainScreen, printTimerToPage, printAudioHTMLToPage, printResumeButtonToPage};