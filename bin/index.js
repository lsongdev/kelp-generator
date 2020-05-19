#!/usr/bin/env node

const path = require('path');
const pkg = require('../package');
const generator = require('..');

const cwd = process.cwd();
const argv = process.argv.slice(2);
let [configFile] = argv
  .filter(x => /--config|-c/.test(x))
  .map(x => x.match(/=(.+)/)[1])

const readConfig = async () => {
  if (configFile) require(path.resolve(configFile));
  try {
    configFile = require.resolve(`kgen.config`, { paths: [cwd] });
    if (configFile) return require(configFile);
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      throw e;
    }
  }
  try {
    configFile = require.resolve('./package.json', { paths: [cwd] });
    if (configFile) return require(configFile)[pkg.name] || {};
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      throw e;
    }
  }
  return {};
};

(async () => {
  const config = await readConfig();
  await generator(config);
})();