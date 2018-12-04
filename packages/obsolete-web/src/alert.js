import { forEach, entries, bind } from './lib/mini-built-ins';

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
    while (true) {
      const firstChild = placeholderElement.firstChild;

      if (!firstChild) {
        break;
      }
      if (firstChild.nodeType === 1 && firstChild.nodeName === 'SCRIPT') {
        const script = this.createElement('script');

        script.innerHTML = firstChild.innerHTML;
        fragment.appendChild(script);
        this.refs.push(script);
        placeholderElement.removeChild(firstChild);
      } else {
        fragment.appendChild(firstChild);
        this.refs.push(firstChild);
      }
    }
    this.bindEvents(fragment);
    if (position === 'afterbegin') {
      document.body.insertBefore(fragment, document.body.firstChild);
    }
    if (position === 'beforeend') {
      document.body.appendChild(fragment);
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
      close.addEventListener('click', bind(this.handleClose, this));
    } else if (close.attachEvent) {
      close.attachEvent('onclick', bind(this.handleClose, this));
    }
  }
  /**
   * Close event handler.
   *
   */
  handleClose() {
    forEach(this.refs, node => {
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
      forEach(entries(attributes), ([key, value]) => {
        element.setAttribute(key, value);
      });
    }
    return element;
  }
}

export default Alert;
