import Vue from 'vue'
import Router from 'vue-router'
const home = r => require.ensure([], () => r(require('src/components/page/home')), 'home')
const detail = r => require.ensure([], () => r(require('src/components/page/detail')),'detail')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/detail/:id',
      component: detail
    }
  ]
})
