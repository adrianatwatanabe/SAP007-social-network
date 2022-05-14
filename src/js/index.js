import { authChange } from '../firebase-configuration/authentication.js';
import createLogin from './pages/login.js';
import createRegister from './pages/user-register.js';
import { createFeed } from './pages/feed.js';
import { createProfile } from './pages/user-profile.js';
import { error404 } from './pages/error404.js';
import { creatingInternalElements } from './components/header/start-header.js';

function redirectPages() {
  const container = document.getElementById('root');
  container.innerHTML = '';
  authChange((logged) => {
    if (logged) {
      const header = creatingInternalElements();
      switch (window.location.hash) {
        case '#friends-list':
          header.after(error404());
          break;
        case '#user-profile':
          header.after(createProfile());
          break;
        case '#user-profile-editing':
          header.after(error404());
          break;
        case '#feed':
        default:
          header.after(createFeed());
      }
    } else {
      const background = document.querySelector('#root');
      background.style.backgroundImage = 'url(img/site/background.gif)';
      switch (window.location.hash) {
        case '#user-register':
          container.append(createRegister());
          break;
        case '#login':
        default:
          window.location.hash = '';
          container.append(createLogin());
      }
    }
  });
}

window.addEventListener('load', () => {
  redirectPages();
  window.addEventListener('hashchange', redirectPages);
});
