"use strict";
let $ = require("jquery");    
let printIt = require("./printToDom");
let startSit = require("./launchSit");
let sliders = require("./readSliderValue");
let soundAlerts = require("./playAudio");
var Timer = require('easytimer');
let timerTools = require('./timer');
let fbInteraction = require("./interaction");
let graphUserInfo = require('./graphData.js');
let firebase = require("firebase/app");
let fbConfig = require("./fb-config");
require("./addToFB");
let mainContainer = document.getElementById("mainContentDiv");

let sitButton = document.getElementById("sit-btn");
let entryToEdit = null;
var firebaseUser = firebase.auth().currentUser;


printIt.printMainScreen();

// Launch Sit Button function
document.addEventListener("click", function(e){
    if(e.target.id === "sit-btn") {
        startSit.countdownScreen();
        $("#timer-buttons").show();
    }
});

// CLICK 'TRACK PROGRESS' from the MENU:
const trackProgressMenuOption = document.getElementById("menuProgress");

trackProgressMenuOption.addEventListener("click", e => {
    var firebaseUser = firebase.auth().currentUser;

    printIt.printGraphData();
    
    // Need to check user and retrieve user's data:
    // console.log("SURELY THIS DIDNT WORK: ", firebaseUser);
            
        fbInteraction.retrieveUserProgress(firebaseUser.uid)
        .then((data) => {
            let i = 0;
            
            for(let key in data) {
                let sessionDate = new Date(data[key].sessionDate);
                let userDay = sessionDate.getDay();
                let userMonth = sessionDate.getMonth();
                let userDate = sessionDate.getDate();
                let userYear = sessionDate.getFullYear();

                printIt.printUserData(i, userDay, userMonth, userDate, userYear, data[key].sessionDuration, key);
                
                i++;
            }
            printIt.printTrackerButtons();
        });  
  });

  const userLogOutMenuOption = document.getElementById("menuLogOutOption");

  userLogOutMenuOption.addEventListener("click", e => {
    console.log("you logged out, now you need to figure out how to get the graph to go away");
    console.log("did it go away?");
    console.log("Interaction.userLogOutMenuOption.printIt.refillLoginModal", printIt);
    
    printIt.refillLoginModal();
    fbConfig.auth().signOut().then((result)=>{
    });
    window.location.reload();
  });

  
  document.addEventListener("click", function(e){
      if(e.target.id === "back-btn") {
          console.log("go back??");
          console.log('printIt', printIt);
          printIt.printMainScreen();
        }
    });

// TRACK PROGRESS FROM THE LOGIN PAGE
    const trackMenuProgressFromLogIn = document.getElementById("user-progress");

  trackMenuProgressFromLogIn.addEventListener("click", e => {
    printIt.printGraphData();
    
    // Need to check user and retrieve user's data:

    var firebaseUser = firebase.auth().currentUser;

    printIt.printGraphData();
    
    // Need to check user and retrieve user's data:
    // console.log("SURELY THIS DIDNT WORK: ", firebaseUser);
            
        fbInteraction.retrieveUserProgress(firebaseUser.uid)
        .then((data) => {
            let i = 0;
            
            for(let key in data) {
                let sessionDate = new Date(data[key].sessionDate);
                let userDay = sessionDate.getDay();
                let userMonth = sessionDate.getMonth();
                let userDate = sessionDate.getDate();
                let userYear = sessionDate.getFullYear();

                printIt.printUserData(i, userDay, userMonth, userDate, userYear, data[key].sessionDuration, key);
                
                i++;
            }
            printIt.printTrackerButtons();
        });  
  });





// MAKE SAVE BUTTON LAUNCH TRACK PROGRESS REFRESH

let saveEdit = document.getElementById("save-edit-btn");



