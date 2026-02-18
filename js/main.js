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
