import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
<<<<<<< HEAD:src/produtosFirebase/config-firebase.js
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
=======

//Inicialização do Firebase
>>>>>>> d746d3fc95baf438617111d5a6ca549d5a0fb395:src/connection-firebase/start-firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyCNu5tg68pS65UVJ6vaUjYgYonYzfYvR7w",
  authDomain: "laboratoriafriends.firebaseapp.com",
  projectId: "laboratoriafriends",
  storageBucket: "laboratoriafriends.appspot.com",
  messagingSenderId: "1048862460473",
  appId: "1:1048862460473:web:7a932ebb5a4a76eccc9be8"
};

<<<<<<< HEAD:src/produtosFirebase/config-firebase.js
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider(app);
=======
const app = initializeApp(firebaseConfig);
>>>>>>> d746d3fc95baf438617111d5a6ca549d5a0fb395:src/connection-firebase/start-firebase.js
