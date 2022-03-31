//rotas, suitch
import register from "./pages/register/register.js"; //export default é exportado com o nome register


//base para rotas
window.addEventListener("load", () => {
  const template = document.querySelector("#template");
  const pagina = register();
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
