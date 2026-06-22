// Servidor de desenvolvimento local (apenas para testes).
// Reproduz o roteamento da Vercel: serve os arquivos estáticos da raiz e
// encaminha POST /api/analyze para a função serverless api/analyze.js.
// Node puro, sem dependências. NÃO usar em produção (lá quem serve é a Vercel).
//
// Uso:  node dev-server.js   →  http://localhost:3000/frontend/public/pages/home.html

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = fileURLToPath(new URL('.', import.meta.url));
const PORTA = 3000;

// Carrega variáveis de .env.local manualmente (sem dotenv).
if (existsSync(join(RAIZ, '.env.local'))) {
    for (const linha of readFileSync(join(RAIZ, '.env.local'), 'utf8').split('\n')) {
        const limpa = linha.trim();
        if (!limpa || limpa.startsWith('#')) continue;
        const idx = limpa.indexOf('=');
        if (idx === -1) continue;
        const chave = limpa.slice(0, idx).trim();
        const valor = limpa.slice(idx + 1).trim();
        if (!(chave in process.env)) process.env[chave] = valor;
    }
}

const TIPOS = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
};

// Adapta a resposta nativa do Node para a API que o handler da Vercel espera.
function adaptarResposta(res) {
    res.status = (codigo) => {
        res.statusCode = codigo;
        return res;
    };
    res.json = (obj) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(obj));
        return res;
    };
    return res;
}

const servidor = createServer(async (req, res) => {
    // Rota da função serverless.
    if (req.url === '/api/analyze') {
        const { default: handler } = await import('./api/analyze.mjs');

        let corpo = '';
        req.on('data', (chunk) => { corpo += chunk; });
        req.on('end', () => {
            req.body = corpo;
            adaptarResposta(res);
            handler(req, res).catch((e) => {
                console.error(e);
                res.status(500).json({ erro: 'Erro interno.' });
            });
        });
        return;
    }

    // Arquivos estáticos.
    let caminho = decodeURIComponent(req.url.split('?')[0]);
    if (caminho === '/') caminho = '/index.html';
    const arquivo = normalize(join(RAIZ, caminho));

    if (!arquivo.startsWith(RAIZ)) {
        res.statusCode = 403;
        return res.end('Acesso negado');
    }

    try {
        const conteudo = await readFile(arquivo);
        res.setHeader('Content-Type', TIPOS[extname(arquivo)] || 'application/octet-stream');
        res.end(conteudo);
    } catch {
        res.statusCode = 404;
        res.end('Não encontrado');
    }
});

servidor.listen(PORTA, () => {
    console.log(`Servidor de dev em http://localhost:${PORTA}`);
    console.log(`Home: http://localhost:${PORTA}/frontend/public/pages/home.html`);
    console.log(`GEMINI_API_KEY carregada: ${process.env.GEMINI_API_KEY ? 'sim' : 'NAO'}`);
});
