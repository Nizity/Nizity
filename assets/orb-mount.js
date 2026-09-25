// Monta o orbe do Núcleo nas páginas. Enquanto não existe a ligação real com o Núcleo (Worker),
// roda uma demonstração que passa pelos estados e capacidades. Só visual: sem legenda.
import { AtlasOrb, GLYPHS } from "./atlas_orb.js";
import { createIntro, SHORT_FROM } from "./orb-intro.js";
import { createBuilder } from "./build-page.js";

// [estado, capacidade em uso, duração em ms]
const DEMO_SEQUENCE = [
  ["idle", null, 4000],
  ["listening", "ouvir", 3000],
  ["thinking", null, 3200],
  ["remembering", "memoria", 3000],
  ["reading", "read_file", 3000],
  ["acting", "run_command", 3000],
  ["delegating", "delegar", 3200],
  ["waiting", "ask_user", 3000],
  ["speaking", "falar", 3200],
  ["done", "finish", 1200],
  ["idle", null, 3500],
  ["looking", "capturar", 3000],
  ["error", null, 3000],
  ["thinking", "search_in_files", 3000],
  ["sleeping", null, 4000]
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Desenha um orbe num canvas; o raio acompanha o tamanho do canvas
// Com "intro", o orbe nasce da mente (orb-intro.js) e só depois o AtlasOrb assume; onReady avisa.
function mountOrb(canvas, radiusFactor, minRadius, maxRadius, intro = null, onReady = () => {}) {
  const orb = new AtlasOrb(Object.keys(GLYPHS), undefined, reduceMotion);
  const ctx = canvas.getContext("2d");
  const size = { w: 0, h: 0 };
  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    size.w = rect.width;
    size.h = rect.height;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize);
  const loop = (now) => {
    ctx.clearRect(0, 0, size.w, size.h);
    const radius = Math.max(minRadius, Math.min(maxRadius, Math.min(size.w, size.h) * radiusFactor));
    if (intro && intro.draw(ctx, size.w / 2, size.h / 2, radius, now, size.w, size.h)) {
      requestAnimationFrame(loop);
      return;
    }
    if (intro) {
      // Passagem: o AtlasOrb continua do mesmo ângulo, sem salto
      orb.angle = intro.angle();
      orb.last = now / 1000;
      intro = null;
      onReady();
    }
    orb.frame(ctx, size.w / 2, size.h / 2, radius, now);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
  return orb;
}

// Orbe da página inicial: aplica estado e capacidade e destaca o glifo sob o mouse
function setupHero(orb, canvas) {
  canvas.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    orb.setHover(orb.glyphAt(event.clientX - rect.left, event.clientY - rect.top));
  });
  canvas.addEventListener("pointerleave", () => orb.setHover(null));

  return (state, capability) => {
    orb.setState(state);
    orb.setCapability(capability);
    canvas.dataset.state = state;
  };
}

function runDemo(apply) {
  let index = 0;
  let listening = false;
  // Enquanto a pessoa escreve no chat (chat.js), o orbe fica "ouvindo"; depois a demonstração segue
  document.addEventListener("nizity:chat-typing", (event) => {
    if (event.detail === listening) return;
    listening = event.detail;
    if (listening) apply("listening", "ouvir");
  });
  const step = () => {
    const [state, capability, duration] = DEMO_SEQUENCE[index];
    if (!listening) apply(state, capability);
    index = (index + 1) % DEMO_SEQUENCE.length;
    setTimeout(step, duration);
  };
  step();
}

// Lembra neste navegador que a versão completa já foi vista (sem armazenamento, sempre completa)
function introSeen() {
  try {
    const seen = localStorage.getItem("nizity-intro-seen") === "1";
    localStorage.setItem("nizity-intro-seen", "1");
    return seen;
  } catch {
    return false;
  }
}

const heroCanvas = document.getElementById("orb");
if (heroCanvas) {
  // Toda vez que a home abre, o orbe nasce da mente (decisão do fundador): completa na 1ª visita,
  // só a queda nas seguintes; movimento reduzido vê o orbe direto
  const intro = reduceMotion ? null : createIntro(introSeen() ? SHORT_FROM : 0);
  let orb = null;
  const start = () => runDemo(setupHero(orb, heroCanvas));
  // O Núcleo constrói a página no mesmo relógio da intro
  const builder = intro ? createBuilder() : null;
  orb = mountOrb(heroCanvas, 0.26, 80, 240, intro, () => { heroCanvas.dataset.intro = "done"; builder?.finish(); start(); });
  if (intro) {
    heroCanvas.dataset.intro = "running";
    if (builder) {
      const follow = () => { builder.update(intro.time()); if (heroCanvas.dataset.intro === "running") requestAnimationFrame(follow); };
      requestAnimationFrame(follow);
    }
  } else {
    heroCanvas.dataset.intro = "none";
    start();
  }
}

const miniCanvas = document.getElementById("mini-orb");
if (miniCanvas) {
  const mini = mountOrb(miniCanvas, 0.3, 14, 40);
  runDemo((state, capability) => {
    mini.setState(state);
    mini.setCapability(capability);
    miniCanvas.dataset.state = state;
  });
}
