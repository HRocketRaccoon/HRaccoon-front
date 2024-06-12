<template>
  <div>
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
                  v-model="user.userDepartment"
                  readonly
                  class="custom-text-field"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="소속 팀" v-model="user.userTeam" readonly class="custom-text-field"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="직위"
                  v-model="user.userPosition"
                  readonly
                  class="custom-text-field"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="직책" v-model="user.userRank" readonly class="custom-text-field"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  class="custom-text-field"
                  label="연락처"
                  v-model="user.userMobile"
                  readonly
                  @input="formatPhoneNumber"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field class="custom-text-field" label="이메일" v-model="user.userEmail" readonly></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>

      <div class="tabs">
        <button @click="selectedTab = 0" :class="{ active: selectedTab === 0 }">근무현황</button>
        <button @click="selectedTab = 1" :class="{ active: selectedTab === 1 }">개인역량</button>
      </div>
      <div v-if="selectedTab === 0" class="tab-content">
        <!-- 개인정보 Tab -->
        <v-form v-if="userSeat.seatOffice">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                class="custom-text-field"
                label="현 근무장소"
                v-model="userSeat.seatOffice"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="custom-text-field" label="좌석" v-model="seatCustomLocation" readonly></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-form v-else>자리에 없습니다.</v-form>
      </div>
      <div v-else class="tab-content">
        <!-- 개인역량 Tab -->
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-chip-group>
                <v-chip v-for="(ability, index) in userAbilities" :key="index">
                  {{ getCodeName(ability) }}
                </v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-card-text>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/api/axios'
import { useCodeStore } from '@/stores/useCodeStore'
import { useRoute } from 'vue-router'

const selectedTab = ref(0) // 초기값을 숫자로 설정

const route = useRoute()
const userId = ref(route.params.userId)

const user = ref({
  userId: '',
  userName: '',
  userBirth: '',
  userGender: '',
  userDepartment: '',
  userTeam: '',
  userPosition: '',
  userRank: '',
  userMobile: '',
  userEmail: '',
})

const userSeat = ref({})
const seatCustomLocation = ref('')

const store = useCodeStore()

const userAbilities = ref([])

const loadUserData = async () => {
  try {
    console.log('Fetching user data for userId:', userId.value)
    const response = await axios.get(`/user/info/${userId.value}`)
    console.log('User data loaded:', response)

    user.value = response.data.data
    user.value.userGender = convertGender(user.value.userGender)
    user.value.userDepartment = getCodeName(user.value.userDepartment)
    user.value.userTeam = getCodeName(user.value.userTeam)
    user.value.userPosition = getCodeName(user.value.userPosition)
    user.value.userRank = getCodeName(user.value.userRank)
  } catch (error) {
    console.error('Failed to load user data:', error)
    if (error.response) {
      console.error('Error response data:', error.response.data)
      console.error('Error response status:', error.response.status)
      console.error('Error response headers:', error.response.headers)
    }
  }
}

const loadUserAbilities = async () => {
  try {
    const response = await axios.get(`/user/ability/${userId.value}`)
    const abilities = response.data.data
    userAbilities.value = abilities.map(ability => ability.abilityName)
    console.log('user ability :', userAbilities)
  } catch (error) {
    console.error('Failed to load user abilities:', error)
  }
}

const loadUserSeat = async () => {
  try {
    const response = await axios.get(`/seat/info/${userId.value}`)

    userSeat.value = response.data.data
    console.log('user seat :', userSeat)

    userSeat.value.seatOffice = `${getCodeName(userSeat.value.seatOffice)} 오피스`
    seatCustomLocation.value = `${userSeat.value.seatFloor}층 ${userSeat.value.seatNum}번`
  } catch (error) {
    console.error('Failed to load user seat:', error)
  }
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
  loadUserSeat()
})
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

.custom-text-field {
  margin-bottom: 20px;
}

.tab-content {
  margin-top: 20px;
}
</style>
