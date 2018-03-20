"use strict";

let firebase = require("firebase/app");
require("./fb-config");



const userEmail = document.getElementById("user-email");
const userPassword = document.getElementById("user-password");
const userLogin = document.getElementById("user-login");
const userSignUp = document.getElementById("user-sign-up");


userLogin.addEventListener("click", e => {
  // get email and pass
  const email = userEmail.value;
  const pass = userPassword.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));

});  

