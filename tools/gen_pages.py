# Gera as páginas que seguem um molde: serviços (services.html e as 3 service-*.html), produtos, Salão, privacidade e 404.
# Rodar: python3 tools/gen_pages.py (depois de mudar o <head> de projects.html, os textos ou este arquivo).
# Os textos ficam em assets/i18n*.js; o português é escrito direto no HTML (sem JS e para o Google).
import html as html_lib, json, os, re, subprocess
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = [
  # arquivo, chave, código, quantos itens de "incluso", exemplos [(chave, href)], faq extra?
  ("service-landing.html", "landing", "NZ-01", "s1", [("ex1", "index.html")], True, ""),
  ("service-system.html", "system", "NZ-02", "s2", [("ex1", "demo/salao/"), ("ex2", "projects.html")], True, " exotic"),
  ("service-maintenance.html", "maintenance", "NZ-03", "s3", [], False, ""),
]
PT = json.loads(subprocess.check_output(["node", "-e",
  "const fs=require('fs');eval(fs.readFileSync('assets/i18n.js','utf8')+fs.readFileSync('assets/i18n-services.js','utf8')+fs.readFileSync('assets/i18n-privacy.js','utf8')+fs.readFileSync('assets/i18n-salao.js','utf8')+';console.log(JSON.stringify(translations.pt))')"], cwd=ROOT))

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
      <button class="lang-toggle menu-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Menu" data-i18n-label="nav.menu">☰</button>
      <a class="logo" href="index.html" aria-label="Nizity"><span aria-hidden="true">n<span class="logo-i">ı<svg class="logo-orb" viewBox="-1.12 -1.12 2.24 2.24"><g stroke-width="0.14" stroke-linecap="round"><line x1="0.526" y1="0.304" x2="0.000" y2="0.982" stroke-opacity="1"/><line x1="0.526" y1="0.304" x2="-0.000" y2="-0.607" stroke-opacity="1"/><line x1="0.526" y1="0.304" x2="0.851" y2="-0.491" stroke-opacity="1"/><line x1="0.526" y1="0.304" x2="-0.526" y2="0.304" stroke-opacity="1"/><line x1="0.526" y1="0.304" x2="0.851" y2="0.491" stroke-opacity="1"/><line x1="-0.000" y1="-0.982" x2="-0.000" y2="-0.607" stroke-opacity="1"/><line x1="-0.000" y1="-0.982" x2="0.851" y2="-0.491" stroke-opacity="1"/><line x1="-0.000" y1="-0.982" x2="-0.851" y2="-0.491" stroke-opacity="1"/><line x1="0.000" y1="0.982" x2="-0.851" y2="0.491" stroke-opacity="1"/><line x1="0.000" y1="0.982" x2="-0.526" y2="0.304" stroke-opacity="1"/><line x1="0.000" y1="0.982" x2="0.851" y2="0.491" stroke-opacity="1"/><line x1="-0.000" y1="-0.607" x2="0.851" y2="-0.491" stroke-opacity="1"/><line x1="-0.000" y1="-0.607" x2="-0.526" y2="0.304" stroke-opacity="1"/><line x1="-0.000" y1="-0.607" x2="-0.851" y2="-0.491" stroke-opacity="1"/><line x1="-0.851" y1="0.491" x2="-0.526" y2="0.304" stroke-opacity="1"/><line x1="-0.851" y1="0.491" x2="-0.851" y2="-0.491" stroke-opacity="1"/><line x1="0.851" y1="-0.491" x2="0.851" y2="0.491" stroke-opacity="1"/><line x1="-0.526" y1="0.304" x2="-0.851" y2="-0.491" stroke-opacity="1"/></g></svg></span>zity</span></a>
      <nav class="nav-links" id="nav-links">
        <a href="services.html" data-i18n="nav.services">Serviços</a>
        <a href="products.html" data-i18n="nav.products">Produtos</a>
        <a href="projects.html" data-i18n="nav.projects">Projetos</a>
        <div class="nav-prefs">
          <button class="lang-toggle theme-toggle" id="theme-toggle" type="button" aria-label="Mudar tema">☀</button>
          <select class="lang-toggle lang-select" id="lang-toggle" aria-label="Idioma / Language"><option value="pt">PT</option><option value="en">EN</option><option value="es">ES</option></select>
        </div>
      </nav>
      <a class="btn btn-primary nav-cta" href="https://wa.me/5521997464308" data-chat-open data-whatsapp="contact.message" target="_blank" rel="noopener" data-i18n="nav.quote">Orçamento</a>
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
    <div class="container footer-grid">
      <div class="footer-brand">
        <a class="logo" href="index.html" aria-label="Nizity"><span aria-hidden="true">n<span class="logo-i">ı<svg class="logo-orb" viewBox="-1.12 -1.12 2.24 2.24"><g stroke-width="0.14" stroke-linecap="round"><line x1="0.526" y1="0.304" x2="0.000" y2="0.982" stroke-opacity="1"/><line x1="0.526" y1="0.304" x2="-0.000" y2="-0.607" stroke-opacity="1"/><line x1="0.526" y1="0.304" x2="0.851" y2="-0.491" stroke-opacity="1"/><line x1="0.526" y1="0.304" x2="-0.526" y2="0.304" stroke-opacity="1"/><line x1="0.526" y1="0.304" x2="0.851" y2="0.491" stroke-opacity="1"/><line x1="-0.000" y1="-0.982" x2="-0.000" y2="-0.607" stroke-opacity="1"/><line x1="-0.000" y1="-0.982" x2="0.851" y2="-0.491" stroke-opacity="1"/><line x1="-0.000" y1="-0.982" x2="-0.851" y2="-0.491" stroke-opacity="1"/><line x1="0.000" y1="0.982" x2="-0.851" y2="0.491" stroke-opacity="1"/><line x1="0.000" y1="0.982" x2="-0.526" y2="0.304" stroke-opacity="1"/><line x1="0.000" y1="0.982" x2="0.851" y2="0.491" stroke-opacity="1"/><line x1="-0.000" y1="-0.607" x2="0.851" y2="-0.491" stroke-opacity="1"/><line x1="-0.000" y1="-0.607" x2="-0.526" y2="0.304" stroke-opacity="1"/><line x1="-0.000" y1="-0.607" x2="-0.851" y2="-0.491" stroke-opacity="1"/><line x1="-0.851" y1="0.491" x2="-0.526" y2="0.304" stroke-opacity="1"/><line x1="-0.851" y1="0.491" x2="-0.851" y2="-0.491" stroke-opacity="1"/><line x1="0.851" y1="-0.491" x2="0.851" y2="0.491" stroke-opacity="1"/><line x1="-0.526" y1="0.304" x2="-0.851" y2="-0.491" stroke-opacity="1"/></g></svg></span>zity</span></a>
        <p data-i18n="footer.tagline">Sites e sistemas sob medida, direto com quem faz.</p>
      </div>
      <nav class="footer-col" aria-label="Navegar" data-i18n-label="footer.nav">
        <p class="footer-title" data-i18n="footer.nav">Navegar</p>
        <a href="services.html" data-i18n="nav.services">Serviços</a>
        <a href="products.html" data-i18n="nav.products">Produtos</a>
        <a href="projects.html" data-i18n="nav.projects">Projetos</a>
      </nav>
      <div class="footer-col">
        <p class="footer-title" data-i18n="footer.contact">Contato</p>
        <a href="#" data-whatsapp="contact.message" target="_blank" rel="noopener" hidden data-i18n="contact.whatsapp">WhatsApp</a>
      </div>
      <div class="footer-col">
        <p class="footer-title" data-i18n="footer.legal">Legal</p>
        <a href="privacy.html" data-i18n="footer.privacy">Privacidade</a>
      </div>
    </div>
    <div class="container footer-inner">
      <span>© <span id="year"></span> Nizity</span>
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
    html = html.replace('<a href="services.html" data-i18n=', '<a href="services.html" aria-current="true" data-i18n=')
    html = fill(html).replace("{title}", PT[f"meta.title.svc-{key}"]).replace("{desc}", PT[f"meta.description.svc-{key}"])
    open(f"{ROOT}/{file}", "w").write(html)
    print(file)


