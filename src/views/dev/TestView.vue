<template>
  <div class="about">
    <h1>This is an Test page</h1>
    <v-btn @click="toastError"> Show Toast </v-btn>
    <PickerCalendar />
    <ApexChart />
  </div>
</template>
<script setup>
import { useToast } from 'vue-toastification'
import PickerCalendar from '@/components/calendar/PickerCalendar.vue'
import ApexChart from '@/components/apexchart/ApexChart.vue'

const toast = useToast()

const toastError = () => {
  toast.error('My toast content', {
    timeout: 2000,
  })
}
</script>
