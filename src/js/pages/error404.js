export function error404() {
  const container = document.createElement('main');
  container.setAttribute('id', 'main-container-error');
  container.innerHTML = `
    <section class="container-internal">
      <img class="image-404" src="img/icons/404.png" alt="Erro 404 - Página em construção">
      <p class="text-404">Página em Construção!!</p>
    </section>
  `;
  return container;
}
