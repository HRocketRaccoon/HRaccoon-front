<template>
  <v-container>
    <h2 class="office-title">| 좌석 배치도</h2>
    <v-row>
      <v-col>
        <div v-if="seatLayouts[seatOffice] && seatLayouts[seatOffice][floor]" class="seat-map">
          <div
            v-for="(row, rowIndex) in getRowLayout(seatLayouts[seatOffice][floor])"
            :key="`${seatOffice}_${floor}_row_${rowIndex}`"
            class="row"
          >
            <div
              v-for="(seat, colIndex) in row"
              :key="`${seatOffice}_${floor}_seat_${rowIndex}_${colIndex}`"
              class="col"
            >
              <button
                v-if="seat"
                class="seat"
                :class="{
                  checked: checked.includes(seat.seatNo),
                  selected: selected.includes(seat.seatNo),
                  entrance: seat.seatNo === '입구',
                }"
                :disabled="isSeatSelectionDisabled(seat.seatNo)"
                @click="handleSeatClick(seat.seatNo)"
              >
                {{ seat.seatNo }}
              </button>
            </div>
          </div>
        </div>
      </v-col>
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

    <!-- 사원 정보 모달 시작 -->
    <v-dialog v-model="showEmployeeModal" max-width="600px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="headline">사원 정보</span>
          <v-btn icon @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="4">
                <v-img src="src/assets/employee.jpg" class="custom-avatar" alt="Avatar"></v-img>
              </v-col>
              <v-col cols="8">
                <p>이름: {{ employeeInfo.userName }}</p>
                <p>사번: {{ employeeInfo.userId }}</p>
                <p>부서: {{ employeeInfo.userTeam }}</p>
                <p>직책: {{ employeeInfo.userPosition }}</p>
                <div v-if="checked.length > 0" class="used-seats">
                  <p>이미 사용 중인 좌석입니다</p>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- 사원 정보 모달 끝 -->

    <!-- 확인 모달 시작 -->
    <v-dialog v-model="showConfirmModal" max-width="400px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="headline">좌석 선택</span>
          <v-btn icon @click="closeConfirmModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <p>{{ confirmMessage }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="confirmSelection">확인</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 확인 모달 끝 -->

    <!-- 취소 확인 모달 시작 -->
    <v-dialog v-model="showCancelModal" max-width="400px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="headline">좌석 취소</span>
          <v-btn icon @click="closeCancelModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <p>{{ cancelMessage }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="cancelSelection">확인</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 취소 확인 모달 끝 -->

    <!-- 알림 모달 시작 -->
    <v-dialog v-model="showAlertModal" max-width="400px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="headline">좌석 선택</span>
        </v-card-title>
        <v-card-text>
          <p>{{ alertMessage }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeAlertModal">확인</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 알림 모달 끝 -->
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCodeStore } from '/src/stores/useCodeStore.js'
import { onMounted, watch } from 'vue'
import api from '/src/api/axios.js'
import { useAuthStore } from '/src/stores/useAuthStore.js'

const codeStore = useCodeStore()
const authStore = useAuthStore() // Initialize the auth store
const userNo = ref(authStore.userNo)
console.log('userNo', userNo)

const selected = ref([]) // 여기에서 초기 선택된 좌석을 설정
const seatOffice = ref('OJS01') // 초기 오피스 코드
const floor = ref('LOBBY')
const offices = ref(['OJS01', 'OMP02', 'OSB03']) // 오피스 코드 목록

const officeNames = computed(() => offices.value.map(office => codeStore.getCodeName(office)))
const selectedOfficeName = ref(codeStore.getCodeName(seatOffice.value))

watch(selectedOfficeName, newName => {
  seatOffice.value = Object.keys(codeStore.codeToNameMap).find(key => codeStore.codeToNameMap[key] === newName)
})

