import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Lottie from 'vue3-lottie'

import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify/vuetify.js'

// styles
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'

const app = createApp(App)

app.use(vuetify)
app.use(router)
app.use(createPinia())
app.component('LottieAnimation', Vue3Lottie)
app.mount('#app')
