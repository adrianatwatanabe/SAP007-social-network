import { createPost } from '../components/posts/template-view-post.js';
import { auth } from '../../../firebase-configuration/start-firebase.js';

export function createProfile() {
  const container = document.createElement('main');
  container.setAttribute('id', 'main-container');
  container.innerHTML = `
    <section class="container-internal">
      <header class="header-profile">
          <div class="user-photo-container-profile">
            <a class="user-link-photo  user-link-photo-profile">
              <img src="./img/icons/icon-photo.png" class="user-photo-profile" alt="Foto do perfil">
            </a>
            <a href="#user-profile-editing" class="button-icon-profile">
              <img src="../img/icons/icon-edit.png" class="icon-user-profile" alt="Editar perfil">
              <p class="post-icon-text">editar</p>
            </a>
          </div>
          <div class="user-information">
            <a>
              <p class="user-name">${auth.currentUser.displayName}</p>
            </a>
            <p class="language">${auth.currentUser.email}</p>
            <p class="work">Desenvolvedora Front-End</p>
            <textarea class="user-description-text" autocomplete="on" rows="1" cols="70" minlength="2" spellcheck="true" wrap="hard" readonly>texto</textarea>
          </div>
      </header>
    </section>
  `;

  const listPost = container.querySelector('.container-internal');
  listPost.append(createListPost());

  return container;
}
