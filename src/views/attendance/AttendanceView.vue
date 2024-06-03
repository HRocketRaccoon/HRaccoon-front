<template>
  <h1 class="mb-2">| 근태 관리</h1>
  <VRow>
    <VCol>
      <WorkTime :work-hours="workHours" />
    </VCol>
    <CardNavigation :arrival-time="arrivalTime" :departure-time="departureTime" :insert-date="insertDate" />
  </VRow>
</template>

<script setup>
import { ref } from 'vue'
import WorkTime from '@/components/attendance/WorkTime.vue'
import CardNavigation from '@/components/attendance/CardNavigation.vue'

const workHours = ref([
  { name: '월', hours: '8시간' },
  { name: '화', hours: '8시간' },
  { name: '수', hours: '8시간' },
  { name: '목', hours: '8시간' },
  { name: '금', hours: '8시간' },
])

const insertDate = ref('09월 05일')
const arrivalTime = ref('9시 30분')
const departureTime = ref('6시 00분')
</script>
