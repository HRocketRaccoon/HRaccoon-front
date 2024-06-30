<template>
  <div>
    <h1 class="mb-2">| 대시보드</h1>
    <VRow>
      <VCol cols="12" md="4">
        <VRow>
          <VCol cols="12">
            <ApprovalChartCard />
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
import RemainSeat from '@/components/remainseat/RemainSeat.vue'
import AnalyticsCongratulations from '@/components/dashboard/AnalyticsCongratulations.vue'
import CardStatisticsVertical from '@/@core/components/cards/CardStatisticsVertical.vue'

// 👉 Images
import chart1 from '@images/cards/chart-success.png'
import chart2 from '@images/cards/chart-info.png'
import card1 from '@images/cards/credit-card-primary.png'
import wallet from '@images/cards/wallet-primary.png'
</script>

<style lang="scss"></style>
