// Monta o orbe do Núcleo nas páginas. Enquanto não existe a ligação real com o Núcleo (Worker),
// roda uma demonstração que passa pelos estados e capacidades. Os rótulos vêm de i18n.js.
import { AtlasOrb, GLYPHS } from "./atlas_orb.js";

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

function currentDict() {
  const lang = document.documentElement.lang.startsWith("pt") ? "pt" : "en";
  // "translations" é declarada em i18n.js (script clássico); não fica em window, mas é visível pelo nome
  return (typeof translations !== "undefined" && translations[lang]) || {};
}

function capabilityLabel(key) {
  return currentDict()[`cap.${key}`] || (GLYPHS[key] && GLYPHS[key].label) || key;
}

// Desenha um orbe num canvas; o raio acompanha o tamanho do canvas
function mountOrb(canvas, radiusFactor, minRadius, maxRadius) {
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
    orb.frame(ctx, size.w / 2, size.h / 2, radius, now);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
  return orb;
}

// Legenda do orbe da página inicial: estado, capacidade em uso e glifo sob o mouse
function setupHud(orb, canvas) {
  const stateEl = document.getElementById("orb-state");
  const capRow = document.getElementById("orb-cap-row");
  const capEl = document.getElementById("orb-cap");
  const current = { state: "idle", capability: null, hover: null };

  const render = () => {
    const dict = currentDict();
    stateEl.textContent = dict[`orb.${current.state}`] || current.state;
    canvas.dataset.state = current.state;
    const shown = current.hover || current.capability;
    capRow.hidden = !shown;
    if (shown) capEl.textContent = capabilityLabel(shown);
  };

  canvas.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const key = orb.glyphAt(event.clientX - rect.left, event.clientY - rect.top);
    if (key === current.hover) return;
    current.hover = key;
    orb.setHover(key);
    render();
  });
  canvas.addEventListener("pointerleave", () => {
    current.hover = null;
    orb.setHover(null);
    render();
  });
  document.addEventListener("nizity:langchange", render);

  return (state, capability) => {
    current.state = state;
    current.capability = capability;
    orb.setState(state);
    orb.setCapability(capability);
    render();
  };
}

function runDemo(apply) {
  let index = 0;
  const step = () => {
    const [state, capability, duration] = DEMO_SEQUENCE[index];
    apply(state, capability);
    index = (index + 1) % DEMO_SEQUENCE.length;
    setTimeout(step, duration);
  };
  step();
}

const heroCanvas = document.getElementById("orb");
if (heroCanvas) {
  const orb = mountOrb(heroCanvas, 0.32, 60, 170);
  runDemo(setupHud(orb, heroCanvas));
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
