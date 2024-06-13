import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core' // VueUse 패키지에서 제공하는 유틸리티 사용

export const useSeatStore = defineStore('seat', {
  state: () => ({
    selectedSeats: useLocalStorage('selectedSeats', {}), // LocalStorage를 사용하여 상태 저장
  }),
  actions: {
    selectSeat(userNo, seatNo) {
      this.selectedSeats[userNo] = seatNo
    },
    cancelSeat(userNo) {
      delete this.selectedSeats[userNo]
    },
    getSelectedSeat(userNo) {
      return this.selectedSeats[userNo] || null
    },
  },
})
