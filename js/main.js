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

let sitButton = document.getElementById("sit-btn");
let entryToEdit = null;

printIt.printMainScreen();

// Launch Sit Button function
document.addEventListener("click", function(e){
    if(e.target.id === "sit-btn") {
        startSit.countdownScreen();
    }
});

// CLICK 'TRACK PROGRESS' from the MENU:
const trackProgressMenuOption = document.getElementById("menuProgress");

trackProgressMenuOption.addEventListener("click", e => {
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

  const trackMenuProgressFromLogIn = document.getElementById("user-progress");

  trackMenuProgressFromLogIn.addEventListener("click", e => {
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





// MAKE SAVE BUTTON LAUNCH TRACK PROGRESS REFRESH

let saveEdit = document.getElementById("save-edit-btn");

saveEdit.addEventListener("click", e => {
    printIt.printGraphData();
    console.log("You clicked save");
    
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
// 





//   const trackProgress = document.getElementById("user-progress");
// //   const trackProgressFromLogIn = document.getElementById("")


//   trackProgress.addEventListener("click", e => {
//     console.log("clicked track progress");
//     printIt.printGraphData();
//     graphUserInfo.graphTest();
//   });



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



// DELETE USER PROGRESS ENTRY ============================================================================================================
// $(document).on("click", ".user-progress-deletes", function () {
//     console.log("clicked delete progress", $(this).data("delete-id"));
    
//     fbInteraction.deleteProgressEntry($(this).data("delete-id")).then(
    
    
//     // Need to check user and retrieve user's data:
      
//       firebase.auth().onAuthStateChanged(firebaseUser => {
//           if(firebaseUser) {
//             //   console.log("What is in the firebaseUser var? ", firebaseUser);
              
//             console.log("What is in the firebaseUser var? ", firebaseUser);
//               fbInteraction.retrieveUserProgress(firebaseUser.uid)
//               .then((data) => {
//                   let i = 0;


//                 //   At this point the 'data' variable is still displaying the same user info including the deleted item... So that's why its not getting removed from the DOM.
//                   console.log("WHEN YOU Click DELETE THIS IS THE REMAINING USER DATA: ", data);
                  
//                   for(let key in data) {
//                       let userDay = new Date(data[key].sessionDate).getDay();
//                       let userMonth = new Date(data[key].sessionDate).getMonth();
//                       let userDate = new Date(data[key].sessionDate).getDate();
//                       let userYear = new Date(data[key].sessionDate).getFullYear();
//                       console.log("NUMBER", i);
//                       console.log("data[key].sessionDate", data[key].sessionDate);
//                       console.log("data[key].sessionDuration", data[key].sessionDuration);
                      
//                       printIt.printUserData(i, userDay, userMonth, userDate, userYear, data[key].sessionDuration, key);
                      
//                       i++;
//                   }
//                   printIt.printTrackerButtons();
//               });  
//           } else {
//               console.log("IMPOSSIBLE!");
//           }
//         })
//     );

//         printIt.printGraphData();
//         // printIt.printGraphData();


// });
    


// ============================================================================================================
// DR. Ts Delete Code:
// DELETE USER PROGRESS ENTRY
$(document).on("click", ".user-progress-deletes", function (e) {
    console.log("clicked delete progress", $(this).data("delete-id"));
    console.log("EEEEEEEE", e);
    
    fbInteraction.deleteProgressEntry($(this).data("delete-id")).then(()=>{
      firebase.auth().onAuthStateChanged(firebaseUser => {
          if(firebaseUser) {
            console.log("What is in the firebaseUser var? ", firebaseUser);
              fbInteraction.retrieveUserProgress(firebaseUser.uid)
              .then((data) => {
                  let i = 0;
                  console.log("WHEN YOU Click DELETE THIS IS THE REMAINING USER DATA: ", data);
                  
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

           printIt.printGraphData();
    //     // printIt.printGraphData();
    });

// ============================================================================================================





// CAPTURE THE FB ID for THE EDIT BUTTON CLICKED
$(document).on("click", ".user-progress-edits", function () {
    console.log("clicked edit song", $(this).data("edit-id"));
    entryToEdit = $(this).data("edit-id");
    console.log('entryToEdit', entryToEdit);
});



// EDIT USER PROGRESS ENTRY (VIA THE SAVE BUTTON)
$(document).on("click", "#save-edit-btn", function () {
    console.log("you clicked save for :", entryToEdit);
// Get the text input of the Duration filed and put it into a variable
let revisedDuration = $("#editDurationInput").val();
let revisedDate = $("editDateField").val();
console.log("The Date: ", revisedDate);
console.log("The Duration: ", revisedDuration);



    // CALL FUNCTION THAT 'PUT'S UP TO FIREBASE

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            
            fbInteraction.retrieveUserProgress(firebaseUser.uid)
            .then((data) => {
                console.log("This is the data from clicking the 'SAVE' button on the edit page: ", data);
                // You've got the users data object now, so filter through that to pull out the one that has the firebase id in question, and replace that with the new object.
                for(let key in data) {
                    if(key === entryToEdit) {
                        console.log("This is the entry to edit after SAVE ", entryToEdit);
                        console.log("This is the KEY to edit after SAVE ", data[key]);
                        // That data[key] is the exact object you want to edit. SO alter that object to equal the new values, then pass it on into the editProgress function. I guess use if statements to pull out the info from the text input fields of the edit modal. Only pick them out if they don't equal zero.

                        data[key].sessionDuration = revisedDuration;
                        console.log("revised: ", data[key]);
                        
                        
                        fbInteraction.editProgress(data[key], entryToEdit);
                    }
                }
                // printIt.printTrackerButtons();
            });  
        } else {
            console.log("IMPOSSIBLE!");
        }
      });
});
