<template>
  <main>
    <VRow>
      <VCol cols="12" md="7">
        <VRow>
          <VCol cols="12" md="10" sm="5">
            <ApexChart class="mb-5" />
          </VCol>
          <VCol cols="12" md="10" sm="7">
            <RemainSeat class="pa-10" />
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12" md="5">
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
