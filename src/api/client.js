import request from '@/utils/request'

// 获取商品分类树
export function getSortTree() {
  return request({
    url: `/api/userHomes/tree`,
    method: 'GET'
  })
}

// 获取商品信息
export function getCommoditys(parameter) {
  return request({
    url: `/api/userHomes/export`,
    method: 'POST',
    data: parameter
  })
}

// 切换收藏状态
export function switchCollectState(parameter) {
  return request({
    url: `/api/userHomes/collectComment/${parameter.id}/${parameter.type}`,
    method: 'POST'
  })
}
// 获取收藏商品
export function getCollectCommoditys(parameter, paging) {
  return request({
    url: `/api/userHomes/listCollectComment`,
    method: 'POST',
    data: parameter
  })
}

// 获取订单列表
export function getOrderArr(parameter, paging) {
  return request({
    url: `/api/userHomes/pageUser/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}

// 评价
export function commodityEvaluate(id) {
  return request({
    url: `/api/userHomes/comment/${id}`,
    method: 'put'
  })
}

// 获取浏览记录
export function getRecirds(parameter, paging) {
  return request({
    url: `/api/userHomes/pageViewRecord/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}

// 删除浏览记录
export function removeViewRecord(id) {
  return request({
    url: `/api/userHomes/removeViewRecord/${id}`,
    method: 'post'
  })
}
// 获取评论列表
export function commentList(id) {
  return request({
    url: `/api/userHomes/comment/${id}`,
    method: 'post'
  })
}
// 下单、加入购物车
export function addOrder(parameter) {
  return request({
    url: `/api/userHomes/order`,
    method: 'post',
    data: parameter
  })
}
