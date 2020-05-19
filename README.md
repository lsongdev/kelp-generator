## @kelpjs/gen

> simple file generator

### Installation

```bash
$ npm install @kelpjs/gen
```

### Example

```js
const generate = require('@kelpjs/gen');

generate({
  source: './src',
  output: './build',
  plugins: {
    
  }
});

```

@kelpjs/gen/flow example

```js
const flow       = require('@kelpjs/gen/flow');
const read       = require('@kelpjs/gen/plugins/read');
const source     = require('@kelpjs/gen/plugins/source');
const output     = require('@kelpjs/gen/plugins/output');
const matter     = require('@kelpjs/gen/plugins/matter');
const layouts    = require('@kelpjs/gen/plugins/layouts');
const metadata   = require('@kelpjs/gen/plugins/metadata');
const markdown   = require('@kelpjs/gen/plugins/markdown');
const permalink  = require('@kelpjs/gen/plugins/permalink');
const collection = require('@kelpjs/gen/plugins/collection');

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