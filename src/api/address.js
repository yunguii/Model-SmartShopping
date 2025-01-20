import request from '@/utils/request'

// 获取分类数据
export const getAddress = () => {
  return request.get('/address/list')
}
