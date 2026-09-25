// Demo (demo.html): tema da casca aplicado antes de pintar, sem piscar escuro → claro.
// Arquivo externo de propósito: a CSP do nizity.com (script-src 'self') bloqueia script inline.
// Mesma escolha salva pelo site ("nizity-theme"); sem escolha, segue o sistema. Depois, src/demo/shellTheme.ts assume.
(function () {
  var theme = null
  try { theme = localStorage.getItem('nizity-theme') } catch { /* armazenamento bloqueado */ }
  if (theme !== 'light' && theme !== 'dark') theme = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  document.documentElement.setAttribute('data-demo-theme', theme)
  // Barra do navegador no celular: mesma cor de --demo-bg (demo.css); o escuro já vem no <meta>
  var meta = document.querySelector('meta[name="theme-color"]')
  if (meta && theme === 'light') meta.setAttribute('content', '#ECEAF3')
})()
