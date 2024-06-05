<template>
  <div class="about">
    <h1>This is an Test page</h1>
    <h2>모달, 토스트</h2>
    <VRow>
      <VCol>
        <VBtn @click="toastError"> Show Toast</VBtn>
      </VCol>
      <VCol>
        <OneButtonDialog button-name="Open Dialog" content="테스트" icon="mdi-update" title="모달 제목" />
      </VCol>
      <VCol>
        <TwoButtonDialog
          button-name="Open Two Button Dialog"
          content="테스트"
          title="모달 제목"
          @right-btn-action="onHandleDialog"
        />
      </VCol>
    </VRow>
  </div>
</template>
<script setup>
import { useToast } from 'vue-toastification'
import OneButtonDialog from '@/components/dialog/OneButtonDialog.vue'
import TwoButtonDialog from '@/components/dialog/TwoButtonDialog.vue'

const toast = useToast()

const toastError = () => {
  toast.error('My toast content', {
    timeout: 2000,
  })
}

const onHandleDialog = () => {
  console.log('두번째 모달 버튼 클릭')
}
</script>
