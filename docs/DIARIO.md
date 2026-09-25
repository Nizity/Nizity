# DIARIO.md — Diário de bordo (entradas recentes no topo)

## 2026-09-24 — Sessão na nuvem (claude.ai/code, Opus 5.5)

**Feito**
- Repo `Nizity/Nizity` estava vazio (sem commits). Criado branch `claude/oi-b1cjau` com site estático bilíngue PT/EN: `index.html`, `assets/`, `CNAME` (nizity.com), `.nojekyll`, README.
- Verificação: screenshots via Playwright em 1280px (PT) e 390px (EN), sem rolagem horizontal, troca de idioma funcionando. Único erro de console: fonte do Google bloqueada pelo proxy do sandbox (não é do site).
- Lidos os documentos da Base enviados pelo fundador: BASE, FRONTEND, BACKEND, PRODUTO, CLAUDE, APRENDIZADOS, GAME (não se aplica), PROMPT_BASE, SUGESTOES_DO_NUCLEO, e, **só como contexto, sem trazer ao repo**, EMPRESA, PROMPT_EMPRESA e VISAO.
- Criados: `CLAUDE.md`, `docs/NIZITY_COM_CONTEXTO.md`, `docs/PLANO.md` (rascunho), `docs/MODULOS_FUTUROS.md`, `docs/SALAO_ROTEIRO_ENTREVISTA.md`, este diário.

**Desvios da Base nesta sessão (registrados, não escondidos)**
- Site construído **antes** de plano aprovado. Textos genéricos de "empresa", escritos antes de saber que o site é portfólio. Tratar como rascunho visual (D3).
- Primeiros 2 commits com mensagem em inglês e o 1º com `git add -A`. Corrigido dali em diante.
- Portão de push: o núcleo da Base exige confirmação para push **em produção**. Push no branch de trabalho `claude/oi-b1cjau` é permitido (a sessão na nuvem precisa dele para não perder trabalho). Corrigida no CLAUDE.md uma versão mais restrita que eu tinha escrito.
- Landing feita no Code. Pela regra da casa, visual é do Claude Design.

**Achados para levar adiante**
- **Domínio (D6):** nizity.com registrado em 2026-09-21, DNS Cloudflare. Base (28/07) e EMPRESA.md/VISAO.md (15/09) ainda dizem "não registrado". → Confirmado pelo fundador nesta sessão. Falta avisar os chats da Base e da Empresa.
- **Para o chat da Base (entrada, não regra):** o PROMPT_BASE aponta para `C:\Users\Funbio\...`, que não existe em sessão na nuvem (claude.ai/code). Nesses casos, a Base só chega se estiver no repo ou colada. Aqui, a saída foi um resumo datado no `CLAUDE.md` com "a Base ganha se divergir". Vale a Base prever isso.
- **Para o chat da Empresa:** vender serviços pelo portfólio dispara o gatilho de formalização (MEI/CNPJ) descrito na VISAO. Levar ao contador antes do primeiro cliente.
- Salão é uma 5ª frente, fora da VISAO. Ordem de ataque é decisão do fundador (D5).

**Portfólio (mesma sessão)**
- Domínio confirmado pelo fundador (D6). Regra nova: código em inglês, só comentários em PT (D9). IDs de seção renomeados para inglês.
- Site reescrito: Hero pessoal, Sobre + stack, 4 projetos (descritos sem nome interno), 3 pacotes de serviço "sob consulta", Como funciona, Contato. Textos separados em `assets/i18n.js`.
- Contraste AA: roxo primário trocado de `#6366f1` (4,47:1 sobre branco) para `#4f46e5`; tokens próprios para o tema escuro.
- Bug corrigido: `.btn` sobrescrevia o atributo `hidden` e o botão do WhatsApp aparecia sem número.
- Evidência: screenshots 1280px PT claro e 390px EN escuro, sem rolagem horizontal, sem erro de página, todas as chaves de tradução presentes nos dois idiomas.

