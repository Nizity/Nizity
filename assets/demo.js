// Prévia em vídeo dos projetos: o botão "Ver funcionando" abre uma janela com o vídeo do app.
// Projeto sem vídeo cadastrado mostra "Vídeo em breve". Para ativar um vídeo novo,
// coloque o arquivo em assets/videos/ e acrescente uma linha aqui.
// Dois formatos: WebM (VP9) primeiro; MP4 (H.264) para Safari/iPhone. O navegador usa o que tocar.
const DEMO_VIDEOS = {
  salao: { webm: "assets/videos/salao.webm", mp4: "assets/videos/salao.mp4", poster: "assets/videos/salao.jpg" }
};

function setupDemo() {
  const dialog = document.getElementById("demo");
  if (!dialog) return;
  const title = document.getElementById("demo-title");
  const video = document.getElementById("demo-video");
  const soon = document.getElementById("demo-soon");

  document.querySelectorAll(".demo-open").forEach((button) => {
    button.addEventListener("click", () => {
      const demo = DEMO_VIDEOS[button.dataset.video];
      const heading = button.closest(".item").querySelector("h3");
      title.textContent = heading ? heading.textContent : "";
      video.hidden = !demo;
      soon.hidden = Boolean(demo);
      if (demo) {
        // Só baixa o vídeo quando alguém pede para ver
        if (video.dataset.current !== button.dataset.video) {
          video.dataset.current = button.dataset.video;
          video.poster = demo.poster;
          video.replaceChildren(
            ...[["webm", "video/webm"], ["mp4", "video/mp4"]]
              .filter(([key]) => demo[key])
              .map(([key, type]) => Object.assign(document.createElement("source"), { src: demo[key], type }))
          );
          video.load();
        }
        video.currentTime = 0;
      }
      dialog.showModal();
      if (demo) video.play().catch(() => { /* navegador bloqueou: os controles continuam lá */ });
    });
  });

  document.getElementById("demo-close").addEventListener("click", () => dialog.close());
  // Clique fora do conteúdo (no fundo escurecido) fecha
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => video.pause());
}

setupDemo();
