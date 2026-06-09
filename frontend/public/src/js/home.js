const openCameraBtn = document.getElementById('openCameraBtn');
const fileInput = document.getElementById('fileInput');

openCameraBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (!file) return;

    console.log('Arquivo selecionado:', file);

    const reader = new FileReader();

    reader.onload = (e) => {
        const imageData = e.target.result;

        sessionStorage.setItem('uploadedImage', imageData);

        window.location.href = './resultpage.html';
    };

    reader.readAsDataURL(file);
});