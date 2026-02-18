(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

let $ = require("jquery");


// function addUser(userInfo) {
//     return $.ajax({
//      url: `${config.databaseURL}/sketch.json`, // "sketch" can be anything even if it hasn't be added in firebase yet
//      type: 'POST',
//      data: JSON.stringify(sketch),
//      dataType: 'json'
//   }).done((sketchID) => {
//      return sketchID;
//   });
// }


module.exports = {};
},{"jquery":16}],2:[function(require,module,exports){
"use strict";


function pushUserAlarmDataToFB() {
    console.log("pushUserAlarm");
}


module.exports = {pushUserAlarmDataToFB};
},{}],3:[function(require,module,exports){
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


},{"firebase/app":13,"firebase/auth":14,"firebase/database":15,"jquery":16}],4:[function(require,module,exports){
"use strict";

let fbInteraction = require("./interaction");


let userProgressObj = fbInteraction.retrieveUserProgress();
console.log('userProgressObj',userProgressObj);
console.log('userProgressObj.responseJSON',userProgressObj.responseText);

function graphTest() {

    document.getElementById("myChart").classList.remove('hide');
    console.log("should remove hide?");
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: ["", "", "", "", "", "", ""],
            datasets: [{
                label: "",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'black',
                data: [20, 30, 15],
            }]
        },
    
        // Configuration options go here
        options: {}
    });



    new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
          labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
          datasets: [{ 
              data: [86,114,106,106,107,111,133,221,783,2478],
              label: "Africa",
              borderColor: "black",
              fill: false
            }, { 
              data: [282,350,411,502,635,809,947,1402,3700,5267],
              label: "Asia",
              borderColor: "#8e5ea2",
              fill: false
            }, { 
              data: [168,170,178,190,203,276,408,547,675,734],
              label: "Europe",
              borderColor: "#3cba9f",
              fill: false
            }, { 
              data: [40,20,10,16,24,38,74,167,508,784],
              label: "Latin America",
              borderColor: "#e8c3b9",
              fill: false
            }, { 
              data: [6,3,2,2,7,26,82,172,312,433],
              label: "North America",
              borderColor: "#c45850",
              fill: false
            }
          ]
        },
        options: {
          title: {
            display: false,
            text: 'World population per region (in millions)'
          }
        }
      });

}


function consoleUserData(data) {
  console.log("This is the users data in the graphIt module please: ", data);

  for(let key in data) {
    console.log("data[key].sessionDate", data[key].sessionDate);
    console.log("data[key].sessionDuration", data[key].sessionDuration);
    // Push this data to 




  }
}




