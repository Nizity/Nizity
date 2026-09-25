# Gera as 3 páginas de serviço (service-*.html) com a mesma estrutura. Rodar: python3 tools/gen_services.py
# Os textos ficam em assets/i18n-services.js; o português é escrito direto no HTML (sem JS e para o Google).
import json, os, re, subprocess
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = [
  # arquivo, chave, código, quantos itens de "incluso", exemplos [(chave, href)], faq extra?
  ("service-landing.html", "landing", "NZ-01", "s1", [("ex1", "index.html")], True, ""),
  ("service-system.html", "system", "NZ-02", "s2", [("ex1", "demo/salao/"), ("ex2", "projects.html")], True, " exotic"),
  ("service-maintenance.html", "maintenance", "NZ-03", "s3", [], False, ""),
]
PT = json.loads(subprocess.check_output(["node", "-e",
  "const fs=require('fs');eval(fs.readFileSync('assets/i18n.js','utf8')+fs.readFileSync('assets/i18n-services.js','utf8')+';console.log(JSON.stringify(translations.pt))')"], cwd=ROOT))

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
        <a class="btn btn-nav" href="#" data-whatsapp="services.{s}.message" target="_blank" rel="noopener" hidden data-i18n="nav.quote">Orçamento</a>
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
        <a class="btn" href="#" data-whatsapp="services.{s}.message" target="_blank" rel="noopener"><span data-i18n="svc.cta">Conversar pelo WhatsApp</span></a>
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
        <a class="btn" href="#" data-whatsapp="services.{s}.message" target="_blank" rel="noopener"><span data-i18n="svc.cta">Conversar pelo WhatsApp</span></a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <span>© <span id="year"></span> Nizity</span>
      <a href="#" data-i18n="footer.top">Voltar ao topo ↑</a>
    </div>
  </footer>

  <script src="assets/i18n.js"></script>
  <script src="assets/i18n-services.js"></script>
  <script src="assets/fx.js"></script>
  <script src="assets/main.js"></script>
</body>
</html>
'''
    html = fill(html).replace("{title}", PT[f"meta.title.svc-{key}"]).replace("{desc}", PT[f"meta.description.svc-{key}"])
    open(f"{ROOT}/{file}", "w").write(html)
    print(file)
