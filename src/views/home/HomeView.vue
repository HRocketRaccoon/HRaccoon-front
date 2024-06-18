<template>
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
    </VCol>
  </VRow>
</template>

<script setup>
import CalendarCard from '@/components/calendar/CalendarCard.vue'
import ApprovalChartCard from '@/components/apexchart/ApprovalChartCard.vue'
import RemainSeat from '@/components/remainseat/RemainSeat.vue'
</script>

<style lang="scss"></style>
