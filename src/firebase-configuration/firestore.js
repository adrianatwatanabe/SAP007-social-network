import { 
  collection,
  addDoc,
  orderBy,
  query,
  deleteDoc,
  getDocs,
  updateDoc,
  doc,
  where,
  arrayUnion,
  arrayRemove,
} from './export.js';
import { db, auth } from './start-firebase.js';

export async function createUserPost(newText) {
  try {
    const postsCollection = collection(db, 'posts');
    const newPost = {
      socialName: auth.currentUser.displayName,
      text: newText,
      like: [],
      date: new Date(),
      userId: auth.currentUser.uid,
    };
    const docRef = await addDoc(postsCollection, newPost);
    return docRef;
  } catch (e) {
    return e;
  }
}

export async function viewPostsCollection() {
  const postsArray = [];
  const postsCollection = query(collection(db, 'posts'));
  const docSnap = await getDocs(postsCollection);
  docSnap.forEach((doc) => {
    const posts = doc.data();
    postsArray.push(posts);
  });
  return postsArray;
}

export const likePost = async (postId, user) => {
  const postLiked = doc(db, 'posts', postId);
  try {
    return await updateDoc(postLiked, {
      likes: arrayUnion(user),
    });
  } catch (e) {
    return e;
  }
};

export const dislikePost = async (postId, user) => {
  const postLiked = doc(db, 'posts', postId);
  try {
    return await updateDoc(postLiked, {
      likes: arrayRemove(user),
    });
  } catch (e) {
    return e;
  }
};

/*
export async function viewUserPostsCollection(id) {
  const postsArray = [];
  const filterUser = query(collection(db, 'posts'), orderBy('date', 'desc'), where('userId', '==', id));
  const docSnap = await viewPostsCollection(filterUser);
  docSnap.forEach((item) => {
    const post = item.data();
    const postId = item.id;
    post.id = postId;
    postsArray.push(post);
  });
  return arrayOfMyPosts;
};

export const getFunctionDelet = async (postId) => {
  await deleteDoc(doc(db, 'posts', postId));
};

export const editAPost = async (postId, editedMessage) => {
  const postToEdit = doc(db, 'posts', postId);
  await updateDoc(postToEdit, {
    message: editedMessage,
  });
};

*/