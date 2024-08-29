// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  srcDir: "src",
  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@element-plus/nuxt",
    "@nuxtjs/i18n",
    "@unocss/nuxt",
  ],
  i18n: {
    locales: ["zh", "en"],
    defaultLocale: "zh",
    vueI18n: "@/local/i18n.config.ts",
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/default.scss";',
        },
      },
    },
  },
  // devServer: {
  //   host:'192.168.2.105',
  //   port: 3322,
  // },
  nitro:{
    compressPublicAssets:true,
    // devProxy:{
    //   "/api":{
    //     target:"URL_ADDRESS",
    //     changeOrigin:true
    //   }
    // }
  }
});
