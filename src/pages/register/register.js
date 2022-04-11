import { newUserWithEmailAndPassword, nerwUserWithGoogle } from "../../produtosFirebase/authentication.js";
import { auth, provider } from "../../produtosFirebase/config-firebase.js";
export default () => {
  const form = document.createElement("form"); // disponivel em qualquer JS
  //adicionar atributos no elemento criado => 
  form.setAttribute("id", "form-register");
  form.innerHTML = `
  <img src="" alt="">
  <label for="email-register">
    <input type="email" class="email-register" id="email-register" required placeholder="exemple@domain.com"> Email
  </label>
  <label for="password-register">
    <input type="password" class="password-register" id="password-register" required placeholder="******"> Password
  </label>
  <input type="submit" id="submit-register">
  <a href="link de esqueceu a senha">Forgot password?</a>
  <a href="link do login já existente">Don't have an account? Create one now!</a>
  <input type="submit" class="submit" value="Send Request">
  <button class="google-register" id="google-register" > Register with Google<img src="./img/icone/cons8-google-logo-48.ico"></button>
    `;

  form.addEventListener("submit", (e) => { // e = comportamento padrão daquele evento ou o evento que eu estabelecer como padrão 
    e.preventDefault(); // previnir que o comportamento padrão
    const email = form.querySelector("#email-register").value;
    const password = form.querySelector("#password-register").value;
    newUserWithEmailAndPassword(email, password)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    
  })
  form.querySelector("#google-register").addEventListener("click", () => {
    nerwUserWithGoogle (auth, provider);
  })

  return form;
};


// innerHTML = transforma texto em elementos;
// appendChild = recebe elementos e coloca em tags
