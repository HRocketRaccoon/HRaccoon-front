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
import { ref } from 'vue'

const params = ref({
  text: '총 근무 시간',
  percent: 68,
  // totalTime: 40,
  // currentTime: 24.42,
  type: 'radialBar',
})
</script>

<style></style>