const seatLayouts = ref({
  OJS01: {
    LOBBY: [
      { seatNo: 1, seatRow: 0, seatColumn: 0 },
      { seatNo: 2, seatRow: 0, seatColumn: 1 },
      { seatNo: 3, seatRow: 0, seatColumn: 2 },
      { seatNo: 4, seatRow: 0, seatColumn: 3 },
      { seatNo: 5, seatRow: 0, seatColumn: 4 },
      { seatNo: 6, seatRow: 0, seatColumn: 5 },
      { seatNo: 7, seatRow: 0, seatColumn: 6 },
    ],
    '1F': [
      { seatNo: 8, seatRow: 1, seatColumn: 0 },
      { seatNo: 9, seatRow: 1, seatColumn: 1 },
      { seatNo: 10, seatRow: 1, seatColumn: 2 },
      { seatNo: 11, seatRow: 1, seatColumn: 3 },
    ],
    '2F': [
      { seatNo: 12, seatRow: 2, seatColumn: 0 },
      { seatNo: 13, seatRow: 2, seatColumn: 1 },
      { seatNo: 14, seatRow: 2, seatColumn: 2 },
    ],
    '3F': [
      { seatNo: 15, seatRow: 3, seatColumn: 0 },
      { seatNo: 16, seatRow: 3, seatColumn: 1 },
      { seatNo: 17, seatRow: 3, seatColumn: 2 },
      { seatNo: 18, seatRow: 3, seatColumn: 3 },
      { seatNo: 19, seatRow: 3, seatColumn: 4 },
      { seatNo: 20, seatRow: 3, seatColumn: 5 },
    ],
  },
  OMP02: {
    LOBBY: [
      { seatNo: 21, seatRow: 0, seatColumn: 0 },
      { seatNo: 22, seatRow: 0, seatColumn: 1 },
      { seatNo: 23, seatRow: 0, seatColumn: 2 },
    ],
    '1F': [
      { seatNo: 24, seatRow: 1, seatColumn: 0 },
      { seatNo: 25, seatRow: 1, seatColumn: 1 },
    ],
    '2F': [
      { seatNo: 26, seatRow: 2, seatColumn: 0 },
      { seatNo: 27, seatRow: 2, seatColumn: 1 },
      { seatNo: 28, seatRow: 2, seatColumn: 2 },
    ],
    '3F': [
      { seatNo: 29, seatRow: 3, seatColumn: 0 },
      { seatNo: 30, seatRow: 3, seatColumn: 1 },
    ],
  },
  OSB03: {
    LOBBY: [{ seatNo: 31, seatRow: 0, seatColumn: 0 }],
    '1F': [{ seatNo: 32, seatRow: 1, seatColumn: 0 }],
    '2F': [{ seatNo: 33, seatRow: 2, seatColumn: 0 }],
  },
})

const checked = ref([]) // 사용 중인 좌석 데이터
const showTips = ref(true)
const showEmployeeModal = ref(false)
const showConfirmModal = ref(false)
const showCancelModal = ref(false) // 취소 확인 모달 상태
const showAlertModal = ref(false)
const employeeInfo = ref({})
const confirmMessage = ref('')
const cancelMessage = ref('') // 취소 확인 메시지
const confirmAction = ref(null)
const alertMessage = ref('')
const seatNo = ref(null)

// 좌석 선택 상태 확인 함수
const isSeatSelectionDisabled = seatNumber => {
  return (selected.value.length > 0 && !selected.value.includes(seatNumber)) || checked.value.includes(seatNumber)
}

// API 호출 예시
const fetchSeatData = async () => {
  try {
    const response = await api.get(`/seat/available-seats/${seatOffice.value}`)
    if (response.data && response.data.status === 'success') {
      checked.value = response.data.data.filter(seat => seat.seatStatusYn).map(seat => seat.seatNo)
    } else {
      checked.value = []
    }
  } catch (error) {
    console.error('Error fetching seat data:', error)
  }
}

