import axios from 'axios'
const MyHttpSERVER ={}
MyHttpSERVER.install =(Vue) =>{
   axios.defaults.baseURL ="http://47.106.23.101:9999"
  //http://192.168.0.126:9999
  //http://192.168.0.110:9999
  //http://47.106.23.101:9999
  //添加请求拦截器
axios.interceptors.request.use(function (config) {
   if(config.url !== 'logins'){
      // 设置请求头部
      const AUTH_TOKEN = sessionStorage.getItem("access_token");
      // if(AUTH_TOKEN != null){
      //   var ass = AUTH_TOKEN.substring(7,AUTH_TOKEN.length)
      // }
      config.headers["Authorization"] = AUTH_TOKEN;
   }
   return config;
 }, function (error) {
   // 对请求错误做些什么
   return Promise.reject(error);
 });
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
   // 对响应数据做点什么
   return response;
 }, function (error) {
   // 对响应错误做点什么
   return Promise.reject(error);
 });
 Vue.prototype.$http = axios
}

export default MyHttpSERVER
