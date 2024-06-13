<template>
  <h1>| 마이페이지</h1>
  <VCard class="mb-4">
    <VCardText>
      <VRow>
        <VCol cols="12" md="4">
          <VImg :src="'src/assets/employee.jpg'" aspect-ratio="1.0" class="photo"></VImg>
        </VCol>
        <VCol cols="12" md="8">
          <VRow>
            <VCol cols="12" md="6">
              <VTextField v-model="params.userName" class="custom-text-field" label="이름" readonly />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="params.userId" class="custom-text-field" label="사번" readonly />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="6">
              <VTextField v-model="params.userBirth" class="custom-text-field" label="생년월일" readonly />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="params.userGender" class="custom-text-field" label="성별" readonly />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="6">
              <VTextField v-model="params.userDepartmentName" class="custom-text-field" label="소속 부서" readonly />
            </VCol>
            <VCol cols="12" md="6">
              <v-text-field v-model="params.userTeamName" class="custom-text-field" label="소속 팀" readonly />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="6">
              <VTextField v-model="params.userPositionName" class="custom-text-field" label="직위" readonly />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="params.userRankName" class="custom-text-field" label="직책" readonly />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="6">
              <VTextField v-model="params.userJoinDate" class="custom-text-field" label="입사일" readonly />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="params.userRemainVacation" class="custom-text-field" label="잔여 휴가" readonly />
            </VCol>
          </VRow>
        </VCol>
      </VRow>
      <VRow>
        <VBtn class="ml-auto" color="primary" size="large">비밀번호 수정하기</VBtn>
      </VRow>
    </VCardText>
  </VCard>

  <VCard>
    <VTabs v-model="tab" fixed-tabs>
      <VTab text="개인 정보" value="tab-1"></VTab>
      <VTab text="개인 역량" value="tab-2"></VTab>
    </VTabs>

    <VTabsWindow v-model="tab">
      <VTabsWindowItem v-for="i in 2" :key="i" :value="'tab-' + i">
        <VCardText>
          <!-- 개인정보 Tab -->
          <div v-if="i === 1">
            <VRow>
              <VCol cols="12" md="6">
                <VTextField
                  v-model="params.userMobile"
                  :readonly="!isEditable"
                  class="custom-text-field"
                  label="연락처"
                  @input="formatPhoneNumber"
                />
              </VCol>
              <VCol cols="12" md="6">
                <VTextField
                  v-model="params.userEmail"
                  :readonly="!isEditable"
                  class="custom-text-field"
                  label="이메일"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="params.userAddress"
                  :readonly="!isEditable"
                  class="custom-text-field"
                  label="주소"
                />
              </VCol>
            </VRow>
            <VRow>
              <VBtn class="ml-auto" color="primary" size="large" @click="toggleEdit">
                {{ isEditable ? '수정 완료' : '수정하기' }}
              </VBtn>
            </VRow>
          </div>

          <!-- 개인역량 Tab -->
          <div v-if="i === 2">
            <VRow>
              <VCol>
                <VChipGroup>
                  <VChip
                    v-for="(ability, index) in userAbilities"
                    :key="index"
                    close
                    @click="isEditableAbilities && removeAbility(index)"
                  >
                    {{ ability }}
                  </VChip>
                </VChipGroup>
              </VCol>
            </VRow>
            <VRow>
              <VSelect
                v-if="isEditableAbilities"
                v-model="newAbility"
                :items="availableAbilities"
                item-text="name"
                item-value="code"
                label="개인역량을 선택해주세요"
              />

              <VBtn v-if="isEditableAbilities" class="ml-8" color="primary" size="large" @click="addAbility">추가</VBtn>
            </VRow>
            <VRow class="mt-5">
              <VBtn class="ml-auto" color="primary" size="large" @click="toggleEditAbilities"
                >{{ isEditableAbilities ? '수정 완료' : '수정하기' }}
              </VBtn>
            </VRow>
          </div>
        </VCardText>
      </VTabsWindowItem>
    </VTabsWindow>
  </VCard>

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
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'

// api
import api from '/src/api/axios.js'

// store
import { useCodeStore } from '/src/stores/useCodeStore.js'
import { useAuthStore } from '@/stores/useAuthStore.js'

