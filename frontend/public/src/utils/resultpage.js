const previewImage = document.getElementById('previewImage');

const imageData = sessionStorage.getItem('uploadedImage');

if (imageData) {
    previewImage.src = imageData;
}