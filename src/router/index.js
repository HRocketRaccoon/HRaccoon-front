import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '/',
          component: () => import('@/views/home/HomeView.vue'),
        },
        {
          path: 'approval/request',
          component: () => import('@/views/approval/RequestApprovalView.vue'),
        },
        {
          path: 'approval/request/list',
          component: () => import('@/views/approval/RequestApprovalListView.vue'),
        },
        {
          path: 'approval-detail',
          component: () => import('@/views/approval/ApprovalDetailView.vue'),
        },
        {
          path: 'approval/status/list',
          component: () => import('@/views/approval/ApprovalStatusListView.vue'),
        },
        {
          path: 'test',
          component: () => import('@/views/dev/TestView.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/layouts/BlankLayout.vue'),
      children: [
        {
          path: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
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
