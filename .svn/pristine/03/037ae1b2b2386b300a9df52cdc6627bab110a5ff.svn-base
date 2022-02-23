const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  devServer: {
    // 前端请求的链接
    host: 'localhost',
    // 前端请求的端口
    port: 8080,

  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      }
    }
  },
  css: {
    extract: true,
    sourceMap: false,
    //此项设置为false会影响element-ui引入时样式失效
    // requireModuleExtension: false
  },
  lintOnSave: false,

}