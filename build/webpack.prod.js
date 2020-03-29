const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.base');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动创建html文件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const safePostCssParser = require('postcss-safe-parser');
const config = require('./config')
const happyThreadPool = HappyPack.ThreadPool({ size: 1 });

module.exports = env => {
  const buildConfig = config[env.NODE_ENV]
  const { publicPath, assetsDir } = buildConfig

  return merge(common, {
    devtool: 'source-map',
    mode: 'production',
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath,
      filename: `${assetsDir}/[name].bundle.js`
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=scss'],
        },
      ],
    },
    plugins: [
      new HappyPack({
        id: 'scss',
        loaders: ["css-loader", "sass-loader"],
        threadPool: happyThreadPool, // 共享进程池
      }),
      new MiniCssExtractPlugin({
        filename: `${assetsDir}/[name].[chunkhash:5].css`,
        chunkFilename: `${assetsDir}/[id].css`,
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body',
        dll: `<script src='../dll/dll.react.js'></script>`, // ？？？？？
      }),
      new webpack.DllReferencePlugin({
        context: path.join(__dirname, '../dll'),
        manifest: path.join(__dirname, '../dll/react-manifest.json')
      }),
    ],
    // 代码压缩分离相关
    optimization: {
      minimize: true, // 是否启用压缩js
      minimizer: [
        new UglifyJSPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
          },
        }),
      ],
      // Tells webpack to determine used exports for each module.
      // 不为未使用的模执行导出
      // Dead code elimination in minimizers will benefit from this and can remove unused exports.（最小化程序中的死代码消除将从中受益，并可以删除未使用的导出）
      usedExports: true,
      /**告诉webpack查找模块图的段，这些段可以安全地连接到单个模块中。取决于optimization.providedExports和optimization.usedExports。
       * 默认情况下，optimization.concatenateModules在生产模式下启用，在其他情况下禁用。 */
      concatenateModules: true,
      /**
       * 告诉webpack找出模块的顺序，从而得到最小的初始包。默认情况下，optimization.occurrenceOrder在生产模式下启用，
       * 在其他情况下禁用。
       */
      occurrenceOrder: true,
    }
  })
}
