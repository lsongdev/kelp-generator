const marked = require('marked');

const markdown = () => {
  const r = /.m(ark)?d(own)?$/;
  return async files => {
    for (let name in files) {
      if (!r.test(name))
        continue;
      const file = files[name];
      delete files[name];
      name = name.replace(r, '.html');
      file.content = marked.parse(file.content);
      files[name] = file;
    }
    return files;
  };
};

module.exports = markdown;