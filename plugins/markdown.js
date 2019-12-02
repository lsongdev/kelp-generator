const marked = require('marked');

const markdown = () => {
  return async files => {
    for(let name in files){
      const file = files[name];
      delete files[name];
      name = name.replace(/.m(ark)?d(own)?$/, '.html');
      files[name] = file;
      files[name].content = marked.parse(file.content);
    }
    return files;
  };
};


module.exports = markdown;