const path = require('path');

const reload = require('require-nocache')(module);
const autoprefixer = require('autoprefixer');
const postcssMixins = require('postcss-mixins');
const postcssSimpleVars = require('postcss-simple-vars');
const postcssColorFunction = require('postcss-color-function');
const postcssNested = require('postcss-nested');

const cssVarsFiles = [
  './src/Styles/Variables/dimensions',
  './src/Styles/Variables/fonts',
  './src/Styles/Variables/animations',
  './src/Styles/Variables/zIndexes'
].map(require.resolve);

const mixinsDir = path.join(__dirname, 'src', 'Styles', 'Mixins');
const mixinsFiles = [
  path.join(mixinsDir, 'cover.css'),
  path.join(mixinsDir, 'linkOverlay.css'),
  path.join(mixinsDir, 'scroller.css'),
  path.join(mixinsDir, 'truncate.css')
];

module.exports = {
  plugins: [
    autoprefixer(),
    postcssMixins({
      mixinsFiles
    }),
    postcssSimpleVars({
      variables: () =>
        cssVarsFiles.reduce((acc, vars) => {
          return Object.assign(acc, reload(vars));
        }, {})
    }),
    postcssColorFunction(),
    postcssNested()
  ]
};
