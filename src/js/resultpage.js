
const PROFILE_IMAGE_KEY = 'biosearch-profile-image';
const DEFAULT_PROFILE_IMAGE = '../src/assets/user-icon.png';
const previewImage = document.getElementById('previewImage');
const imageData = sessionStorage.getItem('uploadedImage');

function updateUserProfileImage(imageSrc) {
    const userProfile = document.getElementById('userProfile');
    if (userProfile) {
        userProfile.src = imageSrc || DEFAULT_PROFILE_IMAGE;
    }
}

function syncProfileImage() {
    const savedProfileImage = localStorage.getItem(PROFILE_IMAGE_KEY);
    updateUserProfileImage(savedProfileImage || DEFAULT_PROFILE_IMAGE);
}

document.addEventListener('DOMContentLoaded', () => {
    syncProfileImage();
    window.addEventListener('storage', syncProfileImage);
    window.addEventListener('profile-image-changed', syncProfileImage);
});

if (!imageData) {
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


    ['speciesScientific', 'speciesDescription',
        'careLight', 'careWater', 'careSoil',
        'healthStatus', 'healthSigns', 'recommendations']
        .forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.textContent = '';
        });
}
