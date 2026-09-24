// Dados de contato. whatsapp: DDI + DDD + número, só dígitos (ex.: "5521999999999").
// Campo vazio = botão escondido.
const CONTACT = {
  whatsapp: "5521997464308",
  email: ""
};

const STORAGE_KEY = "nizity-lang";
const page = document.body.dataset.page || "home";
const orbs = [];

function detectLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
  } catch (e) { /* localStorage indisponível (aba anônima, bloqueio) */ }
  return (navigator.language || "pt").toLowerCase().startsWith("pt") ? "pt" : "en";
}

function updateContactLinks(dict) {
  // Os links só existem nas páginas que têm seção de contato
  const whatsappLink = document.getElementById("whatsapp-link");
  if (whatsappLink && CONTACT.whatsapp) {
    whatsappLink.href = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(dict["contact.message"])}`;
    whatsappLink.hidden = false;
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
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  if (dict[`meta.title.${page}`]) document.title = dict[`meta.title.${page}`];
  const description = document.querySelector('meta[name="description"]');
  if (description && dict[`meta.description.${page}`]) description.setAttribute("content", dict[`meta.description.${page}`]);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const text = dict[el.dataset.i18n];
    if (text) el.textContent = text;
  });
  // Textos com destaque em negrito: vêm só dos nossos arquivos de tradução, nunca de fora
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const html = dict[el.dataset.i18nHtml];
    if (html) el.innerHTML = html;
  });
  // O botão mostra o idioma para o qual vai trocar
  document.getElementById("lang-toggle").textContent = lang === "pt" ? "EN" : "PT";
  updateContactLinks(dict);
  orbs.forEach((orb) => orb.refreshLabel());
  if (renderSoundToggle) renderSoundToggle();
  try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignora */ }
}

function setupMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const closeMenu = () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  };
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
}

function setupOrbs() {
  const labelFor = (state) => translations[currentLang][`orb.${state}`] || state;
  const heroCanvas = document.getElementById("orb");
  if (heroCanvas) orbs.push(createOrb(heroCanvas, { labelEl: document.getElementById("orb-state"), labels: labelFor }));
  const miniCanvas = document.getElementById("mini-orb");
  if (miniCanvas) orbs.push(createOrb(miniCanvas, { radius: 30 }));
}

let currentLang = detectLang();
const renderSoundToggle = setupSoundToggle((on) => translations[currentLang][on ? "sound.on" : "sound.off"]);
setupOrbs();
applyLang(currentLang);

document.getElementById("lang-toggle").addEventListener("click", () => {
  currentLang = currentLang === "pt" ? "en" : "pt";
  applyLang(currentLang);
});

setupMobileMenu();
setupReveal();
setupInteractionSounds();
setupHoldToConfirm();
document.getElementById("year").textContent = new Date().getFullYear();
