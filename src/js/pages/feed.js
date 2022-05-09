import {
  createUserPost,
  viewPostsCollection,
  postIdUpdate,
  addLikeToPost,
  removeLikeToPost,
  deletePost,
} from '../../firebase-configuration/firestore.js';
import { doc, getDoc } from '../../firebase-configuration/export.js';
import { auth, db } from '../../firebase-configuration/start-firebase.js';
import { closeModalAutomatically } from '../components/general-site-components/modal.js';
import { createPost } from '../components/posts/template-view-post.js';
import { readingTextareaSize } from '../components/general-site-components/textarea-size.js';

export async function deleteUserPost(postId){
  const postRef = doc(db, 'posts', postId);
  const docSnap = await getDoc(postRef);
  const post = docSnap.data();
}

export async function addRemoveLikeToPost(postId) {
  const postRef = doc(db, 'posts', postId);
  const docSnap = await getDoc(postRef);
  const post = docSnap.data();
  const likeUserId = post.like.includes(auth.currentUser.uid);

  const numberLikes = document.querySelector(`[data-like-number="${postId}"]`);
  const textLike = document.querySelector(`[data-like-text="${postId}"]`);
  const buttonLike = document.querySelector(`[data-image-like="${postId}"]`);

  if (!likeUserId) {
    addLikeToPost(postId)
      .then(() => {
        let viewLikes = Number(numberLikes.innerHTML) + 1;
        numberLikes.innerHTML = viewLikes;        
        buttonLike.classList.add('liked');
        if (viewLikes === 1) textLike.innerHTML = 'curtida';
        else textLike.innerHTML = 'curtidas';
    });
  } else {
    removeLikeToPost(postId)
      .then(() => {
        let viewLikes = Number(numberLikes.innerHTML) - 1;
        numberLikes.innerHTML = viewLikes;
        buttonLike.classList.remove('liked');
        if (viewLikes === 1) textLike.innerHTML = 'curtida';
        else textLike.innerHTML = 'curtidas';
    });
  }
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

  const buttonLike = document.querySelectorAll('.button-like');
  buttonLike.forEach((post) => {
    post.addEventListener('click', () => {
      const postId = post.getAttribute('data-like-button');
      addRemoveLikeToPost(postId);
    });
  });

  const buttonDelete = document.querySelectorAll('.button-like');
  buttonDelete.forEach((post) => {
    post.addEventListener('click', () => {
      const postId = post.getAttribute('data-post-delete');
      deleteUserPost(postId);
    });
  });
}

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

export function publishPost() {
  const postClose = document.querySelector('[data-post="close"]');
  const postContainer = document.querySelector('[data-post="container"]');
  const message = document.querySelector('#message-new-post');
  const addNewMessage = document.querySelector('#create-post');
  let newMessage = addNewMessage.value;

  let validatedText = newMessage.match(/[\wÀ-ú]/g); //somente caracteres
  let validatedTextTab = newMessage.match(/[\wÀ-ú]+\n{3}/g); //caracter com uma quebra de linha
  let validatedTabText = newMessage.match(/\n+[\wÀ-ú]/g);

  if (newMessage === '') {
    message.innerHTML = 'Não é possível enviar um post vazio!';
    setTimeout(() => {
      message.innerHTML = '';
    }, 3000);
    addNewMessage.value = '';
  } else if (validatedText || validatedTextTab || validatedTabText) {
    createUserPost(newMessage).then((docRef) => {
      closeModalAutomatically(postClose, postContainer);
      const listPost = document.querySelector('.list-posts');
      listPost.innerHTML = '';
      postIdUpdate(docRef.id);
      showAllPosts();
      const initialSizeTextarea = document.getElementById('create-post');
      initialSizeTextarea.setAttribute('style', 'height: 80px;');
    });
    addNewMessage.value = '';
  } else {
    message.innerHTML = 'Não é possível enviar um post vazio!';
    setTimeout(() => {
      message.innerHTML = '';
    }, 3000);
    addNewMessage.value = '';
  }
}
