import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './plugins/http.js'
import store from './store/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './assets/fonts/iconfont.css'
// 引入自定义指令
import './assets/directives.js';
import moment from 'moment'
// 地图
import BaiduMap from 'vue-baidu-map'
import echarts from 'echarts'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(NProgress)
// 全局过滤器  处理日期
Vue.filter('fmtdate',(v)=>{
  if(v=== null){
       return "0:0:0";
  }else{
    return moment(v).format('YYYY-MM-DD')
  }
 
})
Vue.prototype.$echarts = echarts

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'm00dlbP7rgm3HouxTWj9IMQqmMboBVKl'
})
/**
 * 引入axios网络请求
 */
// import axios from 'axios';
// import vueAxios from 'vue-axios';
// Vue.use(vueAxios, axios);

//全局进度条配置
NProgress.configure({
  showSpinner: true,
  parent: 'body',
  easing: 'ease',
  speed: '500'
})

/*
* 全局前置路由 在路由进入前start进度条
* */
router.beforeEach((to, from ,next) => {
  NProgress.start()
  next()
})

/*
* 全局后置路由 在路由完成时done进度条
* */
router.afterEach( () => {
  NProgress.done()
})
Vue.use(http);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')