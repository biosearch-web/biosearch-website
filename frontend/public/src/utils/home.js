const openCameraBtn = document.getElementById('openCameraBtn');
const fileInput = document.getElementById('fileInput');

openCameraBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (!file) return;

    console.log('Arquivo selecionado:', file);

    // Exemplo: exibir preview
    const reader = new FileReader();

    reader.onload = (e) => {
        console.log('Imagem carregada:', e.target.result);

        // Exemplo:
        // document.getElementById('preview').src = e.target.result;
    };

    reader.readAsDataURL(file);
});