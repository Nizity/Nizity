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
assets/orb.js           Orbe do Núcleo (visual; hoje em demonstração)
assets/main.js          Contato, idioma, menu mobile e atalho da tecla E
assets/favicon.svg      Ícone
_headers                Cabeçalhos de segurança (Cloudflare Pages)
CNAME                   Domínio para o GitHub Pages (não usado no Cloudflare)
```

## Editar textos

Os textos ficam em `assets/i18n.js` e `assets/i18n-projects.js`, no objeto `translations`, com uma versão em `pt` e outra em `en`. Altere as duas versões.

## Ver localmente

Abra o `index.html` no navegador, ou rode:

```bash
python3 -m http.server 8000
```

e acesse http://localhost:8000.

## Publicar (Cloudflare Pages, domínio nizity.com)

O branch `main` é a versão de produção. Trabalho novo entra por outro branch e pull request.

1. Em **dash.cloudflare.com**, abra **Workers & Pages → Create → Pages → Connect to Git** e escolha o repositório `Nizity/Nizity`.
2. Configure: branch de produção `main`, **Framework preset: None**, **Build command: vazio**, **Build output directory: `/`**.
3. Depois do primeiro deploy, abra o projeto → **Custom domains → Set up a custom domain** → `nizity.com` (e, se quiser, `www.nizity.com`). Como o DNS já está na Cloudflare, os registros e o HTTPS são criados sozinhos.
4. O arquivo `_headers` aplica os cabeçalhos de segurança (CSP, anti-clickjacking). Ao ligar o orbe a um Worker, acrescente a URL dele em `connect-src`.

O arquivo `CNAME` só é usado se um dia o site for para o GitHub Pages.
