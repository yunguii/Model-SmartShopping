import request from '@/utils/request'

// 商品详情
export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}
// 商品评价
export const getProComment = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit: 3
    }
  })
}
