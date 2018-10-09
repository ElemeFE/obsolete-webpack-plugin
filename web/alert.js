class Alert {
  /**
   * Prompt message to user.
   *
   * @param {string}
   */
  prompt(template) {
    const divElement = this.createElement('div', {
      style: `
        position: fixed;
        left: 0;
        top: 0;
        background: #fff;
      `,
    });

    divElement.innerHTML = template;
    document.body.appendChild(divElement);
  }
  /**
   * Create DOM element.
   *
   * @param {string} tag
   * @param {Object} attributes
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
