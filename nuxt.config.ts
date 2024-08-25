export default defineNuxtConfig({
    ssr: true,
    compatibilityDate: "2024-04-03",
    app: {
        baseURL: "/"
    },
    devtools: {
        enabled: true,
        timeline: {
            enabled: true
        }
    },
    modules: [
        "@unocss/nuxt",
        "@nuxtjs/i18n",
        "@nuxt/content",
        "@nuxt/image",
        "@nuxt/icon",
        "@element-plus/nuxt"
    ],
    i18n: {
        vueI18n: "./i18n.config.ts",
    },
    elementPlus:{
        defaultLocale: "zh-cn",
    },
    nitro: {
        prerender: {
            routes: ['/', '/about', "/contact", "/investor-relations","/ranking"]
        }
    },
    sourcemap: false,
    analyze: {
        analyzerMode: 'static'
    }
});