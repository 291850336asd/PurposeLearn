module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxtdemo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  router:{
    middleware:'auth',
    extendRoutes(routes, resolve){
      console.log("extendRoutes", routes);
      routes.push({
        name: 'root',
        path:'/index',
        component:resolve(__dirname, "pages/index.vue")
      });
    }
  },

  plugins:[
    '~/plugins/router',
    {
      src:'~/plugins/axios',
      ssr: true
    }
  ],

  /*
  ** Customize the progress bar color
  */
  // loading: { color: '#3B8070', height: '5px' },
  loading: '~/components/loading.vue',
  css:[
    'assets/css/transition.css'
  ],

  modules:[
    '@nuxtjs/axios'
  ],
  axios:{
    proxy: true
  },
  proxy:{
    '/api/':{
      target:"http://www.baidu.com",
      changeOrigin: true,
      pathRewrite: {
        '^/api':''
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

