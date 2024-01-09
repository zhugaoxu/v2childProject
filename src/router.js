import Vue from "vue";
import Router from "vue-router";
import Layout from "./Layout";
import ParentView from "@/components/ParentView";
Vue.use(Router);

export const constantRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "index",
    children: [
      {
        path: "index",
        component: () => import("@/views/index.vue"),
        name: "首页",
        hidden: true,
        meta: { title: "首页", icon: "dashboard", noCache: true, affix: true },
      },
    ],
  },
  {
    path: "/login",
    component: (resolve) => require(["@/views/login"], resolve),
    hidden: true,
  },
  {
    path: "/demoOne",
    component: () => import("@/views/demo"),
  },

  {
    path: "/zhu",
    component: Layout,
    id: "901",
    name: "河南省",
    children: [
      {
        path: "gao",
        component: ParentView,
        id: "9011",
        name: "周口市",
        children: [
          {
            path: "xu",
            component: (resolve) => require(["@/views/zhu/gao/xu"], resolve),
            id: "90111",
            name: "郸城县12",
            fullPath:'/zhu/gao/xu'
          },
          {
            path: "xuxu",
            component: (resolve) => require(["@/views/zhu/gao/xu"], resolve),
            id: "90112",
            name: "郸城县",
            fullPath:'/zhu/gao/xuxu'
          },
        ],
      },
      {
        path: "fen",
        component: ParentView,
        id: "9012",
        name: "周口市",
        children: [
          {
            path: "fenone",
            component: (resolve) => require(["@/views/zhu/gao/xu"], resolve),
            id: "90121",
            name: "郸城县",
            fullPath:'/zhu/fen/fenone'
          },
          {
            path: "fentwo",
            component: (resolve) => require(["@/views/zhu/gao/xu"], resolve),
            id: "90122",
            name: "郸城县",
            fullPath:'/zhu/fen/fentwo'
          },

        ],
      },
    ],
  },
  {
    path: "/qing",
    component: Layout,
    id: "911",
    name: "河南省",
    children: [
      {
        path: "qingone",
        component: ParentView,
        id: "9111",
        name: "周口市",
        children: [
          {
            path: "qignone",
            component: (resolve) => require(["@/views/zhu/gao/xu"], resolve),
            id: "91111",
            name: "郸城县",
            fullPath:'/qing/qingone/qignone'
          },
          {
            path: "qigntwo",
            component: (resolve) => require(["@/views/zhu/gao/xu"], resolve),
            id: "91112",
            name: "郸城县",
            fullPath:'/qing/qingone/qigntwo'
          },
        ],
      },
      {
        path: "fenzhu",
        component: ParentView,
        id: "9112",
        name: "周口市",
        children: [
          {
            path: "fenzhuone",
            component: (resolve) => require(["@/views/zhu/gao/xu"], resolve),
            id: "91121",
            name: "郸城县",
            fullPath:'/qing/fenzhu/fenzhuone'
          },
          {
            path: "fenzhutwo",
            component: (resolve) => require(["@/views/zhu/gao/xu"], resolve),
            id: "91122",
            name: "郸城县",
            fullPath:'/qing/fenzhu/fenzhutwo'
          },
        ],
      },
    ],
  },
];

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [];

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;

Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((err) => err);
};

export default new Router({
  mode: "history", // 去掉url中的#
  base: window.__MICRO_APP_BASE_ROUTE__ || "/",
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});
