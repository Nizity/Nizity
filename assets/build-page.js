// O Núcleo "constrói" a home enquanto a mente cai e vira orbe: feixes de luz saem do orbe e desenham
// o título (como quem escreve), o texto, o botão e a faixa de baixo. Nada esmaece: tudo nasce de uma
// linha ou de um ponto. O texto está no HTML desde o início (buscadores e leitores de tela não esperam).
// Segue o relógio da intro (orb-intro.js). Só na versão completa (1ª visita); nas outras a página já vem pronta.

// [seletor, início (s da intro), duração, jeito de nascer]. Acontece ANTES da queda, enquanto a mente
// gira com os projetos acesos: três peças por vez, cada feixe saindo de um losango grande de projeto
// e acompanhando a rotação. write: abre da esquerda para a direita; line: vira uma linha e depois
// abre na altura. Termina antes de T_IN (início da queda)
const STEPS = [
  [".hero h1", 2.2, 0.8, "write"],
  [".hero .lead", 2.2, 0.9, "write"],
  [".hero .btn-hold", 2.25, 0.7, "line"],
  [".nav-links a:nth-child(1)", 3.2, 0.45, "write"],
  [".nav-links a:nth-child(2)", 3.2, 0.45, "write"],
  [".nav-links a:nth-child(3)", 3.2, 0.45, "write"],
];

const clamp = (x) => Math.max(0, Math.min(1, x));

// Recorte de cada jeito de nascer, com k de 0 a 1
function clipFor(kind, k) {
  if (kind === "line") {
    // Primeira metade: uma linha fina cresce da esquerda; segunda: a linha abre na altura
    if (k < 0.5) return `inset(calc(50% - 1px) ${(1 - k * 2) * 100}% calc(50% - 1px) 0)`;
    const h = (1 - (k - 0.5) * 2) * 50;
    return `inset(calc(${h}% - ${h ? 1 : 0}px) 0 calc(${h}% - ${h ? 1 : 0}px) 0)`;
  }
  // write e rule: abre da esquerda para a direita (com folga para acentos e descidas das letras)
  return `inset(-10px ${(1 - k) * 100}% -10px -10px)`;
}
const ease = (x) => 1 - Math.pow(1 - x, 3);

export function createBuilder(orbCanvas, intro) {
  const root = document.documentElement;
  if (!root.classList.contains("building")) return null;
  // Só o que está visível (no celular o menu fica no painel do ☰, fora da tela)
  const parts = STEPS.map(([sel, at, dur, kind]) => ({ el: document.querySelector(sel), at, dur, kind })).filter((p) => p.el && p.el.getClientRects().length);
  parts.forEach((p) => p.el.setAttribute("data-build", p.kind));

  // Feixes: um canvas por cima de tudo, sem pegar cliques
  const beams = document.createElement("canvas");
  beams.className = "build-beams";
  beams.setAttribute("aria-hidden", "true");
  document.body.append(beams);
  const ctx = beams.getContext("2d");
  const style = getComputedStyle(root);
  const colorA = style.getPropertyValue("--color-exotic").trim() || "#d6b25e";
  const colorB = style.getPropertyValue("--color-accent").trim() || "#a78bfa";

  function resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    beams.width = innerWidth * dpr;
    beams.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  // Ponta do feixe: onde o elemento está nascendo agora
  function head(p, k) {
    const r = p.el.getBoundingClientRect();
    if (p.kind === "rule") return [r.left + r.width * k, r.top];
    if (p.kind === "line") return [r.left + r.width * Math.min(1, k * 2), r.top + r.height / 2];
    return [r.left + r.width * k, r.top + r.height * (0.35 + 0.3 * Math.sin(k * 9))];
  }

  let done = false;
  function update(s) {
    if (done) return;
    const o = orbCanvas.getBoundingClientRect();
    // Os feixes saem dos losangos grandes dos projetos atuais já acesos (magenta); os futuros não constroem
    const sources = intro.projectPoints().filter((pt) => !pt.future && pt.lit > 0.5);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    let pending = 0, active = 0;
    for (const p of parts) {
      const k = ease(clamp((s - p.at) / p.dur));
      p.el.style.clipPath = clipFor(p.kind, k);
      if (k < 1) pending++;
      if (k <= 0 || k >= 1 || !sources.length) continue;
      // Espalha os três feixes por fontes diferentes
      const src = sources[Math.floor((active++ * sources.length) / 3) % sources.length];
      const ox = o.left + src.x, oy = o.top + src.y;
      const [hx, hy] = head(p, k);
      const grad = ctx.createLinearGradient(ox, oy, hx, hy);
      grad.addColorStop(0, colorA);
      grad.addColorStop(1, colorB);
      ctx.save();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.2;
      ctx.shadowColor = colorB;
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.lineTo(hx, hy);
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(hx, hy, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    if (!pending) finish();
  }

  function finish() {
    if (done) return;
    done = true;
    parts.forEach((p) => { p.el.removeAttribute("data-build"); p.el.style.removeProperty("clip-path"); });
    root.classList.remove("building");
    beams.remove();
    window.removeEventListener("resize", resize);
  }

  return { update, finish };
}
