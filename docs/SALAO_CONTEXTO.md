# SALAO_CONTEXTO.md — Nizity Salão

> Criado em 2026-09-24 (sessão na nuvem). Decisões gerais em `NIZITY_COM_CONTEXTO.md` (D4, D5, D16). Construção aprovada **sem validação com restaurantes** (desvio registrado no `DIARIO.md`).

## A dor (uma)

O pedido anotado em papel se perde, sai ilegível ou demora a chegar na cozinha, e o garçom não sabe quando o prato ficou pronto.

## Usuários

| Quem | O que faz no MVP |
|---|---|
| Dono | Cadastra cardápio, mesas e funcionários. |
| Garçom | Abre a mesa no celular, lança itens com observação e recebe o aviso de "pronto". |
| Cozinha | Vê os pedidos num telão ou tablet em tempo real e marca "preparando" e "pronto". |
| Cliente | Só **consulta** o cardápio pelo QR da mesa. Não pede nem paga. |

## Escopo do MVP (em ordem)

1. **Base:** restaurante = tenant (`restaurant_id` em toda tabela), login, cardápio e mesas.
2. **Comanda → cozinha** em tempo real (WebSocket), com reconexão sem perder pedido.
3. **Cardápio QR só para consulta**, gerado dos mesmos dados, com QR em PDF para imprimir.
4. **Resumo do dia** (aprovado em 2026-09-25): leitura das comandas fechadas para o dono — total das comandas, mesas atendidas, ticket médio e desempenho por garçom. Não é financeiro: nada de pagamento, caixa ou gastos.
5. **Vincular aparelho por QR** (aprovado em 2026-09-25): o dono mostra um QR de uso único (10 min) e o celular do garçom, o tablet ou a TV entram logados, sem digitar restaurante, usuário e senha. Dono pode desconectar os aparelhos de uma pessoa.

## Fora do escopo (vetado ou para depois)

Pedido pelo cliente, pagamento online, estoque, bot de WhatsApp, impressora térmica, multi-idioma. Detalhe em `MODULOS_FUTUROS.md`.

## Stack (D4, Base)

- `backend/`: Python, FastAPI, SQLAlchemy, Alembic, pytest, PostgreSQL.
- `frontend/`: React + TypeScript + Vite. Telas: garçom (celular), cozinha (tela grande, legível à distância), cardápio público e admin.
- `docker-compose.yml` com Postgres local. Nada pago durante o desenvolvimento.
- Repo próprio e privado (`Nizity/salao`, a criar com confirmação do fundador). Código em inglês e comentários em PT.

## Modelo de dados (rascunho)

- `restaurants` (id, name, slug)
- `users` (id, restaurant_id, name, role: owner | waiter | kitchen, credenciais)
- `tables` (id, restaurant_id, label, public_token do QR)
- `menu_categories` (id, restaurant_id, name, position)
- `menu_items` (id, restaurant_id, category_id, name, description, price_cents, available)
- `orders` (id, restaurant_id, table_id, waiter_id, opened_at, closed_at)
- `order_items` (id, restaurant_id, order_id, menu_item_id, quantity, note, status: sent | preparing | ready | delivered, timestamps)

## Riscos

- **Ninguém usar** (sem validação). O gatilho para rever o escopo é o primeiro restaurante testar.
- Wi-Fi instável na cozinha: a tela precisa reconectar e recuperar os pedidos abertos.
- Cozinha que prefere papel: a impressora térmica fica como módulo futuro.
- Concorrentes (Goomer, Saipos, Consumer e outros, alguns grátis). O diferencial plausível é "funciona hoje, sem instalar, configurado por mim".
- LGPD: os garçons são dado pessoal. Termos e Política de Privacidade antes do primeiro piloto.

## Métrica (North Star)

Pedidos reais lançados pela comanda por semana.
