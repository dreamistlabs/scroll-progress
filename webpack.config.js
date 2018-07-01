const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/scroll-progress.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'scroll-progress.min.js',
    libraryTarget: 'umd',
    library: 'ScrollProgress'
  },
  module: {
    rules: [{
      test: /\.(js)$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}