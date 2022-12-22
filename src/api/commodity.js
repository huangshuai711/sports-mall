import request from '@/utils/request'
import axios from 'axios'

// 获取商品列表
export function getCommodityDatas(parameter, paging) {
  return request({
    url: `/api/adminProducts/pageProductInfo/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}
// 导出商品
export function exportCommodity(parameter) {
  return request({
    url: '/api/adminProducts/export',
    method: 'post',
    responseType: 'blob',
    data: parameter
  })
}

// 获取商品详情
export function getDetails(id) {
  return request({
    url: `/api/adminProducts/detail/${id}`,
    method: 'GET'
  })
}

// 改变商品状态（上架下架）
export function changeCommodityState(id) {
  return request({
    url: `/api/adminProducts/updateStatus/${id}`,
    method: 'GET'
  })
}
// 删除商品
export function deleteCommodity(id) {
  return request({
    url: `/api/adminProducts/delete/${id}`,
    method: 'GET'
  })
}
// 新增编辑商品信息
export function saveCommodityInfo(parameter) {
  return request({
    url: '/api/adminProducts/saveOrUpdate',
    method: 'POST',
    data: parameter
  })
}

// 改变商品推荐状态
export function changeSellState(id) {
  return request({
    url: `/api/adminProducts/recommend/${id}`,
    method: 'GET'
  })
}

// 新增编辑商品分类
export function singleProductType(parameter) {
  return request({
    url: '/api/singleProductType/saveOrUpdate',
    method: 'POST',
    data: parameter
  })
}

// 删除商品分类
export function deleteCommodityType(id) {
  return request({
    url: `/api/singleProductType/remove/${id}`,
    method: 'DELETE'
  })
}
