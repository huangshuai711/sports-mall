import storage from 'store'
import { login, adminLogin, clientLogin, getUserInfoByToken } from '@/api/user.js'
import route from '@/router'
import { ACCESS_TOKEN, STORAGE_ACCOUNT } from '@/store/mutation-types'

const user = {
  state: {
    token: '',
    userInfo: null,
    accountArr: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ACCOUNTARR: (state, accountArr) => {
      storage.set(STORAGE_ACCOUNT, window.btoa(encodeURIComponent(JSON.stringify(accountArr))))
      state.accountArr = accountArr
    }
  },
  getters: {
    getToken(state) {
      return storage.get(ACCESS_TOKEN) || state.token
    },
    getUserInfo(state) {
      return state.userInfo
    },
    getAccountArr(state) {
      return storage.get(STORAGE_ACCOUNT) && window.atob(storage.get(STORAGE_ACCOUNT))
        ? JSON.parse(decodeURIComponent(window.atob(storage.get(STORAGE_ACCOUNT))), true)
        : state.accountArr
    }
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        const login = route.app.$route.name == 'adminLogin' ? adminLogin : clientLogin
        login(userInfo)
          .then(response => {
            const result = response.data
            if (result) {
              storage.set(ACCESS_TOKEN, result.data, 7 * 24 * 60 * 60 * 1000)
              commit('SET_TOKEN', result.data)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfoByToken()
          .then(res => {
            const userInfo = res.data
            commit('SET_USERINFO', userInfo)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_USERINFO', null)
        storage.remove(ACCESS_TOKEN)
        resolve()
      })
    }
  }
}

export default user
