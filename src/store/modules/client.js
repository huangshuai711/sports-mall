import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  state: {
    searchText: { val: '', trigger: false }
  },
  getters: {
    getSearchText(state) {
      return state.searchText
    }
  },
  mutations: {
    SET_SEARCHTEXT: (state, searchText) => {
      state.searchText = searchText
    }
  }
}
