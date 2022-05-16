import { viewAllPosts } from '../components/posts/post-validation.js';

export function createFeed() {
  const container = document.createElement('main');
  container.setAttribute('id', 'main-container');
  container.style.overflowY = 'scroll';
  container.innerHTML = `
    <ul class="list-posts">
    </ul>
  `;
  viewAllPosts();
  return container;
}
