// Orbe do Núcleo, conforme a especificação enviada pela sessão do Núcleo (Canvas 2D).
// Uso: createOrb(canvas, { labelEl, labels, state, demo, radius })
//   labels: objeto { estado: texto } ou função (estado) => texto
//   state: estado inicial; demo: false desliga a demonstração automática.
// Enquanto não houver ligação com o Núcleo de verdade, o orbe roda em demonstração.
function createOrb(canvas, options = {}) {
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const PALETTE = {
    lightBlue: [157, 216, 255], // #9DD8FF
    darkBlue: [61, 126, 166],   // #3D7EA6
    green: [111, 227, 193],     // #6FE3C1
    lilac: [201, 184, 255],     // #C9B8FF
    amber: [232, 201, 122],     // #E8C97A
    red: [232, 130, 140]        // #E8828C
  };

  // núcleo = fração de R; halo = 0–255. Os cinco primeiros vêm da tabela da especificação.
  // ASSUNÇÃO (confirmar com o Núcleo): cor dos estados que a tabela não detalha.
  const STATES = {
    sleeping:    { color: "darkBlue",  core: 0.14, halo: 72 },
    idle:        { color: "darkBlue",  core: 0.16, halo: 84, breathe: true },
    thinking:    { color: "lightBlue", core: 0.18, halo: 110, pulse: true },
    speaking:    { color: "lightBlue", core: 0.22, halo: 130 },
    waking:      { color: "lightBlue", core: 0.16, halo: 90 },
    listening:   { color: "lightBlue", core: 0.18, halo: 110 },
    remembering: { color: "lilac",     core: 0.18, halo: 110 },
    reading:     { color: "green",     core: 0.18, halo: 110 },
    looking:     { color: "green",     core: 0.18, halo: 110 },
    acting:      { color: "amber",     core: 0.18, halo: 110 },
    waiting:     { color: "lightBlue", core: 0.18, halo: 110, pulse: true },
    delegating:  { color: "lilac",     core: 0.18, halo: 110 },
    done:        { color: "green",     core: 0.18, halo: 110, momentary: 1000 },
    error:       { color: "red",       core: 0.18, halo: 110, momentary: 3000 }
  };

  const DEFAULT_LABELS = {
    sleeping: "dormindo", idle: "ocioso", thinking: "pensando", speaking: "falando",
    waking: "acordando", listening: "ouvindo", remembering: "lembrando", reading: "lendo",
    looking: "olhando", acting: "agindo", waiting: "esperando", delegating: "delegando",
    done: "concluído", error: "erro"
  };
  const labelFor = typeof options.labels === "function"
    ? options.labels
    : (s) => ({ ...DEFAULT_LABELS, ...(options.labels || {}) })[s];

  const DEMO_SEQUENCE = ["idle", "listening", "thinking", "remembering", "reading", "acting",
    "delegating", "waiting", "speaking", "done", "idle", "looking", "error", "thinking", "speaking", "idle", "sleeping"];

  const COLOR_TAU = 0.28;   // constante de tempo da troca de cor (s)
  const RAMP_TAU = 0.7;     // rampa de entrada/saída da respiração e do pulso (s)

  let state = options.state || "idle";
  let showErrorDot = false;
  let momentaryTimer = null;
  const current = { rgb: [...PALETTE[STATES[state].color]], core: STATES[state].core, halo: STATES[state].halo, breathe: 0, pulse: 0 };
  let lastTime = null;

  function setState(next) {
    // Estado desconhecido (ex.: o Núcleo ganhou um estado novo): usa um visual padrão em vez de travar
    if (!STATES[next]) next = "thinking";
    clearTimeout(momentaryTimer);
    if (next === "error") showErrorDot = true;
    else if (next !== "idle" && next !== "sleeping" && next !== "done") showErrorDot = false;
    state = next;
    if (options.labelEl) options.labelEl.textContent = labelFor(next);
    canvas.dataset.state = next;
    // "done" e "error" são momentâneos: depois voltam para ocioso
    if (STATES[next].momentary) momentaryTimer = setTimeout(() => setState("idle"), STATES[next].momentary);
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  const rgba = (rgb, a) => `rgba(${rgb[0] | 0}, ${rgb[1] | 0}, ${rgb[2] | 0}, ${Math.max(0, Math.min(1, a))})`;

  function draw(time) {
    const dt = lastTime === null ? 0 : Math.min((time - lastTime) / 1000, 0.1);
    lastTime = time;
    const target = STATES[state];

    // Troca exponencial (nunca corte seco)
    const k = 1 - Math.exp(-dt / COLOR_TAU);
    const targetRgb = PALETTE[target.color];
    for (let i = 0; i < 3; i++) current.rgb[i] += (targetRgb[i] - current.rgb[i]) * k;
    current.core += (target.core - current.core) * k;
    current.halo += (target.halo - current.halo) * k;
    const kr = 1 - Math.exp(-dt / RAMP_TAU);
    current.breathe += ((target.breathe && !reduceMotion ? 1 : 0) - current.breathe) * kr;
    current.pulse += ((target.pulse && !reduceMotion ? 1 : 0) - current.pulse) * kr;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;

    // Respiração (idle): período 5,2 s, raio ±4,5 %, brilho do halo ±10 %
    const breath = Math.sin((time / 1000) * (2 * Math.PI / 5.2)) * current.breathe;
    const baseR = options.radius || Math.min(w, h) * 0.34;
    const R = baseR * (1 + 0.045 * breath);
    let brightness = 1 + 0.10 * breath;
    // Pulso (thinking, waiting): alfa × (0,78 + 0,22·sin(t/420 ms))
    brightness *= 1 - current.pulse + current.pulse * (0.78 + 0.22 * Math.sin(time / 420));

    // Halo
    const a = (current.halo / 255) * brightness;
    const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    halo.addColorStop(0, rgba(current.rgb, a * 0.78));
    halo.addColorStop(0.62, rgba(current.rgb, a * 0.55));
    halo.addColorStop(0.82, rgba(current.rgb, a * 0.24));
    halo.addColorStop(1, rgba(current.rgb, 0));
    ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

    // Halo próximo: 0 → 0,5R, alfa 0,22 → 0
    const near = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.5);
    near.addColorStop(0, rgba(current.rgb, 0.22));
    near.addColorStop(1, rgba(current.rgb, 0));
    ctx.fillStyle = near;
    ctx.beginPath(); ctx.arc(cx, cy, R * 0.5, 0, Math.PI * 2); ctx.fill();

    // Núcleo: raio (núcleo·R)·2,2
    const coreR = current.core * R * 2.2;
    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
    core.addColorStop(0, "rgba(255, 255, 255, 0.92)");
    core.addColorStop(0.35, rgba(current.rgb, 150 / 255));
    core.addColorStop(1, rgba(current.rgb, 0));
    ctx.fillStyle = core;
    ctx.beginPath(); ctx.arc(cx, cy, coreR, 0, Math.PI * 2); ctx.fill();

    // Ponto de erro: fica até chegar um estado diferente de idle/sleeping
    if (showErrorDot && state !== "error") {
      ctx.fillStyle = rgba(PALETTE.red, 1);
      ctx.beginPath();
      ctx.arc(cx + 0.34 * R, cy + 0.34 * R, Math.max(1.4, 0.09 * R), 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  setState(state);
  requestAnimationFrame(draw);
  if (options.demo !== false) {
    let demoIndex = 0;
    setInterval(() => {
      demoIndex = (demoIndex + 1) % DEMO_SEQUENCE.length;
      setState(DEMO_SEQUENCE[demoIndex]);
    }, 3200);
  }
  return {
    setState,
    refreshLabel: () => { if (options.labelEl) options.labelEl.textContent = labelFor(state); }
  };
}
