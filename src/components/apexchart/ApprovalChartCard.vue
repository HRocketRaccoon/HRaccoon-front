<template>
  <VCard>
    <VCardTitle>나의 근무시간</VCardTitle>
    <VCardText>
      <VCol>
        <ApexChart :params="params" />
      </VCol>
    </VCardText>
    <template v-slot:actions>
      <v-btn
        :to="{ path: '/test' }"
        append-icon="mdi-chevron-right"
        color="lighten-2"
        text="근태 관리 바로가기"
        variant="outlined"
        block
      ></v-btn>
    </template>
  </VCard>
</template>

<script setup>
import ApexChart from '@/components/apexchart/ApexChart.vue'
import axios from '@/api/axios'
import { onMounted, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'

const userNo = ref(useAuthStore().userNo || '')

const params = ref({
  text: '총 근무 시간',
  type: 'radialBar',
  formattedPercent: 0,
  //totalWorkHours: 0
})

const getAttendancePercent = async () => {
  try {
    const response = await axios.get(`/attendance/weektotalpercent/${userNo.value}`)
    console.log('get AttendancePercent success ! ', response)
    params.value.formattedPercent = formatToTwoDecimalPlaces(response.data.data.formattedPercent)
  } catch (error) {
    console.log('Error get AttendancePercent:', error)
  }
}

const formatToTwoDecimalPlaces = number => {
  return parseFloat(number).toFixed(2)
}

onMounted(() => {
  getAttendancePercent()
})
</script>

<style></style>
