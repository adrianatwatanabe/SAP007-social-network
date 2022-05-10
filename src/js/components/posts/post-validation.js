import {
  createUserPost,
  viewPostsCollection,
  addLikeToPost,
  removeLikeToPost,
  deletePost,
  getSinglePost,
  postIdUpdate,
} from '../../../firebase-configuration/firestore.js';
import { auth } from '../../../firebase-configuration/start-firebase.js';
import { closeModalAutomatically, openModal, closeModal } from '../general-site-components/modal.js';
import { createPost } from './template-view-post.js';
import { readingTextareaSize } from '../general-site-components/textarea-size.js';

export async function deleteUserPost(postId) {
  const post = await getSinglePost(postId);
  const postUserId = post.userId;
  const userId = auth.currentUser.uid;
  if (postUserId === userId) {
    await deletePost(postId).then(() => {
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
    return;
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
  const listPost = document.querySelector('.list-posts');
  listPost.innerHTML = '';
  postsCollection.forEach((post) => {    
    const list = document.createElement('li');
    list.setAttribute('class', 'post-card');
    list.innerHTML = createPost(post);
    listPost.append(list);
    readingTextareaSize();
    if (auth.currentUser.uid === post.userId){
      const buttonDelete = document.querySelector(`[data-post-delete="${post.postId}"]`);
      const buttonEdit = document.querySelector(`[data-post-edit="${post.postId}"]`);
      const yesDelete = document.querySelector(`[data-post-confirm-yes="${post.postId}"]`);
      const noDelete = document.querySelector(`[data-post-confirm-no="${post.postId}"]`);
      const containerModal = document.querySelector(`[data-post-delete-modal="${post.postId}"]`);
      const textEdit = document.querySelector(`[data-edit-text="${post.postId}"]`);
      const containerButtonEdit = document.querySelector(`[data-edit-button="${post.postId}"]`);

      buttonDelete.style.display = 'flex';
      buttonEdit.style.display = 'flex';

      buttonDelete.addEventListener('click', (e) => {
        e.preventDefault();
        containerModal.classList.add('active');
      });
      noDelete.addEventListener('click', (e) => {
        e.preventDefault();
        containerModal.classList.remove('active');
      });
      yesDelete.addEventListener('click', () => {
        deleteUserPost(post.postId);
      });

      buttonEdit.addEventListener('click', (e) => {
        e.preventDefault();
        containerButtonEdit.style.display = 'flex';
        textEdit.removeAttribute('readonly');
        textEdit.setAttribute('style', 'outline: solid #3a3a3a 1.5px;');
        textEdit.focus();
      })
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