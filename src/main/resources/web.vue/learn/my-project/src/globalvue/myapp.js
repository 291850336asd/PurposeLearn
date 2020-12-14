import Vue from 'vue';
import myapp from './myapp.vue';

//写法3
Vue.component('myapp', myapp);
//写法1
// myapp.install = function (Vue) {
//     Vue.component('myapp', myapp);
// }
// myapp.install(Vue);

//写法二
// Vue.component('myapp',{
//     render: function (createElement) {
//         return createElement(myapp, [
//             createElement('header',this.$slots.header),
//             createElement('main',this.$slots.default),
//             createElement('footer',this.$slots.footer)]);
//     }
// })