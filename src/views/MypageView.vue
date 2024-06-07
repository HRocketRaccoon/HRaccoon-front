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
                @input="formatPhoneNumber"
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
          <v-btn color="primary" class="ma-2" @click="toggleEdit">
            {{ isEditable ? '수정 완료' : '수정하기' }}
          </v-btn>
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
                item-text="name"
                item-value="code"
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
  <!-- Success Modal for Personal Information Update -->
  <v-dialog v-model="showUserInfoSuccessModal" max-width="500px">
    <VCard>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="headline">성공</span>
      </v-card-title>
      <v-card-text>
        <p>개인정보가 수정되었습니다.</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="closeUserInfoSuccessModal">확인</v-btn>
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
        <p v-if="errorType === 'phone'">전화번호 형식이 알맞지 않습니다.</p>
        <p v-else-if="errorType === 'email'">이메일 형식이 알맞지 않습니다.</p>
        <p v-else-if="errorType === 'mismatch'">비밀번호가 일치하지 않습니다.</p>
        <p v-else>
          비밀번호는 8자 이상 16자 이하 문자(a-z), 숫자(0-9), 특수문자 포함 (!,@,#,$,%,^,&,*)를 포함해야 합니다.
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
  abilities: [],
})

const userDepartmentName = ref('')
const userTeamName = ref('')
const userPositionName = ref('')
const userRankName = ref('')

const store = useCodeStore()

const availableAbilities = ref(store.getAllAbilities())

const userAbilities = ref([])
const newAbility = ref([])
const isEditable = ref(false)
const isEditableAbilities = ref(false)
const showPasswordModal = ref(false) // Modal visibility state
const showErrorModal = ref(false) // Error modal visibility state
const showSuccessModal = ref(false) // Success modal visibility state
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const errorType = ref('')

const loadAvailableAbilities = () => {
  // 가져온 코드를 다시 코드 이름으로 변경하여 availableAbilities에 저장합니다.
  availableAbilities.value = availableAbilities.value.map(code => store.getCodeName(code))

  console.log('ability list: ', availableAbilities)
}

const convertGender = gender => {
  if (gender === 'MALE') return '남자'
  if (gender === 'FEMALE') return '여자'
  return gender
}

const formatPhoneNumber = event => {
  let phoneNumber = event.target.value.replace(/\D/g, '')
  if (phoneNumber.length > 3 && phoneNumber.length <= 7) {
    phoneNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`
  } else if (phoneNumber.length > 7) {
    phoneNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`
  }
  user.value.userMobile = phoneNumber
}
const validateEmail = email_address => {
  let email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i
  return email_regex.test(email_address)
}

const loadUserData = async () => {
  try {
    console.log('Fetching user data for userId:', userId.value)
    const response = await api.get(`/user/info/${userId.value}`)
    console.log('User data loaded:', response)

    const userData = response.data.data
    userData.userJoinDate = formatDate(userData.userJoinDate)
    userData.abilities = userData.abilities || []
    userData.userGender = convertGender(userData.userGender) // 성별 값 변환
    user.value = userData

    userDepartmentName.value = getCodeName(user.value.userDepartment)
    userTeamName.value = getCodeName(user.value.userTeam)
    userPositionName.value = getCodeName(user.value.userPosition)
    userRankName.value = getCodeName(user.value.userRank)

    saveUserDataToLocalStorage()
  } catch (error) {
    console.error('Failed to load user data:', error)
    if (error.response) {
      console.error('Error response data:', error.response.data)
      console.error('Error response status:', error.response.status)
      console.error('Error response headers:', error.response.headers)
    }
  }
}
const validatePhoneNumber = phoneNumber => {
  const regex = /^\d{3}-\d{4}-\d{4}$/
  return regex.test(phoneNumber)
}
const updateUserInfo = async () => {
  if (!validatePhoneNumber(user.value.userMobile)) {
    errorType.value = 'phone'
    showErrorModal.value = true
    return
  }

  if (!validateEmail(user.value.userEmail)) {
    errorType.value = 'email'
    showErrorModal.value = true
    return
  }

  try {
    const response = await api.post('/user/update', {
      userId: user.value.userId,
      userMobile: user.value.userMobile,
      userAddress: user.value.userAddress,
      userEmail: user.value.userEmail,
    })
    console.log('User info updated:', response.data.data)
    if (isEditable.value) {
      isEditable.value = false
      showUserInfoSuccessModal.value = true // 개인정보 수정 성공 모달 표시
    }

    saveUserDataToLocalStorage()
  } catch (error) {
    console.error('Failed to update user info:', error)
  }
}

