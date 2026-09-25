// Tema claro/escuro. Carregado no <head> para aplicar a escolha salva antes de pintar a página (sem piscar).
// Sem escolha salva, vale o tema do sistema do visitante; o botão ☀/☾ troca e guarda.
(function () {
  const KEY = "nizity-theme";
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: light)");
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* armazenamento bloqueado */ }
  if (saved === "light" || saved === "dark") root.dataset.theme = saved;

  // Na home, na 1ª visita, o Núcleo "constrói" a página (build-page.js). A classe
  // entra aqui, antes de pintar, para o conteúdo não aparecer e sumir; movimento reduzido vê a página pronta
  let seen = false;
  try { seen = localStorage.getItem("nizity-intro-seen") === "1"; } catch (e) { /* sem armazenamento: versão completa */ }
  const home = /^\/(index(\.html)?)?$/.test(location.pathname);
  if (home && !seen && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.classList.add("building");
  }

  const current = () => root.dataset.theme || (media.matches ? "light" : "dark");

  // O botão mostra o tema para o qual vai trocar
  function updateButton() {
    const button = document.getElementById("theme-toggle");
    if (!button) return;
    const toLight = current() === "dark";
    const labels = {
      pt: ["Usar tema claro", "Usar tema escuro"],
      en: ["Use light theme", "Use dark theme"],
      es: ["Usar tema claro", "Usar tema oscuro"],
    }[root.lang.slice(0, 2)] || ["Use light theme", "Use dark theme"];
    button.textContent = toLight ? "☀" : "☾";
    button.setAttribute("aria-label", toLight ? labels[0] : labels[1]);
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
