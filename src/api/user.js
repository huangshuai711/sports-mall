import request from '@/utils/request'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
// 管理员登录
export function adminLogin(parameter) {
  return axios({
    url: '/api/user/adminLogin',
    method: 'post',
    data: parameter
  })
}
// 用户登录
export function clientLogin(parameter) {
  return axios({
    url: '/api/user/clientLogin',
    method: 'post',
    data: parameter
  })
}
// 注册
export function signUp(parameter) {
  return axios({
    url: '/api/user/register',
    method: 'post',
    data: parameter
  })
}

// 获取用户信息
export function getUserInfoByToken(parameter) {
  return request({
    url: '/api/user/getUserInfoByToken',
    method: 'GET',
    data: parameter
  })
}

// 编辑用户信息
export function eidtPassword(parameter) {
  return request({
    url: `/api/user/modifyPassword/${parameter.newPassword}/${parameter.oldPassword}`,
    method: 'PUT'
  })
}
