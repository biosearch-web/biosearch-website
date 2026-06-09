const template = document.createElement('template');

template.innerHTML = `
<link rel="stylesheet" href="${new URL('./header.css', import.meta.url).href}">

<header>
  <nav>
    <div class="menu-icon">☰</div>

    <div class="logo">
      <h1>BioSearch</h1>
    </div>

    <div class="user-icon">
      <a href="user.html">
        <img src="../src/assets/user-icon.png" alt="User Profile">
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
  }

  connectedCallback() {
    this.menuIcon = this.shadowRoot.querySelector('.menu-icon');
    this.sidebar = this.shadowRoot.querySelector('.sidebar');
    this.closeMenu = this.shadowRoot.querySelector('.close-menu');

    this.menuIcon.addEventListener('click', this.handleMenuClick);
    this.closeMenu.addEventListener('click', this.handleMenuClick);
  }

  disconnectedCallback() {
    this.menuIcon.removeEventListener('click', this.handleMenuClick);
    this.closeMenu.removeEventListener('click', this.handleMenuClick);
  }

  handleMenuClick() {
    this.sidebar.classList.toggle('active');
  }
}

export { HeaderComponent };