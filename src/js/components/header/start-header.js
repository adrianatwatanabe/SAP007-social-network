import createHeader from './template-header.js';
import createNewPost from '../posts/template-new-post.js';
import { initModal, initModalMenuDropdown } from '../general-site-components/modal.js';
import { newPostValidation } from '../posts/post-validation.js';

export function creatingInternalElements() {
  const container = document.getElementById('root');
  const sectionGeneral = document.createElement('section');
  container.style.backgroundImage = 'none';
  sectionGeneral.classList.add('container-labfriends');

  const header = document.createElement('header');
  header.setAttribute('id', 'header');
  header.prepend(createHeader());
  header.append(createNewPost());
  sectionGeneral.append(header);
  container.append(sectionGeneral);

  const postOpen = container.querySelector('[data-post="open"]');
  const postClose = container.querySelector('[data-post="close"]');
  const postContainer = container.querySelector('[data-post="container"]');
  const menuOpen = container.querySelector('[data-menu="open"]');
  const menuClose = container.querySelector('[data-menu="close"]');
  const menuContainer = container.querySelector('[data-menu="container"]');
  const closeMenu = container.querySelector('.modal-dropdown');

  const hashFriends = header.querySelector('#friends-list');
  const hashFeed = header.querySelector('#feed');
  const hashProfile = header.querySelector('#dropdown-open');

  switch (window.location.hash) {
    case '#friends-list':
      hashFriends.style.background = '#56f894';
      break;
    case '#user-profile':
      hashProfile.style.background = '#56f894';
      break;
    case '#feed':
    default:
      hashFeed.style.background = '#56f894';
  }

  postOpen.addEventListener('click', () => {
    initModal(postOpen, postContainer, postClose);
  });
  postOpen.addEventListener('touchstart', () => {
    initModal(postOpen, postContainer, postClose);
  });
  menuOpen.addEventListener('click', () => {
    initModalMenuDropdown(menuOpen, menuContainer, menuClose, closeMenu);
  });
  menuOpen.addEventListener('touchstart', () => {
    initModalMenuDropdown(menuOpen, menuContainer, menuClose, closeMenu);
  });

  const buttonPublish = header.querySelector('#button-publish');
  buttonPublish.addEventListener('click', newPostValidation);

  const headerGeneral = container.querySelector('header');
  return headerGeneral;
}
