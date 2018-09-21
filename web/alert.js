class Alert {
  prompt() {
    const styleElement = this.createElement('style');
    document.head.appendChild(styleElement);
    const divElement = this.createElement('div', 'bu');
    document.body.appendChild(divElement);

    styleElement.textContent = `
      .bu {
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
  }
  createElement(tag, className) {
    const element = document.createElement(tag);

    element.className = className || '';
    return element;
  }
}

export default Alert;