// util
import { validateEmail, validatePhoneNumber } from '@/util/util.js'

const useAuth = useAuthStore()
const store = useCodeStore()

const params = ref({
  userDepartment: '',
  userTeam: '',
  userPosition: '',
  userRank: '',
  userDepartmentName: '',
  abilities: [],
})
const userId = ref(useAuth.userId)
const tab = ref('tab-1')

const availableAbilities = ref(store.getAllAbilities())

const userAbilities = ref([])
const newAbility = ref([])

const isEditable = ref(false)
const isEditableAbilities = ref(false)

const showErrorModal = ref(false) // Error modal visibility state
const showSuccessModal = ref(false) // Success modal visibility state

const errorType = ref('')

const fetchUserInfo = async () => {
  try {
    const response = await api.get(`/user/info/${userId.value}`)
    console.log('[SUCCESS] fetchUserInfo response:', response.data)

    params.value = {
      ...response.data.data,
      userBirth: dayjs(response.data.data.userBirth).format('YYYY년 MM월 DD일'),
      userJoinDate: dayjs(response.data.data.userJoinDate).format('YYYY년 MM월 DD일'),
      userGender: convertGender(response.data.data.userGender),
      userDepartmentName: getCodeName(response.data.data.userDepartment),
      userTeamName: getCodeName(response.data.data.userTeam),
      userPositionName: getCodeName(response.data.data.userPosition),
      userRankName: getCodeName(response.data.data.userRank),
    }
  } catch (error) {
    console.error('[ERROR] fetchUserInfo error:', error.response)
  }
}

const fetchUserAbilities = async () => {
  try {
    const response = await api.get(`/user/ability/${userId.value}`)
    console.log('[SUCCESS] fetchUserAbilities response:', response.data)
    const abilities = response.data.data

    userAbilities.value = abilities.map(ability => ability.abilityName) // ABILITYNAME을 코드명으로 변환하여 저장
  } catch (error) {
    console.error('[ERROR] fetchUserInfo error:', error.response)
  }
}

const fetchUpdateUserInfo = async () => {
  if (!validatePhoneNumber(params.value.userMobile)) {
    errorType.value = 'phone'
    showErrorModal.value = true
    return
  }

  if (!validateEmail(params.value.userEmail)) {
    errorType.value = 'email'
    showErrorModal.value = true
    return
  }

  try {
    const response = await api.post('/user/update', {
      userId: params.value.userId,
      userMobile: params.value.userMobile,
      userAddress: params.value.userAddress,
      userEmail: params.value.userEmail,
    })
    console.log('[SUCCESS] fetchUpdateUserInfo response:', response.data)

    if (isEditable.value) {
      isEditable.value = false
      showUserInfoSuccessModal.value = true // 개인정보 수정 성공 모달 표시
    }
  } catch (error) {
    console.error('[ERROR] fetchUpdateUserInfo error:', error.response)
  }
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
  } catch (error) {
    console.error('Failed to update user abilities:', error)
  }
}

const changeAbilities = () => {
  availableAbilities.value = availableAbilities.value.map(code => store.getCodeName(code))
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
  params.value.userMobile = phoneNumber
}

const formatDate = dateString => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('ko-KR', options)
}

const getCodeName = code => {
  return store.getCodeName(code)
}

const toggleEdit = () => {
  if (isEditable.value) {
    fetchUpdateUserInfo()
  } else {
    isEditable.value = true
  }
}

const toggleEditAbilities = () => {
  isEditableAbilities.value = !isEditableAbilities.value
}

const removeAbility = index => {
  userAbilities.value.splice(index, 1)
  updateUserAbilities() // DB 업데이트 호출
}
const addAbility = () => {
  if (newAbility.value && !userAbilities.value.includes(newAbility.value)) {
    userAbilities.value.push(newAbility.value) // 문자열 값을 추가
    newAbility.value = ''
    updateUserAbilities()
  }
}

const closeErrorModal = () => {
  showErrorModal.value = false
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}

const showUserInfoSuccessModal = ref(false)

const closeUserInfoSuccessModal = () => {
  showUserInfoSuccessModal.value = false
}

onMounted(() => {
  fetchUserInfo()
  fetchUserAbilities()
})
</script>

<style scoped></style>
