# Gera as páginas que seguem um molde: as 3 de serviço (service-*.html), a de privacidade e a 404.
# Rodar: python3 tools/gen_pages.py (depois de mudar o <head> de projects.html, os textos ou este arquivo).
# Os textos ficam em assets/i18n*.js; o português é escrito direto no HTML (sem JS e para o Google).
import json, os, re, subprocess
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = [
  # arquivo, chave, código, quantos itens de "incluso", exemplos [(chave, href)], faq extra?
  ("service-landing.html", "landing", "NZ-01", "s1", [("ex1", "index.html")], True, ""),
  ("service-system.html", "system", "NZ-02", "s2", [("ex1", "demo/salao/"), ("ex2", "projects.html")], True, " exotic"),
  ("service-maintenance.html", "maintenance", "NZ-03", "s3", [], False, ""),
]
PT = json.loads(subprocess.check_output(["node", "-e",
  "const fs=require('fs');eval(fs.readFileSync('assets/i18n.js','utf8')+fs.readFileSync('assets/i18n-services.js','utf8')+fs.readFileSync('assets/i18n-privacy.js','utf8')+';console.log(JSON.stringify(translations.pt))')"], cwd=ROOT))

def fill(html):
    # Texto em português já no HTML (para quem abre sem JS e para o Google); o main.js troca o idioma
    html = re.sub(r'data-i18n="([^"]+)"([^>]*)>[^<]*<', lambda m: f'data-i18n="{m[1]}"{m[2]}>{PT[m[1]]}<', html)
    return re.sub(r'data-i18n-html="([^"]+)"([^>]*)></', lambda m: f'data-i18n-html="{m[1]}"{m[2]}>{PT[m[1]]}</', html)

HEAD = open(f"{ROOT}/projects.html").read().split("</head>")[0]

for file, key, code, s, examples, faq3, exotic in PAGES:
    k = f"svc.{key}"
    head = (HEAD.replace("<title>Projetos — Nizity</title>", f"<title>{{title}}</title>")
                .replace('content="Projetos e stack de Guilherme (Nizity)."', 'content="{desc}"')
                .replace('<meta property="og:title" content="Projetos — Nizity">', '<meta property="og:title" content="{title}">')
                .replace("https://nizity.com/projects.html", f"https://nizity.com/{file}"))
    ex_html = ""
    if examples:
        cards = "\n".join(f'''        <article class="item">
          <div class="item-head">
            <h3 data-i18n="{k}.{e}.title"></h3>
          </div>
          <div class="item-body"><p data-i18n="{k}.{e}.text"></p></div>
          <a class="item-foot" href="{href}"><span data-i18n="{k}.{e}.link"></span><span aria-hidden="true">→</span></a>
        </article>''' for e, href in examples)
        ex_html = f'''
    <section class="container section">
      <h2 class="section-title" data-i18n="svc.examples">Exemplos</h2>
      <div class="projects">
{cards}
      </div>
    </section>
'''
    faq_extra = f'''
        <div><dt data-i18n="{k}.faq.q"></dt><dd data-i18n="{k}.faq.a"></dd></div>''' if faq3 else ""
    html = f'''{head}</head>
<body data-page="svc-{key}">
  <header class="site-header">
    <div class="container nav">
      <a class="logo" href="index.html" aria-label="Nizity"><span class="diamond"></span>Nizity</a>
      <nav class="nav-links" id="nav-links">
        <a href="index.html#services" data-i18n="svc.back">Serviços</a>
        <a href="index.html#products" data-i18n="nav.products">Produtos</a>
      </nav>
      <div class="nav-actions">
        <button class="lang-toggle theme-toggle" id="theme-toggle" type="button" aria-label="Mudar tema">☀</button>
        <button class="lang-toggle" id="lang-toggle" type="button" aria-label="Mudar idioma / Change language">EN</button>
      </div>
    </div>
  </header>

  <main>
    <section class="container intro">
      <div>
        <p class="kicker"><span data-i18n="services.title">Serviços</span>&nbsp;· {code}</p>
        <h1 data-i18n-html="{k}.title" data-vt="svc-{key}"></h1>
        <p data-i18n="services.{s}.text"></p>
      </div>
      <div class="svc-cta">
        <span class="item-price" data-i18n="services.price">Sob consulta</span>
        <a class="btn" href="#" data-chat-open data-chat-text="{k}.chat" data-whatsapp="services.{s}.message" target="_blank" rel="noopener"><span data-i18n="svc.cta">Conversar pelo WhatsApp</span></a>
      </div>
    </section>

    <section class="container section svc-detail">
      <div class="item{exotic}">
        <div class="item-head"><h2 class="svc-h" data-i18n="svc.forWho">Para quem é</h2></div>
        <div class="item-body"><p data-i18n="{k}.forWho"></p></div>
      </div>
      <div class="item{exotic}">
        <div class="item-head"><h2 class="svc-h" data-i18n="svc.includes">O que está incluso</h2></div>
        <div class="item-body">
          <ul class="perks">
            <li class="perk" data-i18n="services.{s}.p1"></li>
            <li class="perk" data-i18n="services.{s}.p2"></li>
            <li class="perk" data-i18n="services.{s}.p3"></li>
          </ul>
        </div>
      </div>
    </section>

    <section class="container section">
      <h2 class="section-title" data-i18n="process.title">Processo</h2>
      <ol class="steps">
        <li class="step">
          <div class="step-head"><span class="diamond"></span><span class="step-num">01</span><h3 data-i18n="process.s1.title">Conversa</h3></div>
          <p data-i18n="process.s1.text"></p>
        </li>
        <li class="step">
          <div class="step-head"><span class="diamond"></span><span class="step-num">02</span><h3 data-i18n="process.s2.title">Proposta</h3></div>
          <p data-i18n="process.s2.text"></p>
        </li>
        <li class="step">
          <div class="step-head"><span class="diamond"></span><span class="step-num">03</span><h3 data-i18n="process.s3.title">Entrega</h3></div>
          <p data-i18n="process.s3.text"></p>
        </li>
      </ol>
    </section>
{ex_html}
    <section class="container section">
      <h2 class="section-title" data-i18n="svc.faq">Perguntas comuns</h2>
      <dl class="faq">
        <div><dt data-i18n="svc.faq.price.q"></dt><dd data-i18n="svc.faq.price.a"></dd></div>
        <div><dt data-i18n="svc.faq.time.q"></dt><dd data-i18n="svc.faq.time.a"></dd></div>{faq_extra}
      </dl>
    </section>

    <section class="container section contact">
      <div>
        <h2 data-i18n-html="svc.end.title"></h2>
        <p data-i18n="svc.end.text"></p>
      </div>
      <div class="contact-actions">
        <a class="btn" href="#" data-chat-open data-chat-text="{k}.chat" data-whatsapp="services.{s}.message" target="_blank" rel="noopener"><span data-i18n="svc.cta">Conversar pelo WhatsApp</span></a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <span>© <span id="year"></span> Nizity</span>
      <a href="privacy.html" data-i18n="footer.privacy">Privacidade</a>
      <a href="#" data-i18n="footer.top">Voltar ao topo ↑</a>
    </div>
  </footer>

  <script src="assets/i18n.js"></script>
  <script src="assets/i18n-services.js"></script>
  <script src="assets/fx.js"></script>
  <script src="assets/main.js"></script>
  <script src="assets/chat.js"></script>
</body>
</html>
'''
    html = fill(html).replace("{title}", PT[f"meta.title.svc-{key}"]).replace("{desc}", PT[f"meta.description.svc-{key}"])
    open(f"{ROOT}/{file}", "w").write(html)
    print(file)


