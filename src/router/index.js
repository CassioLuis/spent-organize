import { createRouter, createWebHistory } from 'vue-router'
import spentList from '../views/spentList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: spentList
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/categories.vue')
    }
  ]
})

export default router
