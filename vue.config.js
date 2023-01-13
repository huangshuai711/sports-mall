const path = require('path')
const { defineConfig } = require('@vue/cli-service')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    config.resolve.alias.set('@', resolve('src'))
  },
  configureWebpack: {
    // 关闭 webpack 的性能提示
    performance: {
      hints: false
    }
  },
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    https: false,
    hot: 'only',
    /* 使用代理 */
    proxy: {
      // string | Object
      '/api/': {
        /* 目标代理服务器地址 */
        target: 'https://dianc.autoeco.com.cn/mallApi',
        /* 允许跨域 */
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'https://dianc.autoeco.com.cn/mallApi' //规定请求地址以什么作为开头
        }
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/wareAdmin' : '/'
})
