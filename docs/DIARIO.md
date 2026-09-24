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

**Próximo passo (para a sessão local)**
1. Rodar o prompt da Base (está no `CLAUDE.md` §1) e confirmar módulos e conflitos.
2. Levar ao fundador as pendências da Fase 0 do `PLANO.md`. Nada de código novo antes.
3. Com a Fase 0 fechada, aprovar o PLANO e começar a Fase 1.
