const merge = require('webpack-merge');
const common = require('./webpack.base');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 1 });

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'production',
  // output: {
  //   path: path.resolve(__dirname, '../dist'),
  //   filename: '123.bundle.js'
  // },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=scss'],
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin(),
    new HappyPack({
      id: 'scss',
      loaders: ["css-loader", "sass-loader"],
      threadPool: happyThreadPool, // 共享进程池
    }),
    new MiniCssExtractPlugin({
      filename: `assets/[name].[chunkhash:5].css`,
      chunkFilename: `assets/[id].css`,
    }),
  ]
})
