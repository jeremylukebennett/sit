"use strict";
let $ = require("jquery");    
let printIt = require("./printToDom");
// window.printIt = printIt;
let startSit = require("./launchSit");
let sliders = require("./readSliderValue");
let soundAlerts = require("./playAudio");
var Timer = require('easytimer');
let timerTools = require('./timer');
require("./interaction");
require("./addToFB");
let graphUserInfo = require('./graphData.js');
let fbConfig = require("./fb-config");


// Main Sit button at bottom of Home Page
let sitButton = document.getElementById("sit-btn");


printIt.printMainScreen();


// Launch Sit Button function
document.addEventListener("click", function(e){
    if(e.target.id === "sit-btn") {
        startSit.countdownScreen();
    }
});






// Beginning here are event listeners migrated from interaction.js whenever they stopped responding in that file... Trying to see if they respond here instead:

const trackProgressMenuOption = document.getElementById("menuProgress");

trackProgressMenuOption.addEventListener("click", e => {
    printIt.printGraphData();
    graphUserInfo.graphTest();
  });


  const trackProgress = document.getElementById("user-progress");


  trackProgress.addEventListener("click", e => {
    console.log("clicked track progress");
    printIt.printGraphData();
    graphUserInfo.graphTest();
  });



  const userLogOutMenuOption = document.getElementById("menuLogOutOption");


  userLogOutMenuOption.addEventListener("click", e => {
    console.log("you logged out, now you need to figure out how to get the graph to go away");
    console.log("did it go away?");
    console.log("Interaction.userLogOutMenuOption.printIt.refillLoginModal", printIt);
    
    printIt.refillLoginModal();
    fbConfig.auth().signOut().then((result)=>{
    });
  });





  document.addEventListener("click", function(e){
    if(e.target.id === "back-btn") {
      console.log("go back??");
      console.log('printIt',printIt);
      printIt.printMainScreen();
    }
  });