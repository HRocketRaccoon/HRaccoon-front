<template>
  <main>
    <VRow>
      <VCol cols="12" md="7">
        <VRow>
          <VCol cols="12" md="11" sm="5" xs="12">
            <ApprovalChartCard class="mb-5" />
          </VCol>
          <VCol cols="12" md="11" sm="7">
            <RemainSeat style="padding: 32px 50px" />
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12" md="5">
        <VRow>
          <VCol cols="12">
            <CalendarCard class="mb-5" />
          </VCol>
          <VCol cols="12">
            <TodoModal />
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </main>
</template>

<script setup>
import CalendarCard from '@/components/calendar/CalendarCard.vue'
import ApprovalChartCard from '@/components/apexchart/ApprovalChartCard.vue'
import RemainSeat from '@/components/remainseat/RemainSeat.vue'
import TodoModal from '@/components/todo/TodoModal.vue'
</script>

<style></style>
