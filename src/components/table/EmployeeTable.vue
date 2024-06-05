<template>
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
      <tr v-for="(item, index) in data" :key="item.approvalNo">
        <td>
          {{ index + 1 }}
        </td>
        <td class="text-center">
          {{ item.userDepartment }}
        </td>
        <td class="text-center">
          {{ item.userId }}
        </td>
        <td class="text-center">
          {{ item.userName }}
        </td>
        <td class="text-center">
          <div v-for="ab in (item.ability || []).slice(0, 3)" :key="ab.abilityNo">
            #{{ store.getCodeName(ab.abilityName) }}
          </div>
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
<script setup>
import { useCodeStore } from '@/stores/useCodeStore'
const props = defineProps({
  data: {
    type: Array,
  },
})

const store = useCodeStore()
</script>
