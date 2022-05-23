/*
 * @Date: 2022-02-16 14:36:24
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-27 15:23:53
 * @FilePath: /vue-sample/src/main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import { init as initErrorEvent, uploadError } from '../UploadErrorUtil'


const app = createApp(App)
initErrorEvent()
app.config.errorHandler = function (err) {
  uploadError({ error: err })
}
app.mount('#app')
