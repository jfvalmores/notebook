import * as firebase from 'firebase/app';
import 'firebase/auth';

export default class Auth {
  auth = firebase.auth();

  login(param, okFn, errFn) {
    const { email, password } = param;

    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(okFn)
      .catch(errFn);
  }

  logout(okFn, errFn) {
    this.auth
      .signOut()
      .then(okFn)
      .catch(errFn);
  }
}