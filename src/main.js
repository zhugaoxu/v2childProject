import Vue from 'vue'
import App from './App.vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import router from './router'
// 先把当前的路由挂载起来  通过addRouter



Vue.use(Element, {
  size: 'mini', // set element-ui default size
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
