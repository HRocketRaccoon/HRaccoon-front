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
    <VCol>
      <VCard class="card-container">
        <h2>총 근무시간</h2>
        <VCardText>
          <AttendanceApexChart :params="chartParams" />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12" md="6">
      <VCard>
        <VCardText>
          <h2 class="mb-4">금주 근무 시간</h2>
          <VSpacer />
          <VRow>
            <GraphBar :labels="defaultGraphLabels" :values="weekendGraphValues" />
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" md="6">
      <WorkTime :work-hours="weekendParams" />
    </VCol>
  </VRow>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

// components
import WorkTime from '@/components/WorkTime.vue'
import CardNavigation from '@/components/CardNavigation.vue'
import AttendanceApexChart from '@/components/apexchart/AttendanceApexChart.vue'

// api
import api from '@/api/axios.js'
import { useAuthStore } from '@/stores/useAuthStore.js'

// util
import { formatDate, removeDecimal } from '@/util/util.js'
import GraphBar from '@/components/GraphBar.vue'

const authStore = useAuthStore()
const weekendParams = ref([
  { name: '월', status: '8시간' },
  { name: '화', status: '7시간' },
  { name: '수', status: '8시간' },
  { name: '목', status: '8시간' },
  { name: '금', status: '8시간' },
])
const dailyParams = ref({
  /* 형식 확인 */
  selectedAttendanceDate: '2024-01-01',
  startTime: '2024-06-03T00:45:04',
  endTime: '2024-06-03T12:45:01',
})
const chartParams = ref({
  text: '총 근무 시간',
  percent: 99,
  totalTime: 40,
  currentTime: 39,
})
const userNo = ref(authStore.userNo || null)
const weekendGraphValues = ref([8, 7, 8, 8, 8])
const defaultGraphLabels = ref([' 월요일', '화요일', '수요일', '목요일', '금요일'])

// logic variables
const selectedDate = ref(new Date(new Date().setDate(new Date().getDate() - 1)))
const yesterday = ref(new Date(new Date().setDate(new Date().getDate() - 1)))

const fetchAttendanceChartData = async () => {
  try {
    const response = await api.get(`/attendance/weektotalpercent/${userNo.value}`)
    console.log('[SUCCESS] fetchAttendanceChartData response:', response)

    chartParams.value.percent = removeDecimal(response.data.data.formattedPercent)
    chartParams.value.currentTime = response.data.data.totalWorkHours
  } catch (error) {
    console.error('[ERROR] fetchAttendanceChartData error:', error)
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
    } else {
      dailyParams.value.selectedAttendanceDate = paramDate
      dailyParams.value.startTime = ''
      dailyParams.value.endTime = ''
    }
  } catch (error) {
    console.error('[ERROR] fetchDailyAttendanceData error:', error)
  }
}

const fetchWeekendWorkTime = async () => {
  try {
    const response = await api.get(`/attendance/worktimeperdate/${userNo.value}`)
    console.log('[SUCCESS] fetchWeekendWorkTime response:', response)

    weekendParams.value = response.data.data
  } catch (error) {
    console.error('[ERROR] fetchWeekendWorkTime error:', error)
  }
}

watch(
  userNo,
  async newUserNo => {
    if (newUserNo) {
      /* await fetchAttendanceChartData() */
    }
  },
  { immediate: true },
)

watch(selectedDate, newDate => {
  fetchDailyAttendanceData(formatDate(newDate))
})

onMounted(() => {
  fetchDailyAttendanceData(formatDate(selectedDate.value))
  fetchWeekendWorkTime()
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
