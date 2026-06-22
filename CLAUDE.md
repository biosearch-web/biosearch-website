# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Como rodar

Os arquivos HTML usam caminhos absolutos a partir da raiz do repositório (ex.: `/frontend/src/assets/logo.png`), por isso é obrigatório servir via servidor HTTP — abrir direto pelo navegador (`file://`) quebra os assets.

O front é estático, mas a análise de planta usa uma função serverless em `/api` (ver Backend abaixo). Para testar a análise localmente é preciso `vercel dev`, pois o `python3 -m http.server` **não executa funções serverless**.

```bash
# Apenas o front estático (sem a análise por IA)
python3 -m http.server 8000
# Acesse: http://localhost:8000/frontend/public/pages/start.html

# Front + função /api/analyze (requer Vercel CLI e OPENAI_API_KEY em .env.local)
vercel dev
# Acesse: http://localhost:3000/frontend/public/pages/start.html
```

## Backend (`/api`)

A análise da foto da planta roda numa função serverless da Vercel em `api/analyze.js`, que chama o Google Gemini (`gemini-2.0-flash`, visão) e devolve JSON estruturado em PT-BR.

- A chave fica em `GEMINI_API_KEY` (env var) — **nunca** no frontend nem commitada. Em dev, use `.env.local` (veja `.env.local.example`); em produção, configure no painel da Vercel. Gere a chave em aistudio.google.com.
- Fluxo: `home.js` redimensiona a foto via canvas e grava em `sessionStorage`; `resultpage.js` faz `POST /api/analyze` com a imagem e preenche os campos da página.

## Stack atual

HTML5 + CSS3 + JavaScript vanilla puro. Sem framework, sem bundler, sem transpiler.

A migração futura prevista em `docs/SCOPE.md` é para React + Vite + Tailwind CSS — ainda não iniciada.

## Arquitetura

```
api/                # funções serverless da Vercel (analyze.js → análise da planta via OpenAI)
frontend/public/
├── pages/          # uma página HTML por tela (start, signin, signup, home, resultpage, user, friends, passwordrecover)
├── src/
│   ├── styles/     # CSS por página + global.css
│   ├── components/ # Web Components nativos (ex.: header)
│   │   └── header/ # HeaderComponent (Shadow DOM, sidebar toggle)
│   ├── js/         # Scripts por funcionalidade
│   └── assets/     # Imagens estáticas
└── index.html
```

### Convenções importantes

- **Caminhos absolutos** para assets nas páginas HTML (`/frontend/src/assets/…`); caminhos relativos dentro de componentes usam `import.meta.url`.
- **Web Components** com Shadow DOM para o header (`header.js` exporta `HeaderComponent`; `export.js` re-exporta como `Header`).
- CSS por página: cada tela tem sua própria folha em `src/styles/`. Estilos globais ficam em `global.css`.
- JS por funcionalidade: scripts pequenos e focados em `src/js/` (ex.: `passwordRecover.js` só lida com o submit do formulário de recuperação).
