const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动创建html文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//清除多余文件

module.exports = {
  /*
  * 当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。
  * 例如，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，
  * 而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js。
  * 这并通常没有太多帮助，因为你可能需要准确地知道错误来自于哪个源文件。
  * source map 有很多不同的选项可用，这里使用 inline-source-map 选项
  * 其他可查阅文档：https://www.webpackjs.com/configuration/devtool/
  */
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader?limit=5000',
    },
    {
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }, // 应该应用的 loader，它相对上下文解析, use 是应用多个 loader 和选项
      exclude: /node_modules/, // exclude 是必不匹配选项（优先于 test 和 include）
    }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html' //使用一个模板
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx',   '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
}
