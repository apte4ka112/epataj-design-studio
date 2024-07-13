import { defineNuxtModule, createResolver, addImports } from '@nuxt/kit'

export default defineNuxtModule({
    meta: {
        name: 'nuxt-api',
        configKey: 'api',
        compatibility: { nuxt: '^3.0.0' }
    },
    defaults: {
        url: '',
        isProd: false
    },
    setup (options, nuxt) {
        const { resolve } = createResolver(import.meta.url)
        addImports([
            { name: 'useAPI', from: resolve('./composables') },
        ])
    }
})