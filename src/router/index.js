import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // 예시) 레이아웃 적용
      // meta: { layout: IntroLayout },
    },
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue'),
    },

    // 예시) component를 동적으로 불러오는 방법
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('@/views/AboutView.vue'),
    // },
  ],
})

export default router
