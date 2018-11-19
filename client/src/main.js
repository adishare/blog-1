import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'


Vue.config.productionTip = false


const server = axios.create({
  baseURL:'http://localhost:3000'
})
Vue.prototype.$server = server
Vue.prototype.$clientBaseUrl = 'http://localhost:8080'


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
