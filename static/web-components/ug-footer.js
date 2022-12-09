class UgFooter extends HTMLElement {
  link(url) {
    const _link = document.createElement('link');
    _link.setAttribute('rel', 'stylesheet');
    _link.setAttribute('href', url);
    this.shadow.appendChild(_link);
  }
  import(url) {
    const _import = document.createElement('script');
    _import.setAttribute('defer', '');
    _import.setAttribute('src', url);
    this.shadow.appendChild(_import);
  }
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    let _footer = document.createElement('uofg-footer');
    _footer.setAttribute("style", "--uog-yellow: var(--yellow); --uog-blue: var(--blue);");
    this.shadow.appendChild(_footer);
  }
}

customElements.define('ug-footer', UgFooter);

