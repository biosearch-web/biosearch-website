# BioSearch

BioSearch é um aplicativo web que recebe a foto de uma planta e usa IA para identificar informações úteis sobre ela, como espécie provável, cuidados, sinais de saúde e orientações básicas de manutenção.

## Sobre

O projeto visa utilizar de maneira real os conhecimentos obtidos na matéria de Ferramentas Web e UX, realizando a produção de um website a partir de um protótipo de aplicação feita no figma.

## Stack atual

O projeto está em fase inicial e, neste momento, é construído com tecnologias web puras:

- **HTML5** — uma página por tela em `frontend/pages/`
- **CSS3** — folhas de estilo por página em `frontend/src/styles/`
- **JavaScript vanilla** — ainda sem comportamento dinâmico implementado

Não há `package.json`, build step ou framework. A migração futura para React + Vite + Tailwind CSS está prevista no escopo do produto (`docs/SCOPE.md`).

## Estrutura do projeto

```
frontend/
├── public/index.html          # template raiz (a definir)
├── pages/                     # uma página HTML por tela
│   ├── start.html             # tela inicial (implementada)
│   ├── signin.html            # login
│   ├── signup.html            # cadastro
│   ├── camerapage.html        # envio/captura de foto
│   ├── resultpage.html        # resultado da análise
│   ├── user.html              # perfil
│   ├── friends.html           # social
│   └── passwordrecover.html   # recuperação de senha
└── src/
    ├── styles/                # CSS por página
    ├── components/            # header, footer, articles (em construção)
    └── assets/                # imagens, logo
```

## Como rodar o site

Como os arquivos HTML usam caminhos absolutos para CSS e imagens (ex.: `/frontend/src/assets/logo.png`), é necessário servir a raiz do repositório por um servidor estático — abrir o arquivo direto pelo navegador (`file://`) quebra os assets.

### Opção 1 — Python (recomendado, sem dependências)

1. Clone o repositório.

```bash
git clone https://github.com/biosearch-web/biosearch-website.git
```

2. Acesse a pasta do projeto.

```bash
cd biosearch-website
```

3. Inicie um servidor estático na raiz.

```bash
python3 -m http.server 8000
```

4. Abra no navegador: `http://localhost:8000/frontend/pages/start.html`

### Opção 2 — VS Code Live Server

1. Instale a extensão **Live Server** no VS Code.
2. Abra a pasta do projeto.
3. Clique com o botão direito em `frontend/pages/start.html` → **Open with Live Server**.

> As opções acima servem **apenas o front estático**. A análise de planta por IA depende da função serverless em `/api`, que não roda nesses servidores. Para testá-la, use a Opção 3.

### Opção 3 — Vercel CLI (com a análise por IA)

A identificação da planta é feita por uma função serverless (`api/analyze.js`) que chama o Google Gemini. A chave fica numa variável de ambiente no servidor e **nunca** é exposta no navegador.

1. Instale a Vercel CLI.

```bash
npm i -g vercel
```

2. Gere uma chave gratuita em [aistudio.google.com](https://aistudio.google.com) (Get API key) e crie um arquivo `.env.local` na raiz (a partir de `.env.local.example`):

```bash
GEMINI_API_KEY=...
```

3. Rode o ambiente de desenvolvimento da Vercel.

```bash
vercel dev
```

4. Abra no navegador: `http://localhost:3000/frontend/public/pages/start.html`

> Em produção, configure `GEMINI_API_KEY` em **Settings → Environment Variables** no painel da Vercel. Nunca commite a chave.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature.
3. Commit suas alterações.
4. Abra um Pull Request.
