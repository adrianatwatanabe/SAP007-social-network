import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from './export.js';
import { auth } from './start-firebase.js';

//Função de registrar novo usuário. ela autentica o usuário no FB e retorna (then) ...?
export function registerNewUser(name, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => updateProfile(auth.currentUser, { displayName: name }));
}
//Função de entrar na timeline. Valida o usuário pelo email e senha e retorna a entrada na timeline
export function authUserLabFriends(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
//Função de registrar novo usuário com o google. Valida no FB e  retorna o popap do google
export function authUserWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}
//Função de deslogar o usuário. Retorna ...?
export function logout() {
  return signOut(auth).then();
}
// Fun
export function forgotPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

export function authChange(cb) {
  return onAuthStateChanged(auth, (user) => {
    cb(user !== null);
  });
}
