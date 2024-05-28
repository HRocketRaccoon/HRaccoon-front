import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: 'home',
          component: () => import('@/views/home/HomeView.vue'),
        },
        {
          path: 'test',
          component: () => import('@/views/dev/TestView.vue'),
        },
        {
          path: 'seat',
          component: () => import('@/views/SeatView.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/layouts/BlankLayout.vue'),
      children: [
        {
          path: 'login',
          component: () => import('@/views/LoginView.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('@/views/exception/ErrorView.vue'),
        },
      ],
    },
  ],
})

export default router
