const { extname } = require('path');
const assert = require('assert');

class Renderer {
  /**
   * @param {string} componentPath
   */
  constructor(componentPath) {
    this.componentPath = componentPath;
    this.type = 'vue';
    this.validateType(componentPath);
  }
  /**
   * Validate the component type.
   *
   * @param {string} templatePath
   */
  validateType(componentPath) {
    const extFilename = extname('componentPath');

    switch (extFilename) {
      case '.vue':
        break;
      case '.js':
        break;
      default:
        break;
    }
  }
  /**
   * Render to template.
   *
   * @returns {string}
   */
  async render() {
    const TypeRendered = require(`./${this.type}-renderer`);
    const typeRendered = new TypeRendered();
    const template = await typeRendered.render(this.componentPath);

    return template;
  }
}

module.exports = Renderer;
