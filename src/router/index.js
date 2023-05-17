import { createRouter, createWebHistory } from 'vue-router'
import spentList from '../views/spentList.vue'
import categories from '../views/categories.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: spentList
    },
    {
      path: '/categories',
      name: 'categories',
      // component: categories
      component: () => import('../views/categories.vue')
    }
  ]
})

export default router
