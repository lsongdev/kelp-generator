const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

const isExist = async p => {
  try {
    await stat(p);
    return true;
  } catch (e) {
    return false;
  }
};

const ensureDir = async dir => {
  const paths = [];
  dir.split(path.sep).reduce((prev, cur) => {
    const result = path.join(prev, cur);
    paths.push(result);
    return result;
  }, path.sep);
  for (const p of paths) {
    const exist = await isExist(p);
    if (exist === false) {
      await mkdir(p);
    }
  }
};

const output = dir => {
  dir = path.resolve(dir);
  return async files => {
    for (const filename in files) {
      const file = files[filename];
      const x = path.join(dir, filename);
      await ensureDir(path.dirname(x));
      await writeFile(x, file.content);
    }
  };
};

module.exports = output;