const loadUserAbilities = async () => {
  try {
    const response = await api.get(`/user/ability/${userId.value}`)
    const abilities = response.data.data
    userAbilities.value = abilities.map(ability => ability.abilityName) // ABILITYNAME을 코드명으로 변환하여 저장

    console.log('user ability :', abilities)
    saveUserAbilitiesToLocalStorage()
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

const saveUserDataToLocalStorage = () => {
  localStorage.setItem('user', JSON.stringify(user.value))
  localStorage.setItem('userDepartmentName', userDepartmentName.value)
  localStorage.setItem('userTeamName', userTeamName.value)
  localStorage.setItem('userPositionName', userPositionName.value)
  localStorage.setItem('userRankName', userRankName.value)
}

const saveUserAbilitiesToLocalStorage = () => {
  localStorage.setItem('userAbilities', JSON.stringify(userAbilities.value))
}

const loadUserDataFromLocalStorage = () => {
  const savedUser = localStorage.getItem('user')
  const savedUserDepartmentName = localStorage.getItem('userDepartmentName')
  const savedUserTeamName = localStorage.getItem('userTeamName')
  const savedUserPositionName = localStorage.getItem('userPositionName')
  const savedUserRankName = localStorage.getItem('userRankName')
  const savedUserAbilities = localStorage.getItem('userAbilities')

  if (savedUser) {
    const userData = JSON.parse(savedUser)
    userData.userGender = convertGender(userData.userGender) // 성별 값 변환
    user.value = userData
  }
  if (savedUserDepartmentName) userDepartmentName.value = savedUserDepartmentName
  if (savedUserTeamName) userTeamName.value = savedUserTeamName
  if (savedUserPositionName) userPositionName.value = savedUserPositionName
  if (savedUserRankName) userRankName.value = savedUserRankName
  if (savedUserAbilities) userAbilities.value = JSON.parse(savedUserAbilities)
}

const updateUserAbilities = async () => {
  try {
    const response = await api.post(
      `/user/ability/update/${userId.value}`,
      userAbilities.value.map(ability => ({
        abilityName: ability,
      })),
    )
    console.log('User abilities updated:', response.data.data)
    saveUserAbilitiesToLocalStorage()
  } catch (error) {
    console.error('Failed to update user abilities:', error)
  }
}

onMounted(() => {
  loadUserDataFromLocalStorage()
  loadUserData()
  loadUserAbilities()
  loadAvailableAbilities([]) // 사용 가능한 모든 역량을 로드합니다.
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
  if (isEditable.value) {
    updateUserInfo()
  } else {
    isEditable.value = true
  }
}

const toggleEditAbilities = () => {
  isEditableAbilities.value = !isEditableAbilities.value
}

const removeAbility = index => {
  userAbilities.value.splice(index, 1)
  saveUserAbilitiesToLocalStorage()
  updateUserAbilities() // DB 업데이트 호출
}
const addAbility = () => {
  if (newAbility.value && !userAbilities.value.includes(newAbility.value)) {
    userAbilities.value.push(newAbility.value) // 문자열 값을 추가
    newAbility.value = ''
    saveUserAbilitiesToLocalStorage()
    updateUserAbilities()
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
const showUserInfoSuccessModal = ref(false)

const closeUserInfoSuccessModal = () => {
  showUserInfoSuccessModal.value = false
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
