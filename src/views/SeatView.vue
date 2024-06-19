<template>
  <h1 class="office-title">| 좌석 배치도</h1>
  <v-row>
    <!-- 좌석 배치도 -->
    <v-col cols="8">
      <v-col v-if="seatLayouts[seatOffice] && seatLayouts[seatOffice][convertFloor(floor)]">
        <v-row
          v-for="(row, rowIndex) in getRowLayout(seatLayouts[seatOffice][convertFloor(floor)])"
          :key="`${seatOffice}_${convertFloor(floor)}_row_${rowIndex}`"
        >
          <v-col
            v-for="(seat, colIndex) in row"
            :key="`${seatOffice}_${convertFloor(floor)}_seat_${rowIndex}_${colIndex}`"
          >
            <v-card
              v-if="seat"
              class="seat"
              :class="{
                checked: checked.includes(seat.seatLocation),
                selected: selected.includes(seat.seatLocation),
              }"
              @click="handleSeatClick(seat)"
              outlined
              flat
            >
              <v-card-text class="seat-text">
                {{ removeLeadingZeros(seat.seatNum) }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-col>

    <!-- 오피스 선택 및 층 선택 -->
    <v-col>
      <v-select v-model="selectedOfficeName" :items="officeNames" label="오피스를 선택해주세요"></v-select>
      <v-btn-toggle v-model="floor" mandatory class="mt-4">
        <v-btn value="LOBBY">Lobby</v-btn>
        <v-btn value="1F">1F</v-btn>
        <v-btn value="2F">2F</v-btn>
        <v-btn value="3F">3F</v-btn>
      </v-btn-toggle>
      <div class="legend mt-4">
        <div class="tips" v-show="showTips">
          <div><span class="checked seat seatTip"></span> : 사용 중인 좌석</div>
          <div><span class="selected seat seatTip"></span> : 본인이 사용 중인 좌석</div>
          <div><span class="available seat seatTip"></span> : 사용 가능한 좌석</div>
        </div>
      </div>
    </v-col>
  </v-row>

  <!-- 사원 정보 모달 -->
  <v-dialog v-model="showEmployeeModal" width="800px">
    <v-card max-width="600" prepend-icon="mdi-account" title="사원 정보">
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-img src="src/assets/employee.jpg" class="custom-avatar" alt="Avatar"></v-img>
          </v-col>
          <v-col cols="8">
            <p>이름: {{ employeeInfo.userName }}</p>
            <p>사번: {{ employeeInfo.userId }}</p>
            <p>부서: {{ employeeInfo.userTeam }}</p>
            <p>직책: {{ employeeInfo.userPosition }}</p>
          </v-col>
        </v-row>
      </v-card-text>
      <template v-slot:actions>
        <v-btn class="ms-auto" text="확인" @click="closeModal" />
      </template>
    </v-card>
  </v-dialog>

  <!-- 좌석 선택 확인 모달 -->
  <v-dialog v-model="showConfirmModal" width="400px">
    <v-card max-width="400" prepend-icon="mdi-check" title="좌석 선택">
      <v-card-text class="text-center">{{ confirmMessage }}</v-card-text>
      <template v-slot:actions>
        <v-btn class="ms-auto" text="확인" @click="fetchConfirmSelection" />
      </template>
    </v-card>
  </v-dialog>

  <!-- 좌석 취소 확인 모달 -->
  <v-dialog v-model="showCancelModal" width="400px">
    <v-card max-width="400" prepend-icon="mdi-close" title="좌석 취소">
      <v-card-text class="text-center">{{ cancelMessage }}</v-card-text>
      <template v-slot:actions>
        <v-btn class="ms-auto" text="확인" @click="fetchCancelSelection" />
      </template>
    </v-card>
  </v-dialog>

  <!-- 알림 모달 -->
  <v-dialog v-model="showAlertModal" width="400px">
    <v-card max-width="400" prepend-icon="mdi-alert" title="좌석 선택">
      <v-card-text class="text-center">{{ alertMessage }}</v-card-text>
      <template v-slot:actions>
        <v-btn class="ms-auto" text="확인" @click="closeAlertModal" />
      </template>
    </v-card>
  </v-dialog>

  <!-- 좌석 선택 중복 경고 모달 -->
  <v-dialog v-model="showDuplicateSelectionModal" width="400px">
    <v-card max-width="400" prepend-icon="mdi-alert" title="좌석 선택 중복 경고">
      <v-card-text class="text-center">이미 선택중인 좌석이 있습니다. 취소 후 새로운 좌석을 선택해주세요.</v-card-text>
      <template v-slot:actions>
        <v-btn class="ms-auto" text="확인" @click="closeDuplicateSelectionModal" />
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useCodeStore } from '/src/stores/useCodeStore.js'
import { useAuthStore } from '/src/stores/useAuthStore.js'
import { useSeatStore } from '/src/stores/useSeatStore.js'
import api from '/src/api/axios.js'

