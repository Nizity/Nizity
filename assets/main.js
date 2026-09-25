// Dados de contato. whatsapp: DDI + DDD + número, só dígitos (ex.: "5521999999999").
// Campo vazio = botão escondido.
const CONTACT = {
  whatsapp: "5521997464308",
  email: ""
};

const STORAGE_KEY = "nizity-lang";
// Código de idioma de cada tradução no <html lang> (leitores de tela e buscadores)
const HTML_LANG = { pt: "pt-BR", en: "en", es: "es" };
const page = document.body.dataset.page || "home";

function detectLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
  } catch (e) { /* localStorage indisponível (aba anônima, bloqueio) */ }
  const browser = (navigator.language || "pt").toLowerCase();
  if (browser.startsWith("pt")) return "pt";
  if (browser.startsWith("es")) return "es";
  return "en";
}

function updateContactLinks(dict) {
  // Todo link com data-whatsapp abre o WhatsApp com a mensagem daquela chave (ex.: o pacote da ficha)
  if (CONTACT.whatsapp) {
    document.querySelectorAll("[data-whatsapp]").forEach((link) => {
      const message = dict[link.dataset.whatsapp] || dict["contact.message"];
      link.href = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
      link.hidden = false;
    });
  }
  const emailLink = document.getElementById("email-link");
  if (emailLink && CONTACT.email) {
    emailLink.href = `mailto:${CONTACT.email}`;
    emailLink.textContent = CONTACT.email;
    emailLink.hidden = false;
  }
}

function applyLang(lang) {
  const dict = translations[lang];
  document.documentElement.lang = HTML_LANG[lang];
  if (dict[`meta.title.${page}`]) document.title = dict[`meta.title.${page}`];
  const description = document.querySelector('meta[name="description"]');
  if (description && dict[`meta.description.${page}`]) description.setAttribute("content", dict[`meta.description.${page}`]);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const text = dict[el.dataset.i18n];
    if (text) el.textContent = text;
  });
  document.querySelectorAll("[data-i18n-label]").forEach((el) => {
    const text = dict[el.dataset.i18nLabel];
    if (text) el.setAttribute("aria-label", text);
  });
  // Textos com destaque em negrito: vêm só dos nossos arquivos de tradução, nunca de fora
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const html = dict[el.dataset.i18nHtml];
    if (html) el.innerHTML = html;
  });
  document.getElementById("lang-toggle").value = lang;
  updateContactLinks(dict);
  // O orbe (orb-mount.js) atualiza a própria legenda ao ouvir este evento
  document.dispatchEvent(new CustomEvent("nizity:langchange"));
  try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignora */ }
}

let currentLang = detectLang();
applyLang(currentLang);

document.getElementById("lang-toggle").addEventListener("change", (event) => {
  currentLang = event.target.value;
  applyLang(currentLang);
});

// Celular: o menu vira um painel que abre pelo botão ☰ (cabe mais itens no futuro)
function setupMenu() {
  const button = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");
  if (!button || !nav) return;
  const header = button.closest(".nav");
  const setOpen = (open) => {
    header.classList.toggle("menu-open", open);
    button.setAttribute("aria-expanded", String(open));
  };
  button.addEventListener("click", () => setOpen(!header.classList.contains("menu-open")));
  nav.addEventListener("click", (event) => { if (event.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("menu-open")) { setOpen(false); button.focus(); }
  });
}

setupMenu();
setupReveal();
setupInteractionSounds();
setupHoldToConfirm();
document.getElementById("year").textContent = new Date().getFullYear();
