const { readFile } = require('fs').promises;
const { createRender, parseFilename } = require('./render');

const layouts = ({ layout: defaultLayout = 'layout.hbs', ...options } = {}) => {
  return async files => {
    for (const name in files) {
      const file = files[name];
      const { layout = defaultLayout } = file;
      const layoutContent = await readFile(layout);
      const [, ext] = parseFilename(layout);
      const render = createRender({ engine: ext });
      file.content = await render(layoutContent, file);
    }
    return files;
  };
};

module.exports = layouts;