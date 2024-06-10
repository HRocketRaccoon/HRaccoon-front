<template>
  <h1 class="mb-2">| 결재 신청</h1>
  <VCard>
    <VRow>
      <VCol cols="12" md="4">
        <VTextField v-model="params.userTeam" label="소속" readonly />
      </VCol>

      <!-- 사번 -->
      <VCol cols="12" md="4">
        <VTextField v-model="userId" label="사번" readonly />
      </VCol>

      <!-- 이름 -->
      <VCol cols="12" md="4">
        <VTextField v-model="params.userName" label="이름" readonly />
      </VCol>

      <!-- 유형 -->
      <VCol cols="12" md="3">
        <VSelect v-model="params.approvalStatus" :items="Object.keys(typeMapping)" label="유형" />
      </VCol>

      <!-- 기간 시작 -->
      <VCol cols="12" md="3">
        <VDateInput v-model="params.approvalDetailStartDate" label="기간 시작" />
      </VCol>

      <!-- 기간 끝 -->
      <VCol cols="12" md="3">
        <VDateInput v-model="params.approvalDetailEndDate" label="기간 끝" />
      </VCol>

      <!-- 결재자 -->
      <VCol cols="12" md="3">
        <VSelect v-model="params.approvalAuthority" :items="approvers" label="결재자" />
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
          rows="10"
        />
      </VCol>

      <VCol class="d-flex gap-4">
        <TwoButtonDialog
          :rightBtnAction="onHandleSubmit"
          buttonName="제출"
          buttonSize="large"
          content="결재를 신청하시겠습니까?"
          rightBtnName="확인"
          title="결재 신청"
        />
        <VBtn color="secondary" size="large" type="reset" variant="tonal" @click="resetParams">초기화</VBtn>
      </VCol>
    </VRow>
  </VCard>
</template>
<script setup>
import { ref, watch } from 'vue'
import { VDateInput } from 'vuetify/labs/components'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

// components
import TwoButtonDialog from '@/components/dialog/TwoButtonDialog.vue'

// api
import api from '@/api/axios.js'

// store
import { useAuthStore } from '@/stores/useAuthStore.js'

// util
import dayjs from 'dayjs'
import { formatLocalDateTime } from '@/util/util.js'

const toast = useToast()
const router = useRouter()
const typeMapping = {
  출장: 'BUSINESS_TRIP',
  휴가: 'VACATION',
  외근: 'OUT_ON_BUSINESS',
}
// TODO: 결재자 리스트 가져오는 함수 필요
const approvers = ['김철수', '이영희', '박민수']

const params = ref({
  userTeam: '',
  userName: '',
  approvalStatus: '',
  approvalDetailStartDate: null,
  approvalDetailEndDate: null,
  approvalAuthority: '',
  title: '',
  approvalSubmitDate: dayjs(new Date()).format('YYYY-MM-DD'),
  approvalDetailContent: '',
})
const userId = ref(useAuthStore().userId || '')
const userNo = ref(useAuthStore().userNo || '')

const fetchUserInfo = async () => {
  const response = await api.get(`/user/belong-info/${userId.value}`)
  console.log('[SUCCESS] fetchUserInfo response: ', response.data.data)

  params.value.userTeam = response.data.data.userTeam
  params.value.userName = response.data.data.userName
}

const fetchApprovalInfo = async () => {
  const approvalInfo = {
    userNo: userNo.value,
    approvalType: typeMapping[params.value.approvalStatus],
    approvalDetailStartDate: formatLocalDateTime(params.value.approvalDetailStartDate),
    approvalDetailEndDate: formatLocalDateTime(params.value.approvalDetailEndDate),
    selectedApprovalAuthority: params.value.approvalAuthority,
    approvalDetailContent: params.value.approvalDetailContent,
  }

  console.log(approvalInfo)

  try {
    const response = await api.post(`/approval/submit/${userNo.value}`, approvalInfo)
    console.log('[SUCCESS] fetchApprovalInfo response: ', response.data)
    toast.success('결재 신청이 완료되었습니다.')
  } catch (error) {
    console.error('[ERROR] fetchApprovalInfo error: ', error)
  }
}

const onHandleSubmit = async () => {
  const values = Object.values(params.value)
  const hasNull = values.some(value => value === null || value === '')

  if (hasNull) {
    toast.error('모든 항목을 입력해주세요.')
    return
  }

  await fetchApprovalInfo()
  await router.push('/approval/status/list')
}

const resetParams = () => {
  params.value.approvalStatus = ''
  params.value.approvalDetailStartDate = null
  params.value.approvalDetailEndDate = null
  params.value.approvalAuthority = ''
  params.value.title = ''
  params.value.approvalDetailContent = ''
}

watch(
  () => params.value.approvalStatus,
  newStatus => {
    switch (newStatus) {
      case '출장':
        params.value.title = '출장 신청'
        break
      case '휴가':
        params.value.title = '휴가 신청'
        break
      case '외근':
        params.value.title = '외근 신청'
        break
      default:
        params.value.title = '결재 신청'
    }
  },
)

watch(
  userId,
  async newUserId => {
    if (newUserId) {
      await fetchUserInfo()
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
