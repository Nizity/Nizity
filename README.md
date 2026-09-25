# Nizity.com

Site institucional da Nizity, bilíngue (Português / Inglês). Feito em HTML, CSS e JavaScript puros, sem dependências nem etapa de build.

## Estrutura

```
index.html              Página principal (clientes)
projects.html           Projetos e stack (recrutadores)
assets/css/             Estilos: tokens, base, componentes e seções
assets/fonts/           Inter Tight e Geist Mono (woff2, licenças OFL)
assets/i18n.js          Textos PT/EN comuns e da página principal
assets/i18n-projects.js Textos PT/EN da página de projetos
service-*.html, privacy.html, 404.html  Gerados por tools/gen_pages.py (não editar à mão)
wrangler.jsonc          Worker de arquivos estáticos (404 própria)
sitemap.xml, robots.txt Para buscadores
assets/orb.js           Orbe do Núcleo (visual; hoje em demonstração)
assets/main.js          Contato, idioma, menu mobile e atalho da tecla E
assets/favicon.svg      Ícone
_headers                Cabeçalhos de segurança (lidos pela Cloudflare)
```

## Editar textos

Os textos ficam em `assets/i18n.js` e `assets/i18n-projects.js`, no objeto `translations`, com uma versão em `pt` e outra em `en`. Altere as duas versões.

## Ver localmente

Abra o `index.html` no navegador, ou rode:

```bash
python3 -m http.server 8000
```

e acesse http://localhost:8000.

## Publicar (Cloudflare Workers, domínio nizity.com)

O site é publicado como **Worker com arquivos estáticos** na Cloudflare, conectado a este repositório. O branch `main` é a versão de produção; trabalho novo entra por outro branch e pull request.

1. No painel da Cloudflare, **Workers & Pages → projeto `nizity`**. O build usa o comando de deploy `npx wrangler deploy`, sem comando de build e com diretório raiz `/`.
2. Em **Configurações → Build → Branch control**, o branch de produção deve ser `main`.
3. Em **Domínios → Adicionar → Domínio personalizado**, adicione `nizity.com` (e, se quiser, `www.nizity.com`). Como o DNS já está na Cloudflare, o registro e o HTTPS são criados sozinhos.
4. O arquivo `_headers` aplica os cabeçalhos de segurança (CSP, anti-clickjacking). Ao ligar o orbe a um Worker de estado, acrescente a URL dele em `connect-src`.
