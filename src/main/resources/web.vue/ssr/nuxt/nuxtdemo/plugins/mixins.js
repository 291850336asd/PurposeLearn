// 全局方法
import Vue from 'vue';

let show = ()=> console.log('全局方法');

Vue.prototype.$show = show; // 服务端钩子内部不能用，this不会执行vue实例


//全局过滤器
import * as filters from '../assets/script/filters';
Object.keys(filters).forEach(key=>{
  Vue.filter(key, filters[key]);
});
