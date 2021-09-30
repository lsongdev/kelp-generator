const jstransformer = require('jstransformer');
const toTransformer = require('inputformat-to-jstransformer');

const parseFilename = filename => {
  const a = filename.split('.');
  const ext = a.pop();
  const basename = a.join('.');
  return [basename, ext];
};

const createRender = ({ engine = 'hbs' } = {}) => {
  const transformer = toTransformer(engine);
  const transform = jstransformer(transformer);
  return async (content, data) => {
    const rendered = await transform.render(content, data);
    return rendered.body;
  };
};

const Render = () => {
  return async files => {
    for (const name in files) {
      const file = files[name];
      const [basename, ext] = parseFilename(name);
      const render = createRender({ engine: ext });
      file.content = await render(file.content);
      files[basename] = file;
      delete files[name];
    }
  };
};

Render.parseFilename = parseFilename;
Render.createRender = createRender;
module.exports = Render;