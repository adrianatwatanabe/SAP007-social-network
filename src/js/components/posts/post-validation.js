import { creationTextareaSize } from '../general-site-components/textarea-size.js';
import { createUserPost } from '../../../firebase-configuration/firestore.js';
import { closeModalAutomatically} from '../general-site-components/modal.js';

creationTextareaSize();

export function publishPost() {
  const postClose = document.querySelector('[data-post="close"]');
  const postContainer = document.querySelector('[data-post="container"]');
  const message = document.querySelector('#message-new-post');
  const addNewMessage = document.querySelector('#create-post');
  const newMessage = addNewMessage.value;
  if (newMessage === '') {
    message.innerHTML = 'Não é possível enviar um post vazio!';
  } else {
    createUserPost(newMessage)
      .then(()=>{
        closeModalAutomatically(postClose, postContainer, message);
      });
  }
  addNewMessage.value = '';
}
