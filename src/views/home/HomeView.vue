<template>
  <h1 class="mb-2">| 대시보드</h1>
  <VRow>
    <VCol cols="12" md="7">
      <VRow>
        <VCol cols="12">
          <ApprovalChartCard class="mb-5" />
        </VCol>
        <VCol cols="12">
          <RemainSeat style="padding: 32px 50px" />
        </VCol>
      </VRow>
    </VCol>
    <VCol cols="12" md="5">
      <VRow>
        <VCol cols="12">
          <CalendarCard class="mb-5" />
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
