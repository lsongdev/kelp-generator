const grayMatter = require('gray-matter');

const matter = () => {
  return files => {
    for (const name in files) {
      const file = files[name];
      const { data: meta, content } = grayMatter(file.content);
      files[name] = Object.assign(file, {
        content
      }, meta);
    }
    return files;
  };
};

module.exports = matter;