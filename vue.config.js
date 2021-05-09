const path = require('path')

function resolve(dir) {
    console.log(path.join(__dirname, '.', dir))
  return path.join(__dirname, '.', dir)
}

module.exports = {
    lintOnSave: false,
    
    chainWebpack:config=>{
        // 重点:删除默认配置中处理svg,
        config.module.rules.delete("svg"); 

        config.module
        .rule('svg-sprite-loader')
        .test(/\.svg$/)
        .include
        .add(resolve('src/icon-svg/'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        // .options({
        //     symbolId: 'icon-[name]'
        //   })

    }
}