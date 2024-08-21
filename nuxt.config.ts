export default defineNuxtConfig({
    ssr: true,
    compatibilityDate: "2024-04-03",
    devtools: {
      enabled: true,

      timeline: {
        enabled: true
      }
    },
    modules: ["@unocss/nuxt", "nuxtjs-naive-ui", "@nuxtjs/i18n", "@nuxt/content"],
    i18n: {
        vueI18n: "./i18n.config.ts",
    },
    routeRules: {
        // 主页在构建时预渲染
        '/': {prerender: true},
        // 产品页面按需生成，后台自动重新验证
        '/products/**': {swr: 3600},
        // 博客文章按需生成，直到下一次部署前持续有效
        '/blog/**': {isr: true},
        // 管理仪表板仅在客户端渲染
        '/about/**': {ssr: true},
        // 在API路由上添加cors头
        '/api/**': {cors: true},
        // 跳转旧的URL
        '/old-page': {redirect: '/new-page'}
    }
});