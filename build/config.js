module.exports = {
  development: {
    devServer: {
      host: '0.0.0.0',
      port: '8181',
    }
  },
  production: {
    publicPath: './images/',
    assetsDir: '.'
  },
  dll: {
    entry: ['react', 'react-dom']
  }
}