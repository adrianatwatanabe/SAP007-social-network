<<<<<<< HEAD
//rotas, suitch
import register from "./pages/register/register.js"; //export default é exportado com o nome register

//mudar para o lugar que o then mandar 
//base para rotas
window.addEventListener("load", () => {
  const template = document.querySelector("#template");
  const pagina = register();
  console.log(pagina);
  console.log(template);
  console.log(register);
  template.appendChild(pagina);
});

// evento + função

// const rots = () => {
//   window.addEventListener("hashchange", () => {
//     template.innerHTML = "";
//     switch (window.location.hash) {
//       case "":
//         template.appendChild(register());
//         break
//     }
//   })
// }
// window.addEventListener("load", () => {
//   template.appendChild(register());
// rots();
// });
// const init = () => {
//   window.addEventListener("hashchange", () => {
//     template.innerHTML = "";
//     switch (window.location.hash) {
//       case "#register":
//         template.appendChild(register());
//         break;
//       case "#timeline":
//         template.appendChild(timeline());
//         break;
//       default:
//         template.appendChild(home());
//     }
//   });
// };
// window.addEventListener("load", () => {
//   template.appendChild(home());
//   init();
// });
=======
import login from "./pages/login/index.js";
import register from "./pages/register/index.js";

const section = document.getElementById("container-general");

function initPages() {
  window.addEventListener("hashchange", () => {
    section.innerHTML = "";
    switch (window.location.hash) {
      case " ":
        section.appendChild(login.createLogin());
        break;
      case "#login":
        section.appendChild(login.createLogin());
        break;
      default:
        section.appendChild(login.createLogin());
    }
  });
}

window.addEventListener("load", () => {
  section.appendChild(login.createLogin());
  initPages();
});


>>>>>>> d746d3fc95baf438617111d5a6ca549d5a0fb395
