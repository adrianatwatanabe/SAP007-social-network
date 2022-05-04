import { addDoc, getDocs, query, collection } from './export.js';
import { db, auth } from './start-firebase.js';

export function createUserPost(newText) {
  try {
    //Colocar esse if no arquivo post-validation.js pois é uma manipulação do DOM
    /*
        if (newText.length === 0) {
        // colocar mensagem avisando que não tem texto na postagem
        return;
      */

    const postsCollection = collection(db, 'posts');
    const newPost = {
      userId: auth.currentUser.uid,
      text: newText,
      like: 0,
      createdAt: new Date(),
    };

    addDoc(postsCollection, newPost);

    // Para a manipulação de hash e mostrar erros, é a parte do DOM que estará em um dos arquivos da pasta posts
    /*
        .then(() => {
          window.location.hash = '#feed';
        })
        .catch((error) => {
          return error; // só return ?
        });
      */
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
  console.log(postsArray);
  return postsArray;
}
