<template>
  <div>
    <div v-if="params.length > 0">
      <VTable>
        <thead>
          <tr>
            <th class="text-uppercase">번호</th>
            <th>소속</th>
            <th>사번</th>
            <th>성명</th>
            <th>역량</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in params"
            :key="user.approvalNo"
            @click="navigateToUser(user.userId)"
            style="cursor: pointer"
          >
            <td>
              {{ index + 1 }}
            </td>
            <td class="text-center">
              {{ user.userDepartment }}
            </td>
            <td class="text-center">
              {{ user.userId }}
            </td>
            <td class="text-center">
              {{ user.userName }}
            </td>
            <td class="text-center">
              <div v-for="ab in (user.ability || []).slice(0, 3)" :key="ab.abilityNo">
                #{{ store.getCodeName(ab.abilityName) }}
              </div>
            </td>
          </tr>
        </tbody>
      </VTable>
      <VPagination
        v-model="currentPage"
        :length="totalPage"
        :total-visible="5"
        @update:modelValue="goToPage"
      ></VPagination>
    </div>
    <div v-else class="text-center pb-10">no result</div>
  </div>
</template>
<script setup>
import { useCodeStore } from '@/stores/useCodeStore'
import axios from '@/api/axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
  selectedAbility: {
    type: String,
    required: true,
  },
  selectedDepartment: {
    type: String,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
})
const params = ref([])
const totalPage = ref(1)
const currentPage = ref(props.currentPage)

const searchQuery = ref(props.searchQuery)
const selectedAbility = ref(props.selectedAbility)
const selectedDepartment = ref(props.selectedDepartment)

const store = useCodeStore()
const route = useRoute()
const router = useRouter()

const goToPage = newPage => {
  currentPage.value = newPage

  getEmployee()
}

const getEmployee = async () => {
  try {
    console.log('===============', selectedDepartment.value)
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
    console.error('역량 설정 에러:', error)
  }
}

const navigateToUser = userId => {
  router.push(`/search/${userId}`)
}
</script>
