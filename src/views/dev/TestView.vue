<template>
  <div class="about">
    <h1>This is an Test page</h1>
    <v-btn @click="toastError"> Show Toast </v-btn>
    <ApexChart />
  </div>
</template>
<script setup>
import { useToast } from 'vue-toastification'
import ApexChart from '@/components/apexchart/ApexChart.vue'

const toast = useToast()

const toastError = () => {
  toast.error('My toast content', {
    timeout: 2000,
  })
}
</script>
