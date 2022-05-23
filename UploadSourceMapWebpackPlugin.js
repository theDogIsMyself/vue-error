/*
 * @Date: 2022-02-25 16:15:06
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-29 15:22:35
 * @FilePath: /vue-sample/UploadSourceMapWebpackPlugin.js
 */
const fs = require('fs')
var http = require('http');
const glob = require('glob')
const path = require('path')

class UploadSourceMapWebpackPlugin {
  constructor(options) {
    this.options = options
  }

   async upload(url, file) {
    return new Promise(resolve => {
      const req = http.request(
        `${url}?name=${path.basename(file)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
            Connection: "keep-alive",
            "Transfer-Encoding": "chunked"
          }
        }
      )
      fs.createReadStream(file)
        .on("data", chunk => {
        req.write(chunk);
      })
        .on("end", () => {
        req.end();
        resolve()
      });
    })
  }


  apply(compiler) {
    // 打包结束后执行
    compiler.hooks.done.tap("uploadSourcemap",async status => {
      const list = glob.sync(path.join(status.compilation.outputOptions.path, `./**/*.{js.map,}`))
      for (let filename of list) {
        await this.upload(this.options.uploadUrl, filename)
      }
    });
  }
}

module.exports = UploadSourceMapWebpackPlugin;
