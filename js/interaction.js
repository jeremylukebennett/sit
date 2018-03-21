"use strict";

let firebase = require("firebase/app");
let userData = require("./userData");
let fbConfig = require("./fb-config");
let printIt = require("./printToDom");
let graphUserInfo = require('./graphData.js');
let alarmData = require('./alarmDataCapture');
let $ = require("jquery");

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


userLogin.addEventListener("click", e => {
  // get email and pass
  const email = userEmail.value;
  const pass = userPassword.value;
  const auth = firebase.auth();
  // const userID = firebase

  // Sign in
  auth.signInWithEmailAndPassword(email, pass)
  .then((response)=>{
    console.log("response", response);

    let userID = response.uid;
    let userEmail = response.email;
    let idAndEmail = userData.makeUserObject(userID, userEmail);

    console.log('idAndEmail', idAndEmail);    

    // add user object to firebase
    function addUser(value) {
        return $.ajax({
        url: `${fbConfig.config.databaseURL}/user.json`, // "user" can be anything even if it hasn't be added in firebase yet
        type: 'POST',
        data: JSON.stringify(value),
        dataType: 'json'
      }).done((valueID) => {
        return valueID;
      });
    }

    addUser(idAndEmail);
  
    
  }).catch(e => console.log(e.message));
  document.getElementById("loginModalBox").innerHTML = `<p>You're logged in :D</p>`;

});  


// USER SIGN UP

userSignUp.addEventListener("click", e => {
  // get email and pass
//   Make suer you check that this is a valid email...
  const email = userEmail.value;
  const pass = userPassword.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));


});  


userLogOut.addEventListener("click", e => {
  console.log("you logged out");
  printIt.refillLoginModal();
  firebase.auth().signOut();
});

userLogOutMenuOption.addEventListener("click", e => {
  console.log("you logged out, now you need to figure out how to get the graph to go away");
  console.log("did it go away?");
  printIt.refillLoginModal();
  firebase.auth().signOut();
});

trackProgress.addEventListener("click", e => {
  printIt.printGraphData();
  graphUserInfo.graphTest();
});

trackProgressMenuOption.addEventListener("click", e => {
  printIt.printGraphData();
  graphUserInfo.graphTest();
});


document.addEventListener("click", function(e){
  if(e.target.id === "back-btn") {
    console.log("go back??");
    printIt.printMainScreen();
  }
});




firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    // User logged in
    console.log(firebaseUser);
    console.log("is there anything being logged here??");
    console.log('firebaseUser',firebaseUser);
    console.log("need uid here");
    console.log('firebaseUser.uid',firebaseUser.uid);
    trackProgress.classList.remove('hide');
    trackProgressMenuOption.classList.remove('hide');
    userLogOutMenuOption.classList.remove('hide');
    userLogOut.classList.remove('hide');
    userLogin.classList.add('hide');
    userLoginMenuOption.classList.add('hide');
    userSignUp.classList.add('hide');

    // Add function that is called that then looks to see if the alarm cycle finished while the user was logged in. If so, run a function that pushes that data up to firebase with the associated uid.



    



    let getFBdetails = (user) => {
      return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/users.json?orderBy="uid"&equalTo="${user}"`
      }).done((resolve) => {
        return resolve;
      }).fail((error) => {
        return error;
      });
    };






  } else {
    // User not logged in
    console.log("not logged in");
    printIt.printMainScreen();
    console.log("not logged in again");

    trackProgress.classList.add('hide');
    trackProgressMenuOption.classList.add('hide');
    userLogOutMenuOption.classList.add('hide');

    userLogOut.classList.add('hide');
    userLogin.classList.remove('hide');
    userLoginMenuOption.classList.remove('hide');
    userSignUp.classList.remove('hide');
  }
});