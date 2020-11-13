/**
 * 浏览器是多线程的
 *   + GUI渲染线程
 *   + HTTP网络线程
 *   + JS代码渲染线程  单线程
 *   ...
 * 浏览器只分配一个线程来处理js代码
 *   + js代码大部分的都说‘同步编程’
 *   + 但是js利用浏览器的多线程机制，可以规划出‘异步编程效果’
 *        + 定时器
 *        + ajax/fetch/跨域
 *        + 事件绑定
 *        + Promise
 *        + Generator/yield
 *        + async/await
 *        ...
 *
 *
 * EventLoop 事件循环机制
 *    + 宏任务 macrotask
 *         定时器、事件绑定、ajax/fetch等网络请求等
 *    + 微任务 microtask  优先级高
 *         promise:then\resolve\reject通知注册的onfulfiled/onrejected方法执行
 *         async\await
 *
 * 浏览器加载页面，默认开辟一个任务队列（优先级队列）
 * 如果代码中遇到异步任务，则放置到‘任务队列’中（定时器：宏任务）
 * 同时浏览器会开辟一个‘监听线程’，监听定时器是否到时间、监听事件是否触发等
 * 当栈中主流程同步任务没有执行完时，异步任务队列就算到时间了也得等主任务执行完才能执行
 * 定时器设置的时间是最快执行时间，到时间也不一定会执行
 * 只有同步任务执行完了才开始执行异步任务
 * 异步队列中先执行微任务，没有微任务了再执行宏任务
 * 事件从队列中取出之后都是js线程执行
 * 宏任务执行时如存在微任务则先执行宏任务
 */

/**
 * 计算程序的执行时间   同步
 *   + 运行监控，受运行环境影响都是预估值
 *   + 时间复杂度大O表示法（提前预估） O(1),O(N)等
 */
/////
let time = new Date();
// console.time("AAA");
for(var i= 0; i < 9999; i++){

}
// console.timeEnd("AAA");
console.log(new Date() - time);


/**
 * 定时器异步编程
 * 设置定时器是同步的
 * 任务是异步的
 * 浏览器不会等待任务执行，而是继续渲染下面的代码，等到下面的代码执行完，时间也到达了，才会执行任务
 * //interval设置为0，也不是立即执行，而是浏览器有‘最快执行时间’（谷歌：5-6ms,ie:13-17ms）
 */
setTimeout(()=>{
    console.log("ok")
}, 1000);
console.log("No");

setTimeout(()=>{
    console.log("ok")
}, 0);
console.log("No");


//例如
setTimeout(() => {
    console.log(1);
}, 20);
console.log(2);
setTimeout(() => {
    console.log(3);
}, 10);
console.log(4);
console.time('AA');
for (let i = 0; i < 90000000; i++) {
    // do soming
}
console.timeEnd('AA'); //=>AA: 80ms 左右
console.log(5);
setTimeout(() => {
    console.log(6);
}, 8);
console.log(7);
setTimeout(() => {
    console.log(8);
}, 15);
console.log(9);
//输出结果： 2 4  AA:xxxms  5 7 9 3 1 6 8
//
//...........async await........es7语法糖
//async控制当前函数返回的是promise 和then很相似，函数执行不报错返回成功的promise实例，报错则返回失败的
//return的值或者报错的原因就是promise实例的结果，如果return返回是是一个promise新实例，则新实例的结果影响返回promise的结果
//async最常见的应用就是为了修饰函数，让函数中可以使用await(想要使用await,所在的函数必须是async修饰的)
//await 等待一个promise成功之后开始执行，修饰promise实例
async function func() {
    console.log(10);
    return 10;
}
console.log(func());//Promise {<fulfilled>: 10}
//

function fn() {
    return new Promise((resolve,reject) =>{
        setTimeout(()=>{
            console.log("异步完成")
            resolve("ok");//修改状态为成功
        },1000)
    })
};
async function func() {
    await fn(); //等待promise执行完成，在执行下面的代码
    console.log("end");
}





