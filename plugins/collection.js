
const collection = options => {
  const { name } = options;
  return files => {
    const posts = Object.keys(files).map(name => files[name]);
    files[name] = Object.assign({
      posts,
      content: ''
    }, options);
    return files;
  };
};

module.exports = collection;