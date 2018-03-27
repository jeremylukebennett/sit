"use strict";

// let firebase = require("firebase/app");
// require("firebase/auth");
// require("firebase/database");

let userData = require("./userData");

let fbConfig = require("./fb-config");
// let firebase = require("./")

let printIt = require("./printToDom");
// console.log(printIt);
let graphUserInfo = require('./graphData.js');
let alarmData = require('./alarmDataCapture');
let $ = require("jquery");
// console.log('fbConfig', fbConfig());
// firebase.initializeApp(fbConfig.config);
// let database = firebase.database();
console.log('userData',userData);
let userObject;

const userEmail = document.getElementById("user-email");
const userPassword = document.getElementById("user-password");
const userLogin = document.getElementById("user-login");
const userSignUp = document.getElementById("user-sign-up");
const userLogOut = document.getElementById("user-logout");
const trackProgress = document.getElementById("user-progress");
const trackProgressMenuOption = document.getElementById("menuProgress");
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


    function addUser(value) {    // add user object to firebase
        return $.ajax({
        url: `${fbConfig.config().databaseURL}/user.json`, // "user" can be anything even if it hasn't be added in firebase yet
        type: 'POST',
        data: JSON.stringify(value),
        dataType: 'json'
      }).done((valueID) => {
        return valueID;
      });
    }

    addUser(allUserInfo);
    
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

function retrieveUserProgress(value) {
  return $.ajax({
    url: `${fbConfig.config().databaseURL}/progress.json`, // "user" can be anything even if it hasn't be added in firebase yet
    type: 'GET',
    data: JSON.stringify(value),
    dataType: 'json'
  }).done((valueID) => {
    console.log('OVER HEEEERRRRREEE: valueID',valueID);
    return valueID;
  });

}

retrieveUserProgress();







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

userLogOutMenuOption.addEventListener("click", e => {
  console.log("you logged out, now you need to figure out how to get the graph to go away");
  console.log("did it go away?");
  printIt.refillLoginModal();
  fbConfig.auth().signOut();
});

trackProgress.addEventListener("click", e => {
  printIt.printGraphData();
  graphUserInfo.graphTest();
});

// trackProgressMenuOption.addEventListener("click", e => {
//   printIt.printGraphData();
//   graphUserInfo.graphTest();
// });

document.addEventListener("click", function(e){
  if(e.target.id === "back-btn") {
    console.log("go back??");
    console.log('printIt',printIt);
    printIt.printMainScreen();
  }
});


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

    printIt.printMainScreen();

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