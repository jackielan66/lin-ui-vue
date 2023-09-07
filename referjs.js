const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
    lintOnSave: false,
    devServer: {
      port: 1000,
      open: true,
      overlay: {
        warnings: false,
        errors: true
      },
      proxy: {//代理跨域
        // http://localhost:3000/api/content/findList
        '/xiaomi' : {
          target : 'http://localhost:3000',// 需要代理的地址
          changeOrigin: true,//是否跨域
          secure: false, // 如果是https接口，需要配置这个参数
          pathRewrite: {//重写接口地址
              '^/xiaomi': ''
          },
          headers: {//header设置
            referer: 'https://m.mi.com/',//referer
            origin: 'https://m.mi.com/'
          }
        }
      }
      // before: require('./mock/mock-server.js')
    },
    chainWebpack: config => {
        config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
        //const svgRule = config.module.rule('svg')
        //svgRule.uses.clear()
        config.module
          .rule('svg-sprite-loader')
          .test(/\.svg$/)
          .include
          .add(resolve('src/icon-svg')) //处理svg目录
          .end()
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
            symbolId: 'l-icon-[name]'
          })
      },
}
