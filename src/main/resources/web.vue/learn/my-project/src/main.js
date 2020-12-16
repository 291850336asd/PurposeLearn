import Vue from 'vue'

import App from './App.vue'
import '@/globalvue/myapp.js'
import store from './store/store'
import router from './router'
Vue.config.productionTip = false;





//全局自定义指令  //必须在界面渲染前执行
Vue.directive('myclick',function (el, obj) {
  console.log(arguments)
  console.log(el)
  console.log(obj)
  el.onclick = function () {
    console.log("sssss");
  }
});
Vue.directive('permission',{
  inserted: function (el, obj) {
    console.log(arguments)
    console.log(el)
    console.log(obj)
    window.pp = [5]
    if(window.pp.indexOf(obj.value) === -1){
      el.parentNode.removeChild(el);
    }
  }
});

new Vue({
  store: store,
  router,
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