**Redesign V2 (mesma sessão)**
- 9 mockups (A–F, D em 4 cores, V1–V3) + referências reais (estúdios europeus/japoneses, carros, tecnologia, café, jogos). Escolhido V2 (Destiny 2) em violeta. Laranja rejeitado pelo fundador.
- Implementado: `index.html` + `projects.html`, CSS em 4 arquivos com tokens, fontes locais, orbe do Núcleo pela especificação real (em demonstração), tecla E → contato, localização removida.
- Barras dos serviços **sem números** (eram inventados); losangos viraram vantagens com nome.
- Evidência: Playwright nas 2 páginas × desktop/mobile × PT/EN sem erro, sem rolagem horizontal, sem chave de tradução faltando, fontes carregadas; **axe-core WCAG A/AA: 0 violações**; tecla E, persistência de idioma e menu mobile testados.
- Pendência: cores dos estados do orbe que a especificação não detalha (ouvindo, lembrando, lendo, olhando, agindo, delegando, concluído) foram escolhidas por mim; confirmar com a sessão do Núcleo.
- Desvio consciente: visual feito no Code com mockups, não no Claude Design.

**Publicação e orbe novo (mesma sessão)**
- Site no ar: Worker `nizity` na Cloudflare; nizity.com com DNS, HTTPS e cabeçalhos de segurança conferidos. Pendências do fundador: `www`, "Sempre usar HTTPS", produção no `main`, branch padrão do GitHub, repositório e perfil privados, desligar o `workers.dev`.
- A pedido do fundador: faixa "produtos próprios" removida, som sempre ligado (sem botão), e-mail fora do site, só 2 projetos.
- Orbe novo recebido da sessão do Núcleo (sólidos de arame, nebulosa, estrela, glifos das capacidades) e contrato com `capability`. Integrado sem editar o código do app; demonstração com estados e capacidades; legenda com capacidade em uso e glifo sob o mouse, em PT/EN.
- Evidência: Playwright (2 páginas × desktop/mobile × PT/EN) sem erro; axe-core 0 violações; CSP testada (inclusive com o Web Analytics liberado); orbe desenha, troca de estado e de capacidade nos dois idiomas.

**Menu e contato (mesma sessão)**
- Menu reduzido a logo + Projetos (ou Início) + botão "Orçamento"; saem Serviços, Processo, Contato e o menu hambúrguer.
- Botões de contato com funções distintas: topo e tecla E abrem o WhatsApp; cada ficha abre o WhatsApp com a mensagem do pacote ("Quero este"); preço vira selo na ficha; seção "Vamos conversar?" sai da home (fica em projetos).
- Evidência: Playwright 2 páginas × desktop/mobile × PT/EN, cabeçalho cabe em 390 px, sem âncora quebrada, mensagens do WhatsApp corretas por pacote, segurar E abre uma aba só; axe 0 violações.

**Salão aprovado (mesma sessão)**
- Decisões do fundador: D4 = stack da Base; D5 = o Salão anda junto com o Núcleo; D16 = comanda → cozinha + cardápio QR só para consulta.
- **Desvio consciente:** construir o Salão **sem validar** com restaurantes (a Fase 2 do PLANO foi pulada). Risco: construir algo que ninguém usa. Gatilho para rever: o primeiro restaurante que testar. O Claude discordou e registrou.
- Discordância no escopo: o cardápio QR é uma segunda dor. Solução combinada: ele só entra depois que a comanda → cozinha funcionar.
- Criado `docs/SALAO_CONTEXTO.md`. O código vai para um repo próprio e privado; criar o repo pede confirmação do fundador.
- Pergunta do fundador: o site não depende do PC dele (Cloudflare + GitHub). Só o orbe ao vivo, no futuro, usa o PC, e sem sinal ele cai para demonstração.

