import { defineStore } from 'pinia'
import api from '@/api/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
  }),
  actions: {
    /**
     * @description Login 시 발급되는 accessToken 과 refreshToken 을 localStorage 에 저장하는 함수.
     * @param credentials
     */
    async signIn(credentials) {
      try {
        const response = await api.post('/auth/sign-in', credentials)

        this.accessToken = response.data.accessToken
        this.refreshToken = response.data.refreshToken

        localStorage.setItem('accessToken', this.accessToken)
        localStorage.setItem('refreshToken', this.refreshToken)
      } catch (error) {
        console.error('Login error:', error)
      }
    },

    /**
     * @description refreshToken 을 사용하여 새로운 accessToken 과 refreshToken 을 발급받는 함수.
     */
    async refreshToken() {
      try {
        const response = await api.post('/refresh-token', {
          refreshToken: this.refreshToken,
        })
        this.accessToken = response.data.accessToken
        this.refreshToken = response.data.refreshToken

        localStorage.setItem('accessToken', this.accessToken)
        localStorage.setItem('refreshToken', this.refreshToken)
      } catch (error) {
        console.error('Refresh token error:', error)
        await this.signOut()
      }
    },

    /**
     * @description 로그아웃 시 localStorage 에 저장된 accessToken 과 refreshToken 을 삭제하는 함수.
     * @returns {Promise<void>}
     */
    async signOut() {
      try {
        api
          .post('/auth/sign-out', {
            refreshToken: this.refreshToken,
          })
          .then(() => {
            this.accessToken = ''
            this.refreshToken = ''
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
          })
      } catch (error) {
        console.error('Sign out error:', error)
      }
    },
  },
})
