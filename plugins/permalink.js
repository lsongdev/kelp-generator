
const slug = str =>
  str
    .toString()
    .replace(/(\s|\.)/g, '-')
    .replace(/-+/g, '-')

const now = new Date;

const builtin = {
  year: now.getFullYear(),
  month: now.getMonth() + 1,
  date: now.getDate()
};

const createReplacer = defaultPattern => {
  return file => {
    let { permalink } = file;
    if (typeof permalink !== 'string' || permalink === true)
      permalink = defaultPattern;
    const obj = Object.assign({}, file, builtin);
    return permalink.replace(/:([a-z]+)/ig, (_, part) => slug(obj[part]));
  };
};

const permalink = pattern => {
  const rename = createReplacer(pattern);
  return files => {
    for (let name in files) {
      const file = files[name];
      if (file.permalink) {
        delete files[name];
        name = rename(file) || name;
        files[name] = file;
      }
      file.link = name;
    }
    return files;
  };
};

module.exports = permalink;