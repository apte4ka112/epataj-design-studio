import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin({
    name: 'nuxt-api',
    async setup () {
        const runtimeConfig = useRuntimeConfig()
        return {
            provide: {
                apiWriteId: runtimeConfig.public.apiWriteId
            }
        }
    }
})