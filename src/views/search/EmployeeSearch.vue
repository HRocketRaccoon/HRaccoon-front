<template>
  <div>
    <h1 class="mb-2">| 직원 정보 조회</h1>
    <VCard class="mb-4">
      <VCardText class="pa-10">
        <VRow>
          <VCol cols="12" md="4">
            <VCombobox
              v-model="selectedDepartment"
              :items="departmentList"
              label="소속 부서"
              variant="outlined"
              @keydown.enter="onSubmit"
            ></VCombobox>
          </VCol>
          <VCol cols="12" md="4">
            <VCombobox
              v-model="selectedAbility"
              :items="abilityList"
              label="역량"
              variant="outlined"
              @keydown.enter="onSubmit"
            ></VCombobox>
          </VCol>
          <VCol>
            <VTextField
              v-model="searchQuery"
              :loading="loading"
              density="compact"
              hide-details
              label="조회할 직원의 이름, 사번을 입력하세요."
              single-line
              style="height: 66px"
              variant="solo"
              @keydown.enter="onSubmit"
            ></VTextField>
          </VCol>
        </VRow>
        <VRow>
          <VBtn :style="linkStyle" class="ml-auto" size="large" variant="tonal" @click="onReset">초기화</VBtn>
          <VBtn class="ml-3" size="large" @click="onSubmit">검색</VBtn>
        </VRow>
      </VCardText>
    </VCard>
    <VCard>
      <div v-if="params.length > 0">
        <EmployeeTable :data="params" />
        <VPagination
          v-model="currentPage"
          :length="totalPage"
          total-visible="7"
          @update:modelValue="goToPage"
        ></VPagination>
      </div>
      <div v-else class="text-center pb-10">no result</div>
    </VCard>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from '@/api/axios'
import EmployeeTable from '@/components/search/EmployeeTable.vue'
import { useCodeStore } from '@/stores/useCodeStore'
import { VRow, VTextField } from 'vuetify/lib/components/index.mjs'
import { useTheme } from 'vuetify/lib/framework.mjs'

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

const searchQuery = ref('')
const selectedAbility = ref('')
const selectedDepartment = ref('')

const store = useCodeStore()
const vuetifyTheme = useTheme()
const linkStyle = computed(() => ({
  color: vuetifyTheme.current.value.colors.primary,
  textDecoration: 'underline',
  cursor: 'pointer',
}))

const params = ref([])
const totalPage = ref(1)
const currentPage = ref(1)

const goToPage = newPage => {
  currentPage.value = newPage

  getEmployee()
}

const getEmployee = async () => {
  try {
    const response = await axios.get(`/user/search`, {
      params: {
        keyword: searchQuery.value,
        ability: selectedAbility.value,
        department: selectedDepartment.value,
        pageNumber: currentPage.value,
      },
    })

    params.value = response.data.data.content
    totalPage.value = response.data.data.totalPages
    currentPage.value = response.data.data.pageable.pageNumber + 1

    await setEmployeeAbility(params.value)
  } catch (error) {
    console.log('Error get Employee:', error)
  }
}

const getEmployeeAbility = async (userId, index) => {
  try {
    const response = await axios.get(`/user/ability/${userId}`)

    params.value[index].ability = response.data.data
  } catch (error) {
    console.error('Error get Ability:', error)
  }
}

onMounted(() => {
  getEmployee()
})

const setEmployeeAbility = async employees => {
  try {
    const promises = employees.map(async (employee, index) => {
      const ability = await getEmployeeAbility(employee.userId, index)
    })
    await Promise.all(promises)
  } catch (error) {
    console.error('Error set Ability:', error)
  }
}

const onSubmit = () => {
  loading.value = true
  currentPage.value = 1

  getEmployee()

  setTimeout(() => {
    loading.value = false
    loaded.value = true
  }, 2000)
}

const onReset = () => {
  selectedAbility.value = ''
  selectedDepartment.value = ''
  searchQuery.value = ''
}
</script>
<style scoped></style>
