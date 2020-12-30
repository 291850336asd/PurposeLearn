import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from "../components/Home.vue";
import Hellloworld from "../components/HelloWorld.vue"
Vue.use(VueRouter);
export function createRouter() {
    return new VueRouter({
       routers:[
           {
               path:'/',
               component:Home
           },
           {
               path:'/hello',
               component:Hellloworld
           }
       ]
    });
}