import { createRouter, createWebHistory } from 'vue-router'
import CheckIn from '../views/CheckIn.vue'
import RouteHome from '../views/RouteHome.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RouteHome,
    },
    {
      path: '/turbine/:id',
      name: 'check-in',
      component: CheckIn,
      props: true,
    },
  ],
})

export default router
