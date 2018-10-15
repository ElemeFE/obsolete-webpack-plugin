class Alert {
  /**
   * Prompt message to user.
   *
   * @param {string} template
   */
  prompt(template) {
    const fragment = document.createDocumentFragment();
    const placeholderElement = this.createElement('div');
    const refs = [];

    placeholderElement.innerHTML = template;
    while (placeholderElement.firstChild) {
      refs.push(placeholderElement.firstChild);
      fragment.appendChild(placeholderElement.firstChild);
    }
    this.bindEvents(fragment, refs);
    document.body.appendChild(fragment);
  }
  /**
   * Bind events for close button.
   *
   * @param {DocumentFragment} fragment
   * @param {Node[]} fragmentChildNodes
   */
  bindEvents(fragment, fragmentChildNodes) {
    const close = fragment.getElementById('obsoleteClose');

    if (!close) {
      return;
    }
    if (close.addEventListener) {
      close.addEventListener(
        'click',
        this.handleClose.bind(this, fragmentChildNodes)
      );
    } else if (close.attachEvent) {
      close.attachEvent(
        'onclick',
        this.handleClose.bind(this, fragmentChildNodes)
      );
    }
  }
  /**
   * Close event handler.
   *
   * @param {Node[]} nodes
   */
  handleClose(nodes) {
    nodes.forEach(node => {
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
