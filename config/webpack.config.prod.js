const { merge } = require('webpack-merge');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths')
const commonConfig = require('./webpack.config')

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: paths.appIndex,
  output: {
    path: paths.appBuild,
    filename: 'bundle.js',
  },
  optimization: {
    minimizer: [
      // 压缩 js
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
})
