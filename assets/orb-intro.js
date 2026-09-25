// Abertura do orbe na home: a "mente" (nuvem de lembranças) cai sobre si mesma e VIRA o orbe.
// Animação aprovada pelo fundador na Base do Núcleo (D-109, 24/09). Regra de ouro: nada esmaece;
// tudo que aparece cresce de algo, e tudo que some encolhe para dentro de algo. Sem texto.
// Terminada a queda, o mesmo canvas passa a ser desenhado pelo AtlasOrb (orb-mount.js), no mesmo ângulo.
import { GLYPHS, hexToRgb, rgba } from "./atlas_orb.js";

/* ---------------------------------------------------------------------------
 * CÓPIA TEMPORÁRIA de partes do atlas_orb.js que ele não exporta (SOLIDS, rotate,
 * cores de família, nebulosa, estrela, traço do glifo). Valores idênticos aos de lá.
 * Quando o Núcleo exportar SOLIDS/rotate/FAMILY_COLOR/nebula/paintStar, apagar este
 * bloco e importar: duas cópias divergem no primeiro ajuste.
 * ------------------------------------------------------------------------- */
const PHI = (1 + Math.sqrt(5)) / 2;
const norm = (v) => { const l = Math.hypot(v[0], v[1], v[2]); return [v[0] / l, v[1] / l, v[2] / l]; };
const TETRA = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map(norm);
const OCTA = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
const ICOSA = (() => {
  const out = [];
  for (const base of [[0, 1, PHI], [1, PHI, 0], [PHI, 0, 1]]) for (const s1 of [1, -1]) for (const s2 of [1, -1]) {
    const v = base.slice(); const nz = v.map((a, i) => (a !== 0 ? i : -1)).filter((i) => i >= 0);
    v[nz[0]] *= s1; v[nz[1]] *= s2; out.push(norm(v));
  }
  return out;
})();
function edgesOf(verts) {
  let min = Infinity; const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  for (let i = 0; i < verts.length; i++) for (let j = i + 1; j < verts.length; j++) min = Math.min(min, d(verts[i], verts[j]));
  const out = [];
  for (let i = 0; i < verts.length; i++) for (let j = i + 1; j < verts.length; j++) if (d(verts[i], verts[j]) < min * 1.01) out.push([i, j]);
  return out;
}
const SOLIDS = [
  { verts: TETRA, edges: edgesOf(TETRA), r: 0.35, ax: [1, 0.7, 0.2] },
  { verts: OCTA, edges: edgesOf(OCTA), r: 0.6, ax: [-0.5, 1, 0.3] },
  { verts: ICOSA, edges: edgesOf(ICOSA), r: 0.88, ax: [0.3, -0.4, 1] },
];
function rotate(p, a, b, c) {
  let [x, y, z] = p; let t;
  t = y * Math.cos(a) - z * Math.sin(a); z = y * Math.sin(a) + z * Math.cos(a); y = t;
  t = x * Math.cos(b) + z * Math.sin(b); z = -x * Math.sin(b) + z * Math.cos(b); x = t;
  t = x * Math.cos(c) - y * Math.sin(c); y = x * Math.sin(c) + y * Math.cos(c); x = t;
  return [x, y, z];
}
const FAMILY_COLOR = { sentidos: "#E0529C", arquivos: "#9DD8FF", execucao: "#C9B8FF", aparelhos: "#6FE3C1", elenco: "#8FB4FF", capacidades: "#E8C97A" };
const NEB = 48, LILAC = [201, 184, 255], DEEP = [26, 10, 40];
let nebCanvas = null, nebImage = null;
function nebula(t, angle, color) {
  if (!nebCanvas) { nebCanvas = document.createElement("canvas"); nebCanvas.width = NEB; nebCanvas.height = NEB; nebImage = nebCanvas.getContext("2d").createImageData(NEB, NEB); }
  const d = nebImage.data, half = NEB / 2, sector = Math.PI * 2 / 8;
  for (let yy = 0; yy < NEB; yy++) for (let xx = 0; xx < NEB; xx++) {
    let u = (xx - half) / half, w = (yy - half) / half;
    const r = Math.hypot(u, w);
    let a = Math.atan2(w, u) + angle * 0.5;
    a = ((a % sector) + sector) % sector; a = Math.abs(a - sector / 2);
    u = Math.cos(a) * r; w = Math.sin(a) * r;
    const n = Math.sin(u * 5 + t * 0.7 + Math.sin(w * 4 - t * 0.5) * 1.5) * 0.5 + Math.sin(w * 7 - t * 0.4 + Math.cos(u * 6 + t * 0.3)) * 0.3 + Math.sin(r * 9 - t * 1.2) * 0.2;
    const m = Math.pow(0.5 + 0.5 * n, 2.2), k = (yy * NEB + xx) * 4, edge = Math.max(0, 1 - r), eye = Math.min(1, r / 0.2);
    for (let ch = 0; ch < 3; ch++) d[k + ch] = (DEEP[ch] * (1 - m) + (color[ch] * 0.7 + LILAC[ch] * 0.3) * m) * eye;
    d[k + 3] = 255 * edge;
  }
  nebCanvas.getContext("2d").putImageData(nebImage, 0, 0);
  return nebCanvas;
}
function star(ctx, cx, cy, R, angle, glow, color, scale, flare) {
  if (scale <= 0.01) return;
  const s = R * 0.105 * scale, g = glow * (1 + flare);
  const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 4.5);
  halo.addColorStop(0, rgba([255, 255, 255], 0.9 * g));
  halo.addColorStop(0.22, rgba(color, 0.7 * g));
  halo.addColorStop(1, rgba(color, 0));
  ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(cx, cy, s * 4.5, 0, Math.PI * 2); ctx.fill();
  const ray = (len, a, width, al) => {
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(a);
    const gr = ctx.createLinearGradient(-len, 0, len, 0);
    gr.addColorStop(0, rgba(color, 0)); gr.addColorStop(0.5, rgba([255, 255, 255], al)); gr.addColorStop(1, rgba(color, 0));
    ctx.fillStyle = gr; ctx.fillRect(-len, -width / 2, len * 2, width); ctx.restore();
  };
  const L = s * 7, w = Math.max(0.8, R / 63);
  ray(L, angle * 0.4, w, 0.75 * g);
  ray(L, angle * 0.4 + Math.PI / 2, w, 0.75 * g);
  ray(L * 0.55, angle * 0.4 + Math.PI / 4, w * 0.66, 0.45 * g);
  ray(L * 0.55, angle * 0.4 - Math.PI / 4, w * 0.66, 0.45 * g);
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(-angle * 1.5);
  ctx.fillStyle = rgba([255, 255, 255], 0.95);
  ctx.beginPath(); ctx.moveTo(0, -s); ctx.lineTo(s * 0.45, 0); ctx.lineTo(0, s); ctx.lineTo(-s * 0.45, 0); ctx.closePath(); ctx.fill();
  ctx.restore();
}
function strokeGlyph(ctx, prims, s) {
  ctx.beginPath();
  for (const p of prims) {
    if (p.l) { ctx.moveTo(p.l[0] * s, p.l[1] * s); ctx.lineTo(p.l[2] * s, p.l[3] * s); }
    else if (p.r) ctx.rect(p.r[0] * s, p.r[1] * s, p.r[2] * s, p.r[3] * s);
    else if (p.c) { ctx.moveTo((p.c[0] + p.c[2]) * s, p.c[1] * s); ctx.arc(p.c[0] * s, p.c[1] * s, p.c[2] * s, 0, Math.PI * 2); }
    else if (p.a) { const [cx, cy, r, a0, a1] = p.a; ctx.moveTo((cx + r * Math.cos(a0)) * s, (cy + r * Math.sin(a0)) * s); ctx.arc(cx * s, cy * s, r * s, a0, a1); }
    else if (p.p) { ctx.moveTo(p.p[0] * s, p.p[1] * s); for (let i = 2; i < p.p.length; i += 2) ctx.lineTo(p.p[i] * s, p.p[i + 1] * s); if (p.closed) ctx.closePath(); }
    else if (p.eye) { const [w, h] = p.eye; ctx.moveTo(-w * s, 0); ctx.quadraticCurveTo(0, -h * s, w * s, 0); ctx.quadraticCurveTo(0, h * s, -w * s, 0); ctx.closePath(); }
  }
  ctx.stroke();
}
/* ------------------------------ fim da cópia ------------------------------ */

