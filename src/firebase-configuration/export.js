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
