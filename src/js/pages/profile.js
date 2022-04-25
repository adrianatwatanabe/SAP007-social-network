import header from "./../../components/header/index.js";

const profile = {
  createProfile: function () {
   
    const container = document.createElement("main");
    container.setAttribute("id", "main-container");

    const body = document.querySelector("body");
    body.innerHTML = header.createHeader();
    body.innerHTML += `
     <form id="form-profile">
     <div class="linha">
      <div class="foto-perfil"></div>
     </div>
      
     <div class="linha centralizar-verticalmente">
      <img id="img-alterar-imagem" src="./../img/icons/icon-add-image.png" />
      <span id="alterar-imagem"> Alterar Imagem </span>
     </div>
     
     <div class="linha">
      <label>Nome Social</label>
      <input type="text">
     </div>

     <div class="linha">
      <label>Breve descrição sobre você</label>
      <textarea type="text"></textarea>
     </div>

     <div class="linha">
      <label>Assuntos que você domina</label>
      <textarea type="text"></textarea>
     </div>

     <div class="linha">
      <label>Área de atuação</label>
      <textarea type="text"></textarea>
     </div>
    </form>

    <input class="btn-atualizar" type="submit" value="ATUALIZAR PERFIL">
    `;
    return container;
  },
};

export default profile;