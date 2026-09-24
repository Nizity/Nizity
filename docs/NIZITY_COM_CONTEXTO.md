# NIZITY_COM_CONTEXTO.md — Ponte Projeto ↔ Code

> Projeto: site **nizity.com** (portfólio + venda de serviços) e a ideia **Nizity Salão**. Decisões numeradas e datadas. Pendentes têm gatilho de renegociação. Criado em 2026-09-24 (sessão na nuvem).

## Origem

Conversa do fundador com uma IA do WhatsApp (resumida pelo fundador em 2026-09-24):

- nizity.com como **portfólio**: experiências em programação e **venda de serviços**.
- Estrutura sugerida: Hero com proposta clara, 3–6 projetos (problema → solução → tech), serviços em pacotes (Landing Page, Sistema sob medida, Manutenção), Sobre + Stack, prova social, contato via WhatsApp/Calendly.
- Marca: Nizity é o nick pessoal do fundador → **marca pessoal forte**, com "Eu sou Guilherme, dev por trás da Nizity". Bio padrão: "Nizity — Dev Full-Stack | Criador da nizity.com | Rio de Janeiro".
- Produto: **Nizity Salão**, com cardápio via QR Code por mesa, comanda do garçom no celular, telão da cozinha (KDS) em tempo real (mesa, prato, personalização, tempo) e visão do garçom. Venda como kit por R$197/mês, sem taxa por pedido.
- A IA do WhatsApp sugeriu Next.js + Tailwind + Supabase + Vercel, Stripe/Mercado Pago e roteiro de 7 dias. **Vários pontos conflitam com a Base** (ver D4, D7).

## Decisões

| # | Data | Decisão | Status |
|---|------|---------|--------|
| D1 | 2026-09-24 | Nizity é marca pessoal do fundador; o site é portfólio + serviços. | Decidido pelo fundador |
| D2 | 2026-09-24 | Site bilíngue PT/EN. | Decidido pelo fundador |
| D3 | 2026-09-24 | Site estático (HTML/CSS/JS). Reescrito como portfólio + serviços a pedido do fundador. | Em andamento |
| D9 | 2026-09-24 | **Código todo em inglês** (identificadores, ids, classes); só comentários em português. Textos da UI em PT/EN. | Decidido pelo fundador |
| D4 | — | Stack do Salão: a Base manda FastAPI + PostgreSQL + React/TS/Vite; a IA do WhatsApp sugeriu Next.js + Supabase + Vercel. | **Pendente.** Seguir a Base, salvo desvio registrado pelo fundador |
| D5 | — | Ordem de ataque: o Salão é uma **5ª frente**, fora da VISAO (arena, plataforma-campo, reator, Núcleo). Com ~15h/semana, entra agora ou espera? O que pausa para ele caber? | **Pendente, decisão do fundador.** Gatilho: fim da validação da Fase 2 |
| D6 | 2026-09-24 | Domínio nizity.com: RDAP da Verisign em 2026-09-24 mostra registro em **2026-09-21** (expira 2027-09-21), DNS na Cloudflare (`darl`/`audrey.ns.cloudflare.com`). A Base (28/07) e o EMPRESA.md (15/09) ainda dizem "não registrado". | **Confirmado pelo fundador (2026-09-24): o domínio é dele.** Falta atualizar a Base e o EMPRESA.md |
| D7 | 2026-09-24 | Pagamento online (Stripe/Mercado Pago) **vetado** até tração (Base §5). Venda de serviço por WhatsApp + Pix manual. | Regra da Base |
| D10 | 2026-09-24 | Público duplo: `index.html` vende serviços para clientes; `projects.html` mostra projetos e stack para recrutadores. | Decidido pelo fundador |
| D11 | 2026-09-24 | Visual "V2", inspirado em Destiny 2 (inspiração, nada da Bungie): fundo de espaço escuro, violeta, serviços como fichas de "inspecionar item", orbe do Núcleo no topo. Escolhido entre 9 mockups e 2 rodadas de referências. Sem localização no site. | Decidido pelo fundador |
| D12 | 2026-09-24 | Fontes auto-hospedadas (Inter Tight, Geist Mono): não envia o IP dos visitantes ao Google (LGPD) e carrega mais rápido. | Decisão técnica |
| D13 | 2026-09-24 | Orbe vivo. Contrato atualizado pela sessão do Núcleo: HTTPS POST ao Worker com token no header `Authorization`, corpo `{"state", "capability", "at"}`; 13 estados; `capability` = capacidade em uso (ou `null`; criadas pelo Núcleo vêm como `cap:<slug>`). Sinal de vida a cada 60 s; sem sinal por 3 min → demonstração. O visual é o mesmo código do app (`assets/atlas_orb.js`, não editar aqui) montado por `assets/orb-mount.js`. O site mostra os glifos **com significado** (decisão do fundador). Alerta registrado: mostrar a capacidade em uso expõe *o que* a IA faz no computador em tempo real, e não só se está ativa. | **Visual novo no site (em demonstração); Worker e envio do Núcleo não construídos** |
| D14 | 2026-09-24 | Hospedagem: **Cloudflare, Worker com arquivos estáticos** (projeto `nizity`), a partir do branch `main` (DNS já na Cloudflare, aceita `_headers` de segurança, mesmo lugar do futuro Worker do orbe). `main` = produção; trabalho novo por branch + PR. | Worker criado pelo fundador e build OK; falta trocar para `main` e ligar o domínio |
| D15 | 2026-09-24 | Web Analytics da Cloudflare (contador de visitas sem cookies) liberado na CSP (`static.cloudflareinsights.com` em script-src, `cloudflareinsights.com` em connect-src). | Decidido pelo fundador |
| D8 | — | Onde o CLAUDE.md busca as regras: comando do PROMPT_BASE (sessão local) + resumo mínimo (sessão na nuvem). Aplicado em 2026-09-24. | **Aguardando aprovação** do fundador |

## Posição do Claude (para o fundador pesar)

- **Portfólio de serviços primeiro:** custo baixo e é o caminho mais curto para "primeiro produto gerando receita" (objetivo de curto prazo da VISAO).
- **Salão: validar antes de programar.** Mercado com concorrentes (Goomer, Saipos, Consumer e outros, alguns grátis). O diferencial plausível é "funciona hoje, sem instalar, configurado por mim". Primeiro 3–5 conversas com restaurantes (Mom Test) e 1 piloto real.
- **Se o Salão entrar:** começar pela **comanda do garçom → telão da cozinha** (uma dor). Pedido feito pelo cliente via QR fica para depois (pedidos falsos, mesa errada, cozinha recebendo sem confirmação). Cardápio QR só para consulta no início.
- Riscos do KDS: Wi-Fi instável (reconexão sem perder pedido), cozinha que prefere papel (impressora térmica no futuro), legibilidade à distância.
- Roteiro de 7 dias é irreal com ~15h/semana: estimar no mínimo 3 semanas para o MVP enxuto.

## Fora do escopo (agora)

Pagamento online, pedido pelo cliente, estoque, bot de WhatsApp, impressora térmica, multi-idioma no Salão. Detalhe em `MODULOS_FUTUROS.md`.
