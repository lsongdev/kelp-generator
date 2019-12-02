const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const read = () => {
  return async files => {
    for(const name in files) {
      const { filename } = files[name];
      files[name].content = await readFile(filename);
    }
    return files;
  }
};

module.exports = read;