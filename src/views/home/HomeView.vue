<template>
  <main>
    <VRow>
      <VCol cols="12" md="6">
        <VRow>
          <VCol cols="12">
            <ApexChart class="mb-5" />
          </VCol>
          <VCol cols="12">
            <RemainSeat />
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12" md="5" offset="1">
        <VRow>
          <VCol cols="12">
            <PickerCalendar class="mb-5" />
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
import PickerCalendar from '@/components/calendar/PickerCalendar.vue'
import ApexChart from '@/components/apexchart/ApexChart.vue'
import RemainSeat from '@/components/remainseat/RemainSeat.vue'
import TodoModal from '@/components/todo/TodoModal.vue'
</script>

<style></style>
