import * as firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
import "firebase/database";

export function doRead() {
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

export function doPush() {
  const messagesRef = firebase.database().ref('messages');
  const newMessageRef = messagesRef.push();
  newMessageRef.set({
    title: 'Greetings from the Under World',
    message: 'Hi we come in peace too!',
    sender: 'Reptilians',
  });
}

export function doUpdate(key) {
  const id = '-111';
  const messagesRef = firebase.database().ref(`messages/${id}`);
  messagesRef.set({
    title: 'press aaaf',
    message: '123',
    sender: 'asd',
  })
}

export function doRemove() {
  const id = '-M7lkvpmtoBA1KsgJxET';
  firebase.database().ref(`messages/${id}`).remove();
}