"use strict";
let $ = require("jquery");

// This prints the main content to the screen on initial load.
function printMainScreen() {

    let mainContainer = document.getElementById("mainContentDiv");
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
              <li class="sliderListItemsInterval">None</li> 
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

module.exports = {printMainScreen};