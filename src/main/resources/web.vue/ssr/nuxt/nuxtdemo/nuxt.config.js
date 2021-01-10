module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || 'nuxtdemo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    script:[
      {
        src:'外部资源'
      }
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
    },
    {
      src:'~/plugins/element-ui',
      ssr: true,
      // mode:'server',// client
    },
    '~/plugins/mixins',
  ],

  /*
  ** Customize the progress bar color
  */
  // loading: { color: '#3B8070', height: '5px' },
  loading: '~/components/loading.vue',
  css:[
    'assets/css/transition.css',
    'assets/css/base.css',
    'element-ui/lib/theme-chalk/index.css',
  ],

  modules:[
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    '@nuxtjs/style-resources'
  ],
  styleResources:{
    scss:[
      'assets/scss/global.scss'
    ]
  },
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
    transpile:[
      /^element-ui/
    ],
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

