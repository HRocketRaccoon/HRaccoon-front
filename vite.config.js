import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    vue(),
    vuetify({
      // autoImport: true,
      styles: {
        configFile: 'src/styles/variables/_vuetify.scss',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@images': fileURLToPath(new URL('./src/assets/images/', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles/', import.meta.url)),
      '@core': fileURLToPath(new URL('./src/@core', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/@layouts', import.meta.url)),
      '@configured-variables': fileURLToPath(new URL('./src/styles/variables/_template.scss', import.meta.url)),
    },
  },
  /*TODO: env 환경 설정*/
})
