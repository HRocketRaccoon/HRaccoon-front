<script setup>
import ThemeSwitcher from '@/@core/components/ThemeSwitcher.vue'

const themes = [
  {
    name: 'light',
    icon: 'bx-sun',
  },
  {
    name: 'dark',
    icon: 'bx-moon',
  },
]
</script>

<template>
  <ThemeSwitcher :themes="themes" />
</template>
