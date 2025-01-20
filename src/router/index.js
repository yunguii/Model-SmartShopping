import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'
import store from '@/store'

const Detail = () => import('@/views/detail')
const Layout = () => import('@/views/layout')
const Login = () => import('@/views/login')
const Myorder = () => import('@/views/myorder')
const Pay = () => import('@/views/pay')
const SearchList = () => import('@/views/search/list.vue')
const ProDetail = () => import('@/views/prodetail')
const Search = () => import('@/views/search/index.vue')
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/detail/:id', component: Detail },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/catagory', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/login', component: Login },
    { path: '/myorder', component: Myorder },
    { path: '/pay', component: Pay },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    { path: '/prodetail/:id', component: ProDetail }
  ]
})

const fileUrl = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  if (!fileUrl.includes(to.path)) {
    next()
    return
  }
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
