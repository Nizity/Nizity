# PLANO.md — nizity.com

> ⚠️ **RASCUNHO, NÃO APROVADO.** Escrito em 2026-09-24 na sessão da nuvem. Nenhuma fase começa sem aprovação do fundador. Decisões referenciadas em `NIZITY_COM_CONTEXTO.md`.

## Fase 0 — Decisões pendentes (fundador)

- [x] D6: domínio confirmado como do fundador (2026-09-24).
- [ ] Avisar o chat da Base e o da Empresa: os dois ainda dizem "não registrado".
- [ ] D5: ordem de ataque. O Salão entra agora ou só o portfólio?
- [ ] D8: aprovar o formato do `CLAUDE.md`.
- [ ] D4: stack do Salão (só se D5 = entra agora).
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

Pré-requisito: D5 permitir.

- [ ] 3 a 5 conversas com restaurantes usando `SALAO_ROTEIRO_ENTREVISTA.md`.
- [ ] Escrever **antes** critério de sucesso e de fracasso, com número e prazo. Sugestão: "em 4 semanas de piloto, 1 restaurante lança ≥80% dos pedidos pela comanda e não volta ao papel; senão, corto ou pivoto".
- [ ] Conseguir 1 piloto (sinal de compromisso: tempo, indicação ou dinheiro).
- [ ] North Star definida: **pedidos reais lançados pela comanda/semana**.

## Fase 3 — Salão MVP (só com piloto confirmado)

Pré-requisito: Fase 2 com piloto + D4 decidida.

- [ ] Doc de contexto próprio (`SALAO_CONTEXTO.md`) e plano de fases.
- [ ] Escopo MVP: cadastro do cardápio → comanda do garçom → telão da cozinha em tempo real (mesa, prato, observação, tempo, botão "pronto"). Multi-tenant (restaurante = tenant) desde o dia 1.
- [ ] Termos de Uso + Política de Privacidade antes do piloto (garçons são dado pessoal; checar transferência internacional conforme o fornecedor).
- [ ] Auditoria de marco (segurança OWASP + revisão adversarial) antes do piloto.
