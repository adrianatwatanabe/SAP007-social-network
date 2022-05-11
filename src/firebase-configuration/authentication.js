import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  getAuth,
} from './export.js';
import { auth } from './start-firebase.js';

export function registerNewUser(name, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => updateProfile(auth.currentUser, { displayName: name }));
}

export function authUserLabFriends(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function authUserWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
}

export function logout() {
  return signOut(auth).then();
}

export function forgotPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

export function authChange(cb) {
  return onAuthStateChanged(auth, (user) => {
    cb(user !== null);
  });
}

export function singleUser() {
  const userInformation = [];
  const user = auth.currentUser;
  if (user !== null) {
    user.providerData.forEach((profile) => {
      userInformation.push(profile);
    });
  }
  return userInformation;
}
