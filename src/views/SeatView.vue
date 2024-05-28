<template>
  <div id="mySeatPicker">
    <h2 class="office-title">좌석배치도</h2>
    <div class="seat-picker-container">
      <div class="seat-map-wrapper">
        <!-- 마포오피스 -->
        <div class="seat-map" v-if="selectedOffice === '마포오피스' && selectedFloor === 'LOBBY'">
          <div v-for="(row, rowIndex) in mapoLobbySeatLayout" :key="'mapoLobby_row_' + rowIndex" class="row">
            <div v-for="seat in row" :key="'mapoLobby_seat_' + seat" class="col">
              <button
                class="seat"
                :class="{
                  broken: broken.includes(seat),
                  checked: checked.includes(seat),
                  selected: selected.includes(seat),
                  none: seat === null,
                  entrance: seat === '입구',
                }"
                @click="seat !== null && seat !== '입구' && doSelect(seat)"
              >
                {{ seat }}
              </button>
            </div>
          </div>
        </div>
        <div class="seat-map" v-if="selectedOffice === '마포오피스' && selectedFloor === '1F'">
          <div v-for="(row, rowIndex) in mapo1FSeatLayout" :key="'mapo1F_row_' + rowIndex" class="row">
            <div v-for="seat in row" :key="'mapo1F_seat_' + seat" class="col">
              <button
                class="seat"
                :class="{
                  broken: broken.includes(seat),
                  checked: checked.includes(seat),
                  selected: selected.includes(seat),
                  none: seat === null,
                  entrance: seat === '입구',
                }"
                @click="seat !== null && seat !== '입구' && doSelect(seat)"
              >
                {{ seat }}
              </button>
            </div>
          </div>
        </div>
        <div class="seat-map" v-if="selectedOffice === '마포오피스' && selectedFloor === '2F'">
          <div v-for="(row, rowIndex) in mapo2FSeatLayout" :key="'mapo2F_row_' + rowIndex" class="row">
            <div v-for="seat in row" :key="'mapo2F_seat_' + seat" class="col">
              <button
                class="seat"
                :class="{
                  broken: broken.includes(seat),
                  checked: checked.includes(seat),
                  selected: selected.includes(seat),
                  none: seat === null,
                  entrance: seat === '입구',
                }"
                @click="seat !== null && seat !== '입구' && doSelect(seat)"
              >
                {{ seat }}
              </button>
            </div>
          </div>
        </div>
        <div class="seat-map" v-if="selectedOffice === '마포오피스' && selectedFloor === '3F'">
          <div v-for="(row, rowIndex) in mapo3FSeatLayout" :key="'mapo3F_row_' + rowIndex" class="row">
            <div v-for="seat in row" :key="'mapo3F_seat_' + seat" class="col">
              <button
                class="seat"
                :class="{
                  broken: broken.includes(seat),
                  checked: checked.includes(seat),
                  selected: selected.includes(seat),
                  none: seat === null,
                  entrance: seat === '입구',
                }"
                @click="seat !== null && seat !== '입구' && doSelect(seat)"
              >
                {{ seat }}
              </button>
            </div>
          </div>
        </div>

        <!-- 잠실오피스 -->
        <div class="seat-map" v-if="selectedOffice === '잠실오피스' && selectedFloor === 'LOBBY'">
          <div v-for="(row, rowIndex) in jamsilLobbySeatLayout" :key="'jamsilLobby_row_' + rowIndex" class="row">
            <div v-for="seat in row" :key="'jamsilLobby_seat_' + seat" class="col">
              <button
                class="seat"
                :class="{
                  broken: broken.includes(seat),
                  checked: checked.includes(seat),
                  selected: selected.includes(seat),
                  none: seat === null,
                  entrance: seat === '입구',
                }"
                @click="seat !== null && seat !== '입구' && doSelect(seat)"
              >
                {{ seat }}
              </button>
            </div>
          </div>
        </div>
        <div class="seat-map" v-if="selectedOffice === '잠실오피스' && selectedFloor === '1F'">
          <div v-for="(row, rowIndex) in jamsil1FSeatLayout" :key="'jamsil1F_row_' + rowIndex" class="row">
            <div v-for="seat in row" :key="'jamsil1F_seat_' + seat" class="col">
              <button
                class="seat"
                :class="{
                  broken: broken.includes(seat),
                  checked: checked.includes(seat),
                  selected: selected.includes(seat),
                  none: seat === null,
                  entrance: seat === '입구',
                }"
                @click="seat !== null && seat !== '입구' && doSelect(seat)"
              >
                {{ seat }}
              </button>
            </div>
          </div>
        </div>
        <div class="seat-map" v-if="selectedOffice === '잠실오피스' && selectedFloor === '2F'">
          <div v-for="(row, rowIndex) in jamsil2FSeatLayout" :key="'jamsil2F_row_' + rowIndex" class="row">
            <div v-for="seat in row" :key="'jamsil2F_seat_' + seat" class="col">
              <button
                class="seat"
                :class="{
                  broken: broken.includes(seat),
                  checked: checked.includes(seat),
                  selected: selected.includes(seat),
                  none: seat === null,
                  entrance: seat === '입구',
                }"
                @click="seat !== null && seat !== '입구' && doSelect(seat)"
              >
                {{ seat }}
              </button>
            </div>
          </div>
        </div>
        <div class="seat-map" v-if="selectedOffice === '잠실오피스' && selectedFloor === '3F'">
          <div v-for="(row, rowIndex) in jamsil3FSeatLayout" :key="'jamsil3F_row_' + rowIndex" class="row">
            <div v-for="seat in row" :key="'jamsil3F_seat_' + seat" class="col">
              <button
                class="seat"
                :class="{
                  broken: broken.includes(seat),
                  checked: checked.includes(seat),
                  selected: selected.includes(seat),
                  none: seat === null,
                  entrance: seat === '입구',
                }"
                @click="seat !== null && seat !== '입구' && doSelect(seat)"
              >
                {{ seat }}
              </button>
            </div>
          </div>
        </div>

        <!-- 성북오피스 -->
        <div class="seat-map" v-if="selectedOffice === '성북오피스' && selectedFloor === 'LOBBY'">
          <div v-for="(row, rowIndex) in seongbukLobbySeatLayout" :key="'seongbukLobby_row_' + rowIndex" class="row">
            <div v-for="seat in row" :key="'seongbukLobby_seat_' + seat" class="col">
              <button
                class="seat"
                :class="{
                  broken: broken.includes(seat),
                  checked: checked.includes(seat),
                  selected: selected.includes(seat),
                  none: seat === null,
                  entrance: seat === '입구',
                }"
                @click="seat !== null && seat !== '입구' && doSelect(seat)"
              >
                {{ seat }}
              </button>
            </div>
          </div>
        </div>
        <div class="seat-map" v-if="selectedOffice === '성북오피스' && selectedFloor === '1F'">
          <div v-for="(row, rowIndex) in seongbuk1FSeatLayout" :key="'seongbuk1F_row_' + rowIndex" class="row">
            <div v-for="seat in row" :key="'seongbuk1F_seat_' + seat" class="col">
              <button
                class="seat"
                :class="{
                  broken: broken.includes(seat),
                  checked: checked.includes(seat),
                  selected: selected.includes(seat),
                  none: seat === null,
                  entrance: seat === '입구',
                }"
                @click="seat !== null && seat !== '입구' && doSelect(seat)"
              >
                {{ seat }}
              </button>
            </div>
          </div>
        </div>
        <div class="seat-map" v-if="selectedOffice === '성북오피스' && selectedFloor === '2F'">
          <div v-for="(row, rowIndex) in seongbuk2FSeatLayout" :key="'seongbuk2F_row_' + rowIndex" class="row">
            <div v-for="seat in row" :key="'seongbuk2F_seat_' + seat" class="col">
              <button
                class="seat"
                :class="{
                  broken: broken.includes(seat),
                  checked: checked.includes(seat),
                  selected: selected.includes(seat),
                  none: seat === null,
                  entrance: seat === '입구',
                }"
                @click="seat !== null && seat !== '입구' && doSelect(seat)"
              >
                {{ seat }}
              </button>
            </div>
          </div>
        </div>
        <div class="seat-map" v-if="selectedOffice === '성북오피스' && selectedFloor === '3F'">
          <div v-for="(row, rowIndex) in seongbuk3FSeatLayout" :key="'seongbuk3F_row_' + rowIndex" class="row">
            <div v-for="seat in row" :key="'seongbuk3F_seat_' + seat" class="col">
              <button
                class="seat"
                :class="{
                  broken: broken.includes(seat),
                  checked: checked.includes(seat),
                  selected: selected.includes(seat),
                  none: seat === null,
                  entrance: seat === '입구',
                }"
                @click="seat !== null && seat !== '입구' && doSelect(seat)"
              >
                {{ seat }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="sidebar">
        <div class="office-selector">
          <label for="office">오피스를 선택해주세요:</label>
          <select v-model="selectedOffice" id="office" class="custom-select">
            <option v-for="office in offices" :key="office" :value="office">{{ office }}</option>
          </select>
        </div>

        <div class="floor-selector">
          <button @click="selectFloor('LOBBY')" :class="{ active: selectedFloor === 'LOBBY' }">Lobby</button>
          <button @click="selectFloor('1F')" :class="{ active: selectedFloor === '1F' }">1F</button>
          <button @click="selectFloor('2F')" :class="{ active: selectedFloor === '2F' }">2F</button>
          <button @click="selectFloor('3F')" :class="{ active: selectedFloor === '3F' }">3F</button>
        </div>

        <div class="legend">
          <div class="tips" v-show="showTips">
            <div><span class="checked seat seatTip"></span> : 사용 중인 좌석</div>
            <div><span class="selected seat seatTip"></span> : 본인이 사용 중인 좌석</div>
            <div><span class="available seat seatTip"></span> : 사용 가능한 좌석</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 사원 정보 모달 시작 -->
    <div v-if="showEmployeeModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content employee-modal">
        <button class="modal-close" @click="closeModal">×</button>
        <div class="modal-body">
          <div class="employee-photo">
            <v-img src="src/assets/employee.jpg" class="custom-avatar" alt="Avatar"></v-img>
          </div>
          <div class="employee-info">
            <p>이름: {{ employeeInfo.name }}</p>
            <p>사번: {{ employeeInfo.id }}</p>
            <p>부서: {{ employeeInfo.department }}</p>
            <p>직책: {{ employeeInfo.position }}</p>
            <!-- 추가: 사용 중인 좌석 문구 -->
            <div v-if="checked.length > 0" class="used-seats">
              <p>이미 사용 중인 좌석입니다</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 사원 정보 모달 끝 -->
    <!-- 확인 모달 시작 -->
    <div v-if="showConfirmModal" class="modal-overlay" @click.self="closeConfirmModal">
      <div class="modal-content confirm-modal">
        <button class="modal-close" @click="closeConfirmModal">×</button>
        <div class="modal-body">
          <p>{{ confirmMessage }}</p>
          <div class="modal-footer">
            <button @click="confirmAction(true)">확인</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 확인 모달 끝 -->

    <!-- 알림 모달 시작 -->
    <div v-if="showAlertModal" class="modal-overlay" @click.self="closeAlertModal">
      <div class="modal-content alert-modal">
        <button class="modal-close" @click="closeAlertModal">×</button>
        <div class="modal-body">
          <p>{{ alertMessage }}</p>
          <div class="modal-footer">
            <button @click="closeAlertModal">확인</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 알림 모달 끝 -->
  </div>
</template>

<script>
export default {
  name: 'MySeatPicker',
  data() {
    return {
      selected: [],
      selectedOffice: '마포오피스',
      selectedFloor: 'LOBBY', // 기본 값 설정
      offices: ['잠실오피스', '마포오피스', '성북오피스'],
      // 각 오피스와 층별 좌석 배치도 정의
      mapoLobbySeatLayout: [
        [23, 22, 21, null, 22, 25],
        [18, 19, 20, null, 28, 26],
        [15, 16, 17, null, 24, 27],
        [12, 13, 14, null, 9, 10, 11],
        [3, 1, null, 5, 7, null],
        [4, 2, null, 6, 8, null],
        [null, null, '입구', null, null, null],
      ],
      mapo1FSeatLayout: [
        [1, 2, 3, null, 4, 5],
        [6, 7, 8, null, 9, 10],
        [11, 12, 13, null, 14, 15],
        [16, 17, 18, null, 19, 20],
        [21, 22, 23, null, 24, 25],
        [null, null, '입구', null, null, null],
      ],
      mapo2FSeatLayout: [
        [1, null, 2, 3, null, 4],
        [5, 6, null, 7, 8, null],
        [9, 10, 11, null, 12, 13],
        [null, 14, 15, 16, null, 17],
        [18, 19, null, 20, 21, 22],
        [null, null, '입구', null, null, null],
      ],
      mapo3FSeatLayout: [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [null, 16, 17, 18, null],
        [null, 19, 20, 21, 22],
        [23, 24, 25, null, null, null, '입구'],
      ],
      jamsilLobbySeatLayout: [
        [23, 22, 21, null, 22, 25],
        [18, 19, 20, null, 28, 26],
        [15, 16, 17, null, 24, 27],
        [12, 13, 14, null, 9, 10, 11],
        [3, 1, null, 5, 7, null],
        [4, 2, null, 6, 8, null],
        [null, null, '입구', null, null, null],
      ],
      jamsil1FSeatLayout: [
        [1, null, 2, 3, null, 4],
        [5, 6, null, 7, 8, null],
        [9, 10, 11, null, 12, 13],
        [null, 14, 15, 16, null, 17],
        [18, 19, null, 20, 21, 22],
        [null, null, '입구', null, null, null],
      ],
      jamsil2FSeatLayout: [
        [1, 2, 3, null, 4, 5],
        [6, 7, 8, null, 9, 10],
        [11, 12, 13, null, 14, 15],
        [16, 17, 18, null, 19, 20],
        [21, 22, 23, null, 24, 25],
        [null, null, '입구', null, null, null],
      ],
      jamsil3FSeatLayout: [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [null, 16, 17, 18, null],
        [null, 19, 20, 21, 22],
        [23, 24, 25, null, null, null, '입구'],
      ],
      seongbukLobbySeatLayout: [
        [23, 22, 21, null, 22, 25],
        [18, 19, 20, null, 28, 26],
        [15, 16, 17, null, 24, 27],
        [12, 13, 14, null, 9, 10, 11],
        [3, 1, null, 5, 7, null],
        [4, 2, null, 6, 8, null],
        [null, null, '입구', null, null, null],
      ],
      seongbuk1FSeatLayout: [
        [1, null, 2, 3, null, 4],
        [5, 6, null, 7, 8, null],
        [9, 10, 11, null, 12, 13],
        [null, 14, 15, 16, null, 17],
        [18, 19, null, 20, 21, 22],
        [null, null, '입구', null, null, null],
      ],
      seongbuk2FSeatLayout: [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [null, 16, 17, 18, null],
        [null, 19, 20, 21, 22],
        [23, 24, 25, null, null, '입구', null],
      ],
      seongbuk3FSeatLayout: [
        [1, 2, 3, null, 4, 5],
        [6, 7, 8, null, 9, 10],
        [11, 12, 13, null, 14, 15],
        [16, 17, 18, null, 19, 20],
        [21, 22, 23, null, 24, 25],
        [null, null, '입구', null, null, null],
      ],

      checked: [1, 25, 24, 9, 3, 4, 6, 8],
      broken: [],
      showTips: true,
      showEmployeeModal: false,
      showConfirmModal: false,
      showAlertModal: false,
      employeeInfo: {},
      confirmMessage: '',
      confirmAction: null,
      alertMessage: '',
    }
  },
  methods: {
    selectFloor(floor) {
      this.selectedFloor = floor
    },
    doSelect(seat) {
      if (this.checked.includes(seat)) {
        this.showEmployeeInfo(seat)
      } else if (this.selected.includes(seat)) {
        this.confirmAction = confirm => {
          if (confirm) {
            this.selected = this.selected.filter(item => item !== seat)
            this.showAlert(`좌석 번호 ${seat}이(가) 취소되었습니다.`)
          }
          this.closeConfirmModal()
        }
        this.confirmMessage = `좌석 번호 ${seat}을(를) 취소하시겠습니까?`
        this.showConfirmModal = true
      } else {
        this.confirmAction = confirm => {
          if (confirm) {
            this.selected.push(seat)
            this.showAlert(`좌석 번호 ${seat}이(가) 선택되었습니다.`)
          }
          this.closeConfirmModal()
        }
        this.confirmMessage = `좌석 번호 ${seat}을(를) 선택하시겠습니까?`
        this.showConfirmModal = true
      }
      console.log(`선택됨 좌석 번호: ${seat}`)
      console.log('현재 선택된 목록', this.selected)
    },
    showEmployeeInfo(seat) {
      this.employeeInfo = {
        name: '정광수',
        id: '19-71001621',
        department: '개발1팀',
        position: '대리',
      }
      this.showEmployeeModal = true
    },
    closeModal() {
      this.showEmployeeModal = false
      this.employeeInfo = {}
    },
    closeConfirmModal() {
      this.showConfirmModal = false
      this.confirmMessage = ''
      this.confirmAction = null
    },
    showAlert(message) {
      this.alertMessage = message
      this.showAlertModal = true
    },
    closeAlertModal() {
      this.showAlertModal = false
      this.alertMessage = ''
    },
  },
}
</script>

<style scoped>
#mySeatPicker {
  font-size: 1em;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  width: 100vw;
  height: 150vh;
  padding: 50px;
  box-sizing: border-box;
}

