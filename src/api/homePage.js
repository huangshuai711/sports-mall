import request from '@/utils/request'

// 获取商品收藏前十
export function listComment() {
  return request({
    url: `/api/dataAnalyse/listComment`,
    method: 'get'
  })
}

// 获取商品销量前十
export function listProductSell() {
  return request({
    url: `/api/dataAnalyse/listProductSell`,
    method: 'get'
  })
}

// 获取二级分类销量榜
export function listSecondProductNumDto() {
  return request({
    url: `/api/dataAnalyse/listSecondProductNumDto`,
    method: 'get'
  })
}
// 获取总数
export function getDataAnalyse() {
  return request({
    url: `/api/dataAnalyse/home`,
    method: 'get'
  })
}
