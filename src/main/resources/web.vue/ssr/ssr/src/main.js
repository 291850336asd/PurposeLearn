import Vue from 'vue'
import App from './App.vue'
import {createRouter} from "./router/index";
import {createStore} from "./store/index";
Vue.config.productionTip = false


Vue.mixin({
    beforeRouteUpdate (to, from, next) {
        const { asyncData } = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    },
    beforeMount () {
        const { asyncData } = this.$options
        if (asyncData) {
            // 将获取数据操作分配给 promise
            // 以便在组件中，我们可以在数据准备就绪后
            // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
            this.dataPromise = asyncData({
                store: this.$store,
                route: this.$route
            })
        }
    }
})

export function createApp(context) {
  //1.创建路由器的实例
    const router = createRouter();
    const store= createStore();
    //2.创建vue实例
    const app = new Vue({
        router,
        context, //上下文用于给渲染器传递参数
        store,
        render: h => h(App)
    });
    return {app, router, store}
}