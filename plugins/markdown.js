const marked = require('marked');

const markdown = () => {
  return async files => {
    for (let name in files) {
      const file = files[name];
      delete files[name];
      name = name.replace(/.m(ark)?d(own)?$/, '.html');
      file.content = marked.parse(file.content);
      files[name] = file;
    }
    return files;
  };
};

module.exports = markdown;