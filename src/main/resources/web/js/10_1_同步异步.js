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
 * 多个宏任务执行时每执行完一个则检查如存在微任务则先执行微任务
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

//.................promise.................
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise
/**
 * Promise ：es6新增的内置类，主要用来规划异步编程
 */
//
let p1 = new Promise((resolve, reject)=>{
   console.log("ok");
});
console.log("no");
//结果 ok no    得出结论： promise本身是同步的，是用来管理异步的


// promise本身是同步的，是用来管理异步的，new promise会立即执行executor(resolve, reject){}函数，并创建返回promise实例
// executor一般管理异步操作，操作成功执行resolve，让promise实例状态时成功并获取结果，失败执行执行reject让实例状态为失败并获取原因
//   + resolve函数：函数执行会把promise状态改成成功  异步执行
//   + reject函数：函数执行会把promise状态改成失败   异步执行
// promise实例属性
//   +[[PromiseState]] promise状态  待定（pending）: 初始状态，既没有被兑现，也没有被拒绝。
//          + 待定（pending）: 初始状态，既没有被兑现，也没有被拒绝。
//          + 已兑现（fulfilled/ resolved）: 意味着操作成功完成。
//          + 已拒绝（rejected）: 意味着操作失败。
//   +[[PromiseResult]] promise结果
//          + 初始值undefined
//          + 不论是成功还是失败，成功或者失败都会赋值给他
// 只要promise从pending变为fulfiled或者rejected,则状态就不能再改变了


let p1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        let ran = Math.random();
        ran < 0.5 ? reject("NO") : resolve("ok");
    },1000);
});
////
let p1 = new Promise((resolve, reject)=>{
    resolve(100);// 改变状态后，下面改变状态的代码就无用了
    reject(0);
});
//
/**
 * Promise.prototype
 *   + then[A,B]: 基于then方法存放两个回调函数，当promise状态执行成功时执行A,失败执行B，返回新promise实例
 *       新实例的状态基于then[A,B]执行的结果决定的，AB不报错，则状态是成功，否则是失败，结果是AB函数的返回值
 *       特殊情况，若AB返回的是一个promise实例，则返回的promise直接决定p2的状态和结果
 *   + catch  相当于 then(null, reason=>{})
 *   + finally:  Appends a handler to the promise, and returns a new promise that is resolved when the original promise is resolved. The handler is called when the promise is settled, whether fulfilled or rejected.
 *
 *
 */
////then
let p2 = p1.then(result =>{
    console.log(`成功了 -> ${result}`);
}, reason => {
    console.log(`失败了 -> ${reason}`);
});
console.log("haha");//先输出haha,再输出resolve函数/reject函数结果
//
let p2 = p1.then(result =>{
    console.log(`成功了 -> ${result}`);
    return "result -> " + result; //返回值 赋值给PromiseResult
}, reason => {
    console.log(`失败了 -> ${reason}`);
    return "reason -> " + reason;  //返回值 赋值给PromiseResult
});
////
let p1 = new Promise((resolve, reject)=>{
    resolve(100);// 改变状态后，下面改变状态的代码就无用了
    reject(20);
}).then(result =>{
    console.log(`成功了 -> ${result}`);
    return result*10;
}, reason => {
    console.log(`失败了 -> ${reason}`);
    return reason/10;
}).then(result =>{
    console.log(`成功了 -> ${result}`);
    return Promise.reject(result * 10);
}, reason => {
    console.log(`失败了 -> ${reason}`);
    return reason/10;
}).then(result =>{
    console.log(`成功了 -> ${result}`);
    return result*10;
}, reason => {
    console.log(`失败了 -> ${reason}`);
    return reason/10;
});
// 成功了 -> 100
// 成功了 -> 1000
// 失败了 -> 10000
////
let p1 = new Promise((resolve, reject)=>{
    reject(20);   //失败返回20
}).then(result =>{
    console.log(`成功了 -> ${result}`);
    return result*10;
}, reason => {
    console.log(`失败了 -> ${reason}`);
    return reason/10; // 此时返回new Promise ,B函数方法未报错，则返回新promise状态为成功
}).then(result =>{
    console.log(`成功了 -> ${result}`);
    return Promise.reject(result * 10);
}, reason => {
    console.log(`失败了 -> ${reason}`);
    return reason/10;
}).then(result =>{
    console.log(`成功了 -> ${result}`);
    return result*10;
}, reason => {
    console.log(`失败了 -> ${reason}`);
    return reason/10;  // 此时返回new Promise ,B函数方法未报错，则返回新promise状态为成功
});
// 失败了 -> 20
// 成功了 -> 2
// 失败了 -> 20

