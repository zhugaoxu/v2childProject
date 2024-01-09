import { constantRoutes } from '@/router'
import Layout from '@/Layout/index.vue'
import ParentView from '@/components/ParentView';
import Ajson from '../a.json';

const permission = {
  state: {
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: [],
    onecengroute: [],
  },
  mutations: {


    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },


    SET_DEFAULT_ROUTES: (state, routes) => {
      state.defaultRoutes = constantRoutes.concat(routes)
    },
    SET_TOPBAR_ROUTES: (state, routes) => {
      // 顶部导航菜单默认添加统计报表栏指向首页
      const index = [{
        path: 'index',
        meta: { title: '统计报表', icon: 'dashboard' }
      }]
      state.topbarRouters = routes.concat(index);
    },
    SET_SIDEBAR_ROUTERS: (state, routes) => {
      state.sidebarRouters = routes
    },
    SET_YICENG_ROUTES: (state, routes) => {
      console.log(routes);
      console.log('存储的路由')
      state.onecengroute = routes
    },
  },
  actions: {


    // 生成路由
    GenerateRoutes({ dispatch, commit }) {

      return new Promise(resolve => {

        let res = Ajson;
        let nowRouter = res.data.filter(
          (item) => item.id
        );
        let nowoption = [];

        function returnPath(arr) {
          let path = "";
          arr[0] = arr[0].split("/")[1];
          arr.map((item) => {
            path = path + "/" + item;
          });
          return path;
        }

        function getYiCeng(arr, pathshow) {
          arr.map((item) => {
            if (pathshow && (!item.children) || (item.children && item.children.length == 0)) {
              nowoption.push({
                label: item.name,
                id: item.id,
                value: returnPath([...pathshow, item.path]),
                noCache: true,//用来判断是否缓存
              });
              item.fullPath=returnPath([...pathshow, item.path])
            }
            if (item.children) {
              getYiCeng(item.children, [...pathshow, item.path]);
            }
          });
        }
        getYiCeng(nowRouter, []);

        const sdata = JSON.parse(JSON.stringify(res.data))
        const rdata = JSON.parse(JSON.stringify(res.data))
        const sidebarRoutes = filterAsyncRouter(sdata)
        const rewriteRoutes = filterAsyncRouter(rdata, false, true)

        console.log(rewriteRoutes);
        console.log(1999)

        commit('SET_ROUTES', rewriteRoutes)
        commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes))
        commit('SET_DEFAULT_ROUTES', sidebarRoutes)
        commit('SET_TOPBAR_ROUTES', sidebarRoutes)
        commit("SET_YICENG_ROUTES", nowoption)
        resolve(rewriteRoutes)
      })
    }
  }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter(route => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {

      if (route.component == 'Layout') {
        route.component = Layout
      } else if (route.component == 'ParentView') {
        route.component = ParentView
      } else {

        const loadView = (view) => { // 路由懒加载
          return () => Promise.resolve(require(`@/views/${view}`).default)
        }
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView') {
        el.children.forEach(c => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
}
export default permission
