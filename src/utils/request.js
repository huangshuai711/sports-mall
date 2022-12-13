import axios from 'axios'
import store from '@/store'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 60000 // 请求超时时间
})
const errorHandler = error => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      console.log({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401) {
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
    if (error.response.status !== 1 && error.response.status !== 404) {
      message.error(
        data.message ? data.message : '服务器繁忙或网络错误，请检查网络是否通畅，稍后再试.'
      )
    }
  }
  return Promise.reject(error)
}

request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token
  if (token) {
    config.headers['token'] = token
  }
  return config
}, errorHandler)

request.interceptors.response.use(response => {
  if (response.data.status === 401 || response.data.status === 456) {
    store.dispatch('Logout').then(() => {
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    })
  } else {
    return response.data
  }
}, errorHandler)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export { installer as VueAxios, request as axios }
