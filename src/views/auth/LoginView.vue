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
        <p class="mb-0">안녕하세요 HRaccoon입니다. 로그인을 진행해주세요</p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="$router.push('/')">
          <VRow>
            <!-- userId -->
            <VCol cols="12">
              <VTextField v-model="form.userId" autofocus label="사번" placeholder="사번을 입력하세요." type="userId" />
            </VCol>

            <!-- userPassword -->
            <VCol cols="12">
              <VTextField
                v-model="form.userPassword"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                :type="isPasswordVisible ? 'text' : 'password'"
                label="비밀번호"
                placeholder="············"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <div class="d-flex align-center justify-space-between flex-wrap mt-4 mb-4">
                <RouterLink class="text-primary mb-1 ml-auto" to="javascript:void(0)"> Forgot Password?</RouterLink>
              </div>

              <!-- login button -->
              <VBtn block type="submit">Login</VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore.js'

const { signIn } = useAuthStore()
const { router } = useRoute()

const isPasswordVisible = ref(false)
const form = ref({
  userId: '',
  userPassword: '',
})

const onHandleSubmit = async () => {
  const validationError = validateForm()
  if (validationError) {
    alert(validationError)
    return
  }
  try {
    await signIn(form.value).then(() => {
      router.push('/')
    })
  } catch (error) {
    alert('Login failed. Please check your credentials and try again.')
  }
}

const validateForm = () => {
  if (!form.value.userId) {
    return '사번을 입력해주세요.'
  }
  const passwordError = validatePassword(form.value.userPassword)
  if (passwordError) {
    return passwordError
  }
  return null
}

const validatePassword = password => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{8,16}$/
  if (!passwordPattern.test(password)) {
    return '비밀번호는 8자 이상 16자 이하이며, 영문자 대문자 및 소문자, 숫자, 특수문자를 포함해야 합니다.'
  }
  return null
}
</script>
<style lang="scss">
@use '@core/scss/template/pages/page-auth.scss';
</style>
