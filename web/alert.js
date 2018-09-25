class Alert {
  prompt() {
    const styleElement = this.createElement('style');
    const divElement = this.createElement('div', {
      class: 'obsolete',
    });

    styleElement.textContent = `
      .obsolete {
        position: fixed;
        z-index: 1000;
        bottom: 0;
        border-bottom: 1px solid #a29330;
        text-align: center;
        background-color: #fff;
        box-shadow: 0 0 5px rgba(0,0,0,0.2);
      }
    `;
    divElement.innerHTML = `
      <span>请升级浏览器至 Chrome 最新版以获取最佳体验</span>
    `;
    document.head.appendChild(styleElement);
    document.body.appendChild(divElement);
  }
  createElement(tag, attributes) {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach((key, value) => {
      element.setAttribute(key, value);
    });
    return element;
  }
}

export default Alert;