.header {
  width: 100%;
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
}

.office-title {
  font-size: 2em;
  margin-bottom: 20px;
}

.seat-picker-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}

.seat-map-wrapper {
  border: 2px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  margin-right: 20px; /* 사이드바와의 간격 */
  flex-grow: 1;
  max-width: 800px;
}

.seat-map {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  height: 100%;
}

.sidebar {
  display: flex;
  flex-direction: column;
  width: 300px; /* 사이드바 너비 설정 */
  padding: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin-left: 20px; /* 좌석 배치도와 간격 조절 */
}

.office-selector {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
}

.floor-selector {
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: flex-start; /* 왼쪽 정렬 */
  gap: 10px;
  margin-bottom: 20px;
}

.floor-selector button {
  padding: 10px 30px; /* 버튼 크기 증가 */
  font-size: 1em; /* 글자 크기 증가 */
  cursor: pointer;
  background-color: #f9f9f9; /* 기본 배경 색상 */
  border: 2px solid #c0c0c0; /* 차분한 회색 테두리 */
  border-radius: 8px; /* 모서리 둥글게 */
  color: #4f4f4f; /* 기본 글자 색상 */
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease; /* 부드러운 전환 효과 */
  width: 100%; /* 모든 버튼 너비 동일하게 설정 */
  box-sizing: border-box; /* 패딩 포함하여 크기 계산 */
  text-align: center; /* 버튼 텍스트 가운데 정렬 */
}

.floor-selector button:hover {
  background-color: #e0e0e0; /* 호버 시 배경 색상 변경 */
  color: #000000; /* 호버 시 글자 색상 변경 */
  transform: scale(1.05); /* 호버 시 약간 확대 효과 */
}

.floor-selector .active {
  background-color: #d0d0d0; /* 활성 상태 배경 색상 */
  color: white; /* 활성 상태 글자 색상 */
  border: 2px solid #d0d0d0; /* 활성 상태 테두리 색상 */
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start; /* 왼쪽 정렬 */
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

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 500px;
  position: relative;
}

.employee-modal {
  max-width: 600px;
}

.confirm-modal {
  max-width: 400px;
}

.alert-modal {
  max-width: 400px;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

.modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.employee-photo {
  width: 150px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.employee-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.employee-modal .modal-body {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.modal-footer {
  margin-top: 20px;
  text-align: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 20px;
}

.custom-select {
  border: 1px solid #a19c9c;
  padding: 10px;
  appearance: none;
  font-size: 1em;
}
</style>
