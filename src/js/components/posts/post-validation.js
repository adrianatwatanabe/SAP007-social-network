import {
  createUserPost,
  viewPostsCollection,
  addLikeToPost,
  removeLikeToPost,
  deletePost,
  getSinglePost,
  postIdUpdate,
  editPost,
  viewPostCollectionSingle,
} from '../../../firebase-configuration/firestore.js';
import { auth } from '../../../firebase-configuration/start-firebase.js';
import { closeModalAutomatically } from '../general-site-components/modal.js';
import { createPost } from './template-view-post.js';
import { readingTextareaSize } from '../general-site-components/textarea-size.js';

async function editPostConfirm(postId, textEdit) {
  const textBox = document.querySelector(`[data-edit-post-text="${postId}"]`);
  const containerButtonEdit = document.querySelector(`[data-edit-post-button="${postId}"]`);
  await editPost(postId, textEdit).then(() => {
    containerButtonEdit.style.display = 'none';
    textBox.setAttribute('readonly', 'true');
    textBox.removeAttribute('style', 'outline: solid #3a3a3a 1.5px;');
  });
}

async function editUserPost(postId) {
  const textBox = document.querySelector(`[data-edit-post-text="${postId}"]`);
  const containerButtonEdit = document.querySelector(`[data-edit-post-button="${postId}"]`);
  const buttonConfirmEdit = document.querySelector(`[data-edit-post-confirm="${postId}"]`);
  const buttonCancelEdit = document.querySelector(`[data-edit-post-cancel="${postId}"]`);
  containerButtonEdit.style.display = 'flex';
  textBox.removeAttribute('readonly');
  textBox.setAttribute('style', 'outline: solid #3a3a3a 1.5px;');
  textBox.focus();

  buttonConfirmEdit.addEventListener('click', (e) => {
    e.preventDefault();
    const message = document.querySelector(`[data-edit-message="${postId}"]`);
    const textEdit = document.querySelector('.post-text-reading');
    const textEditValue = textEdit.value;
    const validatedText = textEditValue.match(/[\wÀ-ú]/g);
    const validatedTextTab = textEditValue.match(/[\wÀ-ú]+\n{3}/g);
    const validatedTabText = textEditValue.match(/\n+[\wÀ-ú]/g);
    if (textEditValue === '') {
      message.innerHTML = 'Não é possível enviar um post vazio!';
      setTimeout(() => {
        message.innerHTML = '';
      }, 3000);
    } else if (validatedText || validatedTextTab || validatedTabText) {
      editPostConfirm(postId, textEditValue);
    } else {
      message.innerHTML = 'Não é possível enviar um post vazio!';
      setTimeout(() => {
        message.innerHTML = '';
      }, 3000);
    }
  });
  buttonCancelEdit.addEventListener('click', (e) => {
    e.preventDefault();
    containerButtonEdit.style.display = 'none';
    textBox.setAttribute('readonly', 'true');
    textBox.removeAttribute('style', 'outline: solid #3a3a3a 1.5px;');
    if (window.location.hash === '#feed') viewAllPosts(); // eslint-disable-line
    else viewSingleUserPosts(); // eslint-disable-line
  });
}

async function deleteUserPost(postId) {
  const post = await getSinglePost(postId);
  const postUserId = post.userId;
  const userId = auth.currentUser.uid;
  if (postUserId === userId) {
    await deletePost(postId).then(() => {
      if (window.location.hash === '#feed') viewAllPosts(); // eslint-disable-line
      else viewSingleUserPosts(); // eslint-disable-line
    });
  }
}

