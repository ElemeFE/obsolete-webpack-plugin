const Vue = require('vue');
const { createRenderer } = require('vue-server-renderer');

class Prerenderer {
  async prerender() {
    const app = new Vue({
      template: '<div>请升级浏览器至 Chrome 最新版以获取最佳体验</div>',
    });
    const renderer = createRenderer();
    const html = await renderer.renderToString(app);

    return html;
  }
}

module.exports = Prerenderer;
