const PROFILE_IMAGE_KEY = 'biosearch-profile-image';
const DEFAULT_PROFILE_IMAGE = '../src/assets/user-icon.png';

const template = document.createElement('template');

template.innerHTML = `
<link rel="stylesheet" href="${new URL('./header.css', import.meta.url).href}">

<header>
  <nav>
    <div class="menu-icon">☰</div>

    <div class="logo">
      <a href="home.html" style="text-decoration: none;">
  <h1>BioSearch</h1>
</a>
    </div>

    <div class="user-icon">
      <a href="user.html">
        <img src="${DEFAULT_PROFILE_IMAGE}" alt="User Profile">
      </a>
    </div>
  </nav>
</header>

<aside class="sidebar">
  <div class="close-menu">➔</div>

  <ul class="links">
    <li>
      <a href="start.html">
        <img src="../src/assets/exit-to-app-svgrepo-com.svg" alt="Log out" width="30" height="25" id="log-out-icon"> Log out 
      </a>
    </li>

    <li>
      <a href="ranking.html">
        <img src="../src/assets/star-svgrepo-com.svg" alt="Log out" width="30" height="25" id="ranking-icon"> Ranking
      </a>
    </li>
  </ul>
</aside>
`;

class HeaderComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleProfileImageChange = this.handleProfileImageChange.bind(this);
  }

  connectedCallback() {
    this.menuIcon = this.shadowRoot.querySelector('.menu-icon');
    this.sidebar = this.shadowRoot.querySelector('.sidebar');
    this.closeMenu = this.shadowRoot.querySelector('.close-menu');
    this.profileImage = this.shadowRoot.querySelector('.user-icon img');

    this.menuIcon.addEventListener('click', this.handleMenuClick);
    this.closeMenu.addEventListener('click', this.handleMenuClick);
    window.addEventListener('storage', this.handleProfileImageChange);
    window.addEventListener('profile-image-changed', this.handleProfileImageChange);

    this.updateProfileImage();
  }

  disconnectedCallback() {
    this.menuIcon.removeEventListener('click', this.handleMenuClick);
    this.closeMenu.removeEventListener('click', this.handleMenuClick);
    window.removeEventListener('storage', this.handleProfileImageChange);
    window.removeEventListener('profile-image-changed', this.handleProfileImageChange);
  }

  updateProfileImage() {
    if (!this.profileImage) return;

    const savedImage = localStorage.getItem(PROFILE_IMAGE_KEY);
    this.profileImage.src = savedImage || DEFAULT_PROFILE_IMAGE;
  }

  handleProfileImageChange() {
    this.updateProfileImage();
  }

  handleMenuClick() {
    this.sidebar.classList.toggle('active');
  }
}

export { HeaderComponent };