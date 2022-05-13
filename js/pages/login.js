import { closeModalAutomatically, initModal } from '../components/general-site-components/modal.js';
import { validationMessage, resetEmailValidation } from '../components/authentications/login-and-registration-validation.js';
import { GoogleAuthProvider } from '../../firebase-configuration/export.js';
import { authUserLabFriends, authUserWithGoogle, forgotPassword } from '../../firebase-configuration/authentication.js';
import { errorsFirebase, errorsFirebaseModal } from '../components/authentications/errors-firebase.js';

const redirectedPage = '#feed';

export function createLogin() {
  const container = document.createElement('section');
  container.classList.add('container-login');
  container.innerHTML = `
      <section class="user-form">
        <img src="img/site/log-labfriends-black.png" id="logo" alt="Logo da LabFriends">

        <form class="user-form-login">
          <label for="user-email" class="user-label">Email</label>
          <input type="email" id="user-email-login" class="user-input" placeholder="Digite seu email">
          <label for="user-password" class="user-label">Senha</label>
          <input type="password" id="user-password-login" class="user-input input-password-spacing" placeholder="Digite sua senha">
          <a href="#" type="button" class="link small-text-right" data-email="open">
            Esqueceu a senha?
          </a>
          <p id="message"></p>
          <button type="submit" id="login-labfriends" class="user-button button-pink">
            ENTRAR
          </button>
        </form>

        <div class="line">
          <span class="text-line">ou</span>
        </div>
        <button id="login-google" class="user-button  button-green"> 
          <img class="icon-button" src="img/icons/icon-logo-google.ico">  
          ENTRAR COM GOOGLE
        </button>
        <p class="new-account" >
          Não tem conta?<br> <a href="#user-register" class="emphasis-pink">Crie uma conta agora!</a>
        </p>
      </section>

      <section class="modal-container-dark" data-email="container">
        <div class="modal">
          <button class="modal-close" data-email="close">X</button>
          <label for="user-email-reset" class="title-modal">Informe o seu email</label>
          <input type="email" id="user-email-reset" class="user-input-modal" placeholder="Digite seu email">
          <button type="submit" id="button-reset-password" class="user-button button-pink">
            ENVIAR POR EMAIL
          </button>
          <p id="message-reset"></p>
        </div>
      </section>
    `;

  return container;
}

export async function loginLabFriends(e) {
  e.preventDefault();
  const name = '';
  const email = document.querySelector('#user-email-login');
  const password = document.querySelector('#user-password-login');
  const passRepeat = '';
  const message = document.querySelector('#message');

  const validation = validationMessage(name, email.value, password.value, passRepeat);

  if (validation !== '') {
    message.innerHTML = validation;
  } else {
    await authUserLabFriends(email.value, password.value)
      .then(() => {
        window.location.hash = redirectedPage;
      })
      .catch((error) => {
        errorsFirebase(error.code);
      });
  }
}

async function resetPassword(e) {
  e.preventDefault();
  const email = document.querySelector('#user-email-reset');
  const messageReset = document.querySelector('#message-reset');
  const modalClose = document.querySelector('[data-email="close"]');
  const modalContainer = document.querySelector('[data-email="container"]');

  const validation = resetEmailValidation(email.value);

  if (validation !== '') {
    messageReset.innerHTML = validation;
  } else {
    await forgotPassword(email.value)
      .then(() => {
        messageReset.innerHTML = 'Email enviado com sucesso!';
        setTimeout(() => {
          email.value = '';
          messageReset.innerHTML = '';
          closeModalAutomatically(modalClose, modalContainer);
        }, 3000);
      })
      .catch((error) => {
        errorsFirebaseModal(error.code);
        setTimeout(() => {
          email.value = '';
          messageReset.innerHTML = '';
        }, 3000);
      });
  }
}

async function loginGoogle(e) {
  e.preventDefault();
  await authUserWithGoogle()
    .then(() => {
      window.location.hash = redirectedPage;
    })
    .catch((error) => {
      GoogleAuthProvider.credentialFromError(error);
    });
}

export function loginWorking() {
  const buttonLoginLabfriends = document.querySelector('#login-labfriends');
  const buttonLoginGoogle = document.querySelector('#login-google');
  const buttonResetPassword = document.querySelector('#button-reset-password');
  const modalOpen = document.querySelector('[data-email="open"');
  const modalClose = document.querySelector('[data-email="close"]');
  const modalContainer = document.querySelector('[data-email="container"]');

  buttonLoginLabfriends.addEventListener('click', loginLabFriends);
  buttonLoginGoogle.addEventListener('click', loginGoogle);
  buttonResetPassword.addEventListener('click', resetPassword);
  initModal(modalOpen, modalContainer, modalClose);
}
