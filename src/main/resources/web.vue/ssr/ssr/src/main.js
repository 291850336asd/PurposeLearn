import Vue from 'vue'
import App from './App.vue'
import {createRouter} from "./router/index";

Vue.config.productionTip = false


export function createApp(context) {
  //1.创建路由器的实例
    const router = createRouter();
    //2.创建vue实例
    const app = new Vue({
        router,
        context, //上下文用于给渲染器传递参数
        render: h => h(App)
    });
    return {app, router}
}