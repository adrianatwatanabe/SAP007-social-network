import { registerNewUser } from '../../firebase-configuration/authentication.js';
import { validationMessage, errorsFirebase } from '../components/authentications/login-and-registration-validation.js';

const redirectedPage = '#feed';

export default function createRegister() {
  const container = document.createElement('section');
  container.classList.add('container-login');
  container.innerHTML = `
    <form class="user-form">
      <img src="img/site/log-labfriends-black.png" id="logo" alt="Logo da LabFriends">
      <label for="user-name" class="user-label">
        Nome Social
      </label>
      <input type="text" name="user-name" id="user-name" class="user-input" placeholder="Digite seu nome">
      <label for="user-email" class="user-label">
        Email
      </label>
      <input type="email" name="user-email" id="user-email" class="user-input" placeholder="Digite seu email">
      <label for="user-password" class="user-label">
        Senha
      </label>
      <input type="password" name="user-password" id="user-password" class="user-input" placeholder="Digite sua senha">
      <label for="user-password-repeat" class="user-label">
        Repita a Senha
      </label>
      <input type="password" name="user-password-repeat" id="user-password-repeat" class="user-input" placeholder="Digite sua senha novamente">
      <p id="message"></p>
      <input type="submit" value="CRIAR CONTA" id="new-login" class="user-button button-green">
      <a href="#login" class="link small-text-right">
        < Voltar para o Login
      </a>
    </form>
    `;

  const name = container.querySelector('#user-name');
  const email = container.querySelector('#user-email');
  const password = container.querySelector('#user-password');
  const passRepeat = container.querySelector('#user-password-repeat');
  const buttonNewUser = container.querySelector('#new-login');

  buttonNewUser.addEventListener('click', (e) => {
    e.preventDefault();
    const validation = validationMessage(name.value, email.value, password.value, passRepeat.value);
    if (validation !== '') {
      const message = container.querySelector('#message');
      message.innerHTML = validation;
    } else {
      registerNewUser(name.value, email.value, password.value)
        .then(() => {
          window.location.hash = redirectedPage;
        })
        .catch((error) => {
          const errorMessage = errorsFirebase(error.code);
          const message = container.querySelector('#message');
          message.innerHTML = errorMessage;
        });
    }
  });
  return container;
}
