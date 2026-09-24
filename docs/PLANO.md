# PLANO.md — nizity.com

> ⚠️ **RASCUNHO, NÃO APROVADO.** Escrito em 2026-09-24 na sessão da nuvem. Nenhuma fase começa sem aprovação do fundador. Decisões referenciadas em `NIZITY_COM_CONTEXTO.md`.

## Fase 0 — Decisões pendentes (fundador)

- [x] D6: domínio confirmado como do fundador (2026-09-24).
- [ ] Avisar o chat da Base e o da Empresa: os dois ainda dizem "não registrado".
- [x] D5: o Salão entra agora, junto com o Núcleo (2026-09-24).
- [ ] D8: aprovar o formato do `CLAUDE.md`.
- [x] D4: stack da Base para o Salão (2026-09-24).
- [ ] Levar ao chat da Empresa: vender serviço dispara o gatilho de formalização (MEI/CNPJ) da VISAO. Falar com contador antes do primeiro cliente.

## Fase 1 — Portfólio que vende (site atual, estático)

Pré-requisito: Fase 0 (D6).

- [ ] Coletar do fundador: número do WhatsApp (`CONTACT` em `assets/main.js`), e-mail que funcione (hoje `contato@nizity.com`, provisório), confirmar se os 4 projetos podem aparecer (e links, se houver), foto (sim/não), preços dos pacotes (ou manter "sob consulta").
- [x] Reescrever conteúdo (2026-09-24, projetos e stack a confirmar pelo fundador): Hero pessoal ("Eu sou Guilherme, dev por trás da Nizity"), Projetos, Serviços em pacotes, Sobre + Stack, Contato (WhatsApp).
- [x] Criar branch `main` a partir do estado aprovado (2026-09-24).
- [x] Decidir hospedagem: Cloudflare, Worker com arquivos estáticos (D14).
- [x] Conectar o repositório na Cloudflare (projeto `nizity`, build OK, 2026-09-24).
- [ ] Trocar o branch de produção do Worker para `main` e adicionar o domínio nizity.com (passos no README).
- [ ] Trocar o branch padrão do GitHub para `main` (Settings → General → Default branch).
- [ ] HTTPS ativo, `www` redirecionando.
- [x] Evidência: screenshot desktop e mobile nos dois idiomas; contraste AA do roxo primário corrigido (2026-09-24).
- [ ] Opcional: passar o visual pelo Claude Design (regra da casa: landing é trabalho do Design).

## Fase 2 — Validação do Salão (sem código)

> **Pulada por decisão do fundador (2026-09-24):** construir antes de validar. Desvio consciente registrado no DIARIO. Os itens abaixo continuam valendo como tarefa paralela: o primeiro restaurante que testar é o gatilho para rever o escopo.

- [ ] 3 a 5 conversas com restaurantes usando `SALAO_ROTEIRO_ENTREVISTA.md`.
- [ ] Escrever **antes** critério de sucesso e de fracasso, com número e prazo. Sugestão: "em 4 semanas de piloto, 1 restaurante lança ≥80% dos pedidos pela comanda e não volta ao papel; senão, corto ou pivoto".
- [ ] Conseguir 1 piloto (sinal de compromisso: tempo, indicação ou dinheiro).
- [ ] North Star definida: **pedidos reais lançados pela comanda/semana**.

## Fase 3 — Salão MVP (aprovada em 2026-09-24, sem piloto)

Escopo em D16 e `SALAO_CONTEXTO.md`. Código em repo próprio e privado (criar o repo pede confirmação do fundador). Tudo local e sem custo durante o desenvolvimento.

- [x] Doc de contexto próprio (`SALAO_CONTEXTO.md`).
- [ ] Repo `Nizity/salao` (privado): `backend/` FastAPI + SQLAlchemy + Alembic + pytest, `frontend/` React + TS + Vite, `docker-compose.yml` com Postgres local.
- [ ] Fatia 1 — Base: restaurante = tenant (`restaurant_id` em toda tabela), login de dono e funcionário, cadastro de cardápio (categorias, itens, preço, disponível) e mesas.
- [ ] Fatia 2 — Comanda → cozinha: garçom abre mesa e lança itens com observação; cozinha vê em tempo real (WebSocket) com mesa, prato, observação e tempo; marca "preparando" e "pronto"; garçom é avisado.
- [ ] Fatia 3 — Cardápio QR só para consulta: página pública por restaurante/mesa, QR em PDF para imprimir, sem botão de pedir.
- [ ] Evidência por fatia: pytest verde; Playwright com garçom e cozinha em 2 abas (pedido chega em < 2 s, "pronto" volta); cardápio a 390 px sem login; axe sem violações; restaurante A não vê dados do B.
- [ ] Termos de Uso + Política de Privacidade antes do piloto (garçons são dado pessoal; checar transferência internacional conforme o fornecedor).
- [ ] Auditoria de marco (segurança OWASP + revisão adversarial) antes do piloto.
