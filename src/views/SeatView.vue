<template>
  <v-container>
    <h2 class="office-title">| 좌석 배치도</h2>
    <v-row>
      <v-col>
        <div v-if="seatLayouts[seatOffice] && seatLayouts[seatOffice][convertFloor(floor)]" class="seat-map">
          <div
            v-for="(row, rowIndex) in getRowLayout(seatLayouts[seatOffice][convertFloor(floor)])"
            :key="`${seatOffice}_${convertFloor(floor)}_row_${rowIndex}`"
            class="row"
          >
            <div
              v-for="(seat, colIndex) in row"
              :key="`${seatOffice}_${convertFloor(floor)}_seat_${rowIndex}_${colIndex}`"
              class="col"
            >
              <button
                v-if="seat"
                class="seat"
                :class="{
                  checked: checked.includes(seat.seatLocation),
                  selected: selected.includes(seat.seatLocation),
                }"
                @click="handleSeatClick(seat)"
              >
                {{ removeLeadingZeros(seat.seatNum) }}
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

    <!-- 사원 정보 모달 -->
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

    <!-- 좌석 선택 확인 모달 -->
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
          <v-btn color="primary" @click="fetchConfirmSelection">확인</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 좌석 취소 확인 모달 -->
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
          <v-btn color="primary" @click="fetchCancelSelection">확인</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 알림 모달 -->
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
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useCodeStore } from '/src/stores/useCodeStore.js'
import { useAuthStore } from '/src/stores/useAuthStore.js'
import { useSeatStore } from '/src/stores/useSeatStore.js'
import api from '/src/api/axios.js'

// 스토어 및 상태 변수 초기화
const codeStore = useCodeStore()
const authStore = useAuthStore()
const seatStore = useSeatStore()

const userNo = ref(authStore.userNo)
const selected = ref([])
const seatOffice = ref('OJS01') // 기본 오피스를 잠실오피스로 설정
const floor = ref('LOBBY') // 기본 층을 LOBBY 로 설정
const offices = ref(['OJS01', 'OMP02', 'OSB03'])
const officeNames = computed(() => offices.value.map(office => codeStore.getCodeName(office)))
const selectedOfficeName = ref(codeStore.getCodeName(seatOffice.value))

const seatLayouts = ref([])

const checked = ref([])
const seatUserInfo = ref() // 좌석에 할당된 사용자 정보를 저장
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
const seatNum = ref(null) // 추가

// 변환 함수
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

// 함수 선언

/**
 * 주어진 좌석 번호가 선택 불가능한지 확인
 * @param {String} seatLocation - 좌석 위치
 * @returns {Boolean} - 선택 불가능 여부
 */
const isSeatSelectionDisabled = seatLocation => {
  return checked.value.includes(seatLocation)
}
/**
 * 주어진 좌석 번호에서 앞의 0을 제거하는 함수
 * @param {String} seatNum - 좌석 번호
 * @returns {String} - 앞의 0이 제거된 좌석 번호
 */
const removeLeadingZeros = seatNum => {
  return seatNum.replace(/^0+/, '')
}
/**
 * 좌석 클릭 시 호출되는 함수
 * @param {Object} seat - 클릭한 좌석 객체
 */
const handleSeatClick = async seat => {
  seatLocation.value = seat.seatLocation
  seatNo.value = seat.seatStatusNo
  seatNum.value = seat.seatNum // 추가

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

  // 사용자가 이미 다른 좌석을 선택한 경우 알림 모달 표시
  if (selected.value.length > 0 && !selected.value.includes(seatLocation.value)) {
    showAlert('이미 다른 좌석을 선택하셨습니다. 선택된 좌석을 먼저 취소해주세요.')
    return
  }

  // 사용자가 자신의 좌석을 클릭한 경우 선택 취소 모달 보여주기
  if (selected.value.includes(seatLocation.value)) {
    cancelMessage.value = `좌석 ${removeLeadingZeros(seatNum.value)}번을 취소하시겠습니까?`
    showCancelModal.value = true
    return
  }

  // 새로운 좌석을 선택하는 경우 확인 모달 보여주기
  confirmMessage.value = `좌석 ${removeLeadingZeros(seatNum.value)}번을 선택하시겠습니까?`
  showConfirmModal.value = true
}

/**
 * 좌석 선택을 확인하는 함수
 */
const fetchConfirmSelection = async () => {
  closeConfirmModal()
  try {
    const response = await api.post(`/seat/available-seats/${seatOffice.value}/select/${seatNo.value}/${userNo.value}`)

    if (response.data && response.data.status === 'success') {
      selected.value.push(seatLocation.value)
      seatStore.selectSeat(userNo.value, seatLocation.value)
      showAlert(`좌석 ${removeLeadingZeros(seatNum.value)}번이 성공적으로 선택되었습니다.`) // 여기 수정
      fetchSeatData()
    } else {
      showAlert(response.data.message)
    }
  } catch (error) {
    console.error('Error selecting seat:', error)
    showAlert('좌석 선택 중 오류가 발생했습니다. 다시 시도해주세요.')
  }
}
/**
 * 좌석 선택 취소를 확인하는 함수
 */
