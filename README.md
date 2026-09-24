# Nizity.com

Site institucional da Nizity, bilíngue (Português / Inglês). Feito em HTML, CSS e JavaScript puros, sem dependências nem etapa de build.

## Estrutura

```
index.html          Página principal
assets/styles.css   Estilos (tema claro/escuro automático)
assets/i18n.js      Textos PT/EN
assets/main.js      Contato, seletor de idioma e menu mobile
assets/favicon.svg  Logo / ícone
CNAME               Domínio personalizado (nizity.com) para o GitHub Pages
```

## Editar textos

Todos os textos ficam em `assets/i18n.js`, no objeto `translations`, com uma versão em `pt` e outra em `en`. Altere as duas versões.

## Ver localmente

Abra o `index.html` no navegador, ou rode:

```bash
python3 -m http.server 8000
```

e acesse http://localhost:8000.

## Publicar no GitHub Pages com o domínio nizity.com

1. No GitHub, abra **Settings → Pages** do repositório.
2. Em **Source**, escolha **Deploy from a branch**, selecione o branch do site e a pasta `/ (root)`.
3. Em **Custom domain**, confirme `nizity.com` e marque **Enforce HTTPS** quando a opção aparecer.
4. No painel do registrador do domínio, configure o DNS:
   - Quatro registros **A** para `@`:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Um registro **CNAME** para `www` apontando para `nizity.github.io`
5. A propagação do DNS pode levar algumas horas.
