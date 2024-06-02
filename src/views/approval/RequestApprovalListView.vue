<template>
  <h1 class="mb-2">| 결재 요청 확인</h1>
  <VCard>
    <ApprovalTable :data="params" type="request" />
    <VPagination v-model="currentPage" :total-visible="totalPage" @change="changePage" />
  </VCard>
</template>
<script setup>
import { ref } from 'vue'
import ApprovalTable from '@/components/table/ApprovalTable.vue'

const params = ref([
  {
    approvalNo: '1',
    approvalTitle: 'IT개발팀 이윤재 출장 신청',
    userName: '이윤재',
    approvalSubmitDate: '2024.05.23',
    approvalStatus: '결재 중',
  },
])
const currentPage = ref(1)
const totalPage = ref(10)

const changePage = page => {
  currentPage.value = page
}
</script>
<style scoped></style>
