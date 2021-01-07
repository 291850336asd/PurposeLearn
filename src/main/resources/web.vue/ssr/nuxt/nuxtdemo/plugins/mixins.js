// 全局方法
import Vue from 'vue';

let show = ()=> console.log('全局方法');

Vue.prototype.$show = show; // 服务端钩子内部不能用，this不会执行vue实例


//全局过滤器
import * as filters from '../assets/script/filters';
Object.keys(filters).forEach(key=>{
  Vue.filter(key, filters[key]);
});
//全局指令
import directive1 from '../assets/script/directives/directive1'
import directive2 from '../assets/script/directives/directive2'

Vue.directive('directive1', directive1);
Vue.directive('directive2', directive2);

//全局组件
import  UcButton from  '../components/global/uc-button.vue';
Vue.component('uc-button', UcButton);