module.exports = {graphTest, consoleUserData};
},{"./interaction":5}],5:[function(require,module,exports){
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
      url: `${fbConfig.config().databaseURL}/progress.json?orderBy="user"&equalTo="${user}"`
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

},{"./alarmDataCapture":2,"./fb-config":3,"./graphData":4,"./graphData.js":4,"./printToDom":9,"./userData":11,"firebase/app":13,"jquery":16}],6:[function(require,module,exports){
"use strict";

// let $ = require("jquery");   
let printIt = require("./printToDom");
let sitCountdown = require("./timer");    



function countdownScreen() {

    let mainContent = document.getElementById("mainContentDiv");

    mainContent.innerHTML = ``;

    // Prints the Timer and Stop button to the DOM
    printIt.printTimerToPage();
    printIt.printAudioHTMLToPage();
    sitCountdown.timerInitialize();
}

module.exports = {countdownScreen};
},{"./printToDom":9,"./timer":10}],7:[function(require,module,exports){
"use strict";

let $ = require("jquery");
let printIt = require("./printToDom");
let startSit = require("./launchSit");
let fbInteraction = require("./interaction");
let firebase = require("firebase/app");
let fbConfig = require("./fb-config");
require("./addToFB");

let mainContainer = document.getElementById("mainContentDiv");
let entryToEdit = null;

printIt.printMainScreen();

function getCurrentUser() {
    return firebase.auth().currentUser;
}

function renderProgress(data) {
    printIt.printGraphData();

    if (!data || Object.keys(data).length === 0) {
        mainContainer.innerHTML = `<div class="text-center">No sessions yet.</div>`;
        printIt.printTrackerButtons();
        return;
    }

    let sortedKeys = Object.keys(data).sort((a, b) => {
        return new Date(data[b].sessionDate) - new Date(data[a].sessionDate);
    });

    sortedKeys.forEach((key, index) => {
        let sessionDate = new Date(data[key].sessionDate);
        let userDay = sessionDate.getDay();
        let userMonth = sessionDate.getMonth();
        let userDate = sessionDate.getDate();
        let userYear = sessionDate.getFullYear();

        printIt.printUserData(
            index,
            userDay,
            userMonth,
            userDate,
            userYear,
            data[key].sessionDuration,
            key
        );
    });

    printIt.printTrackerButtons();
}

function loadAndRenderProgress() {
    let currentUser = getCurrentUser();
    if (!currentUser) {
        printIt.printGraphData();
        mainContainer.innerHTML = `<div class="text-center">Please log in to view progress.</div>`;
        printIt.printTrackerButtons();
        return Promise.resolve(null);
    }

    return fbInteraction.retrieveUserProgress(currentUser.uid).then((data) => {
        renderProgress(data);
        return data;
    });
}

document.addEventListener("click", function (e) {
    if (e.target.id === "sit-btn") {
        startSit.countdownScreen();
        $("#timer-buttons").show();
    }
});

const trackProgressMenuOption = document.getElementById("menuProgress");
trackProgressMenuOption.addEventListener("click", function () {
    loadAndRenderProgress();
});

const userLogOutMenuOption = document.getElementById("menuLogOutOption");
userLogOutMenuOption.addEventListener("click", function () {
    printIt.refillLoginModal();
    fbConfig.auth().signOut().then(() => {
        window.location.reload();
    });
});

document.addEventListener("click", function (e) {
    if (e.target.id === "back-btn") {
        printIt.printMainScreen();
    }
});

const trackMenuProgressFromLogIn = document.getElementById("user-progress");
trackMenuProgressFromLogIn.addEventListener("click", function () {
    loadAndRenderProgress();
});

$(document).on("click", ".user-progress-deletes", function () {
    let deleteId = $(this).data("delete-id");
    if (!deleteId) {
        return;
    }

    fbInteraction.deleteProgressEntry(deleteId).then(() => {
        loadAndRenderProgress();
    });
});

$(document).on("click", ".user-progress-edits", function () {
    entryToEdit = $(this).data("edit-id");
});

$(document).on("click", "#save-edit-btn", function () {
    let currentUser = getCurrentUser();
    if (!currentUser || !entryToEdit) {
        return;
    }

    let revisedDuration = parseInt($("#editDurationInput").val(), 10);
    let revisedDate = $("#editDateField").val();

    fbInteraction.retrieveUserProgress(currentUser.uid)
        .then((data) => {
            let existingEntry = data && data[entryToEdit];
            if (!existingEntry) {
                return null;
            }

            if (!Number.isNaN(revisedDuration) && revisedDuration > 0) {
                existingEntry.sessionDuration = revisedDuration;
            }

            if (revisedDate) {
                existingEntry.sessionDate = new Date(revisedDate).toISOString();
            }

            return fbInteraction.editProgress(existingEntry, entryToEdit);
        })
        .then(() => {
            loadAndRenderProgress();
        });
});

},{"./addToFB":1,"./fb-config":3,"./interaction":5,"./launchSit":6,"./printToDom":9,"firebase/app":13,"jquery":16}],8:[function(require,module,exports){
"use strict";

let printIt = require("./printToDom");
let $ = require("jquery");



// I think if you want this to play separate files relative to the slider value you're gonna have to write a switch statement that checks the value of the slider and plays a divverent audio element with a particular id depending on the slider value...


// Sound Slider Settings

let intervalSoundValues = ["audioFiles/singleBell.mp3", "audioFiles/singleBlock.mp3", "audioFiles/singleTone.mp3"];
let alarmSoundValues = ["audioFiles/gradualBells.mp3", "audioFiles/gradualBlock.mp3", "audioFiles/gradualTone.mp3"];
let newIntervalSound;
let newAlarmSound;

var newVal = null;

$(document).on("change", "#slider3", ()=>{
    newVal = $("#slider3").val();
    $("#slider3").attr("value", newVal);

    newAlarmSound = alarmSoundValues[newVal];
    newIntervalSound = intervalSoundValues[newVal];
    

    $("#alertSource").attr("src", newAlarmSound);
    $("#intervalSource").attr("src", newIntervalSound);

    console.log(alarmSoundValues[newVal]);
    console.log(intervalSoundValues[newVal]);
});  
    



// ALARM FUNCTION:
function alertLaunch() {
console.log("LAUNCH ALERT LAUNCH FUNCTION");
console.log("THIS IS THE newVal !!!!!?: ", newVal);
    if(newVal === "0") {
        // play bell

        let bellAlarm = document.getElementById("myAudioBell"); 
        bellAlarm.play();
    }

    else if(newVal === "1") {
        // play block
        console.log("play block alarm");

        let blockAlarm = document.getElementById("myAudioBlock"); 
        blockAlarm.play();
    }

    else if(newVal === "2") {
        // play tone
        console.log("play tone alarm");
        let toneAlarm = document.getElementById("myAudioTone"); 
        toneAlarm.play();
    }
    else {
        let bellAlarm = document.getElementById("myAudioBell"); 
        bellAlarm.play();
    }
}

// INTERVAL
    function intervalAlertLaunch() {

        if(newVal === "0") {
            console.log("play bell interval");

            let bellInterval = document.getElementById("myIntervalAudioBell"); 
                
            // bellInterval.pause(); 
            bellInterval.play(); 
        }
        else if(newVal === "1") {
            console.log("play block interval");

            let blockInterval = document.getElementById("myIntervalAudioBlock"); 
                
            blockInterval.pause(); 
            blockInterval.play(); 
        }
        else if(newVal === "2") {
            console.log("play tone interval");

            let toneInterval = document.getElementById("myIntervalAudioTone"); 
                
            toneInterval.pause(); 
            toneInterval.play(); 
        }
        else {
            let bellAlarm = document.getElementById("myAudioBell"); 
            let bellInterval = document.getElementById("myIntervalAudioBell"); 

            bellInterval.play(); // this should be playing the interval alarm, not the regular alarm
        }
        
    console.log("play interval audio");

    }



module.exports = {alertLaunch, intervalAlertLaunch};
},{"./printToDom":9,"jquery":16}],9:[function(require,module,exports){
"use strict";
let $ = require("jquery");
let firebase = require("firebase/app");
let graphUserInfo = require("./graphData");
require("./fb-config");

let mainContainer = document.getElementById("mainContentDiv");
let timerButtons = document.getElementById("timer-buttons");


// insert function to get values of sliders and insert in the "value"  section below.

// This prints the main content to the screen on initial load.
function printMainScreen() {

    // timerButtons.innerHTML = ``;

    mainContainer.innerHTML = `    
    <form id="sliderData1">

        <div class="form-group" id="testing-width">
        <label for="duration-setting" class="slider-titles">Duration:</label>
        <input id="slider1" type="range" min="0" max="5" value="0"> 
        <span></span>
        <ul class="rangeSliderLabels">
            <li class="sliderListItemsDuration" id="fiveMinOption">5</li> 
            <li class="sliderListItemsDuration" id="tenMinOption">10</li> 
            <li class="sliderListItemsDuration" id="fifteenMinOption">15</li> 
            <li class="sliderListItemsDuration" id="twentyMinOption">20</li> 
            <li class="sliderListItemsDuration" id="twentyFiveMinOption">25</li> 
            <li class="sliderListItemsDuration" id="thirtyMinOption">30</li>
        </ul>
        </div>

    </form>
    
    <form id="sliderData2">

        <div class="form-group" id="testing-width">
          <label for="interval-setting" class="slider-titles">Interval:</label>
          <input id="slider2" type="range" min="0" max="5" value="0">
          <span></span>
          <ul class="rangeSliderLabels">
              <li class="sliderListItemsInterval" id="noneOption">None</li> 
              <li class="sliderListItemsInterval" id="oneOption">1</li> 
              <li class="sliderListItemsInterval" id="twoOption">2</li> 
              <li class="sliderListItemsInterval" id="threeOption">3</li> 
              <li class="sliderListItemsInterval" id="fourOption">4</li> 
              <li class="sliderListItemsInterval" id="fiveOption">5</li>
          </ul>
        </div>

      </form>
      
      
      
      <form id="sliderData3">

        <div class="form-group" id="testing-width">
          <label for="sound-setting" class="slider-titles">Sound:</label>
          <input id="slider3" type="range" min="0" max="2" value="0">
          <span></span>
          <ul class="rangeSliderLabels">
            <li class="sliderListItemsSound">Bell</li> 
            <li class="sliderListItemsSound">Blocks</li> 
            <li class="sliderListItemsSound">Tone</li> 
          </ul>
        </div>

      </form>
      

      
      
      <div class="text-center" id="sit-btn-container">
        <button type="button" class="btn btn-primary" id="sit-btn">Sit!</button>
      </div>`;

}

// function printButtonToPage() {

// }

function printTimerToPage() {
  console.log("are we getting to the print dunction");
  mainContainer.innerHTML = `<div id="countdownString">
                              <div class="values text-center" id="countdownTime"></div>
                            </div>`;
                            timerButtons.innerHTML = `<div class="text-center" id="sit-btn-container">
                                <button class="btn btn-primary" id="pause-btn">Pause</button>
                              </div><div class="text-center" id="sit-btn-container">
                                <button class="btn btn-primary" id="stop-btn">Stop</button>
                            </div>`;
}

function printResumeButtonToPage() {
  console.log("resume yet?");
  timerButtons.innerHTML = `<div class="text-center" id="sit-btn-container">
                                <button class="btn btn-primary" id="resume-btn">Resume</button>
                            </div><div class="text-center" id="sit-btn-container">
                            <button class="btn btn-primary" id="stop-btn">Stop</button>
                        </div>`;
           
}


function reprintTimerButtons() {
  timerButtons.innerHTML = `<div class="text-center" id="sit-btn-container">
  <button class="btn btn-primary" id="pause-btn">Pause</button>
</div><div class="text-center" id="sit-btn-container">
  <button class="btn btn-primary" id="stop-btn">Stop</button>
</div>`;
}

function printAudioHTMLToPage() {
  console.log("audio function");

  // mainContainer.innerHTML += `<audio id="myAudio">
  //                               <source src="audioFiles/gradualTone.mp3" type="audio/mpeg id="alertSource">
  //                               Your browser does not support the audio element.
  //                             </audio>`;

  // mainContainer.innerHTML += `<audio id="myIntervalAudio">
  //                               <source src="audioFiles/singleTone.mp3" type="audio/mpeg id="intervalSource">
  //                               Your browser does not support the audio element.
  //                             </audio>`;
}


function printHowToUse() {
  mainContainer.innerHTML = ``;
}


function printGraphData() {
  timerButtons.innerHTML = ``;
  mainContainer.innerHTML = ``;
  // mainContainer.innerHTML += `<canvas class="hide" id="myChart"></canvas>`;
  console.log("Am I hitting the printGraphData function?");

}

function printUserData(idNum, day, month, date, year, duration, key) {
  console.log("start printing user data");
  console.log('idNum',idNum);
  console.log('day',day);
  console.log('month',month);
  console.log('date',date);
  console.log('year',year);
  console.log('duration',duration);
  console.log('key',key);


  let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // mainContainer.innerHTML += `<div>${date} - ${duration} minutes</div>`;
  mainContainer.innerHTML += `<div class="user-progress">

                                <section class="user-progress-text">           
                                  <div class="minutes">${duration} minutes</div> <div class="dateOfSession">${weekday[day]} ${monthName[month]} ${date} ${year}</div>
                                </section>

                                <section class="delete-edit-btns">

                                  <button class="user-progress-deletes btn btn-primary" data-delete-id="${key}">
                                    <i class="far fa-times-circle"></i>
                                  </button>

                                  <button class="user-progress-edits btn btn-primary" data-edit-id="${key}" data-toggle="modal" data-target="#editModal" data-whatever="edit">
                                    <i class="far fa-edit"></i>
                                  </button>

                                </section> 

                              </div>`;
}

function printTrackerButtons() {
  mainContainer.innerHTML += `<div class='text-center'><button class='btn btn-primary' id='back-btn'>Back</button></div>`;
}




function refillLoginModal() {
  document.getElementById("loginModalBox").innerHTML = `<form>
  <div class="form-group">
    <label for="user-email" class="col-form-label">Email:</label>
    <input type="text" class="form-control" id="user-email">
  </div>
  <div class="form-group">
    <label for="user-password" class="col-form-label">Password:</label>
    <input class="form-control" id="user-password"></input>
  </div>
</form>`;

}


module.exports = {printMainScreen, printTimerToPage, printAudioHTMLToPage, printResumeButtonToPage, printHowToUse, printGraphData, printUserData, refillLoginModal, printTrackerButtons, reprintTimerButtons};
},{"./fb-config":3,"./graphData":4,"firebase/app":13,"jquery":16}],10:[function(require,module,exports){
"use strict";

let $ = require("jquery");
let firebase = require("firebase/app");
let fbInteractions = require("./interaction");
var Timer = require("easytimer");
let soundAlert = require("./playAudio");
require("./fb-config");
let durationValues = [5, 10, 15, 20, 25, 30];
let newDuration = 5;
let printIt = require("./printToDom");
let intervalDurationValues = [0, 1, 2, 3, 4, 5];
let newIntervalDuration = 0;
let intervalEnabled = false;
let activeTimer = null;
let activeIntervalTimer = null;
let activeSessionDuration = null;

$(document).on("change", "#slider1", () => {
    let newVal = $("#slider1").val();
    $("#slider1").attr("value", newVal);
    newDuration = durationValues[newVal];
});   

$(document).on("change", "#slider2", () => {
    let newVal = $("#slider2").val();
    $("#slider2").attr("value", newVal);
    newIntervalDuration = intervalDurationValues[newVal];
    intervalEnabled = newIntervalDuration > 0;

    if (!intervalEnabled) {
        stopIntervalTimer();
    } else if (activeTimer && !activeIntervalTimer) {
        startIntervalTimer();
    }
});  

function timerInitialize() {
    stopSession({ renderMainScreen: false });
    activeSessionDuration = newDuration;

    var timer = new Timer();
    activeTimer = timer;
    timer.start({countdown: true, startValues: {minutes: activeSessionDuration}});
    $("#countdownString .values").html(timer.getTimeValues().toString());

    timer.addEventListener("secondsUpdated", function () {
        $("#countdownString .values").html(timer.getTimeValues().toString());
    });

    timer.addEventListener("targetAchieved", function () {
        if (timer !== activeTimer) {
            return;
        }

        stopIntervalTimer();
        activeTimer = null;
        soundAlert.alertLaunch();
        logCompletedSession(activeSessionDuration);
    });

    if (intervalEnabled && newIntervalDuration > 0) {
        startIntervalTimer();
    }
}

function startIntervalTimer() {
    if (!intervalEnabled || newIntervalDuration <= 0) {
        return;
    }

    stopIntervalTimer();
    var intervalTimer = new Timer();
    activeIntervalTimer = intervalTimer;
    intervalTimer.start({countdown: true, startValues: {minutes: newIntervalDuration}});

    intervalTimer.addEventListener("targetAchieved", function () {
        if (intervalTimer !== activeIntervalTimer || !activeTimer || !intervalEnabled) {
            return;
        }

        soundAlert.intervalAlertLaunch();
        intervalTimer.start({countdown: true, startValues: {minutes: newIntervalDuration}});
    });
}

function stopIntervalTimer() {
    if (!activeIntervalTimer) {
        return;
    }

    activeIntervalTimer.stop();
    activeIntervalTimer = null;
}

function pauseActiveTimers() {
    if (activeTimer) {
        activeTimer.pause();
    }
    if (activeIntervalTimer) {
        activeIntervalTimer.pause();
    }
    stopAllAudio();
}

function resumeActiveTimers() {
    if (activeTimer) {
        activeTimer.start();
    }
    if (activeIntervalTimer && intervalEnabled) {
        activeIntervalTimer.start();
    }
}

function stopAllAudio() {
    let audioIds = [
        "myAudioBell",
        "myIntervalAudioBell",
        "myAudioBlock",
        "myIntervalAudioBlock",
        "myAudioTone",
        "myIntervalAudioTone"
    ];

    audioIds.forEach((audioId) => {
        let audioEl = document.getElementById(audioId);
        if (audioEl) {
            audioEl.pause();
            audioEl.currentTime = 0;
        }
    });
}

function stopSession(options) {
    let settings = options || {};

    if (activeTimer) {
        activeTimer.stop();
        activeTimer = null;
    }
    stopIntervalTimer();
    stopAllAudio();

    if (settings.renderMainScreen) {
        printIt.printMainScreen();
    }
}

function logCompletedSession(sessionDuration) {
    let firebaseUser = firebase.auth().currentUser;
    if (!firebaseUser) {
        return;
    }

    let progressToLog = {
        sessionDate: new Date(),
        sessionDuration: sessionDuration,
        user: firebaseUser.uid
    };

    fbInteractions.sendUserDurationAndDate(progressToLog);
}

$(document).on("click", "#pause-btn", function () {
    if (!activeTimer) {
        return;
    }
    printIt.printResumeButtonToPage();
    pauseActiveTimers();
});

$(document).on("click", "#resume-btn", function () {
    if (!activeTimer) {
        return;
    }
    printIt.reprintTimerButtons();
    resumeActiveTimers();
});

$(document).on("click", "#stop-btn", function () {
    stopSession({ renderMainScreen: true });
    $("#timer-buttons").hide();
});

$(document).on("click", "#menuProgress", function () {
    pauseActiveTimers();
});

module.exports = {timerInitialize, newDuration};

},{"./fb-config":3,"./interaction":5,"./playAudio":8,"./printToDom":9,"easytimer":12,"firebase/app":13,"jquery":16}],11:[function(require,module,exports){
"use strict";

let fbInteraction = require("./interaction");

//  Values for firebase here:
function makeUserObject(id, email, date, duration) {
  let userObject = {
    uid: id,
    userEmail: email,
    currentDate: date,
    sessionDuration: duration 
  };
    return userObject;
}


// function makeUserObject(id, email) {
//     let userObject = {
//       uid: id,
//       userEmail: email
//     };
//     return userObject;
// }


// let checkForUser = (uid) => {
//     fbInteraction.getFBdetails(uid)
//     .then((result) => {
//         console.log('result', result);
//         let data = Object.values(result);
//         console.log("result data:", data.length);
//         if (data.length === 0) {
//             console.log('need to create user');
//             console.log('creating profile for', uid);
//             fbInteraction.addUserFB(makeNewUser(uid)) //making new user in firebase. CURRENTLY UNDEFINED?
//             .then((result) => {
//                 console.log('new user added to firebase', result);
//                 document.location.replace('edit-profile.html');
//             });
//         } else {
//             console.log('user exists', data);
//             let key = Object.keys(result);
//             data[0].fbID = key[0];
//             setUserVars(data[0])
//             .then((resolve) => {
//                 console.log(resolve);
//             });
//         }
//     });
// };





// module.exports = {makeUserObject, checkForUser};
module.exports = {makeUserObject};
},{"./interaction":5}],12:[function(require,module,exports){
module.exports = window.easytimer && window.easytimer.Timer ? window.easytimer.Timer : window.Timer;

},{}],13:[function(require,module,exports){
module.exports = window.firebase;

},{}],14:[function(require,module,exports){
module.exports = {};

},{}],15:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"dup":14}],16:[function(require,module,exports){
module.exports = window.jQuery;

},{}]},{},[7]);
