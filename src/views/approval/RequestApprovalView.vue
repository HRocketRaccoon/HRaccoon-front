<template>
  <h1 class="mb-2">| 결재 신청</h1>
  <VCard>
    <VForm @submit.prevent="() => {}">
      <VRow>
        <VCol cols="12" md="4">
          <VTextField v-model="params.userTeam" label="소속" readonly />
        </VCol>

        <!-- 사번 -->
        <VCol cols="12" md="4">
          <VTextField v-model="params.userId" label="사번" readonly />
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
          <VBtn size="large" type="submit"> 제출</VBtn>
          <VBtn color="secondary" size="large" type="reset" variant="tonal" @click="resetParams">초기화</VBtn>
        </VCol>
      </VRow>
    </VForm>
  </VCard>
</template>
<script setup>
import { ref, watch } from 'vue'
import { VDateInput } from 'vuetify/labs/components'
import dayjs from 'dayjs'

const typeMapping = {
  출장: 'BUSINESS_TRIP',
  휴가: 'VACATION',
  외근: 'OUT_ON_BUSINESS',
}

const approvers = ['김철수', '이영희', '박민수']

const params = ref({
  userTeam: '',
  userId: '',
  userName: '',
  approvalStatus: '',
  approvalDetailStartDate: null,
  approvalDetailEndDate: null,
  approvalAuthority: '',
  title: '',
  approvalSubmitDate: dayjs(new Date()).format('YYYY-MM-DD'),
  approvalDetailContent: '',
})

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
</script>
<style scoped>
.v-card {
  padding: 1rem;
}
</style>
