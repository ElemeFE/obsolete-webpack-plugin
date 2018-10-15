const Vue = require('vue');
const { resolve } = require('path');
const { createRenderer } = require('vue-server-renderer');

class VueRenderer {
  async render(componentPath) {
    const component = require(resolve(componentPath));

    const app = new Vue(component);
    const renderer = createRenderer();
    const template = await renderer.renderToString(app);

    return template;
  }
}

module.exports = VueRenderer;
