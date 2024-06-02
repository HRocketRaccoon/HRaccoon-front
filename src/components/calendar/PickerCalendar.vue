<template>
  <v-container>
    <v-col>
      <VueDatePicker v-model="selectDate" inline auto-apply :markers="markers" locale="ko" :enable-time-picker="false">
        <template #action-extra="{ selectCurrentDate }">
          <span @click="selectCurrentDate()" title="Select current date">
            <div v-for="text in getDataBySelectDate(selectDate)" :key="text.id">
              <p>{{ text }}</p>
            </div>
          </span>
        </template>
      </VueDatePicker>
    </v-col>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const state = reactive({
  data: [
    {
      name: '방채원',
      team: 'HR',
      approval_type: 'vacation',
      startDate: new Date(Date.UTC(2024, 4, 15)), // 2024년 5월 15일
      endDate: new Date(Date.UTC(2024, 4, 15)),
    },
    {
      name: '이윤재',
      team: 'HR',
      approval_type: 'vacation',
      startDate: new Date(Date.UTC(2024, 4, 15)), // 2024년 5월 15일
      endDate: new Date(Date.UTC(2024, 4, 15)),
    },
    {
      name: '정광수',
      team: 'HR',
      approval_type: 'goToWork',
      startDate: new Date(Date.UTC(2024, 4, 12)), // 2024년 5월 12일
      endDate: new Date(Date.UTC(2024, 4, 15)), // 2024년 5월 15일
    },
    {
      name: '최수환',
      team: 'HR',
      approval_type: 'vacation',
      startDate: new Date(Date.UTC(2024, 4, 1)), // 2024년 5월 1일
      endDate: new Date(Date.UTC(2024, 4, 2)),
    },
    {
      name: '박시현',
      team: 'HR',
      approval_type: 'goToWork',
      startDate: new Date(Date.UTC(2024, 4, 9)), // 2024년 5월 9일
      endDate: new Date(Date.UTC(2024, 4, 10)), // 2024년 5월 10일
    },
  ],
})

const selectDate = ref(new Date())

const dateStr = date => {
  return date.toISOString().replace(/T.*$/, '') // YYYY-MM-DD
}

const markers = ref([])
const tooltip = ref([])

const addMarkers = () => {
  const dateMap = {}

  // 사용자 정보를 날짜별로 그룹화
  state.data.forEach(user => {
    const startDate = new Date(user.startDate)
    const endDate = new Date(user.endDate)
    const currentDate = new Date(startDate)

    // startDate부터 endDate까지의 모든 날짜를 포함
    while (currentDate <= endDate) {
      const dateKey = dateStr(currentDate) // 날짜 문자열로 변환 (YYYY-MM-DD 형식)

      if (!dateMap[dateKey]) {
        dateMap[dateKey] = []
      }

      dateMap[dateKey].push({
        name: user.name,
        approval_type: user.approval_type,
        color: user.approval_type === 'vacation' ? 'blue' : 'green',
      })

      currentDate.setUTCDate(currentDate.getUTCDate() + 1) // 다음 날짜로 이동
    }
  })

  // 날짜별로 마커 생성
  Object.entries(dateMap).forEach(([dateKey, users]) => {
    markers.value.push({
      date: new Date(dateKey),
      type: 'dot',
      color: users[0].color,
    })
    users.map(user => tooltip.value.push({ date: new Date(dateKey), text: `${user.name} - ${user.approval_type}` }))
  })
}

onMounted(() => {
  addMarkers()
})

const getDataBySelectDate = date => {
  const res_text = []
  tooltip.value.forEach(({ date: map_date, text }) => {
    if (dateStr(date) === dateStr(map_date)) {
      res_text.push(text)
    }
  })
  return res_text
}
</script>

<style lang="scss">
.dp__theme_light {
  --dp-primary-color: gray;
  --dp-primary-disabled-color: #6bacea;
}
</style>
