import { createPost } from '../components/posts/template-view-post.js';
import { getPosts } from '../../firebase-configuration/firestore.js';

export function createFeed() {
  const container = document.createElement('main');
  container.setAttribute('id', 'main-container');
  container.innerHTML = `
    <ul class="list-posts">
      <li class="post-card">
        <article class="user-post">
          ${createPost()}
        </article>
      </li>
    </ul>
  `;
  getPosts();
  return container;
}
