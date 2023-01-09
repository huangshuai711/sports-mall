import request from '@/utils/request'
import axios from 'axios'

// 获取用户列表
export function getDatas(parameter, paging) {
  return request({
    url: `/api/userInfo/pageUser/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}
// 导出用户信息
export function exports(parameter) {
  return request({
    url: '/api/userInfo/export',
    method: 'post',
    responseType: 'blob',
    data: parameter
  })
}
// 编辑用户信息
export function editUserInfo(parameter) {
  return request({
    url: '/api/userInfo/updateInfo',
    method: 'put',
    data: parameter
  })
}
// 改变用户状态（启用禁用）
export function changeUserState(id) {
  return request({
    url: `/api/userInfo/updateStatus/${id}`,
    method: 'PUT'
  })
}

// 删除用户
export function deleteUser(id) {
  return request({
    url: `/api/userInfo/deleteUser/${id}`,
    method: 'DELETE'
  })
}

// 获取日志列表
export function getLogs(parameter, paging) {
  return request({
    url: `/api/loginLogs/pageUser/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}

// 导出日志信息
export function exportLogs(parameter) {
  return request({
    url: '/api/loginLogs/export',
    method: 'post',
    responseType: 'blob',
    data: parameter
  })
}

// 删除日志
export function deleteLog(id) {
  return request({
    url: `/api/loginLogs/deleteLogs/${id}`,
    method: 'DELETE'
  })
}

// 获取分类树
export function getTypeTree(parameter) {
  return request({
    url: `/api/singleProductType/tree`,
    method: 'GET',
    data: parameter
  })
}
// 机器人初始对话
export function initTalk() {
  return request({
    url: `/api/robots/initTalk`,
    method: 'GET'
  })
}
// 对话记录
export function robotDtoRecord(parameter) {
  return request({
    url: `/api/robots/robotDtoRecord`,
    method: 'GET',
    data: parameter
  })
}
// 用户输入
export function userChoose(parameter) {
  return request({
    url: `/api/robots/userChoose`,
    method: 'POST',
    data: parameter
  })
}
