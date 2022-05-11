import { auth} from '../../../firebase-configuration/start-firebase.js';

export function createPost(post) {
  const likePost = post.like;
  const likeUserId = likePost.includes(auth.currentUser.uid);
  const numberLike = post.like.length;

  const template = `
    <article class="user-post">
      <section class="post-timeline">
        <header class="post-header">
          <a class="user-link-photo">
            <img src="img/icons/icon-profile.png" class="user-photo-post" alt="Foto do perfil">
          </a>
          <div>
            <a>
              <p class="user-name">${post.socialName}</p>
            </a>
            <time class="post-date">${post.date}</time>
          </div>
          <div class="icon-container-edit-delete">
            <button class="button-icon-post-edit button-post-edit" data-post-edit=${post.postId}>
              <img src="img/icons/icon-edit.png" class="post-icon-edit" alt="Editar post">
            </button>
            <button class="button-icon-post-edit button-post-delete" data-post-delete=${post.postId}>
              <img src="img/icons/icon-delete.png" class="post-icon-edit" alt="Excluir post">
            </button>
          </div>
        </header>
        <textarea class="post-text post-text-reading" autocomplete="on" rows="1" minlength="2" spellcheck="true" wrap="hard" data-edit-post-text="${post.postId}" readonly>${post.text}</textarea>
        <div class="container-button-edit" data-edit-post-button="${post.postId}">
          <input class="button-edit-post button-edit-post-cancel" type="button" value="CANCELAR" data-edit-post-cancel="${post.postId}"/>
          <input class="button-edit-post button-edit-post-confirm" type="button" value="SALVAR" data-edit-post-confirm="${post.postId}"/>
        </div>
        <p class="message-edit-post" data-edit-message="${post.postId}"></p>
        <footer class="post-footer">
          <button class="button-icon-post button-like" data-like-button=${post.postId}>
            <img src="img/icons/icon-unlike.png" class="post-icon like-image ${likeUserId ? 'liked' : ''}" alt="Ícone de curtir" data-image-like=${post.postId}>
            <p class="post-icon-text post-number-like" data-like-number=${post.postId}>${likePost.length}</p>
            <p class="post-icon-text post-text-like" data-like-text=${post.postId}>${numberLike === 1 ? 'curtida' : 'curtidas'}</p>
          </button>
          <button class="button-icon-post button-comment">
            <img src="img/icons/icon-comment.png" class="post-icon" alt="Ícone de comentários">
            <p class="post-icon-text post-number-comment">3</p>
            <p class="post-icon-text">comentários</p>
          </button>
        </footer>
      </section>
    </article>

    <section class="modal-container-dark" data-post-delete-modal="${post.postId}">
      <section class="modal-delete-post">
        <p class="text-delete">Tem certeza que você deseja deletar esse post?</p>
        <div class="container-modal-delete-button">
          <button class="button-modal-delete modal-close-delete-post" data-post-confirm-no="${post.postId}">Não</button>
          <button class="button-modal-delete button-yes" data-post-confirm-yes="${post.postId}">Sim</button>
        </div>
      </section>
    </section> 
  `;
  return template;
}
