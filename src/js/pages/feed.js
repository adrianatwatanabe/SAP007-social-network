import { createUserPost, viewPostsCollection} from '../../../firebase-configuration/firestore.js';
import { closeModalAutomatically} from '../components/general-site-components/modal.js';
import { createPost } from '../components/posts/template-view-post.js';
import { readingTextareaSize } from '../components/general-site-components/textarea-size.js';

export function createFeed() {
  const container = document.createElement('main');
  container.setAttribute('id', 'main-container');
  container.setAttribute('class', 'scroll');
  container.innerHTML = `
    <ul class="list-posts">
    </ul>
  `;
  showAllPosts();
  return container;
}

export async function showAllPosts() {
  const postsCollection = await viewPostsCollection();
  postsCollection.forEach((post) => {
    const listPost = document.querySelector('.list-posts');
    const list = document.createElement('li');
    list.setAttribute('class', 'post-card');
    list.innerHTML = createPost(post);
    listPost.append(list);
    readingTextareaSize();
  });
}

export function publishPost() {
  const postClose = document.querySelector('[data-post="close"]');
  const postContainer = document.querySelector('[data-post="container"]');
  const message = document.querySelector('#message-new-post');
  const addNewMessage = document.querySelector('#create-post');
  const newMessage = addNewMessage.value;
  if (newMessage === '') {
    message.innerHTML = 'Não é possível enviar um post vazio!';
    setTimeout(()=>{
      message.innerHTML = '';
    }, 3000);
  } else {
    createUserPost(newMessage)
      .then(()=>{
        closeModalAutomatically(postClose, postContainer);
        showAllPosts();
        const initialSizeTextarea = document.getElementById('create-post');
        initialSizeTextarea.setAttribute('style', 'height: 80px;');
      });
  }
  addNewMessage.value = '';
}