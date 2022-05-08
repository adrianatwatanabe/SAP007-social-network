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

export async function getUserPosts(id) {
  const arrayOfMyPosts = [];
  const docSnap = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), where('userId', '==', id));
  const postsUser = await getPosts(docSnap);
  postsUser.forEach((item) => {
    const post = item.data();
    const postId = item.id;
    post.id = postId;
    arrayOfMyPosts.push(post);
  });
  return arrayOfMyPosts;
};