// ============================================================================================================
// DR. Ts Delete Code:
// DELETE USER PROGRESS ENTRY
$(document).on("click", ".user-progress-deletes", function (e) {
    console.log("clicked delete progress", $(this).data("delete-id"));
    console.log("EEEEEEEE", e);
    
    fbInteraction.deleteProgressEntry($(this).data("delete-id")).then(()=>{
        var firebaseUser = firebase.auth().currentUser;

        console.log("What is in the firebaseUser var? ", firebaseUser);
            fbInteraction.retrieveUserProgress(firebaseUser.uid)
            .then((data) => {
                let i = 0;
                console.log("WHEN YOU Click DELETE THIS IS THE REMAINING USER DATA: ", data);
                
                for(let key in data) {
                    // let sessionDate = new Date(data[key].sessionDate);

                    let userDay = new Date(data[key].sessionDate).getDay();
                    console.log('userDay',userDay);
                    let userMonth = new Date(data[key].sessionDate).getMonth();
                    console.log('userMonth',userMonth);
                    let userDate = new Date(data[key].sessionDate).getDate();
                    console.log('userDate',userDate);
                    let userYear = new Date(data[key].sessionDate).getFullYear();
                    console.log('userYear',userYear);
                    console.log("NUMBER", i);
                    // console.log("data.sessionDate", data.sessionDate);
                    console.log("data[key].sessionDuration", data[key].sessionDuration);
                    
                    printIt.printUserData(i, userDay, userMonth, userDate, userYear, data[key].sessionDuration, key);
                    
                    i++;
                }
                printIt.printTrackerButtons();
            });  
    });

           printIt.printGraphData();
    });

// ============================================================================================================





// CAPTURE THE FB ID for THE EDIT BUTTON CLICKED
$(document).on("click", ".user-progress-edits", function () {
    entryToEdit = $(this).data("edit-id");
});

// EDIT USER PROGRESS ENTRY (VIA THE SAVE BUTTON)
$(document).on("click", "#save-edit-btn", function () {
// Get the text input of the Duration filed and put it into a variable
let revisedDuration = $("#editDurationInput").val();
let revisedDate = $("editDateField").val();



    // CALL FUNCTION THAT 'PUT'S UP TO FIREBASE
    var firebaseUser = firebase.auth().currentUser;

    fbInteraction.retrieveUserProgress(firebaseUser.uid)
    .then((data) => {
        // You've got the users data object now, so filter through that to pull out the one that has the firebase id in question, and replace that with the new object.
        let myObj = null;

        for(let key in data) {
            if(key === entryToEdit) {
                myObj = data[key];
                // That data[key] is the exact object you want to edit. SO alter that object to equal the new values, then pass it on into the editProgress function. I guess use if statements to pull out the info from the text input fields of the edit modal. Only pick them out if they don't equal zero.

                data[key].sessionDuration = revisedDuration;
                return data[key];  
            }
        }
    })
    .then((data) => {
         return fbInteraction.editProgress(data, entryToEdit);
        })
    .then((data)=>{
            console.log("passed in data", data);
            console.log("updated user progress", fbInteraction.retrieveUserProgress(firebaseUser.uid));
            return fbInteraction.retrieveUserProgress(firebaseUser.uid);        
    })    
    .then((data)=>{
            console.log("DATA", data);
        
            let i = 0;
            mainContainer.innerHTML = ``;
            
            for(let key in data) {
                console.log("lots of data", data);
                console.log("sessionDuration", data[key].sessionDuration);
                let sessionDate = new Date(data[key].sessionDate);
                let userDay = sessionDate.getDay();
                let userMonth = sessionDate.getMonth();
                let userDate = sessionDate.getDate();
                let userYear = sessionDate.getFullYear();

                printIt.printUserData(i, userDay, userMonth, userDate, userYear, data[key].sessionDuration, key);
                
                i++;
            }
            printIt.printTrackerButtons();
        });  
        // console.log("GETTING THIS FAR?", data);

        // let i = 0;

        // for(let key in data) {
        //     // console.log("data", data);
        //     // console.log("key: ", key);
        //     console.log('data[key]',data.sessionDate);
        //     console.log('data.sessionDuration',data.sessionDuration);
        //     let userDay = new Date(data.sessionDate).getDay();
        //     console.log('userDay',userDay);
        //     let userMonth = new Date(data.sessionDate).getMonth();
        //     console.log('userMonth',userMonth);
        //     let userDate = new Date(data.sessionDate).getDate();
        //     console.log('userDate',userDate);
        //     let userYear = new Date(data.sessionDate).getFullYear();
        //     console.log('userYear',userYear);
        //     printIt.printUserData(i, userDay, userMonth, userDate, userYear, data.sessionDuration, key);
            
        //     i++;
        // }
        // printIt.printTrackerButtons();
    // });
        

        // fbInteraction.retrieveUserProgress(firebaseUser.uid)
        // .then((data) => {
        //     console.log("WHAT IS THIS DATA: ", data);
            
        // });  
    });  
