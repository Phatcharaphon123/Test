import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue'),
    },
    { 
      path: '/createUsers',
      name: 'createUsers',
      component: () => import('../views/CreateUsersView.vue'),
    },
    {
      path: '/updateUsers/:id',
      name: 'updateUsers',
      component: () => import('../views/UpdateUsersView.vue'),
    },
    {
      path: '/createProducts',
      name: 'createProducts',
      component: () => import('../views/CreateProductsView.vue'),
    },
    {
      path: '/updateProducts/:id',
      name: 'updateProducts',
      component: () => import('../views/UpdateProductsView.vue'),
    }

  ],
})

export default router
