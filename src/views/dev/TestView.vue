<template>
  <div>
    <div class="about">
      <h1>This is an Test page</h1>
    </div>
    <div style="display: flex">
      <PickerCalendar />
      <ApexChart />
    </div>
  </div>
</template>
<script setup>
import PickerCalendar from '@/components/calendar/PickerCalendar.vue'
import ApexChart from '@/components/apexchart/ApexChart.vue'
</script>
<style></style>
