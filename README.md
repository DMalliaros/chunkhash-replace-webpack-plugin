Chunkhash Replace Webpack Plugin
================================
<!---[![Build](https://travis-ci.org/DMalliaros/chunkhash-replace-webpack-plugin.svg?branch=master)](https://travis-ci.org/giemch/chunkhash-replace-webpack-plugin)--->
<!---[![Total Downloads](https://img.shields.io/npm/dt/chunkhash-replace-webpack-plugin.svg)](https://npm-stat.com/charts.html?package=chunkhash-replace-webpack-plugin)--->

This plugin is for transforming bundle references in your html files with cache friendly filenames using chunkhashes. Its main use is for processing js file references. CSS files will work too, but chunkhashes are associated with js bundles, so changes to your css will not generate a new chunkhash. For handling CSS bundles I recommend the [Content Hash Replace Plugin](https://www.npmjs.com/package/contenthash-replace-webpack-plugin).

**Tip**: Just use this plugin for your production/staging builds.

## Installation
```shell
$ npm install chunkhash-replace-dm-webpack-plugin --save-dev
``` 


## Example

### Webpack.config.js

```javascript
const path = require('path');
const ChunkHashReplacePlugin = require('chunkhash-replace-dm-webpack-plugin');

module.exports = env => {
  entry: {
    app: ['./src/app.js'],
    vendor: ['jquery', 'lodash', 'react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, 'dist/static'),
    filename: `scripts/[name]${env.prod?'.[chunkhash]':''}.bundle.js`,
    publicPath: '/static/'
  },
  plugins: [
    new ChunkHashReplacePlugin({
      src: 'index.html',
      dest: 'dist/index.html',
    })
  ]
};
```

### Run script

To run on production mode set extra param --env.prod
[Environment Variables | webpack](https://webpack.js.org/guides/environment-variables/)
```shell
webpack --config webpack.config.js --env.prod
``` 

For dev mode you don't need to do chunkhash is faster
```shell
webpack --config webpack.config.js
```





### Support 
**filename**:
- [name].[chunkhash].js
- scripts/[name].[chunkhash].js
- scripts/[name].[chunkhash].bundle.js
- scripts/[name]${env.prod?'.[chunkhash]':''}.bundle.js 

### HTML

```html
<!DOCTYPE html>
<html lang="en">
<body>
  <script src="/static/vendor.js"></script>
  <script src="/static/app.js"></script>
</body>
</html>
```

### Output

```html
<!DOCTYPE html>
<html lang="en">
<body>
  <script src="/static/vendor.8c670c84b126bbde6319.js"></script>
  <script src="/static/app.bc9412b20a3d196ac0eb.js"></script>
</body>
</html>
```
