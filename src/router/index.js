import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/BlankLayout.vue'),
      children: [
        {
          path: 'sign-in',
          name: 'SignIn',
          component: () => import('@/views/auth/LoginView.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('@/views/exception/ErrorView.vue'),
        },
      ],
    },
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: 'home',
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
          path: 'approval-detail/:approvalNo',
          component: () => import('@/views/approval/ApprovalDetailView.vue'),
          props: route => ({ approvalNo: route.params.approvalNo, type: route.query.type }),
        },
        {
          path: 'attendance',
          component: () => import('@/views/attendance/AttendanceView.vue'),
        },
        {
          path: 'approval/status/list',
          component: () => import('@/views/approval/ApprovalStatusListView.vue'),
        },
        {
          path: 'search',
          component: () => import('@/views/search/EmployeeSearch.vue'),
          children: [
            {
              path: '',
              component: () => import('@/components/search/EmployeeTable.vue'),
              props: route => ({
                searchQuery: route.query.searchQuery,
                selectedAbility: route.query.selectedAbility,
                selectedDepartment: route.query.selectedDepartment,
                currentPage: Number(route.query.currentPage) || 1,
              }),
            },
            {
              path: ':userId',
              component: () => import('@/components/search/EmployeeView.vue'),
              props: route => ({ userId: route.params.userId, type: route.query.type }),
            },
          ],
        },
        // {
        //   path: 'search/:userId',
        //   component: () => import('@/components/search/EmployeeView.vue'),
        //   props: route => ({ userId: route.params.userId, type: route.query.type }),
        // },
        {
          path: 'test',
          component: () => import('@/views/dev/TestView.vue'),
        },
        {
          path: 'seat',
          component: () => import('@/views/SeatView.vue'),
        },
        {
          path: 'mypage',
          component: () => import('@/views/MypageView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = !!sessionStorage.getItem('accessToken')

  if (!isLoggedIn && to.name !== 'SignIn') {
    next({ name: 'SignIn' })
  } else {
    next()
  }
})

export default router
