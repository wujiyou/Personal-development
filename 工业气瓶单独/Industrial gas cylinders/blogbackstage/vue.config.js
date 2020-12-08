module.exports = {
  publicPath: '/',
  // 输出文件目录
  outputDir: 'dist',
  assetsDir:'static',
  devServer: {
    port: 9999,
    open:true,
    host:'localhost',
    // proxy: {// 设置代理
    //   'api':{
    //     target: 'http://localhost:8888',
    //     changeOrigin: true,
    //     pathRewrite: {
    //         '^/api': ''
    //     }
    //   }
    // }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  }
}

