"use strict";

let firebase = require("firebase/app");
require("firebase/auth");
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


  module.exports = firebase;

