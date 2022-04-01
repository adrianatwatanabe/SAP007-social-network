import { newUserWithEmailAndPassword, nerwUserWithGoogle } from "../../produtosFirebase/authentication.js";


export const banana = 

form.addEventListener("submit", (e) => { // e = comportamento padrão daquele evento ou o evento que eu estabelecer como padrão 
    e.preventDefault(); // previnir que o comportamento padrão
    const email = form.querySelector("#email-register").value;
    const password = form.querySelector("#password-register").value;
    newUserWithEmailAndPassword(email, password);
    console.log("email e senha");
  })
  form.button.addEventListener("click", () => {
    nerwUserWithGoogle(auth, provider);
  })