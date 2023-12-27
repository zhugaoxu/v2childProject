import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)



export const constantRoutes = [

 
  {
    path: '/',
    component: () => import('@/views/index'),
  
  },
  // 
  {
    path: '/my-page',
    component: () => import('@/views/mypage'),
   
  },

]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = []

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;

Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}



export default new Router({
  mode: 'history', // 去掉url中的#
  base: window.__MICRO_APP_BASE_ROUTE__ || '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
