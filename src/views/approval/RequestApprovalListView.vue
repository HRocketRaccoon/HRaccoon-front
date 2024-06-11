<template>
  <h1 class="mb-2">| 결재 요청 관리</h1>
  <VCard>
    <ApprovalTable :data="params" type="request" />
    <VPagination
      v-model="currentPage"
      :length="totalPage"
      :total-visible="totalPage"
      @update:modelValue="onHandlePage"
    />
  </VCard>
</template>
<script setup>
import { ref, watch } from 'vue'
// components
import ApprovalTable from '@/components/table/ApprovalTable.vue'
// api
import api from '@/api/axios.js'
// store
import { useAuthStore } from '@/stores/useAuthStore.js'
// util
import { formatDate } from '@/util/util.js'
// constants
import { APPROVAL_STATUS, APPROVAL_TITLE } from '@/util/constants/approvalConstant.js'

const params = ref([])
const currentPage = ref(1)
const totalPage = ref(1)

const userNo = ref(useAuthStore().userNo || '')

const fetchApprovalRequestList = async () => {
  try {
    const response = await api.get(`/approval/requestedapprovallist/${userNo.value}`, {
      params: {
        pageNumber: currentPage.value,
      },
    })

    params.value = response.data.data.content.map(item => {
      return {
        ...item,
        approvalTitle: APPROVAL_TITLE[item.approvalType] || APPROVAL_TITLE.DEFAULT,
        approvalSubmitDate: formatDate(item.리),
        approvalStatus: APPROVAL_STATUS[item.approvalStatus],
      }
    })
    totalPage.value = response.data.data.totalPages
    currentPage.value = response.data.data.pageable.pageNumber + 1
  } catch (error) {
    console.error(error)
  }
}

const onHandlePage = page => {
  currentPage.value = page

  fetchApprovalRequestList()
}

watch(
  userNo,
  async newUserNo => {
    if (newUserNo) {
      await fetchApprovalRequestList()
    }
  },
  { immediate: true },
)
</script>
<style scoped></style>
