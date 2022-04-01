import { newUserWithEmailAndPassword, nerwUserWithGoogle } from "../../produtosFirebase/authentication.js";
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
  <input type="submit" class="submit" value="Send Request"> <br>
  <button class="google-register" id="google-register"> Register with Google<img src="./img/icone/cons8-google-logo-48.ico"></button>
  `
  return form;
};


// innerHTML = transforma texto em elementos;
// appendChild = recebe elementos e coloca em tags
