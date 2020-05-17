// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const initialize = () => {
  var firebaseConfig = {
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    authDomain: `${process.env.REACT_APP_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${process.env.REACT_APP_DB_NAME}.firebaseio.com`
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Get a reference to the database service
  var database = firebase.database();
}

export {
  initialize
};