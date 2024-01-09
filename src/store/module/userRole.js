export default ({
  state: {
    roles: [],// 角色 根据这个判断是否登录
  },
  mutations: {

    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
  },
  actions: {
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // 做的一些判断  如果条件成立  继续进行  否则抛出异常
        if (true) {
          commit('SET_ROLES', ['admin']);
          resolve({})
        }
        else {
          reject({})
        }
      })
    },

  },
  modules: {

  },
  namespaced: true,
})
