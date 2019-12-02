
const metadata = meta => {
  return files => {
    for(const name in files) {
      const data = files[name];
      files[name] = Object.assign({}, data, meta);
    }
    return files;
  };
};

module.exports = metadata;