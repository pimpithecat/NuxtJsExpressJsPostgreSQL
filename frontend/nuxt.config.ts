// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // Runtime config for environment variables
  runtimeConfig: {
    // Private keys only available on server-side
    public: {
      // Public keys exposed to client-side
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001/api',
    }
  },

  // App configuration
  app: {
    head: {
      title: 'FrontBack App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Nuxt + Express + PostgreSQL application' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // CSS configuration
  css: [],

  // Modules
  modules: [],
})
