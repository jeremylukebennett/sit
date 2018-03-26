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