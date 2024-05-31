<template>
  <VCard class="d-flex flex-column mx-auto py-8" elevation="10" height="500">
    <div class="d-flex justify-center mt-auto text-h5">잔여 좌석 확인</div>

    <div class="d-flex align-center flex-column my-auto">
      <div class="text-h2 mt-1">
        3.5
        <span class="text-h6 ml-n3">/5</span>
      </div>
    </div>

    <VList bg-color="transparent" class="d-flex flex-column-reverse" density="compact">
      <v-list-item v-for="(rating, i) in 5" :key="i">
        <v-progress-linear
          :model-value="rating * 15"
          class="mx-n5"
          color="yellow-darken-3"
          height="20"
          rounded
        ></v-progress-linear>

        <template v-slot:prepend>
          <span>{{ rating }}</span>
          <v-icon class="mx-3" icon="mdi-star"></v-icon>
        </template>

        <template v-slot:append>
          <div class="rating-values">
            <span class="d-flex justify-end"> {{ rating * 224 }} </span>
          </div>
        </template>
      </v-list-item>
    </VList>
  </VCard>
</template>

<script setup>
// import { ref } from 'vue';

// const remainSeat = ref([
//     {
//         seatOffice: "상암 오피스",
//         seatLocation: ""
//     }
// ])
</script>

<style></style>
