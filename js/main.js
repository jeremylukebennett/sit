"use strict";
let $ = require("jquery");    
let printIt = require("./printToDom");
// window.printIt = printIt;
let startSit = require("./launchSit");
let sliders = require("./readSliderValue");
let soundAlerts = require("./playAudio");
var Timer = require('easytimer');
let timerTools = require('./timer');
let fbInteraction = require("./interaction");
require("./addToFB");
let graphUserInfo = require('./graphData.js');
let firebase = require("firebase/app");
let fbConfig = require("./fb-config");
// Main Sit button at bottom of Home Page
let sitButton = document.getElementById("sit-btn");

let entryToEdit = null;

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
    // printIt.printGraphData();
    // graphUserInfo.graphTest();
    printIt.printGraphData();
    
    // Need to check user and retrieve user's data:
    
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            
            fbInteraction.retrieveUserProgress(firebaseUser.uid)
            .then((data) => {
                let i = 0;
                
                for(let key in data) {
                    let userDay = new Date(data[key].sessionDate).getDay();
                    let userMonth = new Date(data[key].sessionDate).getMonth();
                    let userDate = new Date(data[key].sessionDate).getDate();
                    let userYear = new Date(data[key].sessionDate).getFullYear();
                    console.log("NUMBER", i);
                    console.log("data[key].sessionDate", data[key].sessionDate);
                    console.log("data[key].sessionDuration", data[key].sessionDuration);
                    
                    printIt.printUserData(i, userDay, userMonth, userDate, userYear, data[key].sessionDuration, key);
                    
                    i++;
                }
                printIt.printTrackerButtons();
            });  
        } else {
            console.log("IMPOSSIBLE!");
        }
      });

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
      console.log('printIt', printIt);
      printIt.printMainScreen();
    }
  });



// DELETE USER PROGRESS ENTRY
  $(document).on("click", ".user-progress-deletes", function () {
    console.log("clicked delete song", $(this).data("delete-id"));
    // let progressID = $(this).data("delete-id");
    // deleteSong(songID)
    // .then(() => {
      fbInteraction.deleteProgressEntry($(this).data("delete-id"));
      // printIt.printGraphData();
      printIt.printGraphData();
  
      // Need to check user and retrieve user's data:
      
      firebase.auth().onAuthStateChanged(firebaseUser => {
          if(firebaseUser) {
              
              fbInteraction.retrieveUserProgress(firebaseUser.uid)
              .then((data) => {
                  let i = 0;
                  
                  for(let key in data) {
                      let userDay = new Date(data[key].sessionDate).getDay();
                      let userMonth = new Date(data[key].sessionDate).getMonth();
                      let userDate = new Date(data[key].sessionDate).getDate();
                      let userYear = new Date(data[key].sessionDate).getFullYear();
                      console.log("NUMBER", i);
                      console.log("data[key].sessionDate", data[key].sessionDate);
                      console.log("data[key].sessionDuration", data[key].sessionDuration);
                      
                      printIt.printUserData(i, userDay, userMonth, userDate, userYear, data[key].sessionDuration, key);
                      
                      i++;
                  }
                  printIt.printTrackerButtons();
              });  
          } else {
              console.log("IMPOSSIBLE!");
          }
        });
});







// CAPTURE THE FB ID for THE EDIT BUTTON CLICKED
$(document).on("click", ".user-progress-edits", function () {
    console.log("clicked edit song", $(this).data("edit-id"));
    entryToEdit = $(this).data("edit-id");
    console.log('entryToEdit', entryToEdit);
});



// EDIT USER PROGRESS ENTRY (VIA THE SAVE BUTTON)
$(document).on("click", "#save-edit-btn", function () {
    console.log("you clicked save for :", entryToEdit);
    // CALL FUNCTION THAT 'PUT'S UP TO FIREBASE

    fbInteraction.editProgress();

});



// function editSong(songFormObj, songId) {
// 	return new Promise((resolve, reject) => {
// 		$.ajax({
// 			url: `${firebase.getFBsettings().databaseURL}/songs/${songId}.json`,
// 			type: 'PUT',
// 			data: JSON.stringify(songFormObj)
// 		}).done((data) => {
// 			resolve(data);
// 		});
// 	});
// }