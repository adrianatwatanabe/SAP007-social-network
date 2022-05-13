export {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js'; // eslint-disable-line

export {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  query,
  getDocs,
  orderBy,
  getDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  where,
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js'; // eslint-disable-line

export {
  initializeApp,
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js'; // eslint-disable-line
