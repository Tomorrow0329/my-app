const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.base');
const config = require('./config')

module.exports = env => {
  const devConfig = config[env.NODE_ENV]
  return merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
      rules: [{
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"], // 加载时顺序从右向左
      }, ]
    },
    devServer: Object.assign({
      contentBase: false, // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
      historyApiFallback: true, // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html，也可通过rewrites属性 自定义。
      hot: true, // 模块热替换
      compress: true, // 一切服务都启用gzip 压缩
      inline: true, // 默认情况下，应用程序启用内联模式(inline mode)。这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台。
    }, devConfig.devServer),
    plugins: [
      new webpack.NamedModulesPlugin(), // 当开启 HMR(模块热替换) 的时候使用，以便更容易查看要修补(patch)的依赖
      new webpack.HotModuleReplacementPlugin(),
    ],
  })
}
