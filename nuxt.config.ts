export default defineNuxtConfig({
  ssr: true,
  app: {
    baseURL: "/",
  },
  devServer: {
    port: 4000,
  },
  imports: {
    dirs: ["store/**/index.{ts,js,mjs,mts}", "type/**.ts"],
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@unocss/nuxt",
    "@nuxtjs/i18n",
    "@element-plus/nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-swiper",
    '@vueuse/nuxt',
  ],
  plugins: [{ src: '@/plugins/mitt.ts', mode: 'client' }],
  i18n: {
    vueI18n: "./i18n.config.ts",
    restructureDir: false,
    locales: ["cn", "en"],
    defaultLocale: "cn",
  },
  elementPlus: {
    defaultLocale: "zh-cn",
  },
  nitro: {
    prerender: {
      routes: [
        "/",
        "/about",
        "/contact",
        "/investor-relations",
        "/ranking",
        "/course",
      ],
    },
  },
  sourcemap: false,
})