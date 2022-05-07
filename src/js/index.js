import { createLogin, loginWorking } from './pages/login.js';
import { createRegister } from './pages/user-register.js';
import { createHeader, headerWorking } from './components/posts/header-and-new-post.js';
import { creationTextareaSize } from './components/general-site-components/textarea-size.js';
import { createFeed } from './pages/feed.js';
import { createFriends } from './pages/friends-list.js';
import { createProfile } from './pages/user-profile.js';
import { createEditProfile } from './pages/user-profile-editing.js';
import { authChange } from '../firebase-configuration/authentication.js';

function creatingInternalElements() {
  const container = document.getElementById('root');
  const sectionGeneral = document.createElement('section');
  container.style.backgroundImage = 'none';
  sectionGeneral.classList.add('container-labfriends');
  sectionGeneral.innerHTML = createHeader();
  container.append(sectionGeneral);

  headerWorking();  
  creationTextareaSize();

  const headerGeneral = document.querySelector('header');
  return headerGeneral;
}

function redirectPages() {
  const container = document.getElementById('root');
  container.innerHTML = '';
  authChange((logged) => {
    if (logged) {
      const header = creatingInternalElements();
      switch (window.location.hash) {
        case '#friends-list':
          header.after(createFriends());
          break;
        case '#user-profile':
          header.after(createProfile());
          break;
        case '#user-profile-editing':
          header.after(createEditProfile());
          break;
        case '#feed':
        default:
          header.after(createFeed());
          break;
      }
    } else {
      const background = document.querySelector('#root');
      background.style.backgroundImage = 'url(../../img/background.gif)';
      switch (window.location.hash) {
        case '#user-register':
          container.append(createRegister());
          break;
        case '#login':
        default:
          window.location.hash = '';
          container.append(createLogin());
          loginWorking();
          break;
      }
    }
  });
}

window.addEventListener('load', () => {
  redirectPages();
  window.addEventListener('hashchange', redirectPages);
});
