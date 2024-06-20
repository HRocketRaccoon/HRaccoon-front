import { defineStore } from 'pinia'

export const useSSEStore = defineStore('sse', {
  state: () => ({
    notifications: [],
    isConnected: false,
    lastError: null,
  }),
  actions: {
    addNotification(notification) {
      this.notifications.push(notification)
    },
    clearNotification() {
      this.notifications = []
    },

    setConnected(connected) {
      this.isConnected = connected
    },
    setError(error) {
      this.lastError = error
    },
  },
})
