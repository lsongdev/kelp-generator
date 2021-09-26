const assert = require('assert');
const jstransformer = require('jstransformer');
const toTransformer = require('inputformat-to-jstransformer');

module.exports = (name = 'hbs') => {
  const transformer = toTransformer(name);
  assert.ok(transformer, name);
  const transform = jstransformer(transformer);
  return async files => {
    for (const name in files) {
      const file = files[name];
      const rendered = await transform.render(file.content, file);
      files[name].content = rendered.body;
    }
    return files;
  }
};