<template>
  <div>
    <v-container>
      <v-row justify="space-around">
        <v-date-picker
          v-model="selectDate"
          color="green lighten-1"
          :events="getEvents"
          event-color="green lighten-1"
        ></v-date-picker>
      </v-row>
    </v-container>
    <p>{{ selectDate }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectDate = ref(new Date())
const getEvents = date => {
  const day = new Date(date).getDate()
  if ([12, 17, 28].includes(day)) return true
  if ([1, 19, 22].includes(day)) return ['red', '#00f']
  return false
}
</script>

<style></style>
