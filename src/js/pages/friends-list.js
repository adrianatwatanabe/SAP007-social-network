import { singleUser } from '../../firebase-configuration/authentication.js';
import { auth } from '../../firebase-configuration/start-firebase.js';

function createUserFriends(user) {
  const templateUser = `
    <a class="user-link-photo user-link-photo-card">
      <img src="img/icons/icon-profile.png" class="user-photo-post" alt="Foto do perfil">
    </a>
    <div>
      <a>
        <p class="user-name user-friend-name">${user.displayName}</p>
      </a>
      <p class="language">${user.email}</p>
      <p class="work">Desenvolvedora Front-End</p>
    </div>
  `;
  return templateUser;
}

async function viewAllUsers() {
  const userCollection = await singleUser();
  const listPost = document.querySelector('.container-internal-list');
  listPost.innerHTML = '';
  userCollection.forEach((users) => {
    const list = document.createElement('li');
    list.setAttribute('class', 'friend-card');
    list.innerHTML = createUserFriends(users);
    listPost.append(list);
  });
  const infoUser = singleUser();
    console.log(infoUser);
}

export function createFriends() {
  const container = document.createElement('main');
  container.setAttribute('id', 'main-container');
  container.innerHTML = `
    <section class="container-internal">
      <input type="search" id="search-name" class="search-input" placeholder="Pesquisar pelo nome" required>
      <ul class="container-internal-list">
      </ul>
    </section>
    `;
  viewAllUsers();
  return container;
}
