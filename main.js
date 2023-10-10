
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import $http from './utils/http.js'
import $showMsg from './utils/showMsg.js'
import store from '@/store/store.js'
Vue.config.productionTip = false

//网络请求处理
uni.$http = $http

//显示错误消息 
uni.$showMsg = $showMsg

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif