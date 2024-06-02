<template>
  <v-container>
    <v-card class="mypage">
      <v-card-title>
        <h2>마이페이지</h2>
      </v-card-title>
      <v-card-text>
        <v-row class="header"> </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-img :src="'src/assets/employee.jpg'" aspect-ratio="1.0" class="photo"></v-img>
          </v-col>
          <v-col cols="12" md="8">
            <v-form>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="이름" v-model="name" readonly class="custom-text-field"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="사번" v-model="employeeId" readonly class="custom-text-field"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="생년월일" v-model="dob" readonly class="custom-text-field"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="성별" v-model="gender" readonly class="custom-text-field"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="소속" v-model="affiliation" readonly class="custom-text-field"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="부서" v-model="department" readonly class="custom-text-field"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="직위" v-model="position" readonly class="custom-text-field"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="직책" v-model="role" readonly class="custom-text-field"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="입사일" v-model="hireDate" readonly class="custom-text-field"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="잔여 휴가" v-model="vacation" readonly class="custom-text-field"></v-text-field>
                </v-col>
              </v-row>
              <v-btn color="primary" class="ma-2" @click="openPasswordModal">비밀번호 수정하기</v-btn>
            </v-form>
          </v-col>
        </v-row>

        <!-- Tabs for personal information and skills using div -->
        <div class="tabs">
          <button @click="selectedTab = 0" :class="{ active: selectedTab === 0 }">개인정보</button>
          <button @click="selectedTab = 1" :class="{ active: selectedTab === 1 }">개인역량</button>
        </div>
        <div v-if="selectedTab === 0" class="tab-content">
          <!-- 개인정보 Tab -->
          <v-form>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  class="custom-text-field"
                  label="연락처"
                  v-model="contact"
                  :readonly="!isEditable"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  class="custom-text-field"
                  label="주소"
                  v-model="address"
                  :readonly="!isEditable"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  class="custom-text-field"
                  label="이메일"
                  v-model="email"
                  :readonly="!isEditable"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn color="primary" class="ma-2" @click="toggleEdit">{{ isEditable ? '수정 완료' : '수정하기' }}</v-btn>
          </v-form>
        </div>
        <div v-else class="tab-content">
          <!-- 개인역량 Tab -->
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-chip-group>
                  <v-chip
                    v-for="(skill, index) in skills"
                    :key="index"
                    @click="isEditableSkills && removeSkill(index)"
                    close
                  >
                    {{ skill }}
                  </v-chip>
                </v-chip-group>
                <v-select
                  v-if="isEditableSkills"
                  v-model="newSkill"
                  :items="availableSkills"
                  label="개인역량을 선택해주세요"
                ></v-select>
                <v-btn v-if="isEditableSkills" color="primary" class="ma-2" @click="addSkill">추가</v-btn>
              </v-col>
            </v-row>
            <v-btn color="primary" class="ma-2" @click="toggleEditSkills">{{
              isEditableSkills ? '수정 완료' : '수정하기'
            }}</v-btn>
          </v-form>
        </div>
      </v-card-text>
    </v-card>

    <!-- Password Modal -->
    <v-dialog v-model="showPasswordModal" max-width="500px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="headline">비밀번호를 수정하시겠습니까?</span>
          <v-btn icon @click="closePasswordModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="기존 비밀번호" v-model="currentPassword" type="password"></v-text-field>
            <v-text-field label="새 비밀번호" v-model="newPassword" type="password"></v-text-field>
            <v-text-field label="비밀번호 확인" v-model="confirmPassword" type="password"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="updatePassword">수정하기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Success Modal -->
    <v-dialog v-model="showSuccessModal" max-width="500px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="headline">성공</span>
        </v-card-title>
        <v-card-text>
          <p>비밀번호가 수정되었습니다.</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="closeSuccessModal">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Error Modal -->
    <v-dialog v-model="showErrorModal" max-width="500px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="headline">오류</span>
        </v-card-title>
        <v-card-text>
          <p v-if="errorType === 'mismatch'">비밀번호가 일치하지 않습니다.</p>
          <p v-else>
            비밀번호는 8자 이상 16자 이하 문자(a-z), 숫자(0-9), 특수문자 포함 (!,@,#,$,%,^,&,*,_)를 포함해야 합니다.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="closeErrorModal">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue'

// Tabs configuration
const selectedTab = ref(0) // 초기값을 숫자로 설정

const affiliation = ref('IT사업부')
const employeeId = ref('19-71001621')
const name = ref('정광수')
const dob = ref('1998-12-04')
const gender = ref('남')
const department = ref('IT개발팀')
const hireDate = ref('2024-04-12')
const position = ref('과장')
const role = ref('팀장')
const vacation = ref('10')

const contact = ref(localStorage.getItem('contact') || '010-2532-9705')
const address = ref(localStorage.getItem('address') || '서울시 성북구 아리랑로 75')
const email = ref(localStorage.getItem('email') || 'ericj1204@naver.com')

const availableSkills = ref([
  'Python',
  'Java',
  'C',
  'C++',
  'C#',
  'JavaScript',
  'TypeScript',
  'Ruby',
  'PHP',
  'Swift',
  'Kotlin',
  'R',
  'Go',
  'Rust',
  'Scala',
  'Perl',
  'Haskell',
  'Objective-C',
  'MATLAB',
  'SQL',
  'English',
  'Japanese',
  'Chinese (Mandarin)',
  'Spanish',
  'French',
  'German',
  'Russian',
  'Italian',
  'Portuguese',
  'Arabic',
  'Hindi',
])
const newSkill = ref('')
const isEditable = ref(false)
const isEditableSkills = ref(false)
const showPasswordModal = ref(false) // Modal visibility state
const showErrorModal = ref(false) // Error modal visibility state
const showSuccessModal = ref(false) // Success modal visibility state
const currentPassword = ref('jks981204')
const newPassword = ref('')
const confirmPassword = ref('')
const errorType = ref('')

const skills = ref(JSON.parse(localStorage.getItem('skills')) || [])

watch(
  skills,
  newSkills => {
    localStorage.setItem('skills', JSON.stringify(newSkills))
  },
  { deep: true },
)

watch([contact, address, email], ([newContact, newAddress, newEmail]) => {
  localStorage.setItem('contact', newContact)
  localStorage.setItem('address', newAddress)
  localStorage.setItem('email', newEmail)
})

const validatePassword = password => {
  const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}$/
  return regex.test(password)
}

