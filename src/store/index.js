
import Vue from 'vue'
import Vuex from 'vuex'
import tags from './module/tags'
import user from './module/user'
import userRole from './module/userRole';

import getters from './getters'



Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    tagsView: tags,
    user: user,
    userRole: userRole,
  },
  getters
  })

export default store


