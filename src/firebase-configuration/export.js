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
  getDoc,
  orderBy,
  query,
  deleteDoc,
  getDocs,
  updateDoc,
  doc,
  where,
  arrayUnion,
  arrayRemove, 
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js'; // eslint-disable-line

export {
  initializeApp 
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js'; // eslint-disable-line
