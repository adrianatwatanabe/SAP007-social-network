import { 
  collection,
  addDoc,
  orderBy,
  query,
  getDocs,
  where,
} from './export.js';
import { db, auth } from './start-firebase.js';

export async function createUserPost(newText) {
  try {
    const postsCollection = collection(db, 'posts');
    const newPost = {
      socialName: auth.currentUser.displayName,
      userId: auth.currentUser.uid,
      text: newText,
      like: [],
      createdAt: new Date(),
    };
    const docRef = await addDoc(postsCollection, newPost);
    return docRef;
  } catch (e) {
    return e;
  }
}

export async function getPosts() {
  const postsArray = [];
  const postsCollection = query(collection(db, 'posts'));
  const docSnap = await getDocs(postsCollection);
  docSnap.forEach((doc) => {
    const posts = doc.data();
    postsArray.push(posts);
  });
  return postsArray;
}

export const allPosts = async () => {
  const arrayOfPosts = [];
  const sortingPosts = query(collection(db, 'posts'), orderBy('date', 'desc'));
  const querySnapshot = await getDocs(sortingPosts);
  querySnapshot.forEach((item) => {
    const posts = item.data();
    const postId = item.id;
    posts.id = postId;
    arrayOfPosts.push(posts);
  });
  return arrayOfPosts;
};

export const getUserPosts = async (id) => {
  const arrayOfMyPosts = [];
  const clause = where('userId', '==', id);
  const querySnapshot = query(collection(db, 'posts'), orderBy('date', 'desc'), clause);
  const test = await getDocs(querySnapshot);
  test.forEach((item) => {
    const post = item.data();
    const postId = item.id;
    post.id = postId;
    arrayOfMyPosts.push(post);
  });
  return arrayOfMyPosts;
};