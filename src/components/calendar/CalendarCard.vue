<template>
  <VCard class="d-flex flex-column">
    <VCardTitle>Team Calendar</VCardTitle>

    <div class="d-flex flex-column ml-auto py-8 pr-10">
      <VCombobox
        v-model="userTeam"
        :items="teamList"
        label="조회할 팀을 고르세요."
        variant="outlined"
        width="280px"
      ></VCombobox>
    </div>

    <VueDatePickerComponent :markers="markers" @handleSelectCurrentDate="selectCurrentDate"></VueDatePickerComponent>

    <div v-if="isDateSelected(selectDate)" class="tooltip">
      <VDivider class="mb-2"></VDivider>
      <div v-for="text in getDataBySelectDate(selectDate)" :key="text.id">
        <p>{{ text }}</p>
        <VDivider class="mb-2"></VDivider>
      </div>
    </div>
  </VCard>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from '@/api/axios'
import VueDatePickerComponent from '@/components/calendar/VueDatePicker.vue'

const teamList = ref([
  'IT영업팀',
  '해외영업팀',
  'IT개발팀',
  '개발지원팀',
  'IOT영업팀',
  'IOTPass영업팀',
  'IOT개발팀',
  '경영지원팀',
  '외주관리팀',
  '인사지원팀',
  '총무팀',
])
const userTeam = ref('IT영업팀')
const selectDate = ref(new Date())

const teamApprovalInfo = ref([])

const getTeamApprovalInfo = async () => {
  try {
    resetMarkersAndTooltips()
    const response = await axios.get(`/user/team/${userTeam.value}`)
    console.log('get userTeam success ! ', response)
    teamApprovalInfo.value = response.data.data
    addMarkers()
  } catch (error) {
    console.log('Error get userTeam:', error)
  }
}

const markers = ref([])
const tooltip = ref([])

const resetMarkersAndTooltips = () => {
  markers.value = []
  tooltip.value = []
}

const addMarkers = () => {
  const dateMap = {}

  // 사용자 정보를 날짜별로 그룹화
  teamApprovalInfo.value.forEach(user => {
    const startDate = new Date(user.approvalDetailStartDate)
    const endDate = new Date(user.approvalDetailEndDate)
    const currentDate = new Date(startDate)

    // startDate부터 endDate까지의 모든 날짜를 포함
    while (currentDate <= endDate) {
      const dateKey = dateStr(currentDate) // 날짜 문자열로 변환 (YYYY-MM-DD 형식)

      if (!dateMap[dateKey]) {
        dateMap[dateKey] = []
      }

      dateMap[dateKey].push({
        userName: user.userName,
        approvalType: user.approvalType,
        color: user.approvalType === 'BUSINESS_TRIP' ? 'blue' : user.approvalType === 'VACATION' ? 'green' : 'red',
        startDate: dateStr(startDate),
        endDate: dateStr(endDate),
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
    users.map(user =>
      tooltip.value.push({
        date: new Date(dateKey),
        text: `${user.userName}님 ${setToApprovalType(user.approvalType)}: ${user.startDate}~${user.endDate}`,
      }),
    )
  })
}

onMounted(() => {
  // getTeamApprovalInfo()
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
const isDateSelected = date => {
  return getDataBySelectDate(date).length > 0
}

const dateStr = date => {
  return date.toISOString().replace(/T.*$/, '') // YYYY-MM-DD
}

const selectCurrentDate = date => {
  selectDate.value = date
  console.log('card selectDate: ', selectDate.value)
}

const setToApprovalType = approvalType => {
  if (approvalType === 'BUSINESS_TRIP') {
    return '출장'
  } else if (approvalType === 'OUT_ON_BUSINESS') {
    return '외근'
  } else if (approvalType === 'VACATION') {
    return '휴가'
  }
}

watch(userTeam, getTeamApprovalInfo)
</script>

<style lang="scss">
.tooltip {
  display: flex;
  flex-direction: column;
  padding-bottom: 35px;
  text-align: center;
}
</style>
