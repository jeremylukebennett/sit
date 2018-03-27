"use strict";

// let firebase = require("firebase/app");
// require("firebase/auth");
// require("firebase/database");

let userData = require("./userData");
let fbConfig = require("./fb-config");
// let firebase = require("./")

let printIt = require("./printToDom");  // printIt is console.logging empty....
console.log('printIt',printIt);
let graphUserInfo = require('./graphData.js');
let alarmData = require('./alarmDataCapture');
let $ = require("jquery");

console.log('userData',userData);
let userObject;

const userEmail = document.getElementById("user-email");
const userPassword = document.getElementById("user-password");
const userLogin = document.getElementById("user-login");
const userSignUp = document.getElementById("user-sign-up");
const userLogOut = document.getElementById("user-logout");
const trackProgress = document.getElementById("user-progress");
const trackProgressMenuOption = document.getElementById("menuProgress"); //This is going to the MAIN
const userLogOutMenuOption = document.getElementById("menuLogOutOption");
const userLoginMenuOption = document.getElementById("menu3");
const backButton = document.getElementById("back-btn");
const today = new Date();
let durationValues = [5, 10, 15, 20, 25, 30];


// Firebase Stuff..............


// START
userLogin.addEventListener("click", e => {       // get email and pass
  const email = userEmail.value;
  const pass = userPassword.value;
  const auth = fbConfig.auth();  
  
  auth.signInWithEmailAndPassword(email, pass)     // Sign in
  .then((response)=>{       //The 'response' variable here is the giant object containing uid among other things
    console.log("response", response);

    let userID = response.uid;
    let userEmail = response.email;
    let currentDate = today;
    let sessionDuration = durationValues[$("#slider1").val()];
    console.log('sessionDuration', durationValues[$("#slider1").val()]);
    console.log('firebase.auth().currentUser;',fbConfig.auth().currentUser);
    let allUserInfo = userData.makeUserObject(userID, userEmail, currentDate, sessionDuration); //Need to include duration and date values to pass to firebase

    console.log('allUserInfo', allUserInfo);    
    console.log('fbConfig.config.databaseURL',fbConfig.config().databaseURL);
    // console.log('fbConfig.databaseURL',fbConfig.databaseURL);


    // function addUser(value) {    // add user object to firebase
    //     return $.ajax({
    //     url: `${fbConfig.config().databaseURL}/user.json`, // "user" can be anything even if it hasn't be added in firebase yet
    //     type: 'POST',
    //     data: JSON.stringify(value),
    //     dataType: 'json'
    //   }).done((valueID) => {
    //     return valueID;
    //   });
    // }

    // addUser(allUserInfo);
    
  }).catch(e => console.log(e.message));


  document.getElementById("loginModalBox").innerHTML = `<p id="loginSuccess">You're logged in :D</p>`;
});  
// END





// Try writing function to push user duration to FB to be called when when times up
function sendUserDurationAndDate(value) {
  return $.ajax({
    url: `${fbConfig.config().databaseURL}/progress.json`, // "user" can be anything even if it hasn't be added in firebase yet
    type: 'POST',
    data: JSON.stringify(value),
    dataType: 'json'
  }).done((valueID) => {
    return valueID;
  });

}



// Write a function that will retrieve information from Firebase:

// function retrieveUserProgress(value) {
//   return $.ajax({
//     url: `${fbConfig.config().databaseURL}/progress.json`, // "user" can be anything even if it hasn't be added in firebase yet
//     type: 'GET',
//     data: JSON.stringify(value),
//     dataType: 'json'
//   }).done((valueID) => {
//     console.log('User Progress Object: ',valueID);
//     getFBDetails(valueID);
//     return valueID;
//   });
// }



// This should index through the collections and give 

function retrieveUserProgress(user){
  console.log("This is the user that's being passed: ", user);
  return $.ajax({
      url: `${fbConfig.config().databaseURL}//progress.json?orderBy="user"&equalTo="${user}"`
   }).done((resolve) => {
     console.log("from retrieve user progress function. This should index through the collections and give: ", resolve);
      return resolve;
   }).fail((error) => {
     console.log("there was an error");
      return error;
   });
}







// This function is meant to sort through the user progress object and giv back only the objects with the current uid:

