import { getCartList, changeCart, delGoods } from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      list: []
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.list = newList
    },
    getChoce (state, goodsId) {
      const goods = state.list.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    getAllChoce (state, n) {
      state.list.forEach(item => { item.isChecked = n })
    },
    changCount (state, { goodsId, goodsNum }) {
      const goods = state.list.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartList (context) {
      const { data: { data } } = await getCartList()
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    async changeGoodsNum (context, obj) {
      const { goodsId, goodsNum, goodsSkuId } = obj
      context.commit('changCount', { goodsId, goodsNum })
      await changeCart(goodsId, goodsNum, goodsSkuId)
    },
    async delGoods (context, obj) {
      const getSelectGoods = context.getters.getSelectGoods
      const goods = getSelectGoods.map(item => item.id)
      await delGoods(goods)
      Toast('删除成功')
      context.dispatch('getCartList')
    }
  },
  getters: {
    // 获取所有选中商品数量
    getTotalGoods (state) {
      return state.list.reduce((sum, item) =>
        sum + item.goods_num, 0)
    },
    // 获取所有选中的商品
    getSelectGoods (state) {
      return state.list.filter(item => item.isChecked)
    },
    // 获取所有选中的商品数量
    getSelectNum (state, getters) {
      return getters.getSelectGoods.reduce((sum, item) =>
        sum + item.goods_num, 0)
    },
    getTotalPrice (state, getters) {
      return getters.getSelectGoods.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },
    // 全选
    isAllCheck (state) {
      return state.list.every(item => item.isChecked)
    }
  }
}
