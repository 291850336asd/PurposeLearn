import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from "@/components/Home.vue";
import List from "@/components/List.vue";
import HelloWorld from "@/components/HelloWorld.vue";
Vue.use(VueRouter);
export function createRouter() {
    return new VueRouter({
       routes:[
           {
               path:'/',
               component:Home
           },
           {
               path:'/hello',
               component:HelloWorld
           },
           {
               path:'/list',
               component:List
           }
       ]
    });
}