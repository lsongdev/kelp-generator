const path = require('path');
const assert = require('assert');
const jstransformer = require('jstransformer');
const toTransformer = require('inputformat-to-jstransformer');

const createRender = options => {
  const { templates = 'templates' } = options;
  return async (layout, data) => {
    layout = path.join(templates, layout);
    const ext = layout.split('.').pop();
    const transformer = toTransformer(ext);
    assert.ok(transformer, ext);
    const transform = jstransformer(transformer);
    const rendered = await transform.renderFileAsync(layout, data);
    return rendered.body;
  };
};

const layouts = (options = {}) => {
  const { layout: defaultLayout = 'layout.hbs' } = options;
  const render = createRender(options);
  return async files => {
    for (const filename in files) {
      const file = files[filename];
      const { layout = defaultLayout } = file;
      file.content = await render(layout, file);
    }
    return files;
  };
};

module.exports = layouts;