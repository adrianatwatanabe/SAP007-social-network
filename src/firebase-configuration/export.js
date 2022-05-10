export {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js'; // eslint-disable-line

export { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc,  
  query 
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js'; // eslint-disable-line

export { 
  initializeApp 
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js'; // eslint-disable-line

//1;
// O FB é instalado e as função são trazidas pelo link para essa pasta. Daqui elas são esportadas para serem usadas em outros lugares;