const MAG = [224, 82, 156], LIL = [201, 184, 255];
export const T_IN = 4.3; const DUR = 1.5;               // a nuvem respira e acende os projetos; depois cai em 1,5 s
const LAND = T_IN + 0.55 + DUR;            // ≈ 6,35 s: nebulosa e estrela nascem
export const INTRO_END = LAND + 1.6;       // clarão apagado: o AtlasOrb assume
export const SHORT_FROM = T_IN - 0.4;      // versão curta (visitas seguintes): começa com os projetos já acesos, pouco antes da queda

// Gravidade: demora a sair, chega rápido, uma acomodada leve além do ponto
function fall(x) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  if (x < 0.78) { const u = x / 0.78; return 1.05 * u * u * u; }
  const u = (x - 0.78) / 0.22;
  return 1 + 0.05 * Math.cos(u * Math.PI * 1.5) * (1 - u);
}
const clamp = (x) => Math.max(0, Math.min(1, x));
const mix = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
function rng(seed) {
  let a = seed;
  return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// Cada lembrança tem destino no orbe: 3 em cada vértice dos 3 sólidos e 1 em cada glifo
const KEYS = Object.keys(GLYPHS);
const PER = 3;
function buildBrain() {
  const rnd = rng(11);
  const inBall = () => {
    const u = rnd() * 2 - 1, th = rnd() * Math.PI * 2, rr = 0.35 + 0.65 * Math.cbrt(rnd());
    return { bx: Math.sqrt(1 - u * u) * Math.cos(th) * rr, by: u * rr, bz: Math.sqrt(1 - u * u) * Math.sin(th) * rr, rr };
  };
  const verts = [];
  SOLIDS.forEach((s, si) => s.verts.forEach((p) => verts.push({ si, p })));
  const nodes = [];
  verts.forEach((_, vi) => { for (let k = 0; k < PER; k++) { const b = inBall(); nodes.push({ kind: "v", vi, ...b, big: rnd() < 0.1, delay: 0.55 * b.rr + 0.18 * rnd(), spin: rnd() * 6 }); } });
  KEYS.forEach((key, gi) => { const b = inBall(); nodes.push({ kind: "g", gi, ...b, big: false, delay: 0.55 * b.rr + 0.18 * rnd(), spin: rnd() * 6 }); });
  // "wire": vira o arame do sólido; "fold": dois nós do mesmo vértice, encolhe até sumir
  const edges = [];
  let base = 0;
  SOLIDS.forEach((s) => {
    s.edges.forEach(([i, j], ei) => edges.push({ kind: "wire", a: (base + i) * PER + (ei % PER), b: (base + j) * PER + ((ei + 1) % PER) }));
    base += s.verts.length;
  });
  verts.forEach((_, vi) => edges.push({ kind: "fold", a: vi * PER + 1, b: vi * PER + 2 }));

  // Os projetos: cada um é uma REGIÃO da mente. Antes da queda acendem um a um, como onda do
  // centro para fora: os atuais em magenta, os futuros em azul-claro, respirando (ainda não são).
  const projects = [
    { c: "#E0529C", future: false }, { c: "#E0529C", future: false },
    { c: "#E0529C", future: false }, { c: "#E0529C", future: false },
    { c: "#9DD8FF", future: true }, { c: "#9DD8FF", future: true },
  ].map((p, i, all) => {
    const yy = 1 - ((i + 0.5) / all.length) * 2, rr = Math.sqrt(1 - yy * yy), tt = i * 2.39996 + 0.7;
    return { ...p, rgb: hexToRgb(p.c), x: Math.cos(tt) * rr * 0.68, y: yy * 0.68, z: Math.sin(tt) * rr * 0.68 };
  });
  nodes.forEach((n) => {
    let best = -1, bd = 0.6;
    projects.forEach((p, j) => { const d = Math.hypot(n.bx - p.x, n.by - p.y, n.bz - p.z); if (d < bd) { bd = d; best = j; } });
    if (best >= 0) { n.proj = best; n.pd = bd; }
  });
  // Constelação de cada projeto: cada membro liga ao membro mais próximo que está mais perto do
  // centro; as linhas CRESCEM para fora com a onda e, na queda, recolhem para a ponta de dentro.
  const projEdges = [];
  projects.forEach((_, j) => {
    const members = nodes.map((n, i) => ({ n, i })).filter((m) => m.n.proj === j).sort((a, b) => a.n.pd - b.n.pd);
    members.forEach((m, idx) => {
      if (!idx) return;
      let best = members[0], bd = Infinity;
      for (let q = 0; q < idx; q++) {
        const o = members[q].n, d = Math.hypot(m.n.bx - o.bx, m.n.by - o.by, m.n.bz - o.bz);
        if (d < bd) { bd = d; best = members[q]; }
      }
      projEdges.push({ a: best.i, b: m.i, j });
    });
  });
  // Os losangos grandes de cada projeto (os que mais aparecem quando ele acende); sem nenhum grande,
  // vale o membro mais perto do centro da região
  projects.forEach((p, j) => {
    const members = nodes.map((n, i) => ({ n, i })).filter((m) => m.n.proj === j).sort((a, b) => a.n.pd - b.n.pd);
    const big = members.filter((m) => m.n.big);
    p.marks = (big.length ? big : members.slice(0, 1)).map((m) => m.i);
  });
  return { verts, nodes, edges, projects, projEdges };
}

// Até onde a luz do projeto chegou nesta lembrança (0..1), sem a acomodada: a linha cresce com isto
function attackOf(n, s) {
  if (n.proj === undefined) return 0;
  return clamp((s - (0.6 + n.proj * 0.55 + n.pd * 0.5)) / 0.28);
}
// Quanto a lembrança está acesa: ataque rápido, pico e um brilho estável que ela leva para a queda
function litOf(n, s, projects) {
  if (n.proj === undefined) return 0;
  const x = (s - (0.6 + n.proj * 0.55 + n.pd * 0.5)) / 0.28;
  if (x <= 0) return 0;
  let v = Math.min(1, x) * (x > 1 ? 0.55 + 0.45 * Math.exp(-(x - 1) * 0.9) : 1);
  if (projects[n.proj].future) v *= 0.72 + 0.28 * Math.sin(s * 2.6 + n.proj * 1.7);
  return v;
}

function diamond(ctx, x, y, r, rot) {
  ctx.beginPath();
  for (let i = 0; i < 4; i++) { const a = rot + i * Math.PI / 2; const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py); }
  ctx.closePath(); ctx.stroke();
}

