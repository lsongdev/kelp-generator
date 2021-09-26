const prompts = require('xprompt');

/**
 * like metadata, but from user input.
 * @returns 
 */
module.exports = () => {
  return async files => {
    for (const name in files) {
      const file = files[name];
      if (file.questions) {
        const answers = await prompts(file.questions);
        files[name] = Object.assign({}, file, answers);
      }
    }
    return files;
  };
};