import webpack from 'webpack';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr:true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Selaras Art Space',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/amplify.js'},
    '~/plugins/auth'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@braid/vue-formulate/nuxt',
    // 'nuxt-font-loader'
  ],


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

 
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
       standalone: true,
        /*
         ** You can extend webpack config here
         */
        extend(config) {
          config.plugins.push(new webpack.ProvidePlugin({
              THREE: 'three'
          }));
          config.module.rules.push({
            test: /\.(glsl|vs|fs)$/,
            loader: 'raw-loader'
          });
          config.module.rules.push({
            test: /\.(glb|gltf)$/,
            loader: 'file-loader'
          })
        }
  },
}
