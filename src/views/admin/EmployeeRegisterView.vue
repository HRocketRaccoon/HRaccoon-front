<template>
  <h1>| 직원 등록</h1>
  <VCard class="mb-4 h-100">
    <VCardText>
      <VRow>
        <VCol cols="12" md="4"></VCol>
        <VCol cols="12" md="8">
          <VRow>
            <VCol cols="12" md="6">
              <VTextField v-model="params.userId" label="아이디(사번)" outlined readonly />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="params.userName" label="이름" outlined />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="6">
              <VTextField v-model="params.userMobile" label="전화번호" outlined />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="params.userEmail" label="이메일" outlined />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="6">
              <VTextField v-model="params.userGender" label="성별" outlined />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="params.userBirth" label="생년월일" outlined />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="6">
              <VTextField v-model="params.userDepartment" label="부서" outlined />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="params.userPosition" label="직급" outlined />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VTextField v-model="params.userTeam" label="팀" outlined />
            </VCol>
          </VRow>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VTextField v-model="params.userAddress" label="주소" outlined />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="8" />
        <VCol cols="12" md="4">
          <VRow>
            <VSpacer />
            <VBtn color="secondary" size="large">초기화</VBtn>
            <TwoButtonDialog
              button-name="등록하기"
              button-size="large"
              class="ml-4"
              content="정말로 직원 등록을 진행하시겠습니까?"
              icon="mdi-user-register"
              right-btn-name="등록"
              title="직원 등록 확인"
            />
          </VRow>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
<script setup>
import { ref } from 'vue'
import TwoButtonDialog from '@/components/dialog/TwoButtonDialog.vue'

const params = ref({
  userId: '',
  userPassword: '',
  userName: '',
  userMobile: '',
  userAddress: '',
  userBirth: '',
  userGender: '',
  userEmail: '',
  userDepartment: '',
  userPosition: '',
  userTeam: '',
  userRank: '',
  userRole: '',
  userJoinDate: '',
})
// {
//   "userId": "00914125",
//   "userPassword": "ehfkdlgi981",
//   "userName": "test",
//   "userMobile": "01012344562",
//   "userAddress": "서울특별시 광진구 뚝섬로 123 101-1232",
//   "userBirth": "981031",
//   "userGender": "MALE",
//   "userEmail": "asdfasdf@gmail.com",
//   "userDepartment": "DP001",
//   "userPosition": "PS000",
//   "userTeam": "TM001",
//   "userRank": "RK001",
//   "userRole": "USER",
//   "userJoinDate": "2024-05-28T14:30:00"
// }
</script>
