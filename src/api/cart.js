import request from '@/utils/request'

export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

export const getCartList = () => {
  return request.get('/cart/list')
}
// 购物车商品更新
export const changeCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
// 购物车商品删除
export const delGoods = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
