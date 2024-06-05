<template>
  <h1 class="mb-2">| 결재 요청 확인</h1>
  <VCard>
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
        <VTextField v-model="params.type" label="유형" />
      </VCol>

      <!-- 기간 시작 -->
      <VCol cols="12" md="3">
        <VTextField v-model="params.startDate" label="기간 시작" />
      </VCol>

      <!-- 기간 끝 -->
      <VCol cols="12" md="3">
        <VTextField v-model="params.endDate" label="기간 끝" />
      </VCol>

      <!-- 결재자 -->
      <VCol cols="12" md="3">
        <VTextField v-model="params.approver" label="결재자" />
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
        <VBtn size="large" type="submit">승인</VBtn>
        <VBtn color="secondary" size="large" type="reset" variant="tonal">반려</VBtn>
      </VCol>
    </VRow>
  </VCard>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
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
</script>
<style scoped>
.v-card {
  padding: 1rem;
}
</style>
