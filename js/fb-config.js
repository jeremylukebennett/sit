"use strict";

let firebase = require("firebase/app");
let $ = require("jquery");
let userDuration = require("./timer")
;require("firebase/auth");
require("firebase/database");


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAymRtacZFQpkjgbUEaVYcatZxchVj85Yc",
    authDomain: "sit-web-app.firebaseapp.com",
    databaseURL: "https://sit-web-app.firebaseio.com",
    projectId: "sit-web-app",
    storageBucket: "",
    messagingSenderId: "982048149294"
  };


  firebase.initializeApp(config);
  let database = firebase.database();



  function addUserSessionLength(durVal) {
    // console.log(durVal);
    // let tempObject = {
    //   duration: durVal,
    //   uid : 
    // }
  }

  console.log("is fb-config connected?");
  console.log(userDuration.newDuration);
  addUserSessionLength(userDuration.newDuration);

  module.exports = {firebase, config};