const codeStore = useCodeStore()
const authStore = useAuthStore()
const seatStore = useSeatStore()

const userNo = ref(authStore.userNo)
const selected = ref([])
const seatOffice = ref('OJS01')
const floor = ref('LOBBY')
const offices = ref(['OJS01', 'OMP02', 'OSB03'])
const officeNames = computed(() => offices.value.map(office => codeStore.getCodeName(office)))
const selectedOfficeName = ref(codeStore.getCodeName(seatOffice.value))

const seatLayouts = ref([])
const checked = ref([])
const seatUserInfo = ref()
const showTips = ref(true)
const showEmployeeModal = ref(false)
const showConfirmModal = ref(false)
const showCancelModal = ref(false)
const showAlertModal = ref(false)
const employeeInfo = ref({})
const confirmMessage = ref('')
const cancelMessage = ref('')
const confirmAction = ref(null)
const alertMessage = ref('')
const seatLocation = ref(null)
const seatNo = ref(null)
const seatNum = ref(null)

const convertFloor = floor => {
  switch (floor) {
    case 'LOBBY':
      return 'L'
    case '1F':
      return '1'
    case '2F':
      return '2'
    case '3F':
      return '3'
    default:
      return floor
  }
}

const isSeatSelectionDisabled = seatLocation => {
  return checked.value.includes(seatLocation)
}

const removeLeadingZeros = seatNum => {
  return seatNum.replace(/^0+/, '')
}

const handleSeatClick = async seat => {
  seatLocation.value = seat.seatLocation
  seatNo.value = seat.seatStatusNo
  seatNum.value = seat.seatNum

  // 다른 사람이 사용 중인 좌석인 경우 사용자 정보 보여주기
  if (checked.value.includes(seatLocation.value) && !selected.value.includes(seatLocation.value)) {
    const userInfo = await fetchUserInfo(seatLocation.value)
    if (userInfo) {
      employeeInfo.value = userInfo
      showEmployeeModal.value = true
    } else {
      showAlert('직원 정보를 가져올 수 없습니다.')
    }
    return
  }

  // 사용자가 자신의 좌석을 클릭한 경우 선택 취소 모달 보여주기
  if (selected.value.includes(seatLocation.value)) {
    cancelMessage.value = `좌석 ${removeLeadingZeros(seatNum.value)}번을 취소하시겠습니까?`
    showCancelModal.value = true
    return
  }

  // 새로운 좌석을 선택하는 경우 기존 선택된 좌석이 있는지 확인
  if (selected.value.length > 0) {
    showDuplicateSelectionModal.value = true
    return
  }

  // 새로운 좌석을 선택하는 경우 확인 모달 보여주기
  confirmMessage.value = `좌석 ${removeLeadingZeros(seatNum.value)}번을 선택하시겠습니까?`
  showConfirmModal.value = true
}

// API 함수

// 좌석 선택
const fetchConfirmSelection = async () => {
  closeConfirmModal()
  try {
    const response = await api.post(`/seat/available-seats/${seatOffice.value}/select/${seatNo.value}/${userNo.value}`)

    if (response.data && response.data.status === 'success') {
      selected.value.push(seatLocation.value)
      seatStore.selectSeat(userNo.value, seatLocation.value)
      showAlert(`좌석 ${removeLeadingZeros(seatNum.value)}번이 성공적으로 선택되었습니다.`)
      fetchSeatData()
    } else {
      showAlert(response.data.message)
    }
  } catch (error) {
    console.error('Error selecting seat:', error)
    showAlert('좌석 선택 중 오류가 발생했습니다. 다시 시도해주세요.')
  }
}

// 좌석 취소
const fetchCancelSelection = async () => {
  closeCancelModal()
  try {
    const response = await api.post(`/seat/available-seats/${seatOffice.value}/cancel/${seatNo.value}/${userNo.value}`)

    if (response.data && response.data.status === 'success') {
      selected.value = selected.value.filter(seat => seat !== seatLocation.value)
      seatStore.cancelSeat(userNo.value)
      showAlert(`좌석 ${removeLeadingZeros(seatNum.value)}번이 성공적으로 취소되었습니다.`)
      fetchSeatData()
    } else {
      showAlert(response.data.message)
    }
  } catch (error) {
    console.error('Error canceling seat:', error)
    showAlert('좌석 취소 중 오류가 발생했습니다. 다시 시도해주세요.')
  }
}

