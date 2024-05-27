<template>
  <div id="mySeatPicker">
    <h2 class="office-title">{{ selectedOffice }}</h2>

    <div class="seat-picker-container">
      <div class="seat-map">
        <div v-for="(row, rowIndex) in seatLayout" :key="'row_' + rowIndex" class="row">
          <div v-for="seat in row" :key="'seat_' + seat" class="col">
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

      <div class="sidebar">
        <div class="office-selector">
          <label for="office">오피스를 선택해주세요:</label>
          <select v-model="selectedOffice" id="office" class="custom-select">
            <option v-for="office in offices" :key="office" :value="office">{{ office }}</option>
          </select>
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

    <!-- 모달 시작 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">×</button>
        <div class="modal-body">
          <div class="employee-photo">사진</div>
          <div class="employee-info">
            <p>이름: {{ employeeInfo.name }}</p>
            <p>사번: {{ employeeInfo.id }}</p>
            <p>소속: {{ employeeInfo.department }}</p>
            <p>직책: {{ employeeInfo.position }}</p>
          </div>
        </div>
        <div class="modal-footer">이미 사용 중인 좌석입니다</div>
      </div>
    </div>
    <!-- 모달 끝 -->
  </div>
</template>

<script>
export default {
  name: 'MySeatPicker',
  data() {
    return {
      selected: [],
      selectedOffice: '잠실오피스',
      offices: ['잠실오피스', '마포오피스', '성북오피스'],
      seatLayout: [
        [18, 19, 20, null, 23, 26],
        [15, 16, 17, null, 24, 27],
        [12, 13, 14, 9, 10, 11],
        [3, 1, null, 5, 7, null],
        [4, 2, null, 6, 8, null],
        [null, null, '입구', null, null, null],
      ],
      checked: [1, 22, 26, 24, 9, 3, 4, 6, 8],
      broken: [],
      showTips: true,
      showModal: false,
      employeeInfo: {},
    }
  },
  methods: {
    doSelect(seat) {
      if (this.checked.includes(seat)) {
        this.showEmployeeInfo(seat)
      } else if (this.selected.includes(seat)) {
        if (confirm(`좌석 번호 ${seat}을(를) 취소하시겠습니까?`)) {
          this.selected = this.selected.filter(item => item !== seat)
          alert(`좌석 번호 ${seat}이(가) 취소되었습니다.`)
        }
      } else {
        if (confirm(`좌석 번호 ${seat}을(를) 예약하시겠습니까?`)) {
          this.selected.push(seat)
          alert(`좌석 번호 ${seat}이(가) 선택되었습니다.`)
        }
      }
      console.log(`선택됨 좌석 번호: ${seat}`)
      console.log('현재 선택된 목록', this.selected)
    },
    showEmployeeInfo(seat) {
      // 예시 정보, 실제 구현 시에는 좌석에 해당하는 사원 정보를 가져올 것
      this.employeeInfo = {
        name: '정광수',
        id: '19-71001621',
        department: '개발1팀',
        position: '대리',
      }
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.employeeInfo = {}
    },
  },
}
</script>

<style scoped>
#mySeatPicker {
  font-size: 0.9em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.office-title {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.header {
  margin-bottom: 20px;
}

.office-selector {
  margin-bottom: 20px;
}

.seat-picker-container {
  display: flex;
  align-items: flex-start;
}

.seat-map {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
}

.sidebar {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-bottom: 10px;
}

.col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.seat {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border: 1px solid #a19c9c;
  display: flex;
  align-items: center;
  justify-content: center;
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
  max-width: 800px; /* 크기를 더 크게 설정 */
  width: 100%;
  position: relative;
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
  gap: 20px;
}

.employee-photo {
  width: 150px;
  height: 200px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 1.2em;
  color: #999;
}

.employee-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.employee-info p {
  margin: 5px 0;
}

.modal-footer {
  margin-top: 20px;
  text-align: center;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
}

.custom-select {
  border: 1px solid #a19c9c;
  padding: 5px 30px 5px 10px;
  appearance: none;
  background: url('data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns%3D%27http%3A//www.w3.org/2000/svg%27 width%3D%2716%27 height%3D%2716%27 fill%3D%27%23000%27 class%3D%27bi bi-chevron-down%27 viewBox%3D%270 0 16 16%27%3E%3Cpath fill-rule%3D%27evenodd%27 d%3D%27M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z%27/%3E%3C/svg%3E')
    no-repeat right 10px center/8px 10px;
}
</style>