# Cabeçalho e rodapé das páginas simples (privacidade e 404)
def simple_page(file, page, title_key, desc_key, body, i18n_extra=""):
    head = (HEAD.replace("<title>Projetos — Nizity</title>", f"<title>{PT[title_key]}</title>")
                .replace('content="Projetos e stack de Guilherme (Nizity)."', f'content="{PT.get(desc_key, PT["meta.description.home"])}"')
                .replace('<meta property="og:title" content="Projetos — Nizity">', f'<meta property="og:title" content="{PT[title_key]}">')
                .replace("https://nizity.com/projects.html", f"https://nizity.com/{file}"))
    html = f'''{head}</head>
<body data-page="{page}">
  <header class="site-header">
    <div class="container nav">
      <a class="logo" href="index.html" aria-label="Nizity"><span class="diamond"></span>Nizity</a>
      <nav class="nav-links" id="nav-links">
        <a href="index.html" data-i18n="nav.home">Início</a>
        <a href="index.html#products" data-i18n="nav.products">Produtos</a>
      </nav>
      <div class="nav-actions">
        <button class="lang-toggle theme-toggle" id="theme-toggle" type="button" aria-label="Mudar tema">☀</button>
        <button class="lang-toggle" id="lang-toggle" type="button" aria-label="Mudar idioma / Change language">EN</button>
      </div>
    </div>
  </header>

  <main>
{body}
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <span>© <span id="year"></span> Nizity</span>
      <a href="privacy.html" data-i18n="footer.privacy">Privacidade</a>
      <a href="#" data-i18n="footer.top">Voltar ao topo ↑</a>
    </div>
  </footer>

  <script src="assets/i18n.js"></script>{i18n_extra}
  <script src="assets/fx.js"></script>
  <script src="assets/main.js"></script>
  <script src="assets/chat.js"></script>
</body>
</html>
'''
    html = fill(html)
    if file == "404.html":
        # A 404 é servida em qualquer endereço (ex.: /a/b): caminhos absolutos para não quebrar
        html = re.sub(r'(href|src)="(?!https?:|#|/|mailto:)', r'\1="/', html)
    open(f"{ROOT}/{file}", "w").write(html)
    print(file)

sections = "\n".join(f'''        <div><dt data-i18n="privacy.s{i}.title"></dt><dd data-i18n="privacy.s{i}.text"></dd></div>''' for i in range(1, 6))
simple_page("privacy.html", "privacy", "meta.title.privacy", "meta.description.privacy", f'''    <section class="container intro">
      <div>
        <p class="kicker" data-i18n="privacy.kicker"></p>
        <h1 data-i18n-html="privacy.title"></h1>
        <p data-i18n="privacy.lead"></p>
      </div>
    </section>

    <section class="container section">
      <dl class="faq">
{sections}
      </dl>
      <p class="privacy-updated" data-i18n="privacy.updated"></p>
    </section>''', "\n  <script src=\"assets/i18n-privacy.js\"></script>")

simple_page("404.html", "notfound", "meta.title.notfound", "", '''    <section class="container intro notfound">
      <div>
        <p class="kicker" data-i18n="notfound.kicker"></p>
        <h1 data-i18n-html="notfound.title"></h1>
        <p data-i18n="notfound.text"></p>
        <a class="btn" href="index.html"><span data-i18n="notfound.home"></span></a>
      </div>
    </section>''')
