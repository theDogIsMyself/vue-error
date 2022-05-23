/*
 * @Date: 2022-02-16 14:39:18
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-27 15:15:39
 * @FilePath: /vue-sample/vue.config.js
 */
const UploadSourceMapWebpackPlugin = require('./UploadSourceMapWebpackPlugin.js')
module.exports = {   
  productionSourceMap:true,
  // 关闭eslint规则
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  lintOnSave:false,
  configureWebpack: {
    plugins: [
      new UploadSourceMapWebpackPlugin({
        uploadUrl:'http://localhost:7001/monitor/sourcemap',
        apiKey: 'test'
      })
    ]
  }
}