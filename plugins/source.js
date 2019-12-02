const path = require('path');
const readdir = require('recursive-readdir');

const source = dir => {
  return async () => {
    const x = path.resolve(dir);
    const files = await readdir(x);
    return files.reduce((files, filename) => {
      const name = path.relative(x, filename);
      files[name] = { name, filename };
      return files;
    }, {});
  }
};

module.exports = source;