import Vue from 'vue'
import App from './App.vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import router from './router'
// 先把当前的路由挂载起来  通过addRouter
import store from './store'
import './permiss'
import Router from 'vue-router'
import '@/assets/styles/index.scss'
import zhudafen from 'zhudafen';
import 'zhudafen/lib/theme-chalk/index.css';
import AddDialog from '@/components/addDialog'
import 'vxe-table/lib/style.css'
import VXETablePluginElement from 'vxe-table-plugin-element'
import VXETable from 'vxe-table'
import './assets/icons' // icon


Vue.use(Router)
Vue.use(zhudafen);
Vue.use(VXETable)

VXETable.use(VXETablePluginElement)
Vue.use(Element, {
  size: 'mini', // set element-ui default size
})

Vue.component("AddDialog", AddDialog);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
