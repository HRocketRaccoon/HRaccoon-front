<template>
  <VueDatePicker
    class="mt-3 mb-10"
    v-model="selectDate"
    inline
    auto-apply
    :markers="markers"
    locale="ko"
    :enable-time-picker="false"
  >
  </VueDatePicker>
</template>

<script setup>
import { ref, watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  markers: {
    type: Array,
    required: true,
  },
})

const selectDate = ref(new Date())

const emit = defineEmits(['handleSelectCurrentDate'])

const handleSelectCurrentDate = () => {
  emit('handleSelectCurrentDate', selectDate.value)
}

watch(selectDate, handleSelectCurrentDate)
</script>

<style lang="scss">
.dp__theme_light {
  --dp-primary-color: gray;
  --dp-primary-disabled-color: #6bacea;
  --dp-menu-border-color: none;
  --dp-arrow-left: 50%;
}
.dp__flex_display {
  display: flex;
  justify-content: center;
}

:root {
  --dp-menu-min-width: 350px;
}
</style>
