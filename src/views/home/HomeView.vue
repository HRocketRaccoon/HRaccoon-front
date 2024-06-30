<template>
  <div>
    <h1 class="mb-2">| 대시보드</h1>
    <VRow>
      <VCol cols="12" md="4">
        <VRow>
          <VCol cols="12">
            <!-- <ApprovalChartCard /> -->
            <VCard class="card-container">
              <VCardTitle>이번주 나의 근무시간</VCardTitle>
              <VCardText>
                <AttendanceApexChart :params="chartParams" />
              </VCardText>
              <template v-slot:actions>
                <VBtn
                  :to="{ path: '/attendance' }"
                  append-icon="mdi-chevron-right"
                  block
                  elevation="20"
                  size="large"
                  text="근태 관리 바로가기"
                  variant="outlined"
                />
              </template>
            </VCard>
          </VCol>
          <VCol cols="12">
            <RemainSeat />
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12" md="8">
        <VRow>
          <VCol cols="12">
            <CalendarCard />
          </VCol>
        </VRow>
        <VRow>
          <!-- 👉 Profit -->
          <VCol cols="12" md="6" sm="6">
            <CardStatisticsVertical
              v-bind="{
                title: '평균 휴가 사용률',
                image: chart1,
                stats: 95,
                change: 9,
              }"
            />
          </VCol>

          <!-- 👉 Sales -->
          <VCol cols="12" md="6" sm="6">
            <CardStatisticsVertical
              v-bind="{
                title: '평균 출장 사용률',
                image: chart2,
                stats: 80,
                change: 7,
              }"
            />
          </VCol>
        </VRow>
        <VRow>
          <!-- 👉 Profit -->
          <VCol cols="12" md="6" sm="6">
            <CardStatisticsVertical
              v-bind="{
                title: '평균 외근 사용률',
                image: chart2,
                stats: 90,
                change: -4,
              }"
            />
          </VCol>

          <!-- 👉 Sales -->
          <VCol cols="12" md="6" sm="6">
            <CardStatisticsVertical
              v-bind="{
                title: '나의 잔여 휴가',
                image: wallet,
                stats: 10,
              }"
            />
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </div>
</template>

<script setup>
import CalendarCard from '@/components/calendar/CalendarCard.vue'
import ApprovalChartCard from '@/components/apexchart/ApprovalChartCard.vue'
import AttendanceApexChart from '@/components/apexchart/AttendanceApexChart.vue'
import RemainSeat from '@/components/remainseat/RemainSeat.vue'
import AnalyticsCongratulations from '@/components/dashboard/AnalyticsCongratulations.vue'
import CardStatisticsVertical from '@/@core/components/cards/CardStatisticsVertical.vue'

// 👉 Images
import chart1 from '@images/cards/chart-success.png'
import chart2 from '@images/cards/chart-info.png'
import card1 from '@images/cards/credit-card-primary.png'
import wallet from '@images/cards/wallet-primary.png'

import { ref, watch } from 'vue'
// api
import api from '@/api/axios.js'
import { useAuthStore } from '@/stores/useAuthStore.js'

// util
import { removeDecimal } from '@/util/util.js'

const authStore = useAuthStore()
const userNo = ref(authStore.userNo || null)

const chartParams = ref({
  text: '총 근무 시간',
  percent: 50,
  totalTime: 40,
  currentTime: 20,
})

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

<style lang="scss">
.card-container {
  padding: 10px;
  height: 420px;
}
</style>