const showEmployeeInfo = async seatNo => {
  try {
    const response = await api.get(`/seat/user/info/{seatStatus}`)
    if (response.data.data) {
      employeeInfo.value = response.data.data
      showEmployeeModal.value = true
    }
  } catch (error) {
    console.error('Error fetching employee info:', error)
  }
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

const handleSeatClick = seatNumber => {
  seatNo.value = seatNumber
  if (checked.value.includes(seatNo.value)) {
    showEmployeeInfo(seatNo.value)
  } else if (selected.value.includes(seatNo.value)) {
    cancelMessage.value = `좌석 ${seatNo.value}을(를) 취소하시겠습니까?`
    showCancelModal.value = true
  } else {
    confirmMessage.value = `좌석 ${seatNo.value}을(를) 선택하시겠습니까?`
    showConfirmModal.value = true
  }
}

const confirmSelection = async () => {
  closeConfirmModal() // 좌석 선택 모달을 닫습니다.
  try {
    const response = await api.post(`/seat/available-seats/${seatOffice.value}/select/${seatNo.value}/${userNo.value}`)
    if (response.data && response.data.status === 'success') {
      selected.value.push(seatNo.value)
      saveSelectedSeatToLocalStorage(seatNo.value) // 선택된 좌석을 localStorage에 저장
      alertMessage.value = `좌석 ${seatNo.value}이(가) 성공적으로 선택되었습니다.`
      showAlertModal.value = true
      // 좌석 데이터 다시 로드하여 UI 동기화
      fetchSeatData()
    } else {
      alertMessage.value = response.data.message
      showAlertModal.value = true
    }
  } catch (error) {
    console.error('Error selecting seat:', error)
    if (error.response) {
      console.error('Response data:', error.response.data)
      console.error('Response status:', error.response.status)
      console.error('Response headers:', error.response.headers)
    }
    alertMessage.value = '좌석 선택 중 오류가 발생했습니다. 다시 시도해주세요.'
    showAlertModal.value = true
  }
}

const cancelSelection = async () => {
  closeCancelModal() // 좌석 취소 모달을 닫습니다.
  try {
    const response = await api.post(`/seat/available-seats/${seatOffice.value}/cancel/${seatNo.value}/${userNo.value}`)
    if (response.data && response.data.status === 'success') {
      selected.value = selected.value.filter(seat => seat !== seatNo.value)
      removeSelectedSeatFromLocalStorage(seatNo.value) // 선택 취소된 좌석을 localStorage에서 삭제
      alertMessage.value = `좌석 ${seatNo.value}이(가) 성공적으로 취소되었습니다.`
      showAlertModal.value = true
      // 좌석 데이터 다시 로드하여 UI 동기화
      fetchSeatData()
    } else {
      alertMessage.value = response.data.message
      showAlertModal.value = true
    }
  } catch (error) {
    console.error('Error canceling seat:', error)
    if (error.response) {
      console.error('Response data:', error.response.data)
      console.error('Response status:', error.response.status)
      console.error('Response headers:', error.response.headers)
    }
    alertMessage.value = '좌석 취소 중 오류가 발생했습니다. 다시 시도해주세요.'
    showAlertModal.value = true
  }
}

const saveSelectedSeatToLocalStorage = seatNumber => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || {}
  selectedSeats[userNo.value] = seatNumber
  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats))
}

const removeSelectedSeatFromLocalStorage = seatNumber => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || {}
  delete selectedSeats[userNo.value]
  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats))
}

const fetchSelectedSeatFromLocalStorage = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || {}
  selected.value = selectedSeats[userNo.value] ? [selectedSeats[userNo.value]] : []
}

const init = () => {
  fetchSeatData()
  fetchSelectedSeatFromLocalStorage() // 페이지 로드 시 선택된 좌석 정보를 불러옵니다.
}

onMounted(init)

watch(seatOffice, fetchSeatData)
watch(floor, fetchSeatData)

const getRowLayout = layout => {
  const maxRow = Math.max(...layout.map(seat => seat.seatRow))
  const maxColumn = Math.max(...layout.map(seat => seat.seatColumn))
  const rowLayout = Array.from({ length: maxRow + 1 }, () => Array(maxColumn + 1).fill(null))
  layout.forEach(seat => {
    rowLayout[seat.seatRow][seat.seatColumn] = seat
  })
  return rowLayout
}
</script>

<style scoped>
#mySeatPicker {
  font-size: 1em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 50px;
  box-sizing: border-box;
}

.office-title {
  font-size: 2em;
  margin-bottom: 20px;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 10px;
}

.seat {
  cursor: pointer;
  width: 60px;
  height: 60px;
  border: 2px solid #a19c9c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
}

.seat.checked {
  background-color: red;
  cursor: pointer;
}

.seat.selected {
  background-color: green;
}

.seat.none {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.seatTip {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>
