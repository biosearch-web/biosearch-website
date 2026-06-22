const openCameraBtn = document.getElementById('openCameraBtn');
const fileInput = document.getElementById('fileInput');

// Lado máximo (px) da imagem após redimensionar e qualidade do JPEG.
// Fotos de celular podem ter vários MB; reduzir aqui evita estourar o limite
// de corpo da função serverless (~4,5 MB) e barateia/acelera a chamada à OpenAI.
const LADO_MAXIMO = 1024;
const QUALIDADE_JPEG = 0.8;

openCameraBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
        const imageData = await redimensionarImagem(file);
        sessionStorage.setItem('uploadedImage', imageData);
        window.location.href = './resultpage.html';
    } catch {
        alert('Não foi possível processar a imagem. Tente outra foto.');
    }
});

// Lê o arquivo, redimensiona via <canvas> e devolve uma data URL JPEG.
function redimensionarImagem(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                const escala = Math.min(1, LADO_MAXIMO / Math.max(img.width, img.height));
                const canvas = document.createElement('canvas');
                canvas.width = Math.round(img.width * escala);
                canvas.height = Math.round(img.height * escala);

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                resolve(canvas.toDataURL('image/jpeg', QUALIDADE_JPEG));
            };

            img.onerror = reject;
            img.src = e.target.result;
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
