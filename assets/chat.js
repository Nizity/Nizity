// Chat do site que termina no WhatsApp: a pessoa escreve aqui e a mensagem abre pronta no WhatsApp.
// Nada é guardado nem enviado a servidor. Em tela larga fica aberto no canto inferior direito; no resto, os botões
// de orçamento ([data-chat-open]) abrem o painel (no celular, de baixo para cima). Sem JS, eles vão direto ao WhatsApp.
// Depende de translations (i18n.js) e CONTACT (main.js).
(() => {
  if (!CONTACT.whatsapp) return;
  const docked = window.matchMedia("(min-width: 1880px)");
  const dict = () => translations[document.documentElement.lang === "en" ? "en" : "pt"];

  const root = document.createElement("aside");
  root.className = "chat";
  root.innerHTML = `
    <div class="chat-panel" id="chat-panel" role="region" aria-labelledby="chat-title">
      <div class="chat-head">
        <span class="diamond" aria-hidden="true"></span>
        <div><p class="chat-title" id="chat-title">Guilherme</p><p class="chat-sub" data-chat="sub"></p></div>
        <button class="chat-close" type="button" data-chat-label="close" aria-label="">×</button>
      </div>
      <div class="chat-log"><p class="chat-msg" data-chat="hello"></p></div>
      <div class="chat-quick">
        <button type="button" data-quick="q1" data-chat="q1"></button>
        <button type="button" data-quick="q2" data-chat="q2"></button>
        <button type="button" data-quick="q3" data-chat="q3"></button>
      </div>
      <form class="chat-form">
        <label class="sr-only" for="chat-text" data-chat="label"></label>
        <textarea id="chat-text" rows="2" maxlength="1000" data-chat-placeholder="placeholder"></textarea>
        <button class="chat-send" type="submit" disabled data-chat-label="send" aria-label=""><span aria-hidden="true">→</span></button>
      </form>
      <p class="chat-note" data-chat="note"></p>
    </div>`;
  document.body.append(root);

  let opener = null;
  const text = root.querySelector("#chat-text");
  const send = root.querySelector(".chat-send");

  const render = () => {
    const d = dict();
    root.setAttribute("aria-label", d["chat.region"]);
    root.querySelectorAll("[data-chat]").forEach((el) => { el.textContent = d[`chat.${el.dataset.chat}`]; });
    root.querySelectorAll("[data-chat-label]").forEach((el) => el.setAttribute("aria-label", d[`chat.${el.dataset.chatLabel}`]));
    text.placeholder = d["chat.placeholder"];
  };

  const setOpen = (open) => {
    root.classList.toggle("is-open", open);
    if (!open && opener) { opener.focus(); opener = null; }
  };

  // Orbe da home "ouvindo" enquanto a pessoa escreve (orb-mount.js escuta este evento)
  let typingTimer = 0;
  const typing = (active) => document.dispatchEvent(new CustomEvent("nizity:chat-typing", { detail: active }));

  document.querySelectorAll("[data-chat-open]").forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    if (!docked.matches) opener = link;
    setOpen(true);
    // Nas páginas de serviço o botão já começa a frase com o serviço; a pessoa completa
    if (link.dataset.chatText && !text.value.trim()) {
      text.value = dict()[link.dataset.chatText];
      text.dispatchEvent(new Event("input"));
    }
    text.focus();
    text.setSelectionRange(text.value.length, text.value.length);
  }));
  root.querySelector(".chat-close").addEventListener("click", () => setOpen(false));
  root.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !docked.matches) setOpen(false);
  });

  // Atalhos só preenchem o texto; a pessoa completa com os detalhes antes de enviar
  root.querySelectorAll("[data-quick]").forEach((button) => button.addEventListener("click", () => {
    text.value = dict()[`chat.${button.dataset.quick}.text`];
    text.dispatchEvent(new Event("input"));
    text.focus();
    text.setSelectionRange(text.value.length, text.value.length);
  }));

  text.addEventListener("input", () => {
    send.disabled = !text.value.trim();
    typing(true);
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => typing(false), 2500);
  });
  text.addEventListener("blur", () => { clearTimeout(typingTimer); typing(false); });
  // Enter envia; Shift+Enter quebra a linha
  text.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); root.querySelector(".chat-form").requestSubmit(); }
  });

  root.querySelector(".chat-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const message = text.value.trim();
    if (!message) return;
    const full = `${dict()["chat.prefix"]} ${message}`;
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(full)}`, "_blank", "noopener");
    text.value = "";
    send.disabled = true;
    typing(false);
  });

  const applyDock = () => {
    root.classList.toggle("is-docked", docked.matches);
    setOpen(docked.matches);
  };
  docked.addEventListener("change", applyDock);
  document.addEventListener("nizity:langchange", render);
  render();
  applyDock();
})();
