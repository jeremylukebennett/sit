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
