// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
// uni.$http = $http

$http.baseUrl = "https://api-hmugo-web.itheima.net/"

// 请求拦截器
$http.beforeRequest = function (options) {
  // do somethimg...
  uni.showLoading({
  	title:"加载中..."
  })
}
// 响应拦截器
$http.beforeRequest = function (options) {
  uni.hideLoading()
}

export default $http