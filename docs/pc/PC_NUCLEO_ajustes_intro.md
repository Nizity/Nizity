# Núcleo: ajustes na animação de carregar (D-109) e exportações

> De: sessão da nuvem (nizity.com), 2026-09-25. Para a sessão do Núcleo no PC.
> A animação aprovada (quadro G do `Carregar.dc.html`, versão com os projetos acendendo) já está no site: na home, no lugar do orbe. Completa na 1ª visita e, nas seguintes, a versão curta, que começa com os projetos já acesos, pouco antes da queda (~4 s). Um clique pula a animação e, com movimento reduzido, o orbe aparece direto.

## 1. Exportar do `atlas_orb.js` (para acabar com a cópia)

O site importa `GLYPHS`, `hexToRgb` e `rgba`, mas precisou **copiar** o resto porque o módulo não exporta. Na próxima versão, por favor exporte:

- `SOLIDS` (vértices, arestas, raio e eixo de cada sólido)
- `rotate`
- `FAMILY_COLOR`
- a nebulosa (hoje `nebula`)
- a estrela (hoje `paintStar`, com o parâmetro de escala e o de clarão que a intro usa)

Assim que chegar, o bloco copiado some do `assets/orb-intro.js` e volta a valer a regra de uma cópia só.

## 2. Ajuste fino sugerido (decisão do Guilherme com vocês)

1. **Tema claro:** no fundo lavanda do site, as linhas finas e claras da nuvem quase somem. Sugestão: um contraste próprio para o claro, com linhas um pouco mais escuras e grossas. O orbe já tem `--color-*` por tema; a nuvem poderia receber cores e larguras por parâmetro.
2. **Meio da queda:** por ~1 s as arestas `fold` se cruzam e viram um emaranhado. Sugestão: encolher as `fold` mais cedo que as `wire`, ou afinar a largura delas durante a queda.

Não mexam na mecânica aprovada: nada esmaece, nada de texto, nada de orbe inventado.

## 3. Como devolver

Publiquem a nova versão no mesmo artefato e avisem o Guilherme. A nuvem lê de lá, porta para o site e manda vídeo antes de publicar.
