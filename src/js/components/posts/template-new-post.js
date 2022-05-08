import { auth } from '../../../firebase-configuration/start-firebase.js';

export function createNewPost() {
  let now = new Date;
  let monthName = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

  const template = `
    <section class="modal-container-light" data-post="container">
      <div class="modal-add-post">
        <button class="modal-close" data-post="close">X</button>
        <section class="container-add-post">
          <header class="modal-header">
            <a href="/#" class="user-link-photo-modal">
              <img src="../img/icons/icon-profile.png" class="user-photo-post-modal" alt="Foto do perfil">
            </a>
            <div class="modal-post-user">
              <a href="/#">
                <p class="user-name">${auth.currentUser.displayName}</p>
              </a>
              <time class="post-date">${now.getDate()} de ${monthName [now.getMonth()]} de ${now.getFullYear()}</time>
            </div>
          </header>
          <textarea id="create-post" class="add-post-input" autocomplete="on" rows="1" minlength="2" spellcheck="true" wrap="hard" placeholder="Escreva uma mensagem..."></textarea>
          <footer>
            <label class="add-post-footer">
              <img src="../img/icons/icon-add-image.png" class="post-icon" alt="Ícone de adicionar imagens">
              <input type="file" id="file-upload-image" accept="image/png, image/jpeg, image/jpg">
              <p class="post-icon-text">adicionar imagem</p>
            </label>
          </footer>
        </section>
        <p id="message-new-post"></p>
        <input id="button-publish" class="user-button button-pink button-add-post" type="button" value="PUBLICAR"/>
      </div>
    </section>
    `;
  return template;
}
