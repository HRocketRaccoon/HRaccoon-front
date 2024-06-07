<template>
  <h1 class="mb-2">| 근태 관리</h1>
  <VRow>
    <VCol>
      <VCard class="date-picker-card">
        <VDatePicker
          v-model="selectedDate"
          :max="yesterday"
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
        :end-time="dailyParams.endTime"
        :selected-attendance-date="dailyParams.selectedAttendanceDate"
        :start-time="dailyParams.startTime"
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
import { formatDate, removeDecimal } from '@/util/util.js'
import api from '@/api/axios.js'

const authStore = useAuthStore()
const weekendParams = ref([
  { name: '월', status: '8시간' },
  { name: '화', status: '8시간' },
  { name: '수', status: '8시간' },
  { name: '목', status: '8시간' },
  { name: '금', status: '8시간' },
])
const dailyParams = ref({
  selectedAttendanceDate: '2024-01-01',
  startTime: '2024-06-03T00:45:04',
  endTime: '2024-06-03T12:45:01',
})
const chartParams = ref({
  text: '총 근무 시간',
  percent: 50,
  totalTime: 40,
  currentTime: 20,
})
const userNo = ref(authStore.userNo || null)

// logic variables
const selectedDate = ref(new Date())
const yesterday = ref(new Date())
selectedDate.value.setDate(selectedDate.value.getDate() - 1)
yesterday.value.setDate(yesterday.value.getDate() - 1)

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

const fetchDailyAttendanceData = async paramDate => {
  try {
    const response = await api.get(`/attendance/startend/${userNo.value}/${paramDate}`)
    console.log('[SUCCESS] fetchDailyAttendanceData response:', response)

    if (response.data.data) {
      dailyParams.value.selectedAttendanceDate = response.data.data.attendanceDate
      dailyParams.value.startTime = response.data.data.attendanceStartTime
      dailyParams.value.endTime = response.data.data.attendanceEndTime
    }
  } catch (error) {
    console.log('[ERROR] fetchDailyAttendanceData error:', error)
  }
}

const fetchWeekendWorkTime = async () => {
  try {
    const response = await api.get(`/attendance/worktimeperdate/${userNo.value}`)
    console.log('[SUCCESS] fetchWeekendWorkTime response:', response)

    weekendParams.value = response.data.data
  } catch (error) {
    console.log('[ERROR] fetchWeekendWorkTime error:', error)
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

watch(selectedDate, newDate => {
  fetchDailyAttendanceData(formatDate(newDate))
})
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
