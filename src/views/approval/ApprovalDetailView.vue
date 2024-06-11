<template>
  <h1 class="mb-2">| {{ headerTitle }}</h1>
  <VCard>
    <VRow>
      <VCol cols="12" md="4">
        <VTextField v-model="params.userTeam" label="소속" readonly />
      </VCol>

      <!-- 사번 -->
      <VCol cols="12" md="4">
        <VTextField v-model="params.userId" label="사번" readonly />
      </VCol>

      <!-- 결재자 -->
      <VCol cols="12" md="3">
        <VTextField v-model="params.approvalAuthority" :label="approvalPerson" readonly />
      </VCol>

      <!-- 유형 -->
      <VCol cols="12" md="3">
        <VTextField v-model="params.approvalType" label="유형" readonly />
      </VCol>

      <!-- 기간 시작 -->
      <VCol cols="12" md="3">
        <VTextField v-model="params.approvalDetailStartDate" label="기간 시작" readonly />
      </VCol>

      <!-- 기간 끝 -->
      <VCol cols="12" md="3">
        <VTextField v-model="params.approvalDetailEndDate" label="기간 끝" readonly />
      </VCol>

      <!-- 결재 상태 -->
      <VCol cols="12" md="3">
        <VTextField v-model="params.approvalStatus" label="결재 상태" readonly />
      </VCol>

      <!-- 제목 -->
      <VCol cols="12" md="6">
        <VTextField v-model="params.title" label="제목" readonly />
      </VCol>

      <!-- 등록일자 -->
      <VCol cols="12" md="6">
        <VTextField v-model="params.approvalSubmitDate" label="등록일자" readonly />
      </VCol>

      <!-- 내용 -->
      <VCol cols="12">
        <VTextarea
          v-model="params.approvalDetailContent"
          auto-grow
          label="내용"
          min-h-full="true"
          multi-line
          readonly
          rows="10"
        />
      </VCol>

      <VCol v-if="params.approvalStatus === 'REJECTED'">
        <VTextarea v-model="params.approvalStatus" auto-grow label="반려 사유" readonly />
      </VCol>

      <VCol v-if="props.type === 'request'" class="d-flex gap-4">
        <TwoButtonDialog
          button-size="large"
          buttonName="승인"
          content="결재를 승인하시겠습니까?"
          rightBtnName="승인"
          title="결재 승인"
        />
        <InputDialog
          :rightBtnAction="fetchApprovalReject"
          button-name="반려"
          content="결재를 반려하시겠습니까?"
          right-btn-name="반려"
          title="결재 반려"
        />
      </VCol>

      <VCol v-if="props.type === 'status' && params.approvalStatus === 'PENDING'" class="d-flex gap-4">
        <VBtn size="large" type="submit">요청 닫기</VBtn>
        <VBtn color="secondary" size="large" type="reset" variant="tonal">뒤로 가기</VBtn>
      </VCol>
    </VRow>
  </VCard>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import TwoButtonDialog from '@/components/dialog/TwoButtonDialog.vue'
import { useAuthStore } from '@/stores/useAuthStore.js'
import api from '@/api/axios.js'
import { formatDate } from '@/util/util.js'
import InputDialog from '@/components/dialog/InputDialog.vue'

const props = defineProps({
  approvalNo: String,
  type: String,
})

const route = useRoute()

const params = ref({
  userTeam: '',
  userId: '',
  userName: '',
  approvalType: '',
  approvalDetailStartDate: null,
  approvalDetailEndDate: null,
  approvalAuthority: '',
  approvalSubmitDate: '',
  approvalDetailContent: '',
  approvalStatus: '',
  approvalDetailResponseContent: '',
})
const userNo = ref(useAuthStore().userNo || '')

// TODO: 결재 반려 사유 적용
const fetchApprovalReject = async () => {
  try {
    const response = await api.post(`approval/requestedapprovallist/${userNo.value}/${props.approvalNo}/cancel`)
    console.log('[SUCCESS] fetchApprovalReject response:', response)
  } catch (error) {
    console.error('[ERROR] fetchApprovalReject error:', error)
  }
}

const fetchApprovalRequestDetail = async () => {
  try {
    const response = await api.get(`approval/submittedapprovallist/${userNo.value}/${props.approvalNo}`)
    console.log('[SUCCESS] fetchApprovalRequestDetail response:', response)

    params.value = {
      userTeam: response.data.data.userTeam,
      userId: response.data.data.userId,
      userName: response.data.data.userName,
      approvalType: response.data.data.approvalType,
      approvalDetailStartDate: formatDate(response.data.data.approvalDetailStartDate),
      approvalDetailEndDate: formatDate(response.data.data.approvalDetailEndDate),
      approvalAuthority: response.data.data.approvalAuthority,
      approvalSubmitDate: response.data.data.approvalSubmitDate,
      approvalDetailContent: response.data.data.approvalDetailContent,
      approvalStatus: response.data.data.approvalStatus,
      approvalDetailResponseContent: response.data.data.approvalDetailResponseContent,
    }
  } catch (error) {
    console.error('[ERROR] fetchApprovalRequestDetail error:', error)
  }
}

const fetchApprovalStatusDetail = async () => {
  try {
    const response = await api.get(`approval/requestedapprovallist/${userNo.value}/${props.approvalNo}`)
    console.log('[SUCCESS] fetchApprovalStatusDetail response:', response)

    params.value = {
      userTeam: response.data.data.userTeam,
      userId: response.data.data.userId,
      userName: response.data.data.userName,
      approvalType: response.data.data.approvalType,
      approvalDetailStartDate: formatDate(response.data.data.approvalDetailStartDate),
      approvalDetailEndDate: formatDate(response.data.data.approvalDetailEndDate),
      approvalAuthority: response.data.data.approvalAuthority,
      approvalSubmitDate: response.data.data.approvalSubmitDate,
      approvalDetailContent: response.data.data.approvalDetailContent,
      approvalStatus: response.data.data.approvalStatus,
      approvalDetailResponseContent: response.data.data.approvalDetailResponseContent,
    }
  } catch (error) {
    console.error('[ERROR] fetchApprovalStatusDetail error:', error)
  }
}

const headerTitle = computed(() => {
  return props.type === 'request' ? '결재 요청 확인' : '결재 현황 확인'
})

const approvalPerson = computed(() => {
  return props.type === 'request' ? '상신자' : '결재자'
})

watch(
  userNo,
  async newUserNo => {
    if (newUserNo) {
      console.log(newUserNo)

      if (props.type === 'request') {
        await fetchApprovalRequestDetail()
      } else {
        await fetchApprovalStatusDetail()
      }
    }
  },
  { immediate: true },
)
</script>
<style scoped>
.v-card {
  padding: 1rem;
}
</style>
