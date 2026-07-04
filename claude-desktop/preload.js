// Preload — contexto aislado, sin exponer nada peligroso
window.addEventListener('DOMContentLoaded', () => {
  // Actualiza el título con el de la página
  document.addEventListener('title', () => {});
});