const fetchCancelSelection = async () => {
  closeCancelModal()
  try {
    const response = await api.post(`/seat/available-seats/${seatOffice.value}/cancel/${seatNo.value}/${userNo.value}`)

    if (response.data && response.data.status === 'success') {
      selected.value = selected.value.filter(seat => seat !== seatLocation.value)
      seatStore.cancelSeat(userNo.value)
      showAlert(`좌석 ${removeLeadingZeros(seatNum.value)}번이 성공적으로 취소되었습니다.`) // 여기 수정
      fetchSeatData()
    } else {
      showAlert(response.data.message)
    }
  } catch (error) {
    console.error('Error canceling seat:', error)
    showAlert('좌석 취소 중 오류가 발생했습니다. 다시 시도해주세요.')
  }
}

/**
 * 좌석 레이아웃을 가져오는 함수
 * @param {Array} layout - 좌석 배열
 * @returns {Array} - 정리된 좌석 배열
 */
const getRowLayout = layout => {
  const maxRow = Math.max(...layout.map((_, index) => Math.floor(index / 7)))
  const maxColumn = 6
  const rowLayout = Array.from({ length: maxRow + 1 }, () => Array(maxColumn + 1).fill(null))
  layout.forEach((seat, index) => {
    const row = Math.floor(index / 7)
    const column = index % 7
    rowLayout[row][column] = seat
  })
  return rowLayout
}

/**
 * 사원 정보를 모달로 보여주는 함수
 * @param {String} seatLocation - 좌석 위치
 */
const fetchUserInfo = async seatLocation => {
  try {
    const response = await api.get(`/seat/user/info/${seatLocation}`)
    console.log('User info response:', response.data.data) // 응답 확인용 콘솔 출력

    if (response.data && response.data.status === 'success') {
      const userData = response.data.data
      userData.userTeam = codeStore.getCodeName(userData.userTeam) // 부서 이름 변환
      userData.userPosition = codeStore.getCodeName(userData.userPosition) // 직책 이름 변환
      return userData
    } else {
      console.error('Error fetching user info:', response.data.message)
      return null
    }
  } catch (error) {
    console.error('Error fetching user info:', error)
    return null
  }
}

// API 호출 함수

/**
 * 모든 좌석 데이터를 가져오는 함수
 */
const fetchSeatData = async () => {
  try {
    const convertedFloor = convertFloor(floor.value)
    const response = await api.get(`/seat/office/${seatOffice.value}/${convertedFloor}`)
    if (response.data && response.data.status === 'success') {
      const seatData = response.data.data
      checked.value = seatData.filter(seat => seat.seatStatusYn).map(seat => seat.seatLocation)
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
    } else {
      checked.value = []
      seatUserInfo.value = {}
      seatLayouts.value = {
        ...seatLayouts.value,
        [seatOffice.value]: {
          ...seatLayouts.value[seatOffice.value],
          [convertedFloor]: [],
        },
      }
    }
  } catch (error) {
    console.error('Error fetching seat data:', error)
  }
}

// 모달 및 알림 함수

/**
 * 사원 정보 모달 닫기
 */
const closeModal = () => {
  showEmployeeModal.value = false
  employeeInfo.value = {}
}

/**
 * 좌석 선택 확인 모달 닫기
 */
const closeConfirmModal = () => {
  showConfirmModal.value = false
  confirmMessage.value = ''
  confirmAction.value = null
}

/**
 * 좌석 취소 확인 모달 닫기
 */
const closeCancelModal = () => {
  showCancelModal.value = false
  cancelMessage.value = ''
}

/**
 * 알림 모달을 보여주는 함수
 * @param {String} message - 알림 메시지
 */
const showAlert = message => {
  alertMessage.value = message
  showAlertModal.value = true
}

/**
 * 알림 모달 닫기
 */
const closeAlertModal = () => {
  showAlertModal.value = false
  alertMessage.value = ''
}

// 라이프사이클 훅 및 워치

// 컴포넌트 마운트 시 초기화
onMounted(() => {
  fetchSeatData()
  const selectedSeat = seatStore.getSelectedSeat(userNo.value)
  if (selectedSeat) {
    selected.value = [selectedSeat]
  }
  console.log('Mounted - Checked seats:', checked.value)
})

// 좌석 오피스가 변경될 때마다 좌석 데이터 갱신
watch(seatOffice, fetchSeatData)

// 층이 변경될 때마다 좌석 데이터 갱신
watch(floor, fetchSeatData)

// 선택된 오피스 이름이 변경될 때 해당 오피스 코드 갱신
watch(selectedOfficeName, newName => {
  seatOffice.value = Object.keys(codeStore.codeToNameMap).find(key => codeStore.codeToNameMap[key] === newName)
})
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
  gap: 20px; /* 좌석 사이의 간격을 조절하는 값 */
  margin-bottom: 20px; /* 행 사이의 간격을 조절하는 값 */
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
  cursor: pointer;
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