async function addRemoveLikeToPost(postId) {
  const post = await getSinglePost(postId);
  const likeUserId = post.like.includes(auth.currentUser.uid);
  const numberLikes = document.querySelector(`[data-like-number="${postId}"]`);
  const textLike = document.querySelector(`[data-like-text="${postId}"]`);
  const buttonLike = document.querySelector(`[data-image-like="${postId}"]`);
  if (!likeUserId) {
    addLikeToPost(postId).then(() => {
      const viewLikes = Number(numberLikes.innerHTML) + 1;
      numberLikes.innerHTML = viewLikes;
      buttonLike.classList.add('liked');
      if (viewLikes === 1) textLike.innerHTML = 'curtida';
      else textLike.innerHTML = 'curtidas';
    });
  } else {
    removeLikeToPost(postId).then(() => {
      const viewLikes = Number(numberLikes.innerHTML) - 1;
      numberLikes.innerHTML = viewLikes;
      buttonLike.classList.remove('liked');
      if (viewLikes === 1) textLike.innerHTML = 'curtida';
      else textLike.innerHTML = 'curtidas';
    });
  }
}

function startEditFunction(postId) {
  const buttonDelete = document.querySelector(`[data-post-delete="${postId}"]`);
  const buttonEdit = document.querySelector(`[data-post-edit="${postId}"]`);
  const yesDelete = document.querySelector(`[data-post-confirm-yes="${postId}"]`);
  const noDelete = document.querySelector(`[data-post-confirm-no="${postId}"]`);
  const containerModal = document.querySelector(`[data-post-delete-modal="${postId}"]`);

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
    deleteUserPost(postId);
  });
  buttonEdit.addEventListener('click', (e) => {
    e.preventDefault();
    editUserPost(postId);
  });
}

function startLikeFunction() {
  const buttonLike = document.querySelectorAll('.button-like');
  buttonLike.forEach((post) => {
    post.addEventListener('click', () => {
      const postId = post.getAttribute('data-like-button');
      addRemoveLikeToPost(postId);
    });
  });
}

export async function viewSingleUserPosts() {
  const userPostsCollection = await viewPostCollectionSingle();
  const listPost = document.querySelector('.cards-timeline');
  listPost.innerHTML = '';
  userPostsCollection.forEach((post) => {
    const list = document.createElement('li');
    list.setAttribute('class', 'post-card');
    list.innerHTML = createPost(post);
    listPost.append(list);
    readingTextareaSize();
    if (auth.currentUser.uid === post.userId) {
      startEditFunction(post.postId);
    }
  });
  startLikeFunction();
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
    if (auth.currentUser.uid === post.userId) {
      startEditFunction(post.postId);
    }
  });
  startLikeFunction();
}

export async function createNewPost(newMessage) {
  const postClose = document.querySelector('[data-post="close"]');
  const postContainer = document.querySelector('[data-post="container"]');
  const initialSizeTextarea = document.getElementById('create-post');
  await createUserPost(newMessage).then((docRef) => {
    postIdUpdate(docRef.id);
    getSinglePost(docRef.id);
    closeModalAutomatically(postClose, postContainer);
    initialSizeTextarea.setAttribute('style', 'height: 80px;');
    if (window.location.hash === '#feed') viewAllPosts();
    else viewSingleUserPosts();
  });
}

export function newPostValidation(e) {
  e.preventDefault();
  const postClose = document.querySelector('[data-post="close"]');
  const postContainer = document.querySelector('[data-post="container"]');
  const message = document.querySelector('#message-new-post');
  const addNewMessage = document.querySelector('#create-post');
  const newMessage = addNewMessage.value;
  const validatedText = newMessage.match(/[\wÀ-ú]/g);
  const validatedTextTab = newMessage.match(/[\wÀ-ú]+\n{3}/g);
  const validatedTabText = newMessage.match(/\n+[\wÀ-ú]/g);
  if (newMessage === '') {
    message.innerHTML = 'Não é possível enviar um post vazio!';
    setTimeout(() => {
      message.innerHTML = '';
    }, 3000);
    addNewMessage.value = '';
  } else if (validatedText || validatedTextTab || validatedTabText) {
    createNewPost(newMessage);
    addNewMessage.value = '';
    closeModalAutomatically(postClose, postContainer);
  } else {
    message.innerHTML = 'Não é possível enviar um post vazio!';
    setTimeout(() => {
      message.innerHTML = '';
    }, 3000);
    addNewMessage.value = '';
  }
}