// Cria a intro. draw() devolve false quando acabou; angle() é o ângulo do orbe no fim (para o AtlasOrb seguir dele).
// "from" pula o começo (em segundos): 0 é a versão completa, SHORT_FROM a curta.
export function createIntro(from = 0) {
  const { verts, nodes, edges, projects, projEdges } = buildBrain();
  let start = -1, last = 0, yaw = 0, skipAt = -1, current = from, projectPts = [];
  const brainScale = 290 / 92;   // raio da nuvem em relação ao do orbe (protótipo: 290 para R = 92)

  function draw(ctx, cx, cy, R, now, w, h) {
    if (start < 0) { start = now; last = from; }
    let s = from + (now - start) / 1000;
    if (skipAt >= 0) s = INTRO_END;       // pular: vai direto ao estado final (sem esmaecer nada)
    current = s;
    if (s >= INTRO_END) return false;
    const dt = Math.min(0.1, Math.max(0, s - last)); last = s;
    const t = now / 1000;                  // mesmo relógio do AtlasOrb (respiração e nebulosa)
    // A perspectiva encolhe a nuvem (fator ≤ 0,77 na frente): 0,62 do menor lado cabe no canvas
    const RAD = Math.min(R * brainScale, Math.min(w, h) * 0.62);
    const breath = Math.sin(t / 5.2 * Math.PI * 2);
    const glow = 0.85 * (1 + 0.1 * breath);
    const angle = 0.18 * s;

    const ks = nodes.map((n) => fall((s - T_IN - n.delay) / DUR));
    const meanK = ks.reduce((acc, k) => acc + clamp(k), 0) / ks.length;
    // Momento angular: a nuvem gira mais rápido ao encolher
    const spread = 1 - 0.75 * meanK;
    yaw += Math.min(3.2, 0.3 / (spread * spread)) * dt;
    const ca = Math.cos(yaw), sa = Math.sin(yaw);
    const cloudBreath = 1 + 0.025 * Math.sin(s * 1.6);

    const orbV = verts.map((v) => {
      const sol = SOLIDS[v.si];
      const q = rotate(v.p, angle * sol.ax[0] * 1.3, angle * sol.ax[1] * 1.3, angle * sol.ax[2] * 1.3);
      const r = R * sol.r * (1 + 0.035 * breath), sc = 4 / (4 + q[2]);
      return { x: cx + q[0] * r * sc, y: cy + q[1] * r * sc, z: q[2] };
    });
    const nG = KEYS.length;
    const orbG = KEYS.map((_, i) => {
      const yy = 1 - ((i + 0.5) / nG) * 2, rr = Math.sqrt(1 - yy * yy), tt = i * 2.39996;
      const p = rotate([Math.cos(tt) * rr, yy, Math.sin(tt) * rr], angle * 0.39, angle * -0.52, angle * 1.3);
      const sc = 4 / (4 + p[2]);
      return { x: cx + p[0] * R * 1.16 * sc, y: cy + p[1] * R * 1.16 * sc, depth: (p[2] + 1) / 2 };
    });
    const pos = nodes.map((n, i) => {
      const X = n.bx * ca + n.bz * sa, Z = -n.bx * sa + n.bz * ca, sc = 1 / (1.9 - Z * 0.6);
      const bx = cx + X * RAD * sc * cloudBreath, by = cy + n.by * RAD * sc * cloudBreath;
      const o = n.kind === "v" ? orbV[n.vi] : orbG[n.gi];
      const k = ks[i];
      return { x: bx + (o.x - bx) * k, y: by + (o.y - by) * k, Z, k: clamp(k), o, lit: litOf(n, s, projects), att: attackOf(n, s) };
    });
    // Onde estão os losangos grandes dos projetos neste quadro (giram com a mente) (a construção da página tira os feixes daqui)
    projectPts = projects.flatMap((p) => p.marks.map((i) => ({ x: pos[i].x, y: pos[i].y, lit: pos[i].lit, future: p.future })));
    // Enquanto os projetos acendem, o resto da mente recua um pouco
    const hush = 0.4 * clamp((s - 0.6) / 3.2);

    // Nebulosa e estrela nascem do centro quando as lembranças pousam (crescem, não aparecem)
    const grow = fall((s - LAND + 0.35) / 0.8);
    const flare = s > LAND ? 1.1 * Math.exp(-(s - LAND) / 0.45) : 0;
    if (grow > 0.01) {
      const neb = nebula(t, angle, MAG), nr = R * 0.84 * Math.min(1.05, grow);
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, nr, 0, Math.PI * 2); ctx.clip();
      ctx.globalAlpha = 0.35 * Math.min(1, glow); ctx.imageSmoothingEnabled = true;
      ctx.drawImage(neb, cx - nr, cy - nr, nr * 2, nr * 2); ctx.restore();
    }

    const previous = ctx.globalCompositeOperation;
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";
    const wireW = Math.max(0.6, Math.min(1.1, R / 40));
    for (const e of edges) {
      const A = pos[e.a], B = pos[e.b];
      const brainA = (0.05 + 0.12 * ((A.Z + B.Z) / 2 + 1) / 2) * (1 - hush) + 0.25 * Math.min(A.lit, B.lit), kk = Math.min(A.k, B.k);
      let alpha, width;
      if (e.kind === "wire") {
        const dz = (A.o.z + B.o.z) / 2;
        const orbA = (0.3 + 0.5 * (dz + 1) / 2) * (0.55 + 0.5 * glow);
        alpha = brainA + (orbA - brainA) * kk; width = 0.7 + (wireW - 0.7) * kk;
      } else { alpha = brainA * (1 - kk); width = 0.7; }
      if (alpha < 0.01) continue;
      ctx.strokeStyle = rgba(MAG, alpha); ctx.lineWidth = width;
      ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
    }
    for (const e of projEdges) {
      const A = pos[e.a], B = pos[e.b];
      const reach = B.att * (1 - clamp(Math.max(A.k, B.k) * 1.8));
      if (reach < 0.02) continue;
      const ex = A.x + (B.x - A.x) * reach, ey = A.y + (B.y - A.y) * reach;
      ctx.strokeStyle = rgba(projects[e.j].rgb, 0.2 + 0.55 * Math.max(A.lit, B.lit));
      ctx.lineWidth = 0.9;
      ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(ex, ey); ctx.stroke();
    }
    nodes.forEach((n, i) => {
      const P = pos[i], k = P.k, lit = P.lit;
      const shrink = Math.pow(1 - k, 0.8);
      if (shrink > 0.02) {
        const size = (n.big ? 4.6 : 2.4) * (1 + P.Z * 0.3) * (1 + 0.45 * lit) * shrink;
        const target = n.kind === "v" ? MAG : hexToRgb(FAMILY_COLOR[GLYPHS[KEYS[n.gi]].family]);
        let col = n.big ? MAG : LIL;
        if (lit > 0) col = mix(col, projects[n.proj].rgb, lit);
        col = mix(col, target, k);
        const a0 = (0.35 + 0.45 * (P.Z + 1) / 2) * (1 - hush);
        if (lit > 0.05) {
          ctx.fillStyle = rgba(col, 0.2 * lit * shrink);
          ctx.beginPath(); ctx.arc(P.x, P.y, size * 2.6, 0, Math.PI * 2); ctx.fill();
        }
        ctx.strokeStyle = rgba(col, a0 + (0.98 - a0) * lit);
        ctx.lineWidth = 1 + 0.3 * lit;
        diamond(ctx, P.x, P.y, size, Math.PI / 4 + s * 0.5 + n.spin);
      }
      if (n.kind === "g" && k > 0.02) {
        const g = GLYPHS[KEYS[n.gi]], d = P.o.depth;
        const alpha = 0.28 * (0.45 + 0.55 * d) * (0.4 + 0.6 * k);
        ctx.save(); ctx.translate(P.x, P.y);
        ctx.strokeStyle = rgba(hexToRgb(FAMILY_COLOR[g.family]), alpha);
        ctx.lineWidth = 1.25; ctx.lineJoin = "round";
        strokeGlyph(ctx, g.prims, R * 0.053 * Math.pow(k, 1.4));
        ctx.restore();
      }
    });
    star(ctx, cx, cy, R, angle, glow, MAG, Math.max(0, grow) * (1 + 0.04 * breath), flare);
    ctx.globalCompositeOperation = previous;
    return true;
  }

  return {
    draw,
    skip() { skipAt = 1; },
    angle() { return 0.18 * INTRO_END; },
    time() { return current; },
    projectPoints() { return projectPts; },   // em px do canvas   // segundos da intro (a construção da página segue este relógio)
  };
}
