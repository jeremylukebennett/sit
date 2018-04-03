"use strict";

// let firebase = require("firebase/app");
// require("firebase/auth");
// require("firebase/database");

let userData = require("./userData");
let fbConfig = require("./fb-config");
let firebase = require("firebase/app");
let graphIt = require("./graphData");
let printIt = require("./printToDom");  // printIt is console.logging empty....
console.log('printIt',printIt);
let graphUserInfo = require('./graphData.js');
let alarmData = require('./alarmDataCapture');
let $ = require("jquery");
// let fbInteraction = require("./interaction");

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
    console.log("YOU JUST LOGGED IN. NOW IS WHEN YOU SHOULD GRAB THE USER PROGRESS INFO");

    let userID = response.uid;
    let userEmail = response.email;
    let currentDate = today;
    let sessionDuration = durationValues[$("#slider1").val()];
    console.log('sessionDuration', durationValues[$("#slider1").val()]);
    console.log('firebase.auth().currentUser;',fbConfig.auth().currentUser);
    let allUserInfo = userData.makeUserObject(userID, userEmail, currentDate, sessionDuration); //Need to include duration and date values to pass to firebase

    console.log('allUserInfo', allUserInfo);    
    console.log('fbConfig.config.databaseURL',fbConfig.config().databaseURL);
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


// This is being called in the timer.js file and being passed the uid of current user only when alarm goes off
function retrieveUserProgress(user){
  console.log("This is the user that's being passed: ", user);
  return $.ajax({
      url: `${fbConfig.config().databaseURL}//progress.json?orderBy="user"&equalTo="${user}"`
   }).done((resolve) => {
     console.log("from retrieve user progress function. This should index through the collections and give: ", resolve);
    //  Call function here to display data on screen and pass the 'resolve' inside
    // graphIt.consoleUserData(resolve);
      return resolve;
   }).fail((error) => {
     console.log("there was an error");
      return error;
   });
}




function deleteProgressEntry(songId) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: `${fbConfig.config().databaseURL}/progress/${songId}.json`,
			method: "DELETE"
		}).done(() => {
      // console.log('data',data);
			resolve();
		});
	});
}

function editProgress(songFormObj, songId) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: `${fbConfig.config().databaseURL}/progress/${songId}.json`,
			type: 'PUT',
			data: JSON.stringify(songFormObj)   // This is the object that will go into the FB ID object. So when you edit data, reload it into this object and then reup *that* object to firebase here. So you'll need the FB id, which yo've got, and the reformed obj which you don't yet. But that will be the same as 'songFormObj' in this context.
		}).done((data) => {
      console.log("What is data? ", data);
      resolve(data);
      
		});
	});
}


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
  // printIt.refillLoginModal();
  fbConfig.auth().signOut();
  location.reload();
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

// deleteProgressEntry, editProgress
module.exports = {sendUserDurationAndDate, retrieveUserProgress, deleteProgressEntry, editProgress};