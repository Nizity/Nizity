# Arena → GitHub (para a sessão do Arena no PC)

> De: sessão da nuvem (nizity.com / Salão), 2026-09-25.
> O Guilherme decidiu: **o código do Arena passa a ser cuidado pela sessão da nuvem.** O PC fica com: rodar no A57, gerar APK de teste e o túnel `arena.nizity.com`. Para isso o código precisa estar no GitHub, em repositório **privado**.
> Obrigado pelo pedido de design. Ele não foi esquecido: é a primeira coisa que a nuvem faz quando o repo chegar.

## 1. Conferir segredos ANTES do push (obrigatório)

No PowerShell, dentro de `C:\Users\Funbio\Desktop\arena`:

```powershell
git status
type .gitignore
```

O `.gitignore` precisa cobrir, no mínimo:

```
node_modules/
.env
.env.*
!.env.example
*.keystore
*.jks
google-services.json
GoogleService-Info.plist
credentials*.json
.expo/
dist/
android/app/release/
```

Procurar segredos no **histórico inteiro** (não só nos arquivos atuais):

```powershell
git log --all --name-only --pretty=format: | Sort-Object -Unique | Select-String -Pattern '\.env|keystore|\.jks|google-services|credential|secret'
git grep -I -n -E "(api[_-]?key|secret|token|password|senha)\s*[:=]\s*['\"][^'\"]{8,}" $(git rev-list --all)
```

- **Achou algo?** Pare aqui e mande a saída para a sessão da nuvem (sem copiar o valor do segredo). Segredo que já está no histórico não some com `.gitignore`. Vamos decidir juntos: trocar a chave e/ou limpar o histórico.
- **Não achou nada?** Siga.

## 2. Guilherme cria o repositório (no navegador)

`github.com/new` → Proprietário **Nizity**, nome **`arena`**, **Privado**, **sem** README / .gitignore / licença → **Criar repositório**.

Depois, em `claude.ai/connect-github`, confira que o app do Claude tem acesso ao `arena` (se estiver em "Only select repositories", marque ele).

## 3. Enviar

```powershell
git remote add origin https://github.com/Nizity/arena.git
git branch --show-current
git push -u origin <nome-do-branch-que-apareceu>
```

Se houver mais de um branch com trabalho, envie todos: `git push -u origin --all`.

## 4. Depois do push

- A sessão do Arena no PC **não edita mais o código** (evita duas sessões mexendo no mesmo repo). Ela fica para:
  - rodar o app no A57 e o Expo web;
  - gerar APK de teste;
  - cuidar do túnel `arena.nizity.com` (porta 8010).
- Para pegar as mudanças da nuvem: `git pull`.
- Guilherme avisa a sessão da nuvem: **"subiu"**.

## Sobre o túnel (resposta ao pedido)

A sessão da nuvem **não montou e não enxerga** o túnel: quem montou o `campo.nizity.com` foi a sessão do campo, no PC. Conferido de fora: o `campo.nizity.com` responde pela Cloudflare com 303 (provavelmente o login do Cloudflare Access).

Recomendação técnica (a decisão é do Guilherme com a sessão do campo):

- **Mesmo túnel nomeado, mais uma regra de ingress.** No `config.yml` do cloudflared, antes da regra final `http_status:404`:
  ```yaml
  - hostname: arena.nizity.com
    service: http://localhost:8010
  ```
  e depois `cloudflared tunnel route dns <nome-do-tunel> arena.nizity.com`. Um serviço só, uma tarefa de logon só.
- **Proteger com Cloudflare Access** (só e-mails dos testadores), como o campo parece estar.
- O **nizity.com não usa túnel nem porta do PC** (é um Worker da Cloudflare). A porta 8000 citada no README do site é só do servidor local de desenvolvimento, sem conflito.
