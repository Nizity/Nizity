// Tema claro/escuro. Carregado no <head> para aplicar a escolha salva antes de pintar a página (sem piscar).
// Sem escolha salva, vale o tema do sistema do visitante; o botão ☀/☾ troca e guarda.
(function () {
  const KEY = "nizity-theme";
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: light)");
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* armazenamento bloqueado */ }
  if (saved === "light" || saved === "dark") root.dataset.theme = saved;

  const current = () => root.dataset.theme || (media.matches ? "light" : "dark");

  // O botão mostra o tema para o qual vai trocar
  function updateButton() {
    const button = document.getElementById("theme-toggle");
    if (!button) return;
    const toLight = current() === "dark";
    const pt = root.lang.startsWith("pt");
    button.textContent = toLight ? "☀" : "☾";
    button.setAttribute("aria-label", toLight ? (pt ? "Usar tema claro" : "Use light theme") : (pt ? "Usar tema escuro" : "Use dark theme"));
  }

  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("theme-toggle");
    if (!button) return;
    button.addEventListener("click", () => {
      root.dataset.theme = current() === "dark" ? "light" : "dark";
      try { localStorage.setItem(KEY, root.dataset.theme); } catch (e) { /* ignora */ }
      updateButton();
    });
    updateButton();
  });
  document.addEventListener("nizity:langchange", updateButton);
  media.addEventListener("change", updateButton);
})();
