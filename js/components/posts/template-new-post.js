import { onInputTextarea } from '../general-site-components/textarea-size.js';
import { auth } from '../../../firebase-configuration/start-firebase.js';

export default function createNewPost() {
  const container = document.createElement('section');
  container.setAttribute('class', 'modal-container-light');
  container.setAttribute('data-post', 'container');
  container.innerHTML = `
      <div class="modal-add-post">
        <button class="modal-close" data-post="close">X</button>
        <form id="new-post" class="container-add-post">
          <header class="modal-header">
            <a href="/#" class="user-link-photo-modal">
              <img src="img/icons/icon-profile.png" class="user-photo-post-modal" alt="Foto do perfil">
            </a>
            <div class="modal-post-user">
              <a href="/#">
                <p class="user-name">${auth.currentUser.displayName}</p>
              </a>
              <time class="post-date">${new Date().toLocaleString('pt-br')}</time>
            </div>
          </header>
          <textarea id="create-post" class="add-post-input" autocomplete="on" rows="1" minlength="2" spellcheck="true" wrap="hard" placeholder="Escreva uma mensagem..." autofocus="true"></textarea>
          <footer class="modal-footer">
            <label class="add-post-footer">
              <img src="img/icons/icon-add-image.png" class="post-icon" alt="Ícone de adicionar imagens">
              <input type="file" id="file-upload-image" accept="image/png, image/jpeg, image/jpg">
              <p class="post-icon-text">adicionar imagem</p>
            </label>
          </footer>
        </form>
        <p id="message-new-post"></p>
        <input id="button-publish" form="new-post" class="user-button button-pink button-add-post" type="submit" value="PUBLICAR"/>
      </div>
    `;

  const initialSizeTextarea = container.querySelector('#create-post');
  initialSizeTextarea.setAttribute('style', 'height: 80px;');
  initialSizeTextarea.addEventListener('input', onInputTextarea);
  return container;
}
