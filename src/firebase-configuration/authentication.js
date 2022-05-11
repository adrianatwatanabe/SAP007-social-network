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

import { 
  auth 
} from './start-firebase.js';

//Função de registrar novo usuário. Ela autentica o usuário no FB e retorna uma função para guardar o nome;
export function registerNewUser(name, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => updateProfile(auth.currentUser, { displayName: name }));
}
//Função de entrar na timeline. Valida o usuário pelo email e senha e retorna a entrada na timeline;
export function authUserLabFriends(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
//Função de registrar novo usuário com o google. Valida no FB e  retorna o popap do google;
export function authUserWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}
//Função de deslogar o usuário. Retorna a função de sair;
export function logout() {
  return signOut(auth);
}
// Função de redefinir senha; 
export function forgotPassword(email) {
  return sendPasswordResetEmail(auth, email);
}
//Função que monitora quem está logado; ???????
export function authChange(cb) {
  return onAuthStateChanged(auth, (user) => {
    cb(user !== null);
  });
}
//3;
//tudo que é relarivo a página externa de logar na conta está aqui; 
