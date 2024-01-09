import router from './router'
import store from './store'
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  if (localStorage.getItem('token')) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      if (store.getters.roles.length === 0) {
        // 获取下用户的信息  然后加载下动态的路由 
        store.dispatch('userRole/GetInfo').then(res => {
          // 权限加载路由先放置 先跳转到首页  配置好layout
          store.dispatch('GenerateRoutes').then(accessRoutes => {
            for (let i = 0; i < accessRoutes.length; i++) {
              router.addRoute(accessRoutes[i]) // 动态添加可访问路由表
            }
            to.redirectedFrom ? next({ ...to.redirectedFrom, replace: true }) : next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })
        })
      }
      else {
        next()
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login`) // 否则全部重定向到登录页
    }
  }
})
