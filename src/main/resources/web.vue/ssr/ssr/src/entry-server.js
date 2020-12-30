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
            resolve(app);
        }, reject)
    });
}