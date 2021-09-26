const path = require('path');
const readdir = require('recursive-readdir');

const source = (dir = '.') => {
  dir = path.resolve(dir);
  return async () => {
    const files = await readdir(dir);
    return files.reduce((files, filename) => {
      const name = path.relative(dir, filename);
      files[name] = { name, filename };
      return files;
    }, {});
  }
};

module.exports = source;