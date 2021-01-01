import { createApp } from "./main";


//该函数会被express理由处理函数调用，用于创建vue实例
export default context => {
    //返回promise，确保异步的操作都结束
    return new Promise((resolve, reject)=>{
        const { app, router,store } = createApp(context)
        //显示首屏
        router.push(context.url);
        //检测路由就绪
        router.onReady(()=>{
            const matchedComponents = router.getMatchedComponents();
            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }

            //对所有匹配的路由组件调用可能存在的`asyncData()
            Promise.all(matchedComponents.map(item => {
                if (item.asyncData) {
                    return item.asyncData({
                        store,
                        route: router.currentRoute
                    });
                }
            })).then(()=>{
                // 在所有预取钩子(preFetch hook) resolve 后，
                // 我们的 store 现在已经填充入渲染应用程序所需的状态。
                // 当我们将状态附加到上下文，
                // 并且 `template` 选项用于 renderer 时，
                // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
                context.state = store.state;
                resolve(app);
            }).catch(reject);

        }, reject)
    });
}