document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.getElementById('profileImage');
    const fileInput = document.getElementById('fileInput');

    profileImage.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            profileImage.src = e.target.result;
        };

        reader.readAsDataURL(file);
    });
});