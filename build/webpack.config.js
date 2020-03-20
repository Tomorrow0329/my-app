const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: 'style-loader!css-loader'
    }, {
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"], // 加载时顺序从右向左
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader']
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
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