////catch 相当于 then(null, reason=>{})
//正常then(A,B)，如果其中一个没有传，则会‘顺延’
//  +[A]没有传递，则会查找下一个then中的A函数   A->null,类似于 result=>{return result}
//  +[B]没有传递，则会查找下一个then中的B函数   B->null,类似于 reason=>{return Promise.reject(reson)}
let p1 = new Promise((resolve, reject)=>{
    resolve(100);   //失败返回20
}).then(null, reason => {
    console.log(`失败了1 -> ${reason}`);
    return reason/10; // 此时返回new Promise ,B函数方法未报错，则返回新promise状态为成功
}).then(result =>{
    console.log(`成功了2 -> ${result}`);
    return Promise.reject(result * 10);
}, reason => {
    console.log(`失败了2 -> ${reason}`);
    return reason/10;
});
// 输出成功了2 -> 100，然后报错Uncaught (in promise) 1000,抛出的异常不会影响其他代码执行,并且异常通过trycatch吃掉和await不同
//
let p1 = new Promise((resolve, reject)=>{
    resolve(100);   //失败返回20
}).then(null, reason => {
    console.log(`失败了1 -> ${reason}`);
    return reason/10; // 此时返回new Promise ,B函数方法未报错，则返回新promise状态为成功
}).then(result =>{
    console.log(`成功了2 -> ${result}`);
    return Promise.reject(result * 10);
}, reason => {
    console.log(`失败了2 -> ${reason}`);
    return reason/10;
}).catch(reason => {
    console.log(reason);
});
// 成功了2 -> 100
// 1000

////finally
Promise.resolve(10).finally(()=>{
    console.log("finally");
});
console.log("ss");
// ss finally
//
let p1 = new Promise((resolve, reject)=>{
    console.log("ok");
}).finally(()=>{
    console.log("finally"); // finally不会输出。因为未调用resolve或reject
});
console.log("no");


/**
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise 静态方法
 * Promise作为对象
 *   + resolve(value) 返回一个状态为成功的promise实例
 *   + reject(reason) 返回一个状态为失败的promise实例
 *   + all(iterable)
 *      这个方法返回一个新的promise对象，该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功，
 *      一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。
 *      这个新的promise对象在触发成功状态以后，会把一个包含iterable里所有promise返回值的数组作为成功回调的返回值，
 *      顺序跟iterable的顺序保持一致；
 *      如果这个新的promise对象触发了失败状态，它会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息。
 *      Promise.all方法常被用于处理多个promise对象的状态集合
 *   + race(iterable)
 *      当iterable参数里的任意一个子promise被成功或失败后，父promise马上也会用子promise的成功返回值或失败详情作为结果
 *   ...
 *
 */
Promise.reject(100);

//回调地狱
let data={};
$.ajax({
    url:"/api/info",
    success: function (result) {
        //获取数据后
        data = result;
        $.ajax({
            url: `/api/score?id = ${data.id}`,
            success: function (result) {
                //获取数据后
                $.ajax({
                    url: `/api/paiming?score = ${result.score}`,
                    success: function (result) {
                        //获取排名信息
                    }
                });
            }
        });
    }
});
//解决方案1
function queryInfo() {
    return new Promise(resolve => {
        $.ajax({
            url: '/api/info',
            success: function (result) {
                //获取数据后
                resolve(result);
            }
        });
    })
}
function queryScore(id) {
    return new Promise(resolve => {
        $.ajax({
            url: `/api/score?id = ${id}`,
            success: function (result) {
                resolve(result);
            }
        });
    })
}
function querypaiming(score) {
    return new Promise(resolve => {
        $.ajax({
            url: `/api/paiming?score = ${score}`,
            success: function (result) {
                resolve(result);
            }
        });
    })
}0
//写法一 基于promise解决
queryInfo().then(result =>{
    return queryScore(result.id);
}).then(result => {
    return querypaiming(result.score);
}).then(result => {
    //获取排名信息
});
//写法 基于async\await解决
(async function () {
    let result = await queryInfo();
    result = await queryScore(result.id);
    result = await  querypaiming(result.score);
    //获取排名信息
})();


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
    console.log("func")
    let res = await fn(); //等待promise执行完成，在执行下面的代码
    console.log(res);// ok
}
func();
console.log("NO");
//func NO 异步完成 ok
////
async function func() {
    console.log(100);
    return 10;
}
async function fn() {
    let res = await func(); //等待promise执行完成且状态为成功时，在执行下面的代码且下面代码被当做微任务处理
    console.log(res);// ok  微任务
}
fn();
console.log("NO");
// 100 NO 10

////
(async function() {
    let x = await  10;//非promise就认为是成功的
    console.log(x);
    let y = await Promise.resolve(20);
    console.log(y);
    try{
        let z = await Promise.reject(30); // await返回的promise失败，则当前函数中后面的代码不会执行
        console.log(z);
    }catch (e) {
        console.log(e);// 30
    }
})();


////
async function async1() {
    console.log('async1 start');
    await async2(); //await下面的代码整体放到微任务中
    console.log('async1 end');// 微任务代码
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
//输出结果：
//script start    async1 start   async2   promise1  script end  async1 end  promise2  setTimeout

////
function func1(){
    console.log('func1 start');
    return new Promise(resolve=>{
        resolve('OK');
    });
}
function func2(){
    console.log('func2 start');
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve('OK');
        },10);
    });
}
console.log(1);
setTimeout(async () => {
    console.log(2);
    await func1();
    console.log(3);
}, 20);
for (let i = 0; i < 90000000; i++) {} //循环大约要进行80MS左右
console.log(4);
func1().then(result=>{
    console.log(5);
});
func2().then(result=>{
    console.log(6);
});
setTimeout(() => {
    console.log(7);
}, 0);
console.log(8);
//输出结果：1  4  func1 start func2 start  8 5 2 func1 start 3 7 6