const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/scroll-progress.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'scroll-progress.min.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.(js)$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}