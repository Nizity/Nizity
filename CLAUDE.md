# CLAUDE.md — nizity.com

Leia primeiro. Memória do projeto: regras inegociáveis + como rodar.

## 1. Base Nizity (fonte da verdade)

**Sessão local (PC do fundador):** antes de começar, leia a Base em `C:\Users\Funbio\Desktop\Base\`:

1. Leia `BASE.md` por inteiro.
2. Use o mapa de módulos do BASE.md para identificar quais módulos valem para ESTE projeto e leia cada um.
3. Adote essas regras como padrão inegociável desta sessão. Se algo no repositório contradiz a Base, siga a Base e avise em uma linha; desvio só com decisão consciente e registrada.
4. Se já leu uma versão anterior nesta sessão, releia e reconcilie.

Ao terminar, confirme em até 2 linhas: os módulos que leu e qualquer conflito encontrado.

Módulos que valem aqui, pelo tipo: **FRONTEND** (painel web), **PRODUTO** (usuário real) e, se o Salão entrar, **BACKEND**. GAME não vale. APRENDIZADOS sob demanda. Nada de `empresa/` entra neste repo.

**Sessão na nuvem (claude.ai/code, sem acesso ao disco):** a Base não está disponível. Valem no mínimo as regras do §2, que são um resumo dela lido em 2026-09-24. Se o resumo divergir da Base, a Base ganha.

## 2. Regras inegociáveis (resumo da Base, 2026-09-24)

- **Sempre discorde do fundador quando ele estiver errado**, explique o porquê e proponha alternativa. Sem bajulação.
- Comunicação em pt-BR, **curta por padrão**: veredito em poucas linhas, detalhe só quando pedido.
- **Plano antes de código:** contexto → `docs/PLANO.md` → aprovação do fundador → código.
- **Portão humano:** push em produção (`main` / branch publicado), apagar dado, gastar dinheiro ou enviar mensagem só com confirmação do fundador. Push em branch de trabalho não precisa.
- Commits em pt-BR, um por mudança lógica, **staging específico (nunca `git add -A`)**, com trailer do modelo.
- Identificadores em inglês; comentários, UI e commits em pt-BR.
- Segredos só em variável de ambiente, nunca commitados.
- MVP resolve UMA dor. **Vetado até tração:** pagamento, transações, bots.
- Recurso externo (domínio, conta, handle) se confere na fonte antes de virar fato.
- "Pronto" vem com evidência (teste, build, screenshot), nunca com a afirmação do modelo.

## 3. Estado e documentos

- Contexto e decisões (D1, D2…): `docs/NIZITY_COM_CONTEXTO.md`
- Plano (**rascunho, não aprovado**): `docs/PLANO.md`
- Diário de bordo e pendências: `docs/DIARIO.md`
- Desenhado mas vetado: `docs/MODULOS_FUTUROS.md`
- Roteiro de entrevista com restaurantes: `docs/SALAO_ROTEIRO_ENTREVISTA.md`
- **Código do Salão:** repo privado `Nizity/salao` (contexto em `docs/SALAO_CONTEXTO.md`). A demo pública em `demo/salao/` é o build dele (`npm run build:demo`).

## 4. Como rodar

Site estático (HTML/CSS/JS puros, sem build):

```bash
python3 -m http.server 8000   # depois abra http://localhost:8000
```

- Páginas: `index.html` (clientes) e `projects.html` (recrutadores).
- Textos PT/EN: `assets/i18n.js` (comuns + home) e `assets/i18n-projects.js`. Contato (WhatsApp/e-mail): `CONTACT` em `assets/main.js`.
- Orbe do Núcleo: `assets/orb.js` (só visual; hoje em modo demonstração, sem ligação real).
- **Código em inglês** (identificadores, ids, classes); comentários em português.
- Estilos: `assets/css/` (`tokens` → `base` → `components` → `pages`); componentes só usam tokens semânticos. Fontes locais em `assets/fonts/` (licenças OFL). Domínio do GitHub Pages: `CNAME`.
