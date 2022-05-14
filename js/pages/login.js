import { closeModalAutomatically, initModal } from '../components/general-site-components/modal.js';
import { validatedMessage, validatedEmailReset, errorsFirebase } from '../components/authentications/login-and-registration-validation.js';
import { GoogleAuthProvider } from '../../firebase-configuration/export.js';
import { authUserLabFriends, authUserWithGoogle, forgotPassword } from '../../firebase-configuration/authentication.js';

const redirectedPage = '#feed';

export default function createLogin() {
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

  const modalOpen = container.querySelector('[data-email="open"');
  const modalClose = container.querySelector('[data-email="close"]');
  const modalContainer = container.querySelector('[data-email="container"]');

  const buttonLoginLabfriends = container.querySelector('#login-labfriends');
  const buttonLoginGoogle = container.querySelector('#login-google');
  const buttonResetPassword = container.querySelector('#button-reset-password');

  const name = '';
  const email = container.querySelector('#user-email-login');
  const emailReset = container.querySelector('#user-email-reset');
  const password = container.querySelector('#user-password-login');
  const passRepeat = '';
  const message = container.querySelector('#message');

  buttonLoginLabfriends.addEventListener('click', (e) => {
    e.preventDefault();
    const validation = validatedMessage(name, email.value, password.value, passRepeat);
    if (validation !== '') {
      message.innerHTML = validation;
    } else {
      authUserLabFriends(email.value, password.value)
        .then(() => {
          window.location.hash = redirectedPage;
        })
        .catch((error) => {
          errorsFirebase(error.code);
        });
    }
  });

  buttonLoginGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    authUserWithGoogle()
      .then(() => {
        window.location.hash = redirectedPage;
      })
      .catch((error) => {
        const errorMessage = error.message;
        return errorMessage;
      });
  });

  initModal(modalOpen, modalContainer, modalClose);

  buttonResetPassword.addEventListener('click', (e) => {
    e.preventDefault();
    const messageReset = container.querySelector('#message-reset');
    const validation = validatedEmailReset(emailReset.value);

    if (validation !== '') {
      messageReset.innerHTML = validation;
    } else {
      forgotPassword(emailReset.value)
        .then(() => {
          messageReset.innerHTML = 'Email enviado com sucesso!';
          setTimeout(() => {
            emailReset.value = '';
            messageReset.innerHTML = '';
            closeModalAutomatically(modalClose, modalContainer);
          }, 3000);
        })
        .catch((error) => {
          errorsFirebase(error.code);
          setTimeout(() => {
            emailReset.value = '';
            messageReset.innerHTML = '';
          }, 3000);
        });
    }
  });

  return container;
}
