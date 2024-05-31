<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4 h-screen">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <!-- logo -->
            <!--           <div class="d-flex text-primary" v-html="logo" />-->
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold">HRaccoon</VCardTitle>
      </VCardItem>

      <VCardText class="pt-2 d-flex flex-column align-center justify-center">
        <h5 class="text-h5 mb-1">Welcome to HRaccoon! 👋🏻</h5>
        <p class="mb-0">로그인을 진행해주세요</p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="$router.push('/')">
          <VRow>
            <!-- id -->
            <VCol cols="12">
              <VTextField v-model="form.id" autofocus label="사번" placeholder="사번을 입력하세요." type="id" />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                :type="isPasswordVisible ? 'text' : 'password'"
                label="비밀번호"
                placeholder="············"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-4 mb-4">
                <RouterLink class="text-primary ms-2 mb-1" to="javascript:void(0)"> Forgot Password?</RouterLink>
              </div>

              <!-- login button -->
              <VBtn block type="submit"> Login</VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const form = ref({
  id: '',
  password: '',
})

const isPasswordVisible = ref(false)
</script>
<style lang="scss">
@use '@core/scss/template/pages/page-auth.scss';
</style>
