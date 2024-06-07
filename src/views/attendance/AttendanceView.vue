<template>
  <h1 class="mb-2">| 근태 관리</h1>
  <VRow>
    <VCol>
      <VCard class="date-picker-card">
        <VDatePicker
          v-model="date"
          :max="date"
          clearable
          label="날짜"
          min="2010-01-01"
          placeholder="날짜를 선택하세요."
          readonly
          width="100%"
        />
      </VCard>
    </VCol>
    <VCol>
      <CardNavigation
        :arrival-time="dailyParams.arrivalTime"
        :departure-time="dailyParams.departureTime"
        :insert-date="dailyParams.insertDate"
      />
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12" md="6">
      <WorkTime :work-hours="weekendParams" />
    </VCol>
    <VCol cols="12" md="6">
      <VCard class="card-container">
        <h2>총 근무시간</h2>
        <VCardText>
          <AttendanceApexChart :params="chartParams" />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
import { ref, watch } from 'vue'

// components
import WorkTime from '@/components/attendance/WorkTime.vue'
import CardNavigation from '@/components/attendance/CardNavigation.vue'
import AttendanceApexChart from '@/components/apexchart/AttendanceApexChart.vue'

// api
import { useAuthStore } from '@/stores/useAuthStore.js'

// util
import { removeDecimal } from '@/util/util.js'
import api from '@/api/axios.js'

const authStore = useAuthStore()
const weekendParams = ref([
  { name: '월', hours: '8시간' },
  { name: '화', hours: '8시간' },
  { name: '수', hours: '8시간' },
  { name: '목', hours: '8시간' },
  { name: '금', hours: '8시간' },
])
const dailyParams = ref({
  insertDate: '09월 05일',
  arrivalTime: '9시 30분',
  departureTime: '6시 00분',
})
const chartParams = ref({
  text: '총 근무 시간',
  percent: 50,
  totalTime: 40,
  currentTime: 20,
})
const date = ref(new Date())
const calendarParams = ref({})
const userNo = ref(authStore.userNo || null)

const fetchAttendanceChartData = async () => {
  try {
    const response = await api.get(`/attendance/weektotalpercent/${userNo.value}`)
    console.log('[SUCCESS] fetchAttendanceChartData response:', response)

    chartParams.value.percent = removeDecimal(response.data.data.formattedPercent)
    chartParams.value.currentTime = response.data.data.totalWorkHours
  } catch (error) {
    console.log('[ERROR] fetchAttendanceChartData error:', error)
  }
}

watch(
  userNo,
  async newUserNo => {
    if (newUserNo) {
      await fetchAttendanceChartData()
    }
  },
  { immediate: true },
)
</script>
<style scoped>
.date-picker-card {
  min-width: 300px;
  width: 100%;
}

.card-container {
  padding: 20px;
}
</style>