const updatePassword = () => {
  if (!validatePassword(newPassword.value)) {
    errorType.value = 'invalid'
    showErrorModal.value = true
  } else if (newPassword.value !== confirmPassword.value) {
    errorType.value = 'mismatch'
    showErrorModal.value = true
  } else {
    showSuccessModal.value = true
    closePasswordModal()
  }
}

const toggleEdit = () => {
  isEditable.value = !isEditable.value
}

const toggleEditSkills = () => {
  isEditableSkills.value = !isEditableSkills.value
}

const removeSkill = index => {
  skills.value.splice(index, 1)
}

const addSkill = () => {
  if (newSkill.value && !skills.value.includes(newSkill.value)) {
    skills.value.push(newSkill.value)
    newSkill.value = ''
  }
}

const openPasswordModal = () => {
  showPasswordModal.value = true
}

const closePasswordModal = () => {
  showPasswordModal.value = false
  resetPasswordFields()
}

const closeErrorModal = () => {
  showErrorModal.value = false
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}

const resetPasswordFields = () => {
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
}
</script>

<style>
.mypage {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.photo {
  width: 150px;
  height: 200px;
  object-fit: cover;
}

button {
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button.active {
  background-color: #0056b3;
}

button:focus {
  outline: none;
}

button:hover {
  background-color: #0056b3;
}

.update-password,
.update-info {
  padding: 8px 12px;
  border: 1px solid #333; /* Dark border for visibility */
  background-color: #007bff; /* Blue background for visibility */
  color: #fff; /* White text color for contrast */
  border-radius: 4px; /* Rounded corners for better visibility */
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Add slight shadow for depth */
}

.update-password:hover,
.update-info:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

.tags {
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  margin-left: 10px;
}

.tag {
  background-color: #b5c0cc;
  color: #000; /* Change text color to black */
  padding: 5px 15px;
  margin: 3px;
  border-radius: 10px;
  display: inline-flex;
  position: relative;
}

.remove-tag:hover {
  color: #ff0000;
}

/* 추가된 스타일 */
.custom-text-field {
  margin-bottom: 20px; /* 필드 간 간격 조정 */
}

.custom-text-field input[readonly],
.custom-text-field input[disabled] {
  color: #000 !important; /* 텍스트 색상을 검정색으로 변경 */
  opacity: 1 !important; /* 입력 필드가 흐리게 보이지 않도록 설정 */
}

.custom-text-field .v-input__control[readonly],
.custom-text-field .v-input__control[disabled] {
  border-color: #000 !important; /* 테두리 색상을 검정색으로 변경 */
}

.custom-text-field .v-label {
  color: #000 !important; /* 라벨 색상을 검정색으로 변경 */
}

.tabs {
  margin-top: 20px; /* 탭과 내용 사이의 간격 조정 */
}

.tab-content {
  margin-top: 20px; /* 탭과 내용 사이의 간격 조정 */
}
</style>
