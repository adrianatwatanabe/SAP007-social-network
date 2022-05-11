export function templateComment() {
  const template = `
    <li class="comment-card">
      <article class="user-comment">
        <a href="/#" class="user-link-photo-comment">
          <img src="../img/icons/icon-profile.png" class="user-photo-comment" alt="Foto do perfil">
        </a>
        <div class="user-comment-text">
          <a href="/#">
            <p class="user-name-comment">Nome do Usuário</p>
          </a>
          <textarea class="comment-text" autocomplete="on" rows="1" cols="70" spellcheck="true" wrap="hard" readonly></textarea>
        </div>
      </article>
    </li>
    `;
  return template;
}

export function createComment() {
  const container = document.createElement('section');
  container.setAttribute('class', 'comments-general');
  container.innerHTML = `
    <ul class="list-comments">
      ${templateComment()}
    </ul>
    `;
  return container;
}
