<template>
  <h1 class="mb-2">| 결재 현황 확인</h1>
  <VCard>
    <VCard>
      <ApprovalTable :data="params" type="status" />
      <VPagination v-model="currentPage" :total-visible="totalPage" @change="changePage" />
    </VCard>
  </VCard>
</template>
<script setup>
import { ref } from 'vue'
import ApprovalTable from '@/components/table/ApprovalTable.vue'
import { useAuthStore } from '@/stores/useAuthStore.js'
import api from '@/api/axios.js'

const params = ref([
  {
    approvalNo: '1',
    approvalTitle: '출장 신청',
    approvalAuthority: '방채원',
    approvalSubmitDate: '2024.05.23',
    approvalStatus: '결재 중',
    approvalDetailStartDate: '',
    approvalDetailEndDate: '',
  },
  {
    approvalNo: '2',
    approvalTitle: '휴가 신청',
    approvalAuthority: '방채원',
    approvalSubmitDate: '2024.05.31',
    approvalStatus: '결재 중',
    approvalDetailStartDate: '',
    approvalDetailEndDate: '',
  },
])
const currentPage = ref(1)
const totalPage = ref(10)

const userNo = ref(useAuthStore().userNo || '')

const fetchApprovalStatusList = async () => {
  try {
    const response = await api.get(`/approval/submittedapprovallist/${userNo.value}`)
    params.value = response.data
  } catch (error) {
    console.error(error)
  }
}

const changePage = page => {
  currentPage.value = page
}
</script>
<style scoped></style>
