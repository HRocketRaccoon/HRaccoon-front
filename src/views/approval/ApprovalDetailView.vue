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

      <!-- 이름 -->
      <VCol cols="12" md="4">
        <VTextField v-model="params.userName" label="이름" readonly />
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

      <!-- 결재자 -->
      <VCol cols="12" md="3">
        <VTextField v-model="params.approvalAuthority" label="결재자" readonly />
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

      <VCol v-if="props.type === 'approval'" class="d-flex gap-4">
        <VBtn size="large" type="submit">승인</VBtn>
        <VBtn color="secondary" size="large" type="reset" variant="tonal">반려</VBtn>
      </VCol>

      <VCol v-if="props.type === 'request' && params.approvalStatus === 'PENDING'" class="d-flex gap-4">
        <VBtn size="large" type="submit">요청 닫기</VBtn>
        <VBtn color="secondary" size="large" type="reset" variant="tonal">뒤로 가기</VBtn>
      </VCol>

      <!--      TODO: 반려 사유 보여주는 항목 추가-->
      <!--      <VCol>-->
      <!--        <VTextarea v-model="params.approvalStatus" auto-grow label="반려 사유" readonly />-->
      <!--      </VCol>-->
    </VRow>
  </VCard>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  approvalNo: String,
  type: String,
})
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
})
const route = useRoute()

const headerTitle = computed(() => {
  return props.type === 'request' ? '결재 요청 확인' : '결재 현황 확인'
})
</script>
<style scoped>
.v-card {
  padding: 1rem;
}
</style>
