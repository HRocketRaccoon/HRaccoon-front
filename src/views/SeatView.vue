<template>
  <v-container>
    <h2 class="office-title">좌석배치도</h2>
    <v-row>
      <v-col>
        <div v-for="(layout, floor) in seatLayouts[selectedOffice]" :key="floor">
          <div v-if="selectedFloor === floor" class="seat-map">
            <div
              v-for="(row, rowIndex) in layout"
              :key="`${selectedOffice}_${selectedFloor}_row_${rowIndex}`"
              class="row"
            >
              <div v-for="seat in row" :key="`${selectedOffice}_${selectedFloor}_seat_${seat}`" class="col">
                <button
                  class="seat"
                  :class="{
                    broken: broken.includes(seat),
                    checked: checked.includes(seat),
                    selected: selected.includes(seat),
                    none: seat === null,
                    entrance: seat === '입구',
                  }"
                  @click="handleSeatClick(seat)"
                >
                  {{ seat }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col>
        <v-select v-model="selectedOffice" :items="offices" label="오피스를 선택해주세요"></v-select>
        <v-btn-toggle v-model="selectedFloor" mandatory class="mt-4">
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
                <p>이름: {{ employeeInfo.name }}</p>
                <p>사번: {{ employeeInfo.id }}</p>
                <p>부서: {{ employeeInfo.department }}</p>
                <p>직책: {{ employeeInfo.position }}</p>
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
          <v-btn color="primary" @click="confirmAction(true)">확인</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 확인 모달 끝 -->

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
import { ref } from 'vue'

const selected = ref([])
const selectedOffice = ref('마포오피스')
const selectedFloor = ref('LOBBY')
const offices = ref(['잠실오피스', '마포오피스', '성북오피스'])
const seatLayouts = ref({
  마포오피스: {
    LOBBY: [
      [23, 22, 21, null, 22, 25],
      [18, 19, 20, null, 28, 26],
      [15, 16, 17, null, 24, 27],
      [12, 13, 14, null, 9, 10, 11],
      [3, 1, null, 5, 7, null],
      [4, 2, null, 6, 8, null],
      [null, null, '입구', null, null, null],
    ],
    '1F': [
      [1, 2, 3, null, 4, 5],
      [6, 7, 8, null, 9, 10],
      [11, 12, 13, null, 14, 15],
      [16, 17, 18, null, 19, 20],
      [21, 22, 23, null, 24, 25],
      [null, null, '입구', null, null, null],
    ],
    '2F': [
      [1, null, 2, 3, null, 4],
      [5, 6, null, 7, 8, null],
      [9, 10, 11, null, 12, 13],
      [null, 14, 15, 16, null, 17],
      [18, 19, null, 20, 21, 22],
      [null, null, '입구', null, null, null],
    ],
    '3F': [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [null, 16, 17, 18, null],
      [null, 19, 20, 21, 22],
      [23, 24, 25, null, null, null, '입구'],
    ],
  },
  잠실오피스: {
    LOBBY: [
      [23, 22, 21, null, 22, 25],
      [18, 19, 20, null, 28, 26],
      [15, 16, 17, null, 24, 27],
      [12, 13, 14, null, 9, 10, 11],
      [3, 1, null, 5, 7, null],
      [4, 2, null, 6, 8, null],
      [null, null, '입구', null, null, null],
    ],
    '1F': [
      [1, null, 2, 3, null, 4],
      [5, 6, null, 7, 8, null],
      [9, 10, 11, null, 12, 13],
      [null, 14, 15, 16, null, 17],
      [18, 19, null, 20, 21, 22],
      [null, null, '입구', null, null, null],
    ],
    '2F': [
      [1, 2, 3, null, 4, 5],
      [6, 7, 8, null, 9, 10],
      [11, 12, 13, null, 14, 15],
      [16, 17, 18, null, 19, 20],
      [21, 22, 23, null, 24, 25],
      [null, null, '입구', null, null, null],
    ],
    '3F': [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [null, 16, 17, 18, null],
      [null, 19, 20, 21, 22],
      [23, 24, 25, null, null, null, '입구'],
    ],
  },
  성북오피스: {
    LOBBY: [
      [23, 22, 21, null, 22, 25],
      [18, 19, 20, null, 28, 26],
      [15, 16, 17, null, 24, 27],
      [12, 13, 14, null, 9, 10, 11],
      [3, 1, null, 5, 7, null],
      [4, 2, null, 6, 8, null],
      [null, null, '입구', null, null, null],
    ],
    '1F': [
      [1, null, 2, 3, null, 4],
      [5, 6, null, 7, 8, null],
      [9, 10, 11, null, 12, 13],
      [null, 14, 15, 16, null, 17],
      [18, 19, null, 20, 21, 22],
      [null, null, '입구', null, null, null],
    ],
    '2F': [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [null, 16, 17, 18, null],
      [null, 19, 20, 21, 22],
      [23, 24, 25, null, null, '입구', null],
    ],
    '3F': [
      [1, 2, 3, null, 4, 5],
      [6, 7, 8, null, 9, 10],
      [11, 12, 13, null, 14, 15],
      [16, 17, 18, null, 19, 20],
      [21, 22, 23, null, 24, 25],
      [null, null, '입구', null, null, null],
    ],
  },
})
const checked = ref([1, 25, 24, 9, 3, 4, 6, 8])
const broken = ref([])
const showTips = ref(true)
const showEmployeeModal = ref(false)
const showConfirmModal = ref(false)
const showAlertModal = ref(false)
const employeeInfo = ref({})
const confirmMessage = ref('')
const confirmAction = ref(null)
const alertMessage = ref('')

const handleSeatClick = seat => {
  if (seat === null || seat === '입구') {
    return
  }

  if (checked.value.includes(seat)) {
    showEmployeeInfo(seat)
  } else if (selected.value.includes(seat)) {
    confirmAction.value = confirm => {
      if (confirm) {
        selected.value = selected.value.filter(item => item !== seat)
        showAlert(`좌석 번호 ${seat}이(가) 취소되었습니다.`)
      }
      closeConfirmModal()
    }
    confirmMessage.value = `좌석 번호 ${seat}을(를) 취소하시겠습니까?`
    showConfirmModal.value = true
  } else if (selected.value.length === 0) {
    confirmAction.value = confirm => {
      if (confirm) {
        selected.value.push(seat)
        showAlert(`좌석 번호 ${seat}이(가) 선택되었습니다.`)
      }
      closeConfirmModal()
    }
    confirmMessage.value = `좌석 번호 ${seat}을(를) 선택하시겠습니까?`
    showConfirmModal.value = true
  }
}

const showEmployeeInfo = () => {
  employeeInfo.value = {
    name: '정광수',
    id: '19-71001621',
    department: '개발1팀',
    position: '대리',
  }
  showEmployeeModal.value = true
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

const showAlert = message => {
  alertMessage.value = message
  showAlertModal.value = true
}

const closeAlertModal = () => {
  showAlertModal.value = false
  alertMessage.value = ''
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

.col {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.seat.broken {
  cursor: not-allowed;
  background-color: #a59d9d;
  pointer-events: none;
}

.seat.checked {
  background-color: red;
  cursor: pointer;
}

.seat.selected {
  background-color: green;
}

.seat.none {
  opacity: 0;
  cursor: not-allowed;
  pointer-events: none;
}

.seat.entrance {
  background-color: #e0e0e0;
  cursor: not-allowed;
  pointer-events: none;
}

.seatTip {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.legend {
  display: flex;
  flex-direction: column;
}

.available {
  background-color: #fff;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.modal-footer {
  text-align: center;
  margin-top: 20px;
}
</style>
