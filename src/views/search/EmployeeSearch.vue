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
                  v-model="selectedDepartment"
                  :items="departmentList"
                  label="소속 부서"
                  variant="outlined"
                ></VCombobox>
              </VCol>
              <VCol>
                <VCombobox v-model="selectedAbility" :items="abilityList" label="역량" variant="outlined"></VCombobox>
              </VCol>
            </VRow>
          </VCol>

          <VCol cols="12" md="6">
            <v-text-field
              v-model="searchQuery"
              :loading="loading"
              append-inner-icon="mdi-magnify"
              density="compact"
              hide-details
              label="조회할 직원의 이름, 사번을 입력하세요."
              single-line
              style="height: 66px"
              variant="solo"
              @click:append-inner="onSubmit"
            ></v-text-field>
          </VCol>
        </VRow>
      </VCardText>
      <div v-if="params.length > 0">
        <EmployeeTable :data="params" :page="currentPage" />
        <VPagination
          v-model="currentPage"
          :length="totalPage"
          :total-visible="5"
          @update:modelValue="goToPage"
        ></VPagination>
      </div>
      <div v-else class="text-center pb-10">no result</div>
    </VCard>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import EmployeeTable from '@/components/table/EmployeeTable.vue'
import axios from '@/api/axios'

const searchQuery = ref('')
const selectedAbility = ref('')
const selectedDepartment = ref('')

const params = ref([])
const currentPage = ref(1)
const totalPage = ref(1)

const loaded = ref(false)
const loading = ref(false)

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
        pageNumber: currentPage.value.toString(),
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
    console.error('역량 설정 에러:', error)
  }
}

const onSubmit = () => {
  loading.value = true
  currentPage.value = 1 // 검색할 때 페이지를 1로 리셋
  getEmployee()

  setTimeout(() => {
    loading.value = false
    loaded.value = true
  }, 2000)
}
</script>
<style scoped></style>
