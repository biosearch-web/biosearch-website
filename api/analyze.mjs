// Função serverless da Vercel: recebe a foto da planta e a envia para a API do
// Google Gemini (modelo de visão), retornando uma análise estruturada em JSON.
//
// A chave do Gemini vive APENAS aqui, no servidor, lida de process.env.GEMINI_API_KEY.
// O frontend nunca tem acesso a ela — só conversa com este endpoint.

const MODELO = 'gemini-2.5-flash';
const ENDPOINT_GEMINI =
    `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:generateContent`;

// Instrução enviada ao modelo. Pede resposta em português e trata o resultado
// como orientação informativa, não como laudo técnico (alinhado ao SCOPE.md).
const INSTRUCAO = [
    'Você é um assistente de botânica. Analise a imagem da planta e responda em português do Brasil.',
    'Trate o resultado como orientação informativa, nunca como laudo técnico definitivo.',
    'Quando houver incerteza na identificação, deixe claro que a espécie é apenas provável.',
    'Se a imagem não contiver uma planta, indique isso com confiança "baixa" e explique nos campos.',
].join(' ');

// Esquema do JSON que o Gemini deve devolver (responseSchema).
// Garante que todos os campos esperados pela página de resultado venham preenchidos.
const ESQUEMA_RESPOSTA = {
    type: 'object',
    properties: {
        nomeComum: { type: 'string', description: 'Nome popular provável da planta.' },
        nomeCientifico: { type: 'string', description: 'Nome científico provável (gênero/espécie).' },
        confianca: { type: 'string', description: 'Nível de confiança da identificação: alta, média ou baixa.' },
        descricao: { type: 'string', description: 'Descrição visual breve da planta na imagem.' },
        luz: { type: 'string', description: 'Necessidade de luz.' },
        rega: { type: 'string', description: 'Frequência de rega recomendada.' },
        solo: { type: 'string', description: 'Tipo de solo ou substrato indicado.' },
        saude: { type: 'string', description: 'Avaliação do estado de saúde aparente da planta.' },
        sinais: { type: 'string', description: 'Sinais visíveis de estresse, pragas ou deficiências.' },
        recomendacoes: { type: 'string', description: 'Orientações práticas de manutenção.' },
    },
    required: [
        'nomeComum', 'nomeCientifico', 'confianca', 'descricao', 'luz',
        'rega', 'solo', 'saude', 'sinais', 'recomendacoes',
    ],
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ erro: 'Método não permitido. Use POST.' });
    }

    const chave = process.env.GEMINI_API_KEY;
    if (!chave) {
        console.error('GEMINI_API_KEY ausente no ambiente.');
        return res.status(500).json({ erro: 'Configuração do servidor incompleta. Tente mais tarde.' });
    }

    // O corpo pode vir como objeto (parse automático da Vercel) ou string.
    const corpo = typeof req.body === 'string' ? safeParse(req.body) : req.body;
    const imagem = corpo && corpo.imagem;

    if (!imagem || typeof imagem !== 'string' || !imagem.startsWith('data:image/')) {
        return res.status(400).json({ erro: 'Imagem inválida ou ausente. Envie uma data URL de imagem.' });
    }

    // Separa o mime type e o base64 da data URL (ex.: "data:image/jpeg;base64,XXXX").
    const partes = imagem.match(/^data:(image\/[\w.+-]+);base64,(.+)$/);
    if (!partes) {
        return res.status(400).json({ erro: 'Formato de imagem não suportado.' });
    }
    const [, mimeType, base64] = partes;

    try {
        const respostaGemini = await fetch(`${ENDPOINT_GEMINI}?key=${chave}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [
                            { text: INSTRUCAO },
                            { inline_data: { mime_type: mimeType, data: base64 } },
                        ],
                    },
                ],
                generationConfig: {
                    responseMimeType: 'application/json',
                    responseSchema: ESQUEMA_RESPOSTA,
                },
            }),
        });

        if (!respostaGemini.ok) {
            const detalhe = await respostaGemini.text();
            console.error('Erro do Gemini:', respostaGemini.status, detalhe);
            return res.status(502).json({ erro: 'Não foi possível analisar a imagem agora. Tente novamente.' });
        }

        const dados = await respostaGemini.json();
        const conteudo =
            dados.candidates &&
            dados.candidates[0] &&
            dados.candidates[0].content &&
            dados.candidates[0].content.parts &&
            dados.candidates[0].content.parts[0] &&
            dados.candidates[0].content.parts[0].text;

        if (!conteudo) {
            console.error('Resposta do Gemini sem conteúdo:', JSON.stringify(dados));
            return res.status(502).json({ erro: 'Resposta inesperada da análise. Tente novamente.' });
        }

        return res.status(200).json(JSON.parse(conteudo));
    } catch (erro) {
        console.error('Falha ao chamar o Gemini:', erro);
        return res.status(500).json({ erro: 'Erro interno ao analisar a imagem. Tente novamente.' });
    }
}

function safeParse(texto) {
    try {
        return JSON.parse(texto);
    } catch {
        return null;
    }
}
