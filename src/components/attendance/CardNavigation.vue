<template>
  <VCol cols="12" md="6">
    <VCard>
      <VTabs v-model="navigationTab" align-tabs="center">
        <VTab v-for="item in tabItems" :key="item" :value="item">
          {{ item }}
        </VTab>
      </VTabs>
      <VDivider />
      <VWindow v-model="navigationTab">
        <VWindowItem v-for="item in tabItems" :key="item" :value="item" class="text-center">
          <VCardItem>
            <VCardTitle>{{ insertDate }}</VCardTitle>
          </VCardItem>
          <VCardText>{{ getTabContent(item) }}</VCardText>
        </VWindowItem>
      </VWindow>
    </VCard>
  </VCol>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  insertDate: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
})

const navigationTab = ref('나의 출근시간')
const tabItems = ['나의 출근시간', '나의 퇴근시간']
const tabContent = computed(() => ({
  '나의 출근시간': '나의 출근시간은 ' + props.arrivalTime + ' 입니다.',
  '나의 퇴근시간': '나의 퇴근시간은 ' + props.departureTime + ' 입니다.',
}))

const getTabContent = tab => {
  return tabContent.value[tab] || '내용이 없습니다.'
}
</script>
