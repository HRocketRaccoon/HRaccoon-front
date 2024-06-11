<template>
  <div>
    <h1 class="mb-2">| 직원 정보 조회</h1>
    <VCard>
      <VCardText class="pa-10">
        <VRow>
          <VCol cols="12" md="6">
            <VRow>
              <VCol>
                <VCombobox
                  label="소속 부서"
                  :items="departmentList"
                  variant="outlined"
                  v-model="selectedDepartment"
                ></VCombobox>
              </VCol>
              <VCol>
                <VCombobox label="역량" :items="abilityList" variant="outlined" v-model="selectedAbility"></VCombobox>
              </VCol>
            </VRow>
          </VCol>

          <VCol cols="12" md="6">
            <v-text-field
              :loading="loading"
              append-inner-icon="mdi-magnify"
              density="compact"
              label="조회할 직원의 이름, 사번을 입력하세요."
              variant="solo"
              hide-details
              single-line
              @click:append-inner="onSubmit"
              v-model="searchQuery"
              style="height: 66px"
            ></v-text-field>
          </VCol>
        </VRow>
      </VCardText>
      <router-view></router-view>
    </VCard>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import axios from '@/api/axios'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const selectedAbility = ref('')
const selectedDepartment = ref('')

const departmentList = ['IT 사업부', 'IOT사업부', '경영기획부', '인사총무지원부']
const abilityList = [
  'Python',
  'Java',
  'C',
  'C++',
  'C#',
  'JavaScript',
  'TypeScript',
  'Ruby',
  'PHP',
  'Swift',
  'Kotlin',
  'R',
  'Go',
  'Rust',
  'Scala',
  'Perl',
  'Haskell',
  'Objective-C',
  'MATLAB',
  'SQL',
]

const loaded = ref(false)
const loading = ref(false)

const currentPage = ref(1)

const router = useRouter()

const onSubmit = () => {
  loading.value = true

  router.push({
    path: '/search',
    query: {
      searchQuery: searchQuery.value,
      selectedAbility: selectedAbility.value,
      selectedDepartment: selectedDepartment.value,
      currentPage: currentPage.value,
    },
  })

  setTimeout(() => {
    loading.value = false
    loaded.value = true
  }, 2000)
}
</script>
<style scoped></style>
