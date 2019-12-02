
const path = require('path');
const Flow = require('./flow');
const read = require('./plugins/read');
const matter = require('./plugins/matter');
const source = require('./plugins/source');
const output = require('./plugins/output');

const cwd = process.cwd();

const getPlugin = name => {
  const filename = require.resolve(name, {
    paths: [cwd, path.join(__dirname, './plugins')]
  });
  return require(filename);
};

const normalize = a => a; // TODO:

function KelpGenerator(config) {
  const flow = new Flow();
  if (config.source) flow.use(source(config.source));
  if (config.source) flow.use(read());
  if (config.source) flow.use(matter());
  if (config.plugins) {
    for (const name in normalize(config.plugins)) {
      const plugin = getPlugin(name);
      const options = config.plugins[name];
      flow.use(plugin(options));
    }
  }
  if (config.output) flow.use(output(config.output));
  return flow.run();
};

KelpGenerator.Flow = Flow;

module.exports = KelpGenerator;