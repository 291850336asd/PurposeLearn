import Vue from 'vue'
import App from './App.vue'
import '@/globalvue/myapp.js'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// JSX写法
// Vue.component('my-app',{
//   render: h => h('h', {
//     class:'1243',
//     attrs: {
//       aa: '234'
//     }
//   }, "qqq")
// });