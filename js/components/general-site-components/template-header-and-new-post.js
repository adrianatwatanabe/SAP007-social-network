import { createNewPost } from '../posts/template-new-post.js';
import { auth } from '../../../firebase-configuration/start-firebase.js';

export function createHeader() {
  const header = `
      <header id="header">
        <section class="menu-header">
          <h1 class="container-logo">
          </h1>
          <nav class="menu">
            <ul>
              <li class="menu-list">
                <a href="#friends-list">
                  <img src="img/icons/icon-frinds-list.png" class="menu-icon" alt="Ícone de lista de amigas">
                  <p class="menu-text">Amigas</p>
                </a>
              </li>
              <li class="menu-list">
                <a href="#feed">
                  <img src="img/icons/icon-feed.png" class="menu-icon" alt="Ícone de início">
                  <p class="menu-text">Feed</p>
                </a>
              </li>
              <li class="menu-list">
                <a href="/#" id="openPost" class="modal-open" data-post="open">
                  <img src="img/icons/icon-add.png" class="menu-icon" alt="Ícone de nova mensagem">
                  <p class="menu-text">Novo Post</p>
                </a>
              </li>
              <li id="dropdown-open" class="menu-list">
                <a href="/#" data-menu="open">
                  <img src="img/icons/icon-profile.png" class="menu-icon" alt="Ícone do meu perfil">
                  <p class="menu-text">Meu Perfil</p>
                </a>

                <section data-menu="container">
                  <div class="modal-dropdown">
                    <button class="modal-dropdown-close" data-menu="close"></button>
                    <div class="container-dropdown">
                      <ul class="dropdown-ul">
                        <li>
                          <a href="#user-profile" class="dropdown-link-icon">
                            <img src="img/icons/icon-profile.png" class="drop-icon" alt="Ícone do meu perfil">
                            <div class="drop-text">
                              <p class="menu-name-user">${auth.currentUser.displayName}</p>
                              <p class="menu-text-small">Veja seu perfil</p>
                            </div>
                          </a>
                        </li>
                        <li class="dropdown-link-icon">
                          <button id="button-logout" class="user-button button-pink">
                            SAIR
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
                
              </li>
            </ul>
          </nav>
        </section>

        ${createNewPost()}

      </header>
    `;

  return header;
}
