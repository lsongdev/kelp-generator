const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const read = () => {
  return async files => {
    for (const name in files) {
      const file = files[name];
      file.content = await readFile(file.filename);
    }
    return files;
  }
};

module.exports = read;