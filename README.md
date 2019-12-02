## kelp-generator

> simple file generator

### Installation

```bash
$ npm install kelp-generator
```

### Example

```js
const generator = require('kelp-generator');

generator({
  source: './src',
  output: './build',
  plugins: {
    
  }
});

```

kelp-generator/flow example

```js
const flow       = require('kelp-generator/flow');
const read       = require('kelp-generator/plugins/read');
const source     = require('kelp-generator/plugins/source');
const output     = require('kelp-generator/plugins/output');
const matter     = require('kelp-generator/plugins/matter');
const layouts    = require('kelp-generator/plugins/layouts');
const metadata   = require('kelp-generator/plugins/metadata');
const markdown   = require('kelp-generator/plugins/markdown');
const permalink  = require('kelp-generator/plugins/permalink');
const collection = require('kelp-generator/plugins/collection');

flow()
.use(source('./src'))
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
  templates: './templates'
}))
.use(output('./build'))
.run();
```

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### MIT

This work is licensed under the [MIT license](./LICENSE).

---