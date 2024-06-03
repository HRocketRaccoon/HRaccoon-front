<template>
  <h1 class="mb-2">| 근태 관리</h1>
  <VCard class="card-container">
    <h2 class="mb-2">근무 시간</h2>
    <VCardText>
      <VCol v-for="day in workHours" :key="day.name" class="d-flex flex-col justify-space-between col-class">
        <span>{{ day.name }}</span>
        <span>{{ day.hours }}</span>
      </VCol>
    </VCardText>
  </VCard>
</template>
<script setup>
import { ref } from 'vue'

const workHours = ref([
  { name: '월', hours: '8시간' },
  { name: '화', hours: '8시간' },
  { name: '수', hours: '8시간' },
  { name: '목', hours: '8시간' },
  { name: '금', hours: '8시간' },
])
</script>
<style lang="scss" scoped>
.card-container {
  padding: 20px;
}

.col-class {
  font-size: large;
  background-color: var(--v-theme-background);
  color: var(--v-theme-on-background);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  span:first-child {
    font-weight: bold;
  }

  span:last-child {
    color: #6c757d;
  }
}

.v-theme--light .col-class {
  background-color: var(--v-theme-background);
  color: var(--v-theme-on-background);

  span:last-child {
    color: var(--v-theme-secondary);
  }
}

.v-theme--dark .col-class {
  background-color: var(--v-theme-background);
  color: var(--v-theme-on-background);

  span:last-child {
    color: var(--v-theme-secondary);
  }
}

.col-class span:first-child {
  font-weight: bold;
}
</style>
