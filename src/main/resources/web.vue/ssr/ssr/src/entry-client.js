import { createApp } from "./main";

const { app, router,store } = createApp();


//当使用template时，context.state将作为window.__INITIAL_STATE__状态自动嵌入到最终的HTML
// 在客户端挂载到应用程序之前，store就应该获取到状态：
if(window.__INITIAL_STATE__)
{
    store.replaceState(window.__INITIAL_STATE__);
}


//检测路由就绪
router.onReady(()=>{
    // 添加路由钩子函数，用于处理 asyncData.
    // 在初始路由 resolve 后执行，
    // 以便我们不会二次预取(double-fetch)已有的数据。
    // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)

        // 我们只关心非预渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })

        if (!activated.length) {
            return next()
        }
        console.log("加载指示器 (loading indicator)");
        // 这里如果有加载指示器 (loading indicator)，就触发

        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to })
            }
        })).then(() => {

            // 停止加载指示器(loading indicator)
            console.log("停止加载指示器(loading indicator)");
            next()
        }).catch(next)
    })


    // 挂载激活
    app.$mount('#app')
})
