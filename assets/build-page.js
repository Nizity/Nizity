// A home se escreve sozinha na 1ª visita, enquanto a mente gira com os projetos acesos: o título
// (como quem escreve), o texto, o botão e o menu. Nada esmaece: tudo nasce de uma linha ou de um ponto.
// O texto está no HTML desde o início (buscadores e leitores de tela não esperam).
// Segue o relógio da intro (orb-intro.js). Só na versão completa; nas outras a página já vem pronta.

// [seletor, início (s da intro), duração, jeito de nascer]. Termina antes de T_IN (início da queda).
// write: abre da esquerda para a direita; line: vira uma linha e depois abre na altura
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

export function createBuilder() {
  const root = document.documentElement;
  if (!root.classList.contains("building")) return null;
  // Só o que está visível (no celular o menu fica no painel do ☰, fora da tela)
  const parts = STEPS.map(([sel, at, dur, kind]) => ({ el: document.querySelector(sel), at, dur, kind })).filter((p) => p.el && p.el.getClientRects().length);

  let done = false;
  function update(s) {
    if (done) return;
    let pending = 0;
    for (const p of parts) {
      const k = ease(clamp((s - p.at) / p.dur));
      p.el.style.clipPath = clipFor(p.kind, k);
      if (k < 1) pending++;
    }
    if (!pending) finish();
  }

  function finish() {
    if (done) return;
    done = true;
    parts.forEach((p) => p.el.style.removeProperty("clip-path"));
    root.classList.remove("building");
  }

  return { update, finish };
}
