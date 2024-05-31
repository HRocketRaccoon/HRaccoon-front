<template>
  <h1 class="mb-2">결재 신청</h1>
  <VCard>
    <VForm @submit.prevent="() => {}">
      <VRow>
        <VCol cols="12" md="4">
          <VTextField v-model="params.department" label="소속" />
        </VCol>

        <!-- 사번 -->
        <VCol cols="12" md="4">
          <VTextField v-model="params.employeeId" label="사번" />
        </VCol>

        <!-- 이름 -->
        <VCol cols="12" md="4">
          <VTextField v-model="params.name" label="이름" />
        </VCol>

        <!-- 유형 -->
        <VCol cols="12" md="3">
          <VSelect v-model="params.type" :items="types" label="유형" />
        </VCol>

        <!-- 기간 시작 -->
        <VCol cols="12" md="3">
          <VDateInput v-model="params.startDate" label="기간 시작"></VDateInput>
        </VCol>

        <!-- 기간 끝 -->
        <VCol cols="12" md="3">
          <VDateInput v-model="params.endDate" label="기간 끝"></VDateInput>
        </VCol>

        <!-- 결재자 -->
        <VCol cols="12" md="3">
          <VSelect v-model="params.approver" :items="approvers" label="결재자" />
        </VCol>

        <!-- 제목 -->
        <VCol cols="12" md="6">
          <VTextField v-model="params.title" label="제목" />
        </VCol>

        <!-- 등록일자 -->
        <VCol cols="12" md="6">
          <VTextField v-model="params.registrationDate" label="등록일자" />
        </VCol>

        <!-- 내용 -->
        <VCol cols="12">
          <VTextarea v-model="params.content" auto-grow label="내용" min-h-full="true" multi-line rows="10" />
        </VCol>

        <VCol class="d-flex gap-4">
          <VBtn type="submit"> 제출</VBtn>
          <VBtn color="secondary" type="reset" variant="tonal" @click="resetParams">초기화</VBtn>
        </VCol>
      </VRow>
    </VForm>
  </VCard>
</template>
<script setup>
import { ref } from 'vue'
import { VDateInput } from 'vuetify/labs/components'

const params = ref({
  department: '',
  employeeId: '',
  name: '',
  type: '',
  startDate: null,
  endDate: null,
  approver: '',
  title: '',
  registrationDate: '',
  content: '',
})

const resetParams = () => {
  params.value = {
    department: '',
    employeeId: '',
    name: '',
    type: '',
    startDate: null,
    endDate: null,
    approver: '',
    title: '',
    registrationDate: '',
    content: '',
  }
}

const types = ['출장', '휴가', '기타']
const approvers = ['김철수', '이영희', '박민수']
</script>
<style scoped>
.v-card {
  padding: 1rem;
}
</style>
