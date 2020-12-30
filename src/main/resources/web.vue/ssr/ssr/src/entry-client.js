import { createApp } from "./main";

const { app, router } = createApp(context)

//检测路由就绪
router.onReady(()=>{
    // 挂载激活
    app.$mount('#app')
}, reject)
