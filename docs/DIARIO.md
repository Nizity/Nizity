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

**Próximo passo (para a sessão local)**
1. Rodar o prompt da Base (está no `CLAUDE.md` §1) e confirmar módulos e conflitos.
2. Levar ao fundador as pendências da Fase 0 do `PLANO.md`. Nada de código novo antes.
3. Com a Fase 0 fechada, aprovar o PLANO e começar a Fase 1.
