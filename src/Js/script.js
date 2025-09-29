let estadoActual = null; // "mobile" o "desktop"

function cambiarAncho() {
  const carshop = document.getElementById('car-shop');
  const avatar = document.getElementById('avatar');
  const navegation = document.querySelector('#navbar-sticky');
  const contenedorOriginal = document.getElementById('avatar-original');

  if (!avatar || !navegation || !contenedorOriginal ) return; // seguridad

  const nuevoAncho = window.innerWidth;
  const nuevoEstado = nuevoAncho <= 768 ? "mobile" : "desktop";

  if (estadoActual === nuevoEstado) return; // no hacer nada si no hay cambio real
  estadoActual = nuevoEstado;

  if (nuevoEstado === "mobile") {
    navegation.prepend(avatar);
    //navegation.prepend(carshop);
  } else {
    contenedorOriginal.appendChild(avatar);
    //avatar.appendChild(carshop);
  }
}

window.addEventListener('load', cambiarAncho);
window.addEventListener('resize', cambiarAncho);
 const form = document.getElementById("miFormulario");
  setTimeout(() => form.classList.add("activo"), 500);