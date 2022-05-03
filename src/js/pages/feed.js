import { createPost } from '../components/post/view-post.js';

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
  return container;
}
