import {
  collection,
  addDoc,
  doc,
  updateDoc,
  query,
  getDocs,
  orderBy,
  getDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  where,
} from './export.js';
import { db, auth } from './start-firebase.js';

export const postsCollection = collection(db, 'posts');

export async function createUserPost(newText) {
  const newPost = {
    socialName: auth.currentUser.displayName,
    text: newText,
    like: [],
    date: new Date().toLocaleString('pt-br'),
    userId: auth.currentUser.uid,
  };
  const docRef = await addDoc(postsCollection, newPost);
  return docRef;
}

export async function postIdUpdate(id) {
  const post = doc(db, 'posts', id);
  await updateDoc(post, {
    postId: id,
  });
}

export async function viewPostsCollection() {
  const postsArray = [];
  const searchedCollection = query(postsCollection, orderBy('date', 'desc'));
  const docSnap = await getDocs(searchedCollection);
  docSnap.forEach((post) => {
    const posts = post.data();
    postsArray.push(posts);
  });
  return postsArray;
}

export async function getSinglePost(postId) {
  const postRef = doc(db, 'posts', postId);
  const docSnap = await getDoc(postRef);
  const post = docSnap.data();
  return post;
}

export async function addLikeToPost(postId) {
  const post = doc(db, 'posts', postId);
  await updateDoc(post, {
    like: arrayUnion(auth.currentUser.uid),
  });
}

export async function removeLikeToPost(postId) {
  const post = doc(db, 'posts', postId);
  await updateDoc(post, {
    like: arrayRemove(auth.currentUser.uid),
  });
}

export async function deletePost(postId) {
  await deleteDoc(doc(db, 'posts', postId));
}

export async function editPost(postId, editedText) {
  const post = doc(db, 'posts', postId);
  await updateDoc(post, {
    text: editedText,
  });
}
// ?
export async function viewPostCollectionSingle() {
  const postsArray = [];
  const clause = where('userId', '==', auth.currentUser.uid);
  const searchedCollection = query(postsCollection, orderBy('date', 'desc'), clause);
  const docSnap = await getDocs(searchedCollection);
  docSnap.forEach((post) => {
    const posts = post.data();
    postsArray.push(posts);
  });
  return postsArray;
}
