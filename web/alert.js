class Alert {
  /**
   * Prompt message to user.
   *
   * @param {string} template The prompt html template.
   */
  prompt(template) {
    const documentFragment = document.createDocumentFragment();
    const placeholderElement = this.createElement('div');

    placeholderElement.innerHTML = template;
    while (placeholderElement.firstChild) {
      documentFragment.appendChild(placeholderElement.firstChild);
    }
    document.body.appendChild(documentFragment);
  }
  /**
   * Create DOM element.
   *
   * @param {string} tag
   * @param {Object<string, string>} attributes
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
