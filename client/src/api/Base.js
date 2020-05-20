import * as firebase from "firebase/app";
import "firebase/database";

export default class Base {
  dbRef = firebase.database();
  dbName = '';

  create(data) {
    this.dbRef
      .ref(this.dbName)
      .push()
      .set(data);
  }

  update(id, data) {
    this.dbRef
      .ref(`${this.dbName}/${id}`)
      .set(data);
  }

  remove(id) {
    this.dbRef
      .ref(`${this.dbName}/${id}`)
      .remove();
  }

  view(fn) {
    this.dbRef
      .ref(this.dbName)
      .on('value', snap => {
        if (fn) fn(snap.val());
      })
  }
}