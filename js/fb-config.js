"use strict";

let $ = require("jquery");
// let userDuration = require("./timer");
let firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

console.log('fbCreds',fbCreds);
// Initialize Firebase
var fbCreds = {
  apiKey: "AIzaSyAymRtacZFQpkjgbUEaVYcatZxchVj85Yc",
  authDomain: "sit-web-app.firebaseapp.com",
  databaseURL: "https://sit-web-app.firebaseio.com",
  projectId: "sit-web-app",
  storageBucket: "",
  messagingSenderId: "982048149294"
};

console.log('fbCreds',fbCreds);
firebase.initializeApp(fbCreds);
let database = firebase.database();

  firebase.config = function() {
    console.log('fbCreds',fbCreds);
    return fbCreds;
  };

  module.exports = firebase;

