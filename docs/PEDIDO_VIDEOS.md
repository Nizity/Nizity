# PEDIDO_VIDEOS.md — Vídeos de prévia para o nizity.com

> Pedido da sessão do site (2026-09-24). Cole o bloco do seu projeto na sessão do Claude que cuida dele, no PC do fundador.

## Onde o vídeo aparece

Na página `nizity.com/projects.html`, cada projeto tem o botão **"Ver funcionando"**. Ele abre uma janela com o vídeo em loop, sem som. Hoje só o Salão tem vídeo; Núcleo e Coleta de campo mostram "Vídeo em breve".

## Formato (vale para os dois)

- **Duração:** 15 a 30 segundos, mostrando **um** fluxo do começo ao fim.
- **Tamanho:** 1280×720 (16:9), 30 fps, **sem áudio**, com menos de 5 MB.
- **Arquivos:**
  - `<nome>.webm`: VP9, é o formato principal;
  - `<nome>.mp4`: H.264, `yuv420p`, `+faststart`, para o Safari e o iPhone;
  - `<nome>.jpg`: a capa, um quadro representativo.
- Converter a partir de uma gravação qualquer (OBS ou a Barra de Jogo do Windows, com Win+Alt+R):
  ```
  ffmpeg -i gravacao.mp4 -t 30 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30" -an -c:v libx264 -crf 26 -pix_fmt yuv420p -movflags +faststart <nome>.mp4
  ffmpeg -i <nome>.mp4 -c:v libvpx-vp9 -b:v 0 -crf 38 -an <nome>.webm
  ffmpeg -ss 5 -i <nome>.mp4 -frames:v 1 -q:v 4 <nome>.jpg
  ```

## Privacidade (obrigatório, revisar quadro a quadro antes de entregar)

- Só **dados fictícios**.
- Nada de:
  - nome de usuário do Windows ou caminho de pasta (`C:\Users\...`);
  - e-mail ou telefone;
  - notificações, abas ou janelas pessoais;
  - tokens, chaves ou arquivos `.env`;
  - logs com IP.
- Gravar só a janela do app, e não a tela inteira. Desligar as notificações durante a gravação.
- Na dúvida, desfocar ou cortar.

## Entrega

- Nomes dos arquivos: `nucleus.*` (Núcleo) e `field.*` (Coleta de campo).
- **Opção A:** fazer um commit num branch do `Nizity/Nizity`, com os arquivos em `assets/videos/` e uma linha em `DEMO_VIDEOS`, no `assets/demo.js`:
  ```js
  nucleus: { webm: "assets/videos/nucleus.webm", mp4: "assets/videos/nucleus.mp4", poster: "assets/videos/nucleus.jpg" },
  ```
- **Opção B:** entregar os 3 arquivos ao fundador, que os repassa à sessão do site.

---

## Bloco para a sessão do Núcleo

> Preciso de um vídeo curto do Núcleo funcionando para o portfólio (nizity.com). O que mostrar: o fundador faz uma pergunta por voz e o Núcleo responde, com o orbe mudando de estado (ouvindo → pensando → falando) e, se possível, uma capacidade em uso aparecendo como glifo. Mostrar só a janela do Núcleo, com uma conversa inventada. O formato, as regras de privacidade e a entrega estão em `docs/PEDIDO_VIDEOS.md` do repo `Nizity/Nizity` (arquivos `nucleus.webm`, `nucleus.mp4` e `nucleus.jpg`).

## Bloco para a sessão da Coleta de dados em campo

> Preciso de um vídeo curto do app de coleta em campo para o portfólio (nizity.com). O que mostrar: no celular ou no emulador, **sem internet**, preencher um formulário e salvar; o item aparece como "pendente". Depois a internet volta e ele sincroniza sozinho. Use dados e cliente fictícios, sem marca de cliente real. O formato, as regras de privacidade e a entrega estão em `docs/PEDIDO_VIDEOS.md` do repo `Nizity/Nizity` (arquivos `field.webm`, `field.mp4` e `field.jpg`).
