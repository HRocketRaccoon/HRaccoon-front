<template>
  <v-container class="d-flex flex-column align-center justify-center fill-height background-gradient">
    <v-card class="pa-10 wider-card">
      <v-card-title class="d-flex justify-center">
        <v-img src="src/assets/hraccoon.png" class="custom-avatar" alt="Avatar"></v-img>
      </v-card-title>

      <v-card-subtitle class="text-center">
        <h3>HRaccoon</h3>
      </v-card-subtitle>

      <v-card-text>
        <v-form>
          <v-text-field label="사원 번호" v-model="employeeNumber" outlined dense required></v-text-field>
          <v-text-field label="비밀번호" v-model="password" type="password" outlined dense required></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions class="d-flex justify-center">
        <v-btn @click="submit" color="primary" class="ma-2">Enter</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      employeeNumber: '',
      password: '',
    }
  },
  methods: {
    submit() {
      // 로그인 로직 처리
      console.log('Employee Number:', this.employeeNumber)
      console.log('Password:', this.password)
    },
  },
}
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.wider-card {
  max-width: 600px; /* 원하는 가로 크기로 조정 */
  width: 100%;
}

.custom-avatar {
  width: 150px; /* 원하는 가로 크기 */
  height: 150px; /* 원하는 세로 크기 */
}

.background-gradient {
  background: linear-gradient(to bottom, #ffffff, #add8e6); /* 위가 흰색, 아래가 하늘색인 그라데이션 */
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
