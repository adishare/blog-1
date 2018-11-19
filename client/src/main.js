import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'


Vue.config.productionTip = false


const server = axios.create({
  baseURL:'https://h8ikeblog-api.adishare.online'
})
Vue.prototype.$server = server
Vue.prototype.$clientBaseUrl = 'https://h8ikeblog.firebaseapp.com'


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
