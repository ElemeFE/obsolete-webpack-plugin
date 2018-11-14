class Alert {
  constructor() {
    this.refs = [];
  }
  /**
   * Prompt message to user.
   *
   * @param {string} template
   * @param {string} position
   */
  prompt(template, position) {
    const fragment = document.createDocumentFragment();
    const placeholderElement = this.createElement('div');

    placeholderElement.innerHTML = template;
    while (placeholderElement.firstChild) {
      this.refs.push(placeholderElement.firstChild);
      fragment.appendChild(placeholderElement.firstChild);
    }
    this.bindEvents(fragment);
    if (position === 'afterbegin') {
      document.body.appendChild(fragment);
    }
    if (position === 'beforeend') {
      document.body.insertBefore(fragment, document.body.firstChild);
    }
  }
  /**
   * Bind events for close button.
   *
   * @param {DocumentFragment} fragment
   */
  bindEvents(fragment) {
    const close = fragment.getElementById('obsoleteClose');

    if (!close) {
      return;
    }
    if (close.addEventListener) {
      close.addEventListener('click', this.handleClose);
    } else if (close.attachEvent) {
      close.attachEvent('onclick', this.handleClose);
    }
  }
  /**
   * Close event handler.
   *
   */
  handleClose() {
    this.refs.forEach(node => {
      node.parentNode.removeChild(node);
    });
  }
  /**
   * Create DOM element.
   *
   * @param {string} tag
   * @param {Object<string, string>} [attributes]
   * @returns {HTMLElement}
   */
  createElement(tag, attributes) {
    const element = document.createElement(tag);

    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }
    return element;
  }
}

export default Alert;
