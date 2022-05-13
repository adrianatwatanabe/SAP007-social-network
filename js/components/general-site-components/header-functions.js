import { initModal, initModalMenuDropdown } from './modal.js';
import { logout } from '../../../firebase-configuration/authentication.js';
import { newPostValidation } from '../posts/post-validation.js';

export function headerWorking() {
  const postOpen = document.querySelector('[data-post="open"]');
  const postClose = document.querySelector('[data-post="close"]');
  const postContainer = document.querySelector('[data-post="container"]');
  const menuOpen = document.querySelector('[data-menu="open"]');
  const menuClose = document.querySelector('[data-menu="close"]');
  const menuContainer = document.querySelector('[data-menu="container"]');
  const closeMenu = document.querySelector('.modal-dropdown');

  postOpen.addEventListener('focus', () => {
    initModal(postOpen, postContainer, postClose);
  });
  postOpen.addEventListener('touchstart', () => {
    initModal(postOpen, postContainer, postClose);
  });
  menuOpen.addEventListener('focus', () => {
    initModalMenuDropdown(menuOpen, menuContainer, menuClose, closeMenu);
  });
  menuOpen.addEventListener('touchstart', () => {
    initModalMenuDropdown(menuOpen, menuContainer, menuClose, closeMenu);
  });

  document.querySelector('#button-logout').addEventListener('click', () => {
    logout().then(() => {
      window.location.hash = '#login';
    });
  });

  const buttonPublish = document.querySelector('#button-publish');
  buttonPublish.addEventListener('click', newPostValidation);
}