# Cabeçalho e rodapé das páginas simples (privacidade e 404)
# current: item do menu que fica marcado quando a página mora dentro dele (ex.: o Salão, dentro de Produtos)
def simple_page(file, page, title_key, desc_key, body, i18n_extra="", current=None):
    head = (HEAD.replace("<title>Projetos — Nizity</title>", f"<title>{PT[title_key]}</title>")
                .replace('content="Projetos e stack de Guilherme (Nizity)."', f'content="{PT.get(desc_key, PT["meta.description.home"])}"')
                .replace('<meta property="og:title" content="Projetos — Nizity">', f'<meta property="og:title" content="{PT[title_key]}">')
                .replace("https://nizity.com/projects.html", f"https://nizity.com/{file}"))
    html = f'''{head}</head>
<body data-page="{page}">
  <header class="site-header">
    <div class="container nav">
      <button class="lang-toggle menu-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Menu" data-i18n-label="nav.menu">☰</button>
      <a class="logo" href="index.html" aria-label="Nizity"><span aria-hidden="true">n<span class="logo-i">ı<svg class="logo-orb" viewBox="-1.12 -1.12 2.24 2.24"><g stroke-width="0.14" stroke-linecap="round"><line x1="0.526" y1="0.304" x2="0.000" y2="0.982" stroke-opacity="1"/><line x1="0.526" y1="0.304" x2="-0.000" y2="-0.607" stroke-opacity="1"/><line x1="0.526" y1="0.304" x2="0.851" y2="-0.491" stroke-opacity="1"/><line x1="0.526" y1="0.304" x2="-0.526" y2="0.304" stroke-opacity="1"/><line x1="0.526" y1="0.304" x2="0.851" y2="0.491" stroke-opacity="1"/><line x1="-0.000" y1="-0.982" x2="-0.000" y2="-0.607" stroke-opacity="1"/><line x1="-0.000" y1="-0.982" x2="0.851" y2="-0.491" stroke-opacity="1"/><line x1="-0.000" y1="-0.982" x2="-0.851" y2="-0.491" stroke-opacity="1"/><line x1="0.000" y1="0.982" x2="-0.851" y2="0.491" stroke-opacity="1"/><line x1="0.000" y1="0.982" x2="-0.526" y2="0.304" stroke-opacity="1"/><line x1="0.000" y1="0.982" x2="0.851" y2="0.491" stroke-opacity="1"/><line x1="-0.000" y1="-0.607" x2="0.851" y2="-0.491" stroke-opacity="1"/><line x1="-0.000" y1="-0.607" x2="-0.526" y2="0.304" stroke-opacity="1"/><line x1="-0.000" y1="-0.607" x2="-0.851" y2="-0.491" stroke-opacity="1"/><line x1="-0.851" y1="0.491" x2="-0.526" y2="0.304" stroke-opacity="1"/><line x1="-0.851" y1="0.491" x2="-0.851" y2="-0.491" stroke-opacity="1"/><line x1="0.851" y1="-0.491" x2="0.851" y2="0.491" stroke-opacity="1"/><line x1="-0.526" y1="0.304" x2="-0.851" y2="-0.491" stroke-opacity="1"/></g></svg></span>zity</span></a>
      <nav class="nav-links" id="nav-links">
        <a href="services.html" data-i18n="nav.services">Serviços</a>
        <a href="products.html" data-i18n="nav.products">Produtos</a>
        <a href="projects.html" data-i18n="nav.projects">Projetos</a>
        <div class="nav-prefs">
          <button class="lang-toggle theme-toggle" id="theme-toggle" type="button" aria-label="Mudar tema">☀</button>
          <select class="lang-toggle lang-select" id="lang-toggle" aria-label="Idioma / Language"><option value="pt">PT</option><option value="en">EN</option><option value="es">ES</option></select>
        </div>
      </nav>
      <a class="btn btn-primary nav-cta" href="https://wa.me/5521997464308" data-chat-open data-whatsapp="contact.message" target="_blank" rel="noopener" data-i18n="nav.quote">Orçamento</a>
    </div>
  </header>

  <main>
{body}
  </main>

  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a class="logo" href="index.html" aria-label="Nizity"><span aria-hidden="true">n<span class="logo-i">ı<svg class="logo-orb" viewBox="-1.12 -1.12 2.24 2.24"><g stroke-width="0.14" stroke-linecap="round"><line x1="0.526" y1="0.304" x2="0.000" y2="0.982" stroke-opacity="1"/><line x1="0.526" y1="0.304" x2="-0.000" y2="-0.607" stroke-opacity="1"/><line x1="0.526" y1="0.304" x2="0.851" y2="-0.491" stroke-opacity="1"/><line x1="0.526" y1="0.304" x2="-0.526" y2="0.304" stroke-opacity="1"/><line x1="0.526" y1="0.304" x2="0.851" y2="0.491" stroke-opacity="1"/><line x1="-0.000" y1="-0.982" x2="-0.000" y2="-0.607" stroke-opacity="1"/><line x1="-0.000" y1="-0.982" x2="0.851" y2="-0.491" stroke-opacity="1"/><line x1="-0.000" y1="-0.982" x2="-0.851" y2="-0.491" stroke-opacity="1"/><line x1="0.000" y1="0.982" x2="-0.851" y2="0.491" stroke-opacity="1"/><line x1="0.000" y1="0.982" x2="-0.526" y2="0.304" stroke-opacity="1"/><line x1="0.000" y1="0.982" x2="0.851" y2="0.491" stroke-opacity="1"/><line x1="-0.000" y1="-0.607" x2="0.851" y2="-0.491" stroke-opacity="1"/><line x1="-0.000" y1="-0.607" x2="-0.526" y2="0.304" stroke-opacity="1"/><line x1="-0.000" y1="-0.607" x2="-0.851" y2="-0.491" stroke-opacity="1"/><line x1="-0.851" y1="0.491" x2="-0.526" y2="0.304" stroke-opacity="1"/><line x1="-0.851" y1="0.491" x2="-0.851" y2="-0.491" stroke-opacity="1"/><line x1="0.851" y1="-0.491" x2="0.851" y2="0.491" stroke-opacity="1"/><line x1="-0.526" y1="0.304" x2="-0.851" y2="-0.491" stroke-opacity="1"/></g></svg></span>zity</span></a>
        <p data-i18n="footer.tagline">Sites e sistemas sob medida, direto com quem faz.</p>
      </div>
      <nav class="footer-col" aria-label="Navegar" data-i18n-label="footer.nav">
        <p class="footer-title" data-i18n="footer.nav">Navegar</p>
        <a href="services.html" data-i18n="nav.services">Serviços</a>
        <a href="products.html" data-i18n="nav.products">Produtos</a>
        <a href="projects.html" data-i18n="nav.projects">Projetos</a>
      </nav>
      <div class="footer-col">
        <p class="footer-title" data-i18n="footer.contact">Contato</p>
        <a href="#" data-whatsapp="contact.message" target="_blank" rel="noopener" hidden data-i18n="contact.whatsapp">WhatsApp</a>
      </div>
      <div class="footer-col">
        <p class="footer-title" data-i18n="footer.legal">Legal</p>
        <a href="privacy.html" data-i18n="footer.privacy">Privacidade</a>
      </div>
    </div>
    <div class="container footer-inner">
      <span>© <span id="year"></span> Nizity</span>
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
    if current:
        html = html.replace(f'<a href="{current}" data-i18n=', f'<a href="{current}" aria-current="true" data-i18n=')
    else:
        html = html.replace(f'<a href="{file}" data-i18n=', f'<a href="{file}" aria-current="page" data-i18n=')
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

# Peças das páginas de produto: link do WhatsApp (sem JS já abre; o main.js acrescenta a mensagem)
# e texto alternativo em português já no HTML, trocado pelo main.js conforme o idioma
WA = "https://wa.me/5521997464308"
def alt(key):
    return f'alt="{html_lib.escape(PT[key])}" data-i18n-alt="{key}"'

# Produtos: vitrine longa, um bloco por produto (texto à esquerda, a tela à direita).
# A página de projetos continua sendo para recrutadores
simple_page("products.html", "products", "meta.title.products", "meta.description.products", f'''    <div class="container">
      <section class="intro">
        <div>
          <p class="kicker" data-i18n="products.kicker"></p>
          <h1 data-i18n-html="products.pageTitle"></h1>
          <p data-i18n="products.lead"></p>
        </div>
      </section>

      <section class="prod" aria-labelledby="prod-p1">
        <div class="prod-text">
          <p class="kicker"><span>NZ-P1 · <span data-i18n="products.p1.type"></span></span></p>
          <h2 id="prod-p1" data-i18n="products.p1.title" data-vt="salao"></h2>
          <p class="prod-desc" data-i18n="products.p1.text"></p>
          <ul class="prod-list">
            <li data-i18n="products.p1.p1"></li>
            <li data-i18n="products.p1.p2"></li>
            <li data-i18n="products.p1.p3"></li>
          </ul>
          <div class="prod-acts">
            <a class="btn btn-primary" href="demo/salao/"><span data-i18n="products.demo"></span></a>
            <a class="home-link" href="salao.html"><span data-i18n="products.p1.more"></span><span aria-hidden="true">→</span></a>
          </div>
          <p class="prod-note"><span data-i18n="products.p1.price"></span> · <a href="{WA}" data-whatsapp="products.p1.message" target="_blank" rel="noopener"><span data-i18n="products.p1.cta"></span> <span aria-hidden="true">→</span></a></p>
        </div>
        <img class="shot" src="assets/img/salao-vitrine.webp" width="1260" height="720" {alt("home.prod.alt")}>
      </section>

      <section class="prod" aria-labelledby="prod-p2">
        <div class="prod-text">
          <p class="tag-soon" data-i18n="products.soon"></p>
          <p class="kicker"><span>NZ-P2 · <span data-i18n="products.p2.type"></span></span></p>
          <h2 id="prod-p2" data-i18n="products.p2.title"></h2>
          <p class="prod-desc" data-i18n="products.p2.text"></p>
        </div>
        <!-- Sem tela para mostrar ainda: caixa pontilhada no lugar (não inventar imagem) -->
        <div class="soon-box" aria-hidden="true"><span data-i18n="products.soon"></span></div>
      </section>
    </div>''')

# Salão: página longa do produto (nizity.com/salao). Mora dentro de Produtos no menu.
# Como funciona = 4 telas: garçom (celular), cozinha na bancada (tablet, marca preparando/pronto),
# cozinha na parede (telão, só mostra) e cliente (QR, só consulta). Imagens são telas reais do Salão
FLOW = [("waiter", "salao-garcom.webp", 520, 986, True), ("control", "salao-tablet.webp", 1120, 766, False),
        ("tv", "salao-telao.webp", 1200, 676, False), ("guest", "salao-cardapio.webp", 520, 986, True)]
flow = "\n".join(f'''          <li class="flow-step">
            <div>
              <p class="flow-code" data-i18n="salao.flow.{k}.code"></p>
              <h3 data-i18n="salao.flow.{k}.title"></h3>
              <p data-i18n="salao.flow.{k}.text"></p>
            </div>
            <img class="shot flow-img{" is-phone" if phone else ""}" src="assets/img/{img}" width="{w}" height="{h}" loading="lazy" {alt(f"salao.flow.{k}.alt")}>
          </li>''' for k, img, w, h, phone in FLOW)
def card(code, title, text):
    return f'''          <article class="item">
            <div class="item-head"><span class="item-code" data-i18n="{code}"></span><h3{title}</h3></div>
            <div class="item-body"><p data-i18n="{text}"></p></div>
          </article>'''
status = "\n".join(card(f"salao.status.{k}.code", f' data-i18n="salao.status.{k}.title">', f"salao.status.{k}.text") for k in ("now", "next"))
PILOT = f'href="{WA}" data-whatsapp="products.p1.message" target="_blank" rel="noopener"><span data-i18n="products.p1.cta"></span>'
simple_page("salao.html", "salao", "meta.title.salao", "meta.description.salao", f'''    <div class="container">
      <section class="cs-hero">
        <div>
          <p class="kicker"><span><span data-i18n="salao.kicker"></span> · NZ-P1</span></p>
          <h1 data-i18n="products.p1.title" data-vt="salao"></h1>
          <p class="lead" data-i18n="salao.lead"></p>
          <div class="cs-acts">
            <a class="btn btn-primary" href="demo/salao/"><span data-i18n="products.demo"></span></a>
            <a class="home-link" {PILOT}<span aria-hidden="true">→</span></a>
          </div>
        </div>
        <img class="shot" src="assets/img/salao-vitrine.webp" width="1260" height="720" {alt("home.prod.alt")}>
      </section>

      <section class="cs-sec" aria-labelledby="salao-problem">
        <p class="kicker" data-i18n="salao.problem.kicker"></p>
        <h2 id="salao-problem" data-i18n="salao.problem.title"></h2>
        <p class="cs-text" data-i18n="salao.problem.text"></p>
      </section>

      <section class="cs-sec" aria-labelledby="salao-flow">
        <p class="kicker" data-i18n="salao.flow.kicker"></p>
        <h2 id="salao-flow" data-i18n="salao.flow.title"></h2>
        <ul class="flow">
{flow}
        </ul>
        <p class="cs-note" data-i18n="salao.flow.note"></p>
      </section>

      <section class="cs-sec" aria-labelledby="salao-status">
        <p class="kicker" data-i18n="salao.status.kicker"></p>
        <h2 id="salao-status" data-i18n="salao.status.title"></h2>
        <div class="cs-cards cs-status">
{status}
        </div>
      </section>

      <section class="cs-end" aria-labelledby="salao-end">
        <h2 id="salao-end" data-i18n-html="salao.end.title"></h2>
        <p data-i18n="salao.end.text"></p>
        <div class="cs-acts">
          <a class="btn btn-primary" href="demo/salao/"><span data-i18n="products.demo"></span></a>
          <a class="home-link" {PILOT}<span aria-hidden="true">→</span></a>
        </div>
        <a class="cs-back" href="products.html"><span aria-hidden="true">←</span> <span data-i18n="salao.back"></span></a>
      </section>
    </div>''', "\n  <script src=\"assets/i18n-salao.js\"></script>", current="products.html")

# Serviços: os 3 pacotes; cada card leva à página do serviço (com a transição do título)
SERVICE_CARDS = '''      <div class="cards">
        <article class="item">
          <div class="item-head">
            <span class="item-code">NZ-01</span>
            <h3 data-i18n="services.s1.title" data-vt="svc-landing">Landing page</h3>
            <span class="item-price" data-i18n="services.price">Sob consulta</span>
            <span class="item-type" data-i18n="services.s1.type">Página única</span>
          </div>
          <div class="item-body">
            <p data-i18n="services.s1.text">Uma página rápida que apresenta seu negócio e leva o cliente até você.</p>
            <ul class="stats">
              <li class="stat"><span data-i18n="stat.scope">Escopo</span><span class="bar"><i style="width: 30%"></i></span></li>
              <li class="stat"><span data-i18n="stat.time">Prazo</span><span class="bar"><i style="width: 25%"></i></span></li>
              <li class="stat"><span data-i18n="stat.support">Acompanhamento</span><span class="bar"><i style="width: 40%"></i></span></li>
            </ul>
            <ul class="perks">
              <li class="perk" data-i18n="services.s1.p1">Funciona no celular e no computador</li>
              <li class="perk" data-i18n="services.s1.p2">Botão direto para o seu WhatsApp</li>
              <li class="perk" data-i18n="services.s1.p3">Domínio próprio e HTTPS</li>
            </ul>
          </div>
          <a class="item-foot" href="service-landing.html"><span data-i18n="services.more">Saiba mais</span><span aria-hidden="true">→</span></a>
        </article>

        <article class="item exotic">
          <div class="item-head">
            <span class="item-code">NZ-02</span>
            <h3 data-i18n="services.s2.title" data-vt="svc-system">Sistema sob medida</h3>
            <span class="item-price" data-i18n="services.price">Sob consulta</span>
            <span class="item-type" data-i18n="services.s2.type">Web e app</span>
          </div>
          <div class="item-body">
            <p data-i18n="services.s2.text">Painel ou app para organizar o que hoje vive em planilha e WhatsApp.</p>
            <ul class="stats">
              <li class="stat"><span data-i18n="stat.scope">Escopo</span><span class="bar"><i style="width: 90%"></i></span></li>
              <li class="stat"><span data-i18n="stat.time">Prazo</span><span class="bar"><i style="width: 80%"></i></span></li>
              <li class="stat"><span data-i18n="stat.support">Acompanhamento</span><span class="bar"><i style="width: 70%"></i></span></li>
            </ul>
            <ul class="perks">
              <li class="perk" data-i18n="services.s2.p1">Entendo o problema antes do código</li>
              <li class="perk" data-i18n="services.s2.p2">Web e/ou app Android</li>
              <li class="perk" data-i18n="services.s2.p3">Segurança e LGPD desde o início</li>
            </ul>
          </div>
          <a class="item-foot" href="service-system.html"><span data-i18n="services.more">Saiba mais</span><span aria-hidden="true">→</span></a>
        </article>

        <article class="item">
          <div class="item-head">
            <span class="item-code">NZ-03</span>
            <h3 data-i18n="services.s3.title" data-vt="svc-maintenance">Manutenção</h3>
            <span class="item-price" data-i18n="services.price">Sob consulta</span>
            <span class="item-type" data-i18n="services.s3.type">Mensal</span>
          </div>
          <div class="item-body">
            <p data-i18n="services.s3.text">Seu site ou sistema no ar, seguro e atualizado todo mês.</p>
            <ul class="stats">
              <li class="stat"><span data-i18n="stat.scope">Escopo</span><span class="bar"><i style="width: 35%"></i></span></li>
              <li class="stat"><span data-i18n="stat.time">Prazo</span><span class="bar"><i style="width: 100%"></i></span></li>
              <li class="stat"><span data-i18n="stat.support">Acompanhamento</span><span class="bar"><i style="width: 100%"></i></span></li>
            </ul>
            <ul class="perks">
              <li class="perk" data-i18n="services.s3.p1">Correções e pequenas melhorias</li>
              <li class="perk" data-i18n="services.s3.p2">Atualizações de segurança</li>
              <li class="perk" data-i18n="services.s3.p3">Suporte direto comigo</li>
            </ul>
          </div>
          <a class="item-foot" href="service-maintenance.html"><span data-i18n="services.more">Saiba mais</span><span aria-hidden="true">→</span></a>
        </article>
      </div>'''
simple_page("services.html", "services", "meta.title.services", "meta.description.services", f'''    <section class="container intro">
      <div>
        <p class="kicker" data-i18n="services.kicker"></p>
        <h1 data-i18n-html="services.pageTitle"></h1>
        <p data-i18n="services.lead"></p>
      </div>
    </section>

    <section class="container section">
{SERVICE_CARDS}
    </section>''', "\n  <script src=\"assets/i18n-services.js\"></script>")
