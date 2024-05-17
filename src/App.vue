<template>
  <component :is="$route.meta.layout || 'div'">
    <RouterView />
  </component>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped></style>
