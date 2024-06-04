<template>
  <VCard class="d-flex flex-column mx-auto py-8" elevation="10">
    <div class="d-flex justify-center mt-auto text-h5 mb-15">잔여 좌석 확인</div>

    <div class="d-flex flex-column mr-1 py-8">
      <VCombobox
        label="조회할 오피스를 고르세요."
        :items="['잠실오피스', '마포오피스', '성북오피스']"
        variant="outlined"
        width="280px"
        v-model="seatOffice"
      ></VCombobox>
    </div>

    <VList bg-color="transparent" class="d-flex flex-column-reverse" density="compact">
      <v-list-item v-for="(floor, index) in floors" :key="index" class="mb-7">
        <v-progress-linear
          :model-value="calculatePercentage(floor.cntNum, floor.totalNum)"
          class="mx-n5"
          height="25"
        ></v-progress-linear>

        <template v-slot:prepend>
          <span style="width: 20px" class="mr-10">{{ floor.floor }}</span>
        </template>

        <template v-slot:append>
          <div class="rating-values">
            <span class="d-flex justify-end"> {{ floor.cntNum }} </span>
          </div>
        </template>
      </v-list-item>
    </VList>
  </VCard>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from '@/api/axios'

const seatOffice = ref('잠실오피스') // remainSeat 가져올 때 .. id
const remainSeat = ref([])
const floors = ref([
  {
    floor: 'L',
    totalNum: 27,
    cntNum: 0,
  },
  {
    floor: '1F',
    totalNum: 29,
    cntNum: 0,
  },
  {
    floor: '2F',
    totalNum: 28,
    cntNum: 0,
  },
  {
    floor: '3F',
    totalNum: 26,
    cntNum: 0,
  },
])
const countSeatNumber = () => {
  // 초기화
  floors.value.forEach(floor => (floor.cntNum = 0))

  for (const seat of remainSeat.value) {
    if (seat.seatFloor === 'L') {
      floors.value[0].cntNum++
    } else if (seat.seatFloor === '1') {
      floors.value[1].cntNum++
    } else if (seat.seatFloor === '2') {
      floors.value[2].cntNum++
    } else if (seat.seatFloor === '3') {
      floors.value[3].cntNum++
    }
  }
}

onMounted(() => {
  getRemainSeat()
})

const getRemainSeat = async () => {
  try {
    const response = await axios.get(`/seat/office/${setToOfficeRegion()}`)
    console.log('get remainSeat success ! ', response)
    remainSeat.value = response.data.data
    countSeatNumber()
  } catch (error) {
    console.log('Error get remainSeat:', error)
  }
}

const calculatePercentage = (value, total) => {
  if (total === 0) return 0

  return 100 - (value / total) * 100
}

const setToOfficeRegion = () => {
  const officePrefix = seatOffice.value.substring(0, 2)
  return officePrefix
}
watch(seatOffice, getRemainSeat)
</script>

<style></style>
