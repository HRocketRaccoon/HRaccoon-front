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
              <VBtn class="ml-auto" color="primary" size="large" @click="onHandleUpdateBtn">
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
                    {{ ability.abilityName }}
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

              <VBtn v-if="isEditableAbilities" class="ml-8" color="primary" size="large" @click="addAbility"
                >추가
              </VBtn>
            </VRow>
            <VRow class="mt-5">
              <VBtn class="ml-auto" color="primary" size="large" @click="onHandleAbilityBtn"
                >{{ isEditableAbilities ? '수정완료' : '수정하기' }}
              </VBtn>
            </VRow>
          </div>
        </VCardText>
      </VTabsWindowItem>
    </VTabsWindow>
  </VCard>

  <VDialog v-model="dialog" width="500px">
    <VCard max-width="400" prepend-icon="mdi-success" title="성공">
      <VSpacer />
      <VCardText class="text-center"> 수정에 성공했습니다.</VCardText>
      <template v-slot:actions>
        <VBtn class="ms-auto" text="확인" @click="dialog = false" />
      </template>
    </VCard>
  </VDialog>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import { useToast } from 'vue-toastification'

// api
import api from '/src/api/axios.js'

// store
import { useCodeStore } from '/src/stores/useCodeStore.js'
import { useAuthStore } from '@/stores/useAuthStore.js'

// util
import { validateEmail, validatePhoneNumber } from '@/util/util.js'

const useAuth = useAuthStore()
const store = useCodeStore()
const toast = useToast()

const params = ref({
  userDepartment: '',
  userTeam: '',
  userPosition: '',
  userRank: '',
  userDepartmentName: '',
  abilities: [],
})
const userId = ref(useAuth.userId)
const userAbilities = ref([])
const newAbility = ref('')

//TODO: API 호출로 변경 예정
const availableAbilities = ref(store.getAllAbilities())

const tab = ref('tab-1')
const isEditable = ref(false)
const isEditableAbilities = ref(false)
const dialog = ref(false)

const fetchUserInfo = async () => {
  try {
    const response = await api.get(`/user/info/${userId.value}`)
    console.log('[SUCCESS] fetchUserInfo response:', response.data)

    params.value = {
      ...response.data.data,
      userBirth: dayjs(response.data.data.userBirth).format('YYYY년 MM월 DD일'),
      userJoinDate: dayjs(response.data.data.userJoinDate).format('YYYY년 MM월 DD일'),
      userGender: response.data.data.userGender === 'MALE' ? '남자' : '여자',
      userDepartmentName: store.getCodeName(response.data.data.userDepartment),
      userTeamName: store.getCodeName(response.data.data.userTeam),
      userPositionName: store.getCodeName(response.data.data.userPosition),
      userRankName: store.getCodeName(response.data.data.userRank),
    }
  } catch (error) {
    console.error('[ERROR] fetchUserInfo error:', error.response)
  }
}

const fetchUserAbilities = async () => {
  try {
    const response = await api.get(`/user/ability/${userId.value}`)
    console.log('[SUCCESS] fetchUserAbilities response:', response.data)
    userAbilities.value = response.data.data
  } catch (error) {
    console.error('[ERROR] fetchUserInfo error:', error.response)
  }
}

const fetchUpdateUserInfo = async () => {
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
      dialog.value = true
    }
  } catch (error) {
    console.error('[ERROR] fetchUpdateUserInfo error:', error.response)
  }
}

const fetchUpdateUserAbilities = async () => {
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

const validateUserInfo = () => {
  if (!validatePhoneNumber(params.value.userMobile)) {
    return '휴대폰 번호 형식에 맞지 않습니다. 다시 작성해주세요.'
  }

  if (!validateEmail(params.value.userEmail)) {
    return '이메일 형식에 맞지 않습니다. 다시 작성해주세요.'
  }

  if (params.value.userAddress.length < 1) {
    return '주소를 입력해주세요.'
  }
}

const onHandleUpdateBtn = () => {
  if (isEditable.value) {
    if (validateUserInfo()) {
      toast.error(validateUserInfo())
      return
    }
    fetchUpdateUserInfo()
  } else {
    isEditable.value = true
  }
}

const onHandleAbilityBtn = () => {
  if (isEditableAbilities.value) {
    console.log('test')
  } else {
    isEditableAbilities.value = !isEditableAbilities.value
  }
}

const removeAbility = index => {
  userAbilities.value.splice(index, 1)
  // fetchUpdateUserAbilities()
}

const addAbility = () => {
  console.log('newAbility.value', newAbility.value)

  console.log(!userAbilities.value.includes(newAbility.value))

  console.log(newAbility.value && !userAbilities.value.includes(newAbility.value))

  if (newAbility.value && !userAbilities.value.includes(newAbility.value)) {
    userAbilities.value.push(newAbility.value)
    newAbility.value = ''
    // fetchUpdateUserAbilities()
  }
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

onMounted(() => {
  fetchUserInfo()
  fetchUserAbilities()
})
</script>

<style scoped></style>
