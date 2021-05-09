const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
    lintOnSave: false,
    
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