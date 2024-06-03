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
            #{{ getCodeName(ab.abilityName) }}
          </div>
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
<script setup>
const props = defineProps({
  data: {
    type: Array,
  },
})

const codeToNameMap = {
  ABP001: 'Python',
  ABP002: 'Java',
  ABP003: 'C',
  ABP004: 'C++',
  ABP005: 'C#',
  ABP006: 'JavaScript',
  ABP007: 'TypeScript',
  ABP008: 'Ruby',
  ABP009: 'PHP',
  ABP010: 'Swift',
  ABP011: 'Kotlin',
  ABP012: 'R',
  ABP013: 'Go',
  ABP014: 'Rust',
  ABP015: 'Scala',
  ABP016: 'Perl',
  ABP017: 'Haskell',
  ABP018: 'Objective-C',
  ABP019: 'MATLAB',
  ABP020: 'SQL',
}

const getCodeName = code => {
  return codeToNameMap[code] || 'Unknown Code'
}
</script>