**Salão: fatias 1 e 2 (mesma sessão)**
- O código está em `/home/user/salao` no container, **sem push**: o GitHub recusou criar o repositório (403, o app não tem permissão). O fundador precisa criar o `Nizity/salao` privado e dar acesso ao Claude. Até lá, o trabalho se perde se o container for reciclado.
- Fatia 1: login por restaurante, equipe, cardápio e mesas; tela do dono.
- Fatia 2: comanda do garçom → telão da cozinha por WebSocket (token na 1ª mensagem, não na URL), aviso de pronto com vibração e bipe, reconexão automática com o retrato das comandas abertas. Item já pedido é arquivado, não apagado; nome e preço ficam copiados na comanda.
- Evidência:
  - pytest: 25/25, com isolamento de pedidos e do WebSocket entre restaurantes;
  - Playwright: 5/5, com o pedido chegando à cozinha em 89–104 ms e o aviso de pronto ao garçom em 122–135 ms (requisito: < 2 s), e a reconexão testada derrubando o WebSocket de verdade;
  - axe sem violações;
  - 390 px sem rolagem horizontal;
  - migrações do Alembic aplicadas, desfeitas e aplicadas de novo.
- Limite conhecido: o canal em tempo real vive na memória de um processo. Com mais de um servidor, é preciso trocar por LISTEN/NOTIFY do Postgres.

**Prévia em vídeo dos projetos (mesma sessão)**
- A pedido do fundador, cada projeto ganhou o botão "Ver funcionando", que abre uma janela com um vídeo curto (esboço; o visual vem depois). O Salão entrou como 3º projeto (NZ-02).
- Vídeo do Salão gravado aqui com Playwright: garçom e cozinha lado a lado, dados fictícios, 13,5 s, cerca de 145 KB por formato. Núcleo e campo mostram "Vídeo em breve"; o pedido para as sessões do PC está em `docs/PEDIDO_VIDEOS.md`.
- Achado: o Chromium de teste não toca H.264. Por isso o vídeo vai em **WebM (VP9) + MP4 (H.264)**, e o navegador escolhe o formato.
- Evidência: Playwright com desktop/celular × PT/EN, 2 rodadas. O vídeo toca, pausa ao fechar, fecha com Esc, com o clique fora e com o botão; o "em breve" aparece nos outros 2; sem rolagem horizontal; axe 0 violações com a janela aberta e fechada; sem erro de console nem de CSP.
- Para o design: no celular, o vídeo lado a lado fica pequeno. Fazer uma versão vertical, só com a tela do garçom.

**Salão, Fatia 3 e vazamento no site (mesma sessão)**
- Fatia 3: cardápio público `/m/<token>` (sem login, só consulta, "em falta" riscado) e PDF com uma página A4 por mesa e o QR em vetor. O QR antigo deixa de valer quando o dono gera um novo.
- Evidência:
  - pytest 31/31;
  - Playwright 6/6 (PDF, cardápio no celular sem login, em falta refletindo, QR antigo inválido; axe 0);
  - os 6 QRs do PDF foram renderizados e **lidos com um decodificador de QR**, todos com a URL certa.
- Erro meu, corrigido: o `conftest` herdava `SALAO_DATABASE_URL` e apagou as tabelas do banco de e2e. Agora os testes só rodam em banco com "test" no nome.
- **Vazamento em produção, corrigido com o OK do fundador:** a Cloudflare publicava a pasta inteira do repo, e `nizity.com/.git/` (histórico completo, incluindo o commit antigo com o Gmail) e `nizity.com/docs/*` estavam acessíveis. Resolvido pelo `.assetsignore`. Quem baixou antes pode ter uma cópia, então vale considerar o histórico como público.
- O Salão continua sem push (13 commits só no container). Na fila: design do Salão e design da prévia em vídeo.

