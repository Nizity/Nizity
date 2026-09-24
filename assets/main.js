// Textos do site em cada idioma. Para editar o conteúdo, altere aqui.
const translations = {
  pt: {
    "meta.description": "Nizity — tecnologia simples para negócios que querem crescer.",
    "nav.about": "Sobre",
    "nav.solutions": "Soluções",
    "nav.how": "Como funciona",
    "nav.contact": "Contato",
    "hero.eyebrow": "Bem-vindo à Nizity",
    "hero.title": "Tecnologia simples para negócios que querem crescer.",
    "hero.lead": "Criamos soluções digitais que economizam tempo, organizam informações e ajudam você a tomar decisões melhores.",
    "hero.cta": "Fale com a gente",
    "hero.secondary": "Conheça as soluções",
    "about.eyebrow": "Sobre nós",
    "about.title": "Quem somos",
    "about.p1": "A Nizity nasceu para tornar a tecnologia acessível. Acreditamos que ferramentas bem feitas devem ser fáceis de usar e trazer resultado desde o primeiro dia.",
    "about.p2": "Unimos design, dados e engenharia para entregar produtos confiáveis, pensados para as necessidades reais de cada cliente.",
    "solutions.eyebrow": "Soluções",
    "solutions.title": "O que oferecemos",
    "solutions.c1.title": "Análise de dados",
    "solutions.c1.text": "Transformamos seus números em painéis claros e relatórios que mostram o que realmente importa.",
    "solutions.c2.title": "Automação",
    "solutions.c2.text": "Eliminamos tarefas repetitivas para que sua equipe foque no que gera valor.",
    "solutions.c3.title": "Sites e aplicativos",
    "solutions.c3.text": "Desenvolvemos sites e sistemas modernos, rápidos e fáceis de manter.",
    "how.eyebrow": "Como funciona",
    "how.title": "Do problema à solução em três passos",
    "how.s1.title": "Conversa",
    "how.s1.text": "Entendemos seu negócio, seus desafios e seus objetivos.",
    "how.s2.title": "Proposta",
    "how.s2.text": "Apresentamos um plano claro, com prazos e custos definidos.",
    "how.s3.title": "Entrega",
    "how.s3.text": "Construímos, testamos e acompanhamos os resultados com você.",
    "contact.title": "Vamos conversar?",
    "contact.text": "Conte sua ideia ou desafio. Respondemos em até um dia útil.",
    "contact.cta": "contato@nizity.com",
    "footer.rights": "Todos os direitos reservados.",
    "footer.top": "Voltar ao topo ↑"
  },
  en: {
    "meta.description": "Nizity — simple technology for businesses that want to grow.",
    "nav.about": "About",
    "nav.solutions": "Solutions",
    "nav.how": "How it works",
    "nav.contact": "Contact",
    "hero.eyebrow": "Welcome to Nizity",
    "hero.title": "Simple technology for businesses that want to grow.",
    "hero.lead": "We build digital solutions that save time, organize information and help you make better decisions.",
    "hero.cta": "Get in touch",
    "hero.secondary": "Explore our solutions",
    "about.eyebrow": "About us",
    "about.title": "Who we are",
    "about.p1": "Nizity was born to make technology accessible. We believe well-crafted tools should be easy to use and deliver results from day one.",
    "about.p2": "We combine design, data and engineering to deliver reliable products built around each client's real needs.",
    "solutions.eyebrow": "Solutions",
    "solutions.title": "What we offer",
    "solutions.c1.title": "Data analytics",
    "solutions.c1.text": "We turn your numbers into clear dashboards and reports that show what really matters.",
    "solutions.c2.title": "Automation",
    "solutions.c2.text": "We eliminate repetitive tasks so your team can focus on what creates value.",
    "solutions.c3.title": "Websites and apps",
    "solutions.c3.text": "We build modern websites and systems that are fast and easy to maintain.",
    "how.eyebrow": "How it works",
    "how.title": "From problem to solution in three steps",
    "how.s1.title": "Talk",
    "how.s1.text": "We get to know your business, your challenges and your goals.",
    "how.s2.title": "Proposal",
    "how.s2.text": "We present a clear plan with defined timelines and costs.",
    "how.s3.title": "Delivery",
    "how.s3.text": "We build, test and track the results together with you.",
    "contact.title": "Let's talk?",
    "contact.text": "Tell us about your idea or challenge. We reply within one business day.",
    "contact.cta": "contato@nizity.com",
    "footer.rights": "All rights reserved.",
    "footer.top": "Back to top ↑"
  }
};

const STORAGE_KEY = "nizity-lang";

function detectLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
  } catch (e) { /* localStorage indisponível */ }
  return (navigator.language || "pt").toLowerCase().startsWith("pt") ? "pt" : "en";
}

function applyLang(lang) {
  const dict = translations[lang];
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const text = dict[el.dataset.i18n];
    if (text) el.textContent = text;
  });
  document.querySelector('meta[name="description"]').setAttribute("content", dict["meta.description"]);
  document.getElementById("lang-toggle").textContent = lang === "pt" ? "EN" : "PT";
  try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignora */ }
}

let currentLang = detectLang();
applyLang(currentLang);

document.getElementById("lang-toggle").addEventListener("click", () => {
  currentLang = currentLang === "pt" ? "en" : "pt";
  applyLang(currentLang);
});

// Menu mobile
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  })
);

document.getElementById("year").textContent = new Date().getFullYear();
