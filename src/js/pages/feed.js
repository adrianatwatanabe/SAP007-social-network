import {
  createUserPost,
  viewPostsCollection,
  addLikeToPost,
  removeLikeToPost,
  deletePost,
  getSinglePost,
  postIdUpdate,
} from '../../firebase-configuration/firestore.js';
import { auth } from '../../firebase-configuration/start-firebase.js';
import { closeModalAutomatically } from '../components/general-site-components/modal.js';
import { createPost } from '../components/posts/template-view-post.js';
import { readingTextareaSize } from '../components/general-site-components/textarea-size.js';

export async function deleteUserPost(postId) {
  const post = await getSinglePost(postId);
  const listPost = document.querySelector('.list-posts');
  const postUserId = post.userId;
  const userId = auth.currentUser.uid;
  if (postUserId === userId) {
    await deletePost(postId).then(() => {
      listPost.innerHTML = '';
      viewAllPosts();
    });
  }
}

export async function addRemoveLikeToPost(postId) {
  const post = await getSinglePost(postId);
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

export function newPostValidation() {
  const message = document.querySelector('#message-new-post');
  const addNewMessage = document.querySelector('#create-post');
  let newMessage = addNewMessage.value;
  let validatedText = newMessage.match(/[\wÀ-ú]/g);
  let validatedTextTab = newMessage.match(/[\wÀ-ú]+\n{3}/g);
  let validatedTabText = newMessage.match(/\n+[\wÀ-ú]/g);
  if (newMessage === '') {
    message.innerHTML = 'Não é possível enviar um post vazio!';
    setTimeout(() => {
      message.innerHTML = '';
    }, 3000);
    addNewMessage.value = '';
  } else if (validatedText || validatedTextTab || validatedTabText) {
    createNewPost(newMessage);
    addNewMessage.value = '';
  } else {
    message.innerHTML = 'Não é possível enviar um post vazio!';
    setTimeout(() => {
      message.innerHTML = '';
    }, 3000);
    addNewMessage.value = '';
  }
}

export async function createNewPost(newMessage) {
  const postClose = document.querySelector('[data-post="close"]');
  const postContainer = document.querySelector('[data-post="container"]');
  const initialSizeTextarea = document.getElementById('create-post');
  const listPost = document.querySelector('.list-posts');
  await createUserPost(newMessage)
    .then((docRef) => {
      postIdUpdate(docRef.id);
      getSinglePost(docRef.id);
      closeModalAutomatically(postClose, postContainer);
      initialSizeTextarea.setAttribute('style', 'height: 80px;');
      listPost.innerHTML = '';
      viewAllPosts();
    });
}

export async function viewAllPosts() {
  const postsCollection = await viewPostsCollection();
  postsCollection.forEach((post) => {
    const listPost = document.querySelector('.list-posts');
    const list = document.createElement('li');
    list.setAttribute('class', 'post-card');
    list.innerHTML = createPost(post);
    listPost.append(list);
    readingTextareaSize();
    if (auth.currentUser.uid === post.userId){
      const buttonDelete = document.querySelector(`[data-post-delete="${post.postId}"]`);
      buttonDelete.style.display = 'flex';
      buttonDelete.addEventListener('click', () => {
        deleteUserPost(post.postId);
      });
    }
  });
  const buttonLike = document.querySelectorAll('.button-like');
  buttonLike.forEach((post) => {
    post.addEventListener('click', () => {
      const postId = post.getAttribute('data-like-button');
      addRemoveLikeToPost(postId);
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
  viewAllPosts();
  return container;
}