**Ajustes pedidos pelo fundador (mesma sessão)**
- "Dev Full-Stack" / "full-stack" saiu de todo lugar (título da aba e descrições das duas páginas, PT/EN).
- A legenda do orbe (Núcleo, estado, capacidade) saiu. No lugar entrou o botão "O que é isso? →", que leva a `projects.html#nucleus`; o cartão do Núcleo acende uma vez ao chegar.
- **Versão clara "Lavanda"** (cinza-lilás, não branco), escolhida entre 2 propostas. Segue o tema do sistema do visitante, e o botão ☀/☾ ao lado do idioma troca e guarda a escolha (`assets/theme.js`, carregado no `<head>` para não piscar). O orbe funciona bem no claro, sem mudar o código do app.
- Evidência: Playwright com 2 páginas × desktop/celular × claro/escuro × PT/EN. Tema certo pelo sistema, botão troca e persiste entre páginas, cabeçalho cabe a 390 px, axe 0 violações nos dois temas, sem erro nem CSP.

**Salão: design, telão e demo interativa (mesma sessão)**
- Design com temas à escolha: cada aparelho tem o botão ☀/☾ (garçom abre em Lavanda, cozinha em Escuro), e o dono escolhe o tema do cardápio do QR (Quente, Lavanda ou Escuro; padrão Quente). Mockups antes, com o axe OK nas 15 telas.
- Observação do fundador: o telão fica no alto, ninguém alcança para tocar. O telão virou **só exibição** (`/turno/telao`) e os botões foram para o **Controle da cozinha** (tablet ou celular na bancada), em tempo real.
- A prévia do Salão deixou de ser vídeo e virou uma **demo interativa** em `nizity.com/demo/salao/`: o próprio app com uma API simulada no navegador (sem servidor, sem custo, nada sai do aparelho) e um tour de 9 passos. Núcleo e campo continuam com vídeo (simular seria enganar).
- Evidência:
  - Salão: pytest 32/32 e Playwright 9/9 (inclui o telão sem botões seguindo o controle);
  - demo: tour completo no computador (PT) e no celular (EN), com axe 0, sem requisição externa e sem erro ou CSP;
  - site: link, idioma herdado, voltar ao site, "em breve" nos outros dois, axe 0.
- Reforço: o backend recusa segredo JWT com menos de 32 caracteres.
- O Salão continua **sem push** (21 commits só no container). O `Nizity/salao` ainda não existe.

**Salão salvo no GitHub (2026-09-25)**
- O fundador criou o `Nizity/salao` (privado). Os 23 commits foram enviados ao `main` e conferidos pela API: mesmo hash no topo (`1490551`) e visibilidade `private`. Antes do push, a checagem de segredos no histórico não achou nada (só as senhas falsas dos testes e a do Postgres local).
- Perfil do GitHub privado e e-mail escondido, pelo fundador.

**Divisão de trabalho nuvem × PC (2026-09-25)**
- Decisão do fundador: **esta sessão (nuvem) cuida do código** do Salão e do Arena. O PC fica com o que só ele faz: rodar no aparelho (A57), APK, túnel e testes no hardware.
- Transporte: **código pelo GitHub**; instruções, imagens e APKs pelo **Google Drive**, na pasta "Nizity — para o PC" (subpastas `arena/` e `salao/`). Segredo não vai por nenhum dos dois.
- Portas no PC: 8000 = campo, 8010 = Arena, 8020 = Salão (a API e o Postgres do Salão ficaram configuráveis).
- Instruções em `docs/pc/` e no Drive:
  - `PC_ARENA_1_subir_para_o_github.md`: checar segredos, criar `Nizity/arena` privado e dar push; também responde ao pedido de túnel;
  - `PC_SALAO_rodar_no_pc.md`: rodar e testar no PC; publicar pelo túnel só com piloto.
- O pedido de design do Arena (paleta, tipografia, mockups das 6 telas) fica para quando o repo chegar: a nuvem faz a partir do código real.
- Não deu para responder à sessão do Arena por SendMessage: a nuvem não alcança sessões do PC.

**Próximo passo (para a sessão local)**
1. Rodar o prompt da Base (está no `CLAUDE.md` §1) e confirmar módulos e conflitos.
2. Levar ao fundador as pendências da Fase 0 do `PLANO.md`. Nada de código novo antes.
3. Com a Fase 0 fechada, aprovar o PLANO e começar a Fase 1.
