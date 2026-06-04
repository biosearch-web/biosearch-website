const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="${new URL('./header.css', import.meta.url).href}">
  <header>
    <div class="logo">WebComponents</div>
    <nav> 
      <div class="menu-icon">☰</div>
      <ul class="links">
        <li><a href="index.html">Início</a></li>
        <li><a href="#">Sobre</a></li>
        <li><a href="#">Serviços</a></li>
        <li><a href="#">Contato</a></li>
      </ul>
    </nav>
  </header>
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
        this.links = this.shadowRoot.querySelector('.links');
        this.menuIcon.addEventListener('click', this.handleMenuClick);
    }

    disconnectedCallback() {
        this.menuIcon.removeEventListener('click', this.handleMenuClick);
    }

    handleMenuClick() {
        this.links.classList.toggle('active');
    }
}

export { HeaderComponent };