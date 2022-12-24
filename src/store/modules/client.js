import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  state: {
    productType: '',
    searchText: { val: '', trigger: false }
  },
  getters: {
    getProductType(state) {
      return state.productType
    },
    getSearchText(state) {
      return state.searchText
    }
  },
  mutations: {
    SET_PRODUCTTYPE: (state, productType) => {
      state.productType = productType
    },
    SET_SEARCHTEXT: (state, searchText) => {
      state.searchText = searchText
    }
  }
}
