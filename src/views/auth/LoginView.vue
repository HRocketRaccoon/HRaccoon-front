<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4 h-screen">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <!-- TODO: logo 삽입 -->
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
        <VForm @submit.prevent="onHandleSubmit">
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
import { useRouter } from 'vue-router'

// store
import { useAuthStore } from '@/stores/useAuthStore.js'

// components
import { useToast } from 'vue-toastification'

// constants
import { loginConstant } from '@/util/constants/loginConstant.js'

// service

const { fetchSignIn, fetchUserName } = useAuthStore()
const router = useRouter()
const toast = useToast()

const isPasswordVisible = ref(false)
const form = ref({
  userId: '',
  userPassword: '',
})

const { AUTH_SUCCESS, AUTH_ID_REGEX, AUTH_PASSWORD_REGEX, AUTH_NOT_MATCH } = loginConstant

const onHandleSubmit = async () => {
  const validationError = validateForm()
  if (validationError) {
    toast.error(validationError)
    return
  }
  try {
    await fetchSignIn(form.value)

    toast.success(AUTH_SUCCESS)
    await fetchUserName()
    await router.push('/home')
  } catch (error) {
    console.log(error)
    toast.error(AUTH_NOT_MATCH)
  }
}

const validateForm = () => {
  const idError = validationId(form.value.userId)
  const passwordError = validatePassword(form.value.userPassword)
  if (idError) {
    return idError
  }
  if (passwordError) {
    return passwordError
  }
  return null
}

const validationId = password => {
  const regex = /^A\d{6}$/
  if (!regex.test(password)) {
    return AUTH_ID_REGEX
  }
  return null
}

const validatePassword = password => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{8,16}$/
  if (!passwordPattern.test(password)) {
    return AUTH_PASSWORD_REGEX
  }
  return null
}
</script>
<style lang="scss">
@use '@core/scss/template/pages/page-auth.scss';
</style>
