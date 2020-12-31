import { createApp } from "./main";


//该函数会被express理由处理函数调用，用于创建vue实例
export default context => {
    //返回promise，确保异步的操作都结束
    return new Promise((resolve, reject)=>{
        const { app, router } = createApp(context)
        //显示首屏
        router.push(context.url);
        //检测路由就绪
        router.onReady(()=>{
            const matchedComponents = router.getMatchedComponents();
            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }
            resolve(app);
        }, reject)
    });
}