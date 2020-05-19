import * as firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
import "firebase/database";

export function doWrite(userId, name, email, imageUrl) {
  // Create references
  const dbRefObject = firebase.database().ref().child('object');
  const dbRefJournal = dbRefObject.child('journal');

  // Sync object changes
  dbRefObject.on('value', snap => console.log(snap));

  // Sync list changes when something is added
  dbRefJournal.on('child_added', snap => console.log(snap.val()));

  // Sync list changes when something is changed
  dbRefJournal.on('child_changed', snap => console.log(snap.val()));

  // Sync list changes when something is removed
  dbRefJournal.on('child_removed', snap => console.log(snap.val()));
}