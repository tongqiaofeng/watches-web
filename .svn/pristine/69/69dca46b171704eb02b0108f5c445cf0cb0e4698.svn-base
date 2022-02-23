import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import VueDND from 'awe-dnd'

Vue.use(VueDND)
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [{
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        title: 'TopTime在线办公系统',
        type: '' // 不需要鉴权
      },
      children: [{
        path: '/login',
        component: Login,
      }]
    },
    { //主页
      path: '/home',
      name: 'home',
      component: () => import('@/components/home/home.vue'),
      meta: {
        title: 'TopTime在线办公系统',
        type: 'login',
        allowBack: false
      }
    }
  ]
})