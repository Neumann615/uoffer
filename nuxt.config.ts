export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "nuxtjs-naive-ui", "@nuxtjs/i18n"],
  i18n: {
    vueI18n: "./i18n.config.ts",
  },
});
