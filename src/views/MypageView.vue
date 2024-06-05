<template>
  <h1 class="">| 마이페이지</h1>
  <VCard>
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
                <v-text-field label="이름" v-model="user.userName" readonly class="custom-text-field"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="사번" v-model="user.userId" readonly class="custom-text-field"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="생년월일"
                  v-model="user.userBirth"
                  readonly
                  class="custom-text-field"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="성별" v-model="user.userGender" readonly class="custom-text-field"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="소속 부서"
                  v-model="userDepartmentName"
                  readonly
                  class="custom-text-field"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="소속 팀" v-model="userTeamName" readonly class="custom-text-field"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="직위" v-model="userPositionName" readonly class="custom-text-field"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="직책" v-model="userRankName" readonly class="custom-text-field"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="입사일"
                  v-model="user.userJoinDate"
                  readonly
                  class="custom-text-field"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="잔여 휴가"
                  v-model="user.userRemainVacation"
                  readonly
                  class="custom-text-field"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn color="primary" class="ma-2" @click="openPasswordModal">비밀번호 수정하기</v-btn>
          </v-form>
        </v-col>
      </v-row>

      <!-- Tabs for personal information and abilities using div -->
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
                v-model="user.userMobile"
                :readonly="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                class="custom-text-field"
                label="주소"
                v-model="user.userAddress"
                :readonly="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                class="custom-text-field"
                label="이메일"
                v-model="user.userEmail"
                :readonly="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn color="primary" class="ma-2" @click="updateUserInfo">{{
            isEditable ? '수정 완료' : '수정하기'
          }}</v-btn>
        </v-form>
      </div>
      <div v-else class="tab-content">
        <!-- 개인역량 Tab -->
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-chip-group>
                <v-chip
                  v-for="(ability, index) in userAbilities"
                  :key="index"
                  @click="isEditableAbilities && removeAbility(index)"
                  close
                >
                  {{ ability }}
                </v-chip>
              </v-chip-group>
              <v-select
                v-if="isEditableAbilities"
                v-model="newAbility"
                :items="availableAbilities"
                label="개인역량을 선택해주세요"
              ></v-select>
              <v-btn v-if="isEditableAbilities" color="primary" class="ma-2" @click="addAbility">추가</v-btn>
            </v-col>
          </v-row>
          <v-btn color="primary" class="ma-2" @click="toggleEditAbilities">{{
            isEditableAbilities ? '수정 완료' : '수정하기'
          }}</v-btn>
        </v-form>
      </div>
    </v-card-text>
  </VCard>

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
    <VCard>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="headline">성공</span>
      </v-card-title>
      <v-card-text>
        <p>비밀번호가 수정되었습니다.</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="closeSuccessModal">확인</v-btn>
      </v-card-actions>
    </VCard>
  </v-dialog>

  <!-- Error Modal -->
  <v-dialog v-model="showErrorModal" max-width="500px">
    <VCard>
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
    </VCard>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import api from '/src/api/axios.js'
import { useCodeStore } from '/src/stores/useCodeStore.js'

const selectedTab = ref(0) // 초기값을 숫자로 설정

const userId = ref('user01')

const user = ref({
  userDepartment: '',
  userTeam: '',
  userPosition: '',
  userRank: '',
  skills: [],
})

const userDepartmentName = ref('')
const userTeamName = ref('')
const userPositionName = ref('')
const userRankName = ref('')

const userAbilities = ref([])
const newAbility = ref('')
const isEditable = ref(false)
const isEditableAbilities = ref(false)
const showPasswordModal = ref(false) // Modal visibility state
const showErrorModal = ref(false) // Error modal visibility state
const showSuccessModal = ref(false) // Success modal visibility state
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const errorType = ref('')

const store = useCodeStore()

const loadUserData = async () => {
  try {
    console.log('Fetching user data for userId:', userId.value)
    const response = await api.get(`/user/info/${userId.value}`)
    console.log('User data loaded:', response)

    const userData = response.data.data
    userData.userJoinDate = formatDate(userData.userJoinDate)
    userData.skills = userData.skills || []
    user.value = userData

    userDepartmentName.value = getCodeName(user.value.userDepartment)
    userTeamName.value = getCodeName(user.value.userTeam)
    userPositionName.value = getCodeName(user.value.userPosition)
    userRankName.value = getCodeName(user.value.userRank)
  } catch (error) {
    console.error('Failed to load user data:', error)
    if (error.response) {
      console.error('Error response data:', error.response.data)
      console.error('Error response status:', error.response.status)
      console.error('Error response headers:', error.response.headers)
    }
  }
}
const updateUserInfo = async () => {
  try {
    const response = await api.post('/user/update', {
      userId: user.value.userId,
      userMobile: user.value.userMobile,
      userAddress: user.value.userAddress,
      userEmail: user.value.userEmail,
    })
    console.log('User info updated:', response.data.data)
    isEditable.value = !isEditable.value
  } catch (error) {
    console.error('Failed to update user info:', error)
  }
}

const loadUserAbilities = async () => {
  try {
    const response = await api.get(`/user/ability/${userId.value}`)
    const abilities = response.data.data

    console.log('API response:', abilities) // 전체 응답 데이터 출력

    userAbilities.value = abilities.map(ability => {
      console.log('abilityName:', ability.abilityName) // 필드 이름 수정
      const codeName = store.getCodeName(ability.abilityName)
      console.log('Converted Code Name:', codeName) // 변환 결과 확인
      return codeName
    }) // abilityName을 코드명으로 변환하여 저장
  } catch (error) {
    console.error('Failed to load user abilities:', error)
  }
}

const formatDate = dateString => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('ko-KR', options)
}

const getCodeName = code => {
  return store.getCodeName(code)
}

onMounted(() => {
  loadUserData()
  loadUserAbilities()
})

const validatePassword = password => {
  const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}$/
  return regex.test(password)
}

const updatePassword = async () => {
  if (!validatePassword(newPassword.value)) {
    errorType.value = 'invalid'
    showErrorModal.value = true
  } else if (newPassword.value !== confirmPassword.value) {
    errorType.value = 'mismatch'
    showErrorModal.value = true
  } else {
    try {
      // 비밀번호가 성공적으로 업데이트되었을 때
      showSuccessModal.value = true // 성공 모달 표시
      closePasswordModal() // 비밀번호 모달 닫기
    } catch (error) {
      console.error('Failed to update password:', error)
      // 오류 처리
    }
  }
}

const toggleEdit = () => {
  isEditable.value = !isEditable.value
}

const toggleEditAbilities = () => {
  isEditableAbilities.value = !isEditableAbilities.value
}

const removeAbility = index => {
  user.value.abilities.splice(index, 1)
}

const addAbility = () => {
  if (newAbility.value && !user.value.abilities.includes(newAbility.value)) {
    user.value.abilities.push(newAbility.value)
    newAbility.value = ''
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

<style scoped>
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

/* 추가된 스타일 */
.custom-text-field {
  margin-bottom: 20px; /* 필드 간 간격 조정 */
}

.tab-content {
  margin-top: 20px; /* 탭과 내용 사이의 간격 조정 */
}
</style>
