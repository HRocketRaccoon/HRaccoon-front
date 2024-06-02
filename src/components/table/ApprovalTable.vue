<template>
  <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">번호</th>
        <th>제목</th>
        <th>{{ type === 'request' ? '상신자' : '결재' }}</th>
        <th>등록 일자</th>
        <th>결재 상태</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="item.approvalNo">
        <td>
          {{ index + 1 }}
        </td>
        <td class="text-center">
          {{ item.approvalTitle }}
        </td>
        <td class="text-center">
          {{ type === 'request' ? item.userName : item.approvalAuthority }}
        </td>
        <td class="text-center">
          {{ item.approvalSubmitDate }}
        </td>
        <td class="text-center">
          {{ item.approvalStatus }}
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
<script setup>
const props = defineProps({
  data: Array,
  type: String,
})
</script>
