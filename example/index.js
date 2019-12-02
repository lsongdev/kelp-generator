const flow = require('..');
const read = require('../plugins/read');
const source = require('../plugins/source');
const output = require('../plugins/output');
const matter = require('../plugins/matter');
const layouts = require('../plugins/layouts');
const metadata = require('../plugins/metadata');
const markdown = require('../plugins/markdown');
const permalink = require('../plugins/permalink');
const collection = require('../plugins/collection');

flow()
.use(source('./example/src'))
.use(read())
.use(metadata({
  sitename: 'My Blog'
}))
.use(matter())
.use(markdown())
.use(permalink('/:year/:month/:title.html'))
.use(collection({
  name: 'index.html',
  layout: 'index.ejs'
}))
.use(layouts({
  templates: './example/templates'
}))
.use(output('./example/build'))
.run();