// USER정보 가져오기
const fetchUserInfo = async seatLocation => {
  try {
    const response = await api.get(`/seat/user/info/${seatLocation}`)
    if (response.data && response.data.status === 'success') {
      const userData = response.data.data
      userData.userTeam = codeStore.getCodeName(userData.userTeam)
      userData.userPosition = codeStore.getCodeName(userData.userPosition)
      return userData
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}

// 전체 좌석 정보 가져오기
const fetchSeatData = async () => {
  try {
    const convertedFloor = convertFloor(floor.value)
    const response = await api.get(`/seat/office/${seatOffice.value}/${convertedFloor}`)
    if (response.data && response.data.status === 'success') {
      const seatData = response.data.data

      // seatData 구조 확인
      console.log('Seat data:', seatData)

      // userId 포함 여부 확인
      seatData.forEach(seat => {
        console.log(`Seat ${seat.seatLocation}:`, seat.userId)
      })

      // 현재 로그인한 사용자의 userId를 가져옵니다.
      const currentUserId = authStore.userId

      checked.value = seatData
        .filter(seat => seat.seatStatusYn && seat.userId !== currentUserId)
        .map(seat => seat.seatLocation)
      selected.value = seatData
        .filter(seat => seat.seatStatusYn && seat.userId === currentUserId)
        .map(seat => seat.seatLocation)

      console.log('Filtered checked seats:', checked.value)
      console.log('Filtered selected seats:', selected.value)

      seatUserInfo.value = seatData.reduce((acc, seat) => {
        acc[seat.seatLocation] = seat.userInfo
        return acc
      }, {})
      seatLayouts.value = {
        ...seatLayouts.value,
        [seatOffice.value]: {
          ...seatLayouts.value[seatOffice.value],
          [convertedFloor]: seatData,
        },
      }

      // 콘솔 로그 추가
      console.log('Checked seats:', checked.value)
      console.log('Selected seats:', selected.value)
    } else {
      checked.value = []
      selected.value = []
      seatUserInfo.value = {}
      seatLayouts.value = {
        ...seatLayouts.value,
        [seatOffice.value]: {
          ...seatLayouts.value[seatOffice.value],
          [convertedFloor]: [],
        },
      }
      // 콘솔 로그 추가
      console.log('Checked seats:', checked.value)
      console.log('Selected seats:', selected.value)
    }
  } catch (error) {
    console.error('Error fetching seat data:', error)
  }
}

const getRowLayout = layout => {
  const rowLayout = []
  let currentRow = []

  layout.forEach((seat, index) => {
    // 6자리를 한 줄로
    if (index % 10 < 6) {
      currentRow.push(seat)
      if (currentRow.length === 6) {
        rowLayout.push(currentRow)
        currentRow = []
      }
    }
    // 2자리씩 마주보게
    else if (index % 10 >= 6 && index % 10 < 8) {
      currentRow.push(seat)
      if (currentRow.length === 2) {
        rowLayout.push(currentRow)
        currentRow = []
      }
    }
    // 4자리 묶음
    else if (index % 10 >= 8 && index % 10 < 10) {
      currentRow.push(seat)
      if (currentRow.length === 4) {
        rowLayout.push(currentRow)
        currentRow = []
      }
    }
  })

  if (currentRow.length > 0) {
    rowLayout.push(currentRow)
  }

  return rowLayout
}

const closeModal = () => {
  showEmployeeModal.value = false
  employeeInfo.value = {}
}

const closeConfirmModal = () => {
  showConfirmModal.value = false
  confirmMessage.value = ''
  confirmAction.value = null
}

const closeCancelModal = () => {
  showCancelModal.value = false
  cancelMessage.value = ''
}

const showAlert = message => {
  alertMessage.value = message
  showAlertModal.value = true
}

const closeAlertModal = () => {
  showAlertModal.value = false
  alertMessage.value = ''
}
const showDuplicateSelectionModal = ref(false)

const closeDuplicateSelectionModal = () => {
  showDuplicateSelectionModal.value = false
}

onMounted(() => {
  fetchSeatData()
  const selectedSeat = seatStore.getSelectedSeat(userNo.value)
  if (selectedSeat) {
    selected.value = [selectedSeat]
  }
})

watch(seatOffice, fetchSeatData)

watch(floor, fetchSeatData)

watch(selectedOfficeName, newName => {
  seatOffice.value = Object.keys(codeStore.codeToNameMap).find(key => codeStore.codeToNameMap[key] === newName)
})
</script>

<style scoped>
.seat {
  cursor: pointer;
  width: 60px;
  height: 60px;
  border: 2px solid #a19c9c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  margin: 5px;
}

.seat.checked {
  background-color: red;
  cursor: pointer;
}

.seat.selected {
  background-color: green;
  cursor: pointer;
}

.seat-text {
  text-align: center;
  font-size: 1.2em;
  color: #000;
}

.seatTip {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>
