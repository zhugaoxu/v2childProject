export default ({
  state: {

    visitedViews: [

    ],// 上面的切换的菜单
  },
  mutations: {
    addVisitedView(state, view) {
      if (state.visitedViews.find(item => item.id == view.id)) {
        return
      }
      state.visitedViews.push(view)
    },
    deleteVisitedView(state, view) {
      state.visitedViews = state.visitedViews.filter(item => item.id != view.id)
    },
  },
  actions: {

    // 这个应该是存储两个的 一个 缓存 提个投标 先考虑投标吧
    addView({ commit }, view) {
      commit('addVisitedView', view)
    },

    // 删除之后页面还要跳转判断 所以要写一个回调
    deleteView({ commit, state }, view) {
      // commit('addVisitedView', view)
      return new Promise(resolve => {
        commit('deleteVisitedView', view)
        resolve([...state.visitedViews])
      })
    },



  },
  modules: {

  },
  namespaced: true,


})
