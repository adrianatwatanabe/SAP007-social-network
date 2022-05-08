export function createPost(post) {
  const template = `
    <article class="user-post">
      <section class="post-timeline">
        <header class="post-header">
          <a href="/#" class="user-link-photo">
            <img src="../img/icons/icon-profile.png" class="user-photo-post" alt="Foto do perfil">
          </a>
          <div>
            <a href="/#">
              <p class="user-name">${post.socialName}</p>
            </a>
            <time class="post-date">01 de abril de 2022</time>
          </div>
          <div class="icon-container-edit-delete">
            <button class="button-icon-post-edit">
              <img src="../img/icons/icon-edit.png" class="post-icon-edit" alt="Editar post">
            </button>
            <button class="button-icon-post-edit">
              <img src="../img/icons/icon-delete.png" class="post-icon-edit" alt="Excluir post">
            </button>
          </div>
        </header>
        <textarea class="post-text" autocomplete="on" rows="1" cols="70" minlength="2" spellcheck="true" wrap="hard" readonly></textarea>
        <footer class="post-footer">
          <button class="button-icon-post button-like">
            <img src="../img/icons/icon-unlike.png" class="post-icon" alt="Ícone de curtir">
            <p class="post-icon-text post-number-like">2</p>
            <p class="post-icon-text">curtidas</p>
          </button>
          <button class="button-icon-post button-comment">
            <img src="../img/icons/icon-comment.png" class="post-icon" alt="Ícone de comentários">
            <p class="post-icon-text post-number-comment">3</p>
            <p class="post-icon-text">comentários</p>
          </button>
        </footer>
      </section>
    </article>
      `;

  return template;
}
