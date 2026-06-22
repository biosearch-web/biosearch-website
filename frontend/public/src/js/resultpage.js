// Exibe a imagem enviada e busca a análise da planta na função serverless /api/analyze.
// A função no servidor é quem fala com o Gemini; aqui só enviamos a imagem e
// preenchemos os campos com o JSON retornado.

const previewImage = document.getElementById('previewImage');
const imageData = sessionStorage.getItem('uploadedImage');

if (!imageData) {
    // Sem imagem na sessão não há o que analisar — orienta o usuário a voltar.
    mostrarErro('Nenhuma imagem encontrada. Volte e envie uma foto da planta.');
} else {
    previewImage.src = imageData;
    analisarImagem(imageData);
}

async function analisarImagem(imagem) {
    try {
        const resposta = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imagem }),
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            mostrarErro(dados.erro || 'Não foi possível analisar a imagem.');
            return;
        }

        preencherCampos(dados);
    } catch {
        mostrarErro('Falha de conexão ao analisar a imagem. Tente novamente.');
    }
}

function preencherCampos(dados) {
    definirTexto('speciesName', dados.nomeComum);
    definirTexto('speciesScientific', dados.nomeCientifico);
    definirConfianca(dados.confianca);
    definirTexto('speciesDescription', dados.descricao);
    definirTexto('careLight', dados.luz);
    definirTexto('careWater', dados.rega);
    definirTexto('careSoil', dados.solo);
    definirTexto('healthStatus', dados.saude);
    definirTexto('healthSigns', dados.sinais);
    definirTexto('recommendations', dados.recomendacoes);
}

function definirTexto(id, valor) {
    const elemento = document.getElementById(id);
    if (elemento) elemento.textContent = valor || '—';
}

// Preenche o badge de confiança e aplica a cor conforme o nível (alta/média/baixa).
function definirConfianca(valor) {
    const elemento = document.getElementById('speciesConfidence');
    if (!elemento) return;

    if (!valor) {
        elemento.textContent = '';
        elemento.className = 'badge-confianca';
        return;
    }

    const normalizado = valor.toLowerCase();
    let nivel = '';
    if (normalizado.includes('alta')) nivel = 'conf-alta';
    else if (normalizado.includes('méd') || normalizado.includes('med')) nivel = 'conf-media';
    else if (normalizado.includes('baixa')) nivel = 'conf-baixa';

    elemento.textContent = `Confiança: ${valor}`;
    elemento.className = `badge-confianca ${nivel}`.trim();
}

function mostrarErro(mensagem) {
    const nome = document.getElementById('speciesName');
    if (nome) nome.textContent = mensagem;

    definirConfianca('');

    // Esvazia os demais campos (textContent vazio) para o :empty do CSS escondê-los
    // e não ficarem presos em "Carregando...".
    ['speciesScientific', 'speciesDescription',
        'careLight', 'careWater', 'careSoil',
        'healthStatus', 'healthSigns', 'recommendations']
        .forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.textContent = '';
        });
}