// Currently its working. Need to get it to read the uid for the current user only.

              // function sortUserProgressObjects(dataObj) {
              //   console.log("This is the user object from the sortUserProgressObjects function: ", dataObj);

              //   // This 'results' array is what is ultimately going to be listed on the 'Track Progress' section.
              //   // Should this really be an object? If I want to add edit functionality then I'd need to edit this and re-up it to Firebase later, and that's gonna need to go up as an object.

              //   let results = [];
              //   // let currentUser = "";

              //   for(let fbID in dataObj) {
              //     console.log("key (fbID)", fbID);
              //     console.log("value (uid)", dataObj[fbID].user);

              //     let uid = dataObj[fbID].user;
              //     if(uid === "6WlGBEdDmEcYgH9bFrJyBq4LmtN2") {
              //       results.push(dataObj[fbID]);
              //     }
              //   }

              //   console.log("This is the sorted object of objects (user progress info): ", results);
              //   // dataObj.forEach(function(data) {
              //   //   if(data.user == "wF64Mz2fMGUekTXkdZY4EeEmxpF3") {
              //   //     results.push(data);
              //   //   }
              //   // });

              // console.log("This is the sorted results object: ", results);
              // }

              // fbConfig.auth().onAuthStateChanged((user) => {
              //   console.log("onAuthStateChanged, user: ", user.uid);
              //   let currentUser = user;
              // });

// console.log("I want this to be the current user pleasssseee: ",currentUser);



// function filterIt(event) {
//   return event.user == "wF64Mz2fMGUekTXkdZY4EeEmxpF3";
// }

// retrieveUserProgress();
// let userProgressObject = retrieveUserProgress();
// console.log("Here's the userProgressObject: ", userProgressObject.responseJSON);







// USER SIGN UP

userSignUp.addEventListener("click", e => {
  // get email and pass
//   Make suer you check that this is a valid email...
  const email = userEmail.value;
  const pass = userPassword.value;
  const auth = fbConfig.auth();
  // Sign in
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
});  


userLogOut.addEventListener("click", e => {
  console.log("you logged out");
  printIt.refillLoginModal();
  fbConfig.auth().signOut();
});


// userLogOutMenuOption.addEventListener("click", e => {
//   console.log("you logged out, now you need to figure out how to get the graph to go away");
//   console.log("did it go away?");
//   console.log("Interaction.userLogOutMenuOption.printIt.refillLoginModal", printIt);
  
//   fbConfig.auth().signOut().then((result)=>{
//     printIt.refillLoginModal();
//   });
// });

// trackProgress.addEventListener("click", e => {
//   console.log("clicked track progress");
//   printIt.printGraphData();
//   graphUserInfo.graphTest();
// });

// trackProgressMenuOption.addEventListener("click", e => {
//   printIt.printGraphData();
//   graphUserInfo.graphTest();
// });

// document.addEventListener("click", function(e){
//   if(e.target.id === "back-btn") {
//     console.log("go back??");
//     console.log('printIt',printIt);
//     printIt.printMainScreen();
//   }
// });


console.log('fbConfig',fbConfig);
// This detects whetheer the user is logged in or not. 
fbConfig.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    // User logged in
    console.log(firebaseUser);
    console.log("FB state change");
    console.log('firebaseUser',firebaseUser);
    console.log('firebaseUser.uid',firebaseUser.uid);
    trackProgress.classList.remove('hide');
    trackProgressMenuOption.classList.remove('hide');
    userLogOutMenuOption.classList.remove('hide');
    userLogOut.classList.remove('hide');
    userLogin.classList.add('hide');
    userLoginMenuOption.classList.add('hide');
    userSignUp.classList.add('hide');

    // Add function that is called that then looks to see if the alarm cycle finished while the user was logged in. If so, run a function that pushes that data up to firebase with the associated uid:

    // let getFBdetails = (user) => {
    //   return $.ajax({
    //     url: `${fbConfig.config().databaseURL}/users.json?orderBy="uid"&equalTo="${user}"`
    //   }).done((resolve) => {
    //     return resolve;
    //   }).fail((error) => {
    //     return error;
    //   });
    // };


  } else {
    // User not logged in
    console.log("not logged in");
    console.log("FB state change");

    // printIt.printMainScreen();

    trackProgress.classList.add('hide');
    trackProgressMenuOption.classList.add('hide');
    userLogOutMenuOption.classList.add('hide');

    userLogOut.classList.add('hide');
    userLogin.classList.remove('hide');
    userLoginMenuOption.classList.remove('hide');
    userSignUp.classList.remove('hide');
  }
});

module.exports = {sendUserDurationAndDate, retrieveUserProgress};