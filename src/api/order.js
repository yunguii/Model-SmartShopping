import request from '@/utils/request'

// 获取分类数据
export const getOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10,
      shopld: 0,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}

// 发送订单
export const postOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10,
    payType: 10,
    couponId: 0,
    isUsePoints: 0,
    ...obj
  })
}
