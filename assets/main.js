// Dados de contato. whatsapp: DDI + DDD + número, só dígitos (ex.: "5521999999999").
// Enquanto estiver vazio, o botão do WhatsApp fica escondido.
const CONTACT = {
  whatsapp: "",
  email: "contato@nizity.com"
};

const STORAGE_KEY = "nizity-lang";

function detectLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
  } catch (e) { /* localStorage indisponível (aba anônima, bloqueio) */ }
  return (navigator.language || "pt").toLowerCase().startsWith("pt") ? "pt" : "en";
}

function updateContactLinks(dict) {
  const whatsappLink = document.getElementById("whatsapp-link");
  if (CONTACT.whatsapp) {
    whatsappLink.href = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(dict["contact.message"])}`;
    whatsappLink.hidden = false;
  }
  const emailLink = document.getElementById("email-link");
  emailLink.href = `mailto:${CONTACT.email}`;
  emailLink.textContent = CONTACT.email;
}

function applyLang(lang) {
  const dict = translations[lang];
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  document.title = dict["meta.title"];
  document.querySelector('meta[name="description"]').setAttribute("content", dict["meta.description"]);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const text = dict[el.dataset.i18n];
    if (text) el.textContent = text;
  });
  // O botão mostra o idioma para o qual vai trocar
  document.getElementById("lang-toggle").textContent = lang === "pt" ? "EN" : "PT";
  updateContactLinks(dict);
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

let currentLang = detectLang();
applyLang(currentLang);

document.getElementById("lang-toggle").addEventListener("click", () => {
  currentLang = currentLang === "pt" ? "en" : "pt";
  applyLang(currentLang);
});

setupMobileMenu();
document.getElementById("year").textContent = new Date().getFullYear();
