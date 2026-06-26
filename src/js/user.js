const PROFILE_IMAGE_KEY = 'biosearch-profile-image';
const DEFAULT_PROFILE_IMAGE = '../src/assets/user-icon.png';

function updateHeaderProfileImage(imageSrc) {
    const header = document.querySelector('app-header');

    if (!header?.shadowRoot) return;

    const headerImage = header.shadowRoot.querySelector('.user-icon img');

    if (headerImage) {
        headerImage.src = imageSrc;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.getElementById('profileImage');
    const fileInput = document.getElementById('fileInput');
    const savedProfileImage = localStorage.getItem(PROFILE_IMAGE_KEY);

    if (savedProfileImage) {
        profileImage.src = savedProfileImage;
        updateHeaderProfileImage(savedProfileImage);
    } else {
        profileImage.src = DEFAULT_PROFILE_IMAGE;
    }

    profileImage.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            const imageSrc = e.target.result;
            profileImage.src = imageSrc;
            localStorage.setItem(PROFILE_IMAGE_KEY, imageSrc);
            updateHeaderProfileImage(imageSrc);
        };

        reader.readAsDataURL(file);
    });
});