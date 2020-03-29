const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//清除多余文件
const common = require('./webpack.base');
const dllEntry = ['react', 'react-dom']
module.exports = merge(common, {
  mode: 'production',
  entry: dllEntry,
  output: {
    path: path.resolve(__dirname, '../dll'),
    filename: 'dll.react.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dll/react-manifest.json'),
      name: 'react',
      context: path.join(__dirname, '../dll'),
    })
  ]
})
