import 'dotenv/config'
const env = process.env
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,

  runtimeConfig: {
    public: {
      apiWriteId: env.NUXT_PUBLIC_WRITE_ID
    }
  },

  css: [
    '@/assets/style.scss',
    '@/assets/animate.css'
  ],

  modules: ['@nuxt/eslint']
})
