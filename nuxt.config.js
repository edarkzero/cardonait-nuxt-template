export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Cardona IT',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Listing of users using CRUD operations with Nuxt, Vue, Axios and Vuex'
      },
      {
        hid: 'google-site-verification',
        name: 'google-site-verification',
        content: 'UP_efCoBo_4ed_6pZ44xTexuIpD6iHOHXk9mnvHEp5E'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/axios'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/sitemap'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {},
  sitemap: {
    hostname: 'https://web-app-dev-dot-cardonait.uc.r.appspot.com',
    gzip: true,
    routes: [
      '/users/5f0e761c0ade8a000ac324ff/edit',
      '/users/5fb485b45043eb0b70efba8e/edit',
      '/users/5f0e761c0ade8a000ac324ff/delete',
      '/users/5fb485b45043eb0b70efba8e/delete'
    ]
  }
}
