// Efeitos: entrada ao rolar, sons de interface (sempre ligados) e "segurar E" no botão do topo.
// Os sons são sintetizados com Web Audio: não há arquivos de áudio.
const HOLD_MS = 600;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const sound = {
  audio: null,
  unlocked: false,
  lastHover: 0,
  // O navegador só libera áudio depois do primeiro clique ou tecla do visitante
  init() {
    const unlock = () => {
      this.unlocked = true;
      this.context().resume();
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
  },
  context() {
    if (!this.audio) this.audio = new (window.AudioContext || window.webkitAudioContext)();
    return this.audio;
  },
  // Um tom curto com envelope; frequência pode deslizar de "from" para "to"
  tone(from, to, duration, volume, type = "sine") {
    if (!this.unlocked) return;
    const ctx = this.context();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.type = type;
    osc.frequency.setValueAtTime(from, now);
    osc.frequency.exponentialRampToValueAtTime(to, now + duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  },
  hover() {
    const now = performance.now();
    if (now - this.lastHover < 70) return;
    this.lastHover = now;
    this.tone(1900, 2400, 0.045, 0.025);
  },
  click() {
    this.tone(660, 990, 0.12, 0.05, "triangle");
  },
  confirm() {
    this.tone(520, 1040, 0.22, 0.06, "triangle");
  }
};

function setupReveal() {
  const targets = document.querySelectorAll(".hero > div:first-child > *, .section-title, .item, .step, .contact, .intro > div");
  if (reduceMotion || !("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  targets.forEach((el) => {
    // Escalona irmãos (fichas lado a lado entram uma após a outra)
    const index = [...el.parentElement.children].indexOf(el);
    el.style.transitionDelay = `${Math.min(index, 4) * 90}ms`;
    el.classList.add("reveal");
    observer.observe(el);
  });
}

function setupInteractionSounds() {
  document.querySelectorAll(".item, .btn, .nav-links a, .item-foot, .lang-toggle, .demo-close, .orb-what").forEach((el) => {
    el.addEventListener("pointerenter", () => sound.hover());
  });
  document.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) sound.click();
  });
}

// Segurar E enche o botão do topo e, ao completar, faz o mesmo que o clique (abre o chat ou, sem ele, o WhatsApp)
function setupHoldToConfirm() {
  const button = document.querySelector(".btn-hold");
  if (!button) return;
  let start = null;
  let frame = null;
  const reset = () => {
    start = null;
    cancelAnimationFrame(frame);
    button.style.setProperty("--hold", 0);
  };
  const go = () => {
    reset();
    sound.confirm();
    // Com o chat (chat.js) montado, o botão abre o chat
    if (button.hasAttribute("data-chat-open") && document.querySelector(".chat")) return button.click();
    if (button.getAttribute("href") === "#") return;
    // Com "noopener" o window.open sempre devolve null; por isso o opener é cortado à mão.
    // Se o navegador bloquear a nova aba, abre na mesma.
    const tab = window.open(button.href, "_blank");
    if (tab) tab.opener = null;
    else window.location.href = button.href;
  };
  const tick = (time) => {
    const progress = Math.min((time - start) / HOLD_MS, 1);
    button.style.setProperty("--hold", progress);
    if (progress >= 1) return go();
    frame = requestAnimationFrame(tick);
  };
  document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() !== "e" || event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.target.closest("input, textarea, select, [contenteditable]")) return;
    // Sem animação (movimento reduzido ou sem o botão): vai direto
    if (reduceMotion) return go();
    start = performance.now();
    sound.tone(300, 900, HOLD_MS / 1000, 0.03);
    frame = requestAnimationFrame(tick);
  });
  document.addEventListener("keyup", (event) => {
    if (event.key.toLowerCase() === "e" && start !== null) reset();
  });
}

sound.init();
