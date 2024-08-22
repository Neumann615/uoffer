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
    modules: ["@unocss/nuxt", "nuxtjs-naive-ui", "@nuxtjs/i18n", "@nuxt/content", "@nuxt/image"],
    i18n: {
        vueI18n: "./i18n.config.ts",
    },
    nitro: {
        prerender: {
            routes: ['/', '/about', "/contact", "/investor-relations"]
        }
    },
    sourcemap: false,
    analyze: {
        analyzerMode: 'static'
    }
});