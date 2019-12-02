
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

const createReplacer = options => {
  return file => {
    const { permalink = options } = file;
    if (!permalink) return;
    const obj = Object.assign({}, file, builtin);
    return permalink.replace(/:([a-z]+)/ig, (_, part) => slug(obj[part]));
  };
};



const permalink = options => {
  const replace = createReplacer(options);
  return files => {
    for (const name in files) {
      const file = files[name];
      if (!file.permalink)
        continue;
      files[replace(file) || name] = file;
      delete files[name];
    }
    return files;
  };
};

module.exports = permalink;