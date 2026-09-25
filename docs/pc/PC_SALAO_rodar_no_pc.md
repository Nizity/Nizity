# Salão no PC (rodar, testar e, no futuro, publicar)

> De: sessão da nuvem, 2026-09-25. O **código do Salão é cuidado pela sessão da nuvem** (repo privado `Nizity/salao`). No PC você só roda, testa e, quando houver piloto, publica pelo túnel.
> Portas no PC: **8000 = campo**, **8010 = Arena**, **8020 = Salão (API)**, 5173 = Salão (tela, só em desenvolvimento).

## Pré-requisitos (uma vez)

- Git, Python 3.11+, Node 22+.
- Postgres 16: **Docker Desktop** (mais fácil) ou instalação local do Postgres.

## 1. Baixar

```powershell
cd C:\Users\Funbio\Desktop
git clone https://github.com/Nizity/salao.git
cd salao
```

Para atualizar depois: `git pull`.

## 2. Banco

Com Docker (se a 5432 já estiver em uso pelo campo, use outra porta):

```powershell
$env:SALAO_DB_PORT = "5433"
docker compose up -d db
```

## 3. Backend (API)

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements-dev.txt
copy .env.example .env
python -c "import secrets; print(secrets.token_urlsafe(48))"
```

Abra o `.env` e preencha:

```
SALAO_DATABASE_URL=postgresql+psycopg://salao:salao@localhost:5433/salao
SALAO_JWT_SECRET=<cole o valor gerado acima>
SALAO_PUBLIC_BASE_URL=http://localhost:5173
```

(O `.env` nunca vai para o GitHub: já está no `.gitignore`.)

```powershell
alembic upgrade head
python -m app.cli create-restaurant "Bistrô Teste" bistro-teste dona "Dona Teste"
uvicorn app.main:app --port 8020
```

## 4. Tela (em outro terminal)

```powershell
cd C:\Users\Funbio\Desktop\salao\frontend
npm install
$env:SALAO_API_URL = "http://localhost:8020"
npm run dev
```

Abra `http://localhost:5173`, restaurante `bistro-teste`, usuário `dona`. Garçom e cozinha são criados na aba **Equipe**.

No celular (mesmo Wi-Fi): `npm run dev -- --host` e abra o endereço `Network:` que aparecer.

## 5. Testes

```powershell
cd backend
$env:SALAO_TEST_DATABASE_URL = "postgresql+psycopg://salao:salao@localhost:5433/salao_test"
pytest
```

(Os testes apagam as tabelas do banco `salao_test` no fim; por segurança, recusam qualquer banco sem "test" no nome.)

(O de navegador está no `README.md` do repo.)

---

## Futuro: publicar para um piloto (NÃO fazer agora)

Só quando **um restaurante topar o piloto** (critério em `docs/SALAO_ABORDAGEM.md` do site). Aí, com a sessão do campo:

1. Gerar o frontend de produção (`npm run build`) e servir junto da API (a nuvem prepara isso quando chegar a hora).
2. No mesmo túnel nomeado, uma regra de ingress: `salao.nizity.com → http://localhost:8020`, e `cloudflared tunnel route dns <nome-do-tunel> salao.nizity.com`.
3. **Sem Cloudflare Access no cardápio público** (o cliente do restaurante precisa abrir o QR sem login); o resto do app já tem login próprio.
4. `SALAO_PUBLIC_BASE_URL=https://salao.nizity.com` no `.env` e imprimir de novo os QRs.
5. Lembrete honesto: rodando no PC, **se o PC desligar, o restaurante para**. Para piloto de verdade, avaliar um servidor (tem custo; decisão do Guilherme).
