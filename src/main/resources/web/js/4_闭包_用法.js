/**
 * GC：浏览器垃圾回收机制
 * 【栈内存：EC】
 *    全局执行上下文：在浏览器加载页面的时候形成，然后在页面关闭的时候释放（页面刷新：先释放，重新加载中后再形成）
 *    私有上下文：函数执行会形成一个私有上下文（代码块中let/const也会形成私有上下文）
 *        + 一般情况下代码执行完就会出栈释放
 *        + 然后当前上下文中的某个内容（一般是一个堆（对象、函数））被上下文以外的事物占用了，则当前上下文不能被释放
 *【堆内存：HEAP】
*     以谷歌浏览器为例
*         按照是否被引用来决定是否释放,浏览器会定期间隔一段时间查找所有堆内存是否被占用了，如果没有被占用则释放
*           + 我们可以手动赋值为null,达到内存释放的目的
*     IE浏览器按照引用计数方式实现垃圾回收
 *       +这种方式会出现计数混乱的问题，会导致内存泄漏
 *
 *
 * 函数执行，会形成一个私有的上下文，这个私有上下文会保护里面的私有变量不受外界的干扰，我们把函数的这种保护机制成为闭包
 * 另一种说法：函数执行形成一个不被释放的上下文，一方面可以保护里面的私有变量不受外界干扰，还可以将这些变量保存下来，这种方式才是闭包
 * 闭包机制会消耗内存（合理使用）
 * 闭包作用：保存  保护
 *
 * 示例1
 *
 * 正常情况下函数执行完后所形成的上下文都会出栈释放，私有上下文中的一切东西都销毁，优化栈内存控件
 * 如果函数执行所形成的的上下文中有一个东西（一般是引用类型的地址）被当前上下文以外的事务所占用，
 * 则当前上下文将不会释放，将导致栈内存变大
 *
 * 函数每次执行都会形成全新的私有上下文
 *
 *
 */
let x= 5;
function fn(x) {//形参变量也属于私有变量
    return function (y) {
        console.log(y + (++x));
    }
}
let f = fn(6);
f(7); //14
fn(8)(9) //18
f(10); //18
console.log(x);//5





let x= 5;
function fn() {
    return function (y) {
        console.log(y + (++x));
    }
}
let f = fn(6);
f(7); //13
fn(8)(9) //16
f(10); //18
console.log(x);//8



let x= 5;
function fn() {
    return function (y) {
        console.log(y + (++x));
    }
}
let f = fn();
f(7); //13
fn()(9) //16
f(10); //18
console.log(x);//8





//闭包的常见方式
//方式1.
function  fun() {
    var x = 0;
    return function () {
        return ++x;
    }
}
//方式2.
function fn() {
    return {
        name:"xxx"
    };
}
var obj = fn();
//方式3.
function fn() {
    let x = 0;
    document.body.onclick = function () {
        console.log(x++);
    }
}

/**
 * 示例1
 */
let a= 10,b=9;
function A(a) {
    A = function (b) {
        alert(a+b++);
    };
    alert(a++);
}
A(1);  //1  A(1)执行完后，原来的A a上下文并不会被释放
A(2);  // 4   alert(a+b++); 中的a是原来A a的变量



//----------问题-------------
var fnA= [];
for(var i = 0; i<5;i++){
    fnA[i] = function () {
        return i;
    }
}
fnA[0]();//5
fnA[4]();//5

//-------闭包解决循环赋值的问题  方案1-1----------
var fnA= [];
for(var i = 0; i<5;i++){
    fnA[i] = function (i) {
        return function () {
            return i;
        };
    }(i);
}
fnA[0]();//0
fnA[4]();//4

//-------闭包解决循环赋值的问题  方案1-2----------
var fnA= [];
for(var i = 0; i<5;i++){
    (function(i) {
        fnA[i] = function () {
            return i;
        };
    })(i);
}
fnA[0]();//0
fnA[4]();//4


//-------闭包解决循环赋值的问题  方案1-3  let----------优于以上的代码
//还是基于闭包的的机制，但是不是自己去执行函数创建，而是利用es6中let产生私有上下文实现
var fnA= [];
for(let i = 0; i<5;i++){   //此处会产生块级上下文，每轮循环都会产生一个私有的上下文，循环结束父级上线文将会被销毁
                           //首先for let会产生 父级上下文生成变量i
                           //for循环体会产生私有上下文并产生自己的变量i,每次循环完会将父级上下文释放,因为i独立，私有上下文会影响父类中的i,但是每轮循环结束后私有上下文中的变量不受父级影响
    fnA[i] = function () {
        return i;
    }
}
fnA[0]();//0
fnA[4]();//4


//-----------自定义属性解决循环赋值的问题  方案2------不会产生闭包，但是还是会循环产生堆内存-------
//事先把信息存储到属性身上，后期在其他操作上需要用到直接获取即可
//例如button循环绑定事件时，给每个button添加自定义属性
for (let i = 0; i < buttonList.length; i++) {
    buttonList[i].myIndex = i;
    buttonList[i].onclick= function () {
        console.log(this.myIndex);
    }
}

//-----------事件代理机制  自定义标签  解决循环赋值的问题  方案3  性能会提高>=40%-------
// <button data-index = "1">button </button>
document.body.onclick = function (ev) {
    let target = ev.target;
    if(target.tagName === "BUTTON"){
        let index = + target.getAttribute("data-index"); // + 转数字
        console.log(index);
    }
}



//..................................
var a= 9;
function fn() {
    a =0;
    return function (b) {
        return b + a++;
    }
}
var f= fn();
console.log(f(5)); // 5;
console.log(fn()(5)); // 5
console.log(f(5));//6
console.log(a); // 2



//---------套娃-------------------
function fun(n,o) {
    console.log(o);
    return {
        fun: function (m) {
            return fun(m,n);//注意此处会执行后返回
        }
    };
}
var c = fun(0).fun(1); // undefined 0
c.fun(2); // 1
c.fun(3); // 1


var b =10;
(function b() {  //匿名函数具名化，名字只能在内部使用，且默认无法被重新赋值，除非这个函数名在函数体中被重新声明过
    b =20;
    console.log(b);  //function b(){ ... }
})();
console.log(b);



var b =10;
(function b() {  //匿名函数具名化，名字只能在内部使用，且默认无法被重新赋值，除非这个函数名在函数体中被重新声明过
    console.log(b);// undefined
    var b =20;
    console.log(b);  //20
})();
console.log(b);



//没有对象和函数的情况下，编写代码经常出现‘全局变量污染’
//.........怎么使用...........................................................................
/**
 *模块化/单例模式设计 （利用闭包的保护和对象的分组特征一起实现）
 *每一个对象都是Object的单独实例
 *   1.let obj = {}; //字面量方式
 *   2.let obj = new Object();//构造函数方式，后台语言只有这种方式
 *
 *
 * AModule  对象名且是命名空间，分组特征
 */
let AModule = (function () {
    let step = 0;
    function fn() {

    }
    function query() {
    }
    function privateFn(){ //私有方法

    }
    //我们想把私有的东西暴露出去供外面调用、
    // 1. // 瑕疵：不能给外部暴露太多方法，否则出现‘全局变量污染’
    window.query = query;

    // 2. 基于对象（分组）的方法，把需要暴露的方法，都放置到一个空间下  好的方案
    return {
        fn, query,step,
        init() {
            //控制业务板块中我们先执行谁，再执行谁
        }
    }
})()

function f1() {
    AModule.query();
}


//..........jquery 模块化实现..................................
//https://code.jquery.com/jquery-3.5.1.js
var A = typeof window !== "undefined" ? window : this; //根据执行环境返回全局对象
//利用暂时性死区：一个未被声明的变量在typeof检测时不会报错，只是返回“undefined”
//检测window是否存在
//  + JS在浏览器中执行：是存在window的
//  + JS在node中只执行：不存在window，全局对象是global


var B = function( window, noGlobal ) {
    //如果是在浏览器环境22中执行的js代码
    //   + window就是window   noGlobla为undefined
    //如果是node下执行 则 window是global ,noGlobal 为true
    "use strict";
    var jquery = function (select, context) {
        return new jQuery.fn.init(select, context);
    };

    jQuery.fn = jQuery.prototype = {

    }

    //浏览器环境下:暴露给全局变量两个变量，只都是jquery
    if (typeof noGlobal === "undefined" ) {
        window.jQuery = window.$ = jQuery;
    }
    return jquery;
};
(function (global, factory) {
    "use strict";
    // 严格模式：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode
    //验证是否支持CommonJS/ES6Module规范
    if(typeof module === "object" && typeof  module.exports === "object"){
        // 代码是基于node环境下的或者是基于webpack打包的项目
        module.exports = global.document ? factory(global, true) :function (w) {
            if(!w.document){
                throw new Error("jquery requires a window with a document");
            }
            return factory(w);

        };
    } else {
        // 运行在浏览器或者webview中
        factory(global);
    }
})(A, B);


//.........................类库、插件、ui组件、框架...............................
/**
 * 在我们的项目中编写自己的类库、插件、ui组件、框架的时候，我们需要基于闭包的机制进行’私有化’处理
 *   + 能够在浏览器中运行
 *   + 也支持CommonJS、ES6Module规范(node\webpack)
 */
(function () {
    function Banner() {

    }
    //浏览器环境
    if(typeof window !== "undefined"){
        window.Banner = Banner;
    }
    //支持CommonJS\ESModule
    if(typeof module !== "undefined" && typeof module.exports != "undefined"){
        module.exports = Banner;
    }

})();


//................惰性函数....函数重构...................................
/**
 * 懒 能执行一次绝不执行二次
 */

//这样写每次都需要判断window.getComputedStyle，没必要，第一次执行已经知道兼容性了
function getCss(element, attr) {
    if(window.getComputedStyle){
        return window.getComputedStyle(element)[attr];
    }
    //IE678
    return element.currentStyle[attr];
}
console.log(getCss(document.body, "width"));
console.log(getCss(document.body, "padding"));
//...........
let isCompatible = 'getComputedStyle' in window;
function getCss(element, attr) {
    if(isCompatible){
        return window.getComputedStyle(element)[attr];
    }
    //IE678
    return element.currentStyle[attr];
}
console.log(getCss(document.body, "width"));
console.log(getCss(document.body, "padding"));
//.......惰性思想....
function getCss(element, attr) {
    if(window.getComputedStyle){
        getCss = function (element, attr) {
            return window.getComputedStyle(element)[attr];
        }

    } else{
        //IE678
        getCss = function (element, attr) {
            return element.currentStyle[attr];
        }
    }
    return getCss(element, attr);
}
console.log(getCss(document.body, "width"));
console.log(getCss(document.body, "padding"));


//.............闭包柯里化函数.....预处理思想........................
let res = fn(1,2)(3);
console.log(res); //实现  1 + 2 + 3 =>6
function fn(...outterArgs) {
    return function anonymous(...innerArgs) {
        let arr = outterArgs.concat(innerArgs);
        return arr.reduce(function (total, item) {
            return total + item;
        })
    }
}
//自定义reduce
function reduce(arr, callback, init) {
    let arrindex = 0;
    if(init === "undefined"){
         init = arr[0];
         arrindex++;
    }
    for (let i = arrindex; i < arr.length; i++) {
        init = callback(init, arr[i], i);
    }
    return init;

}
let arr = [10, 20, 30, 40, 50];
let result = reduce(arr, function (result, item, index) {
    return result + item;
}, 0);
console.log(result);

result = reduce(arr, function (result, item, index) {
    return result + item;
}, 100);
console.log(result);


//..............Compose函数........................................
const add1 = (x) => x+1;
const mul3 = (x) => x*3;
const div2 = (x) => x/2;
console.log(div2(mul3(add1(add1(0)))));
//这样写可读性太差，我们可以构建一个compose函数,他接受任意多个函数作为参数（这些函数都只能接收一个参数），然后compose返回的也是一个函数，达到以下效果
const opera = compose(div2,mul3,add1, add1);
console.log(opera(0));//相当于div2(mul3(add1(add1(0))))
console.log(opera(2));//相当于div2(mul3(add1(add1(2))))
console.log(opera());
//方式1
function compose(...funcs) {
    return function opera(x) {
        if(funcs.length === 0){
            return x;
        }
        if(funcs.length === 1){
            return funcs[0](x);
        }

        return funcs.reduceRight(function (result, item, index) {
            if(index === funcs.length-2){
                return item(result(x));
            } else {
               return item(result);
            }
        });
    }
}
//方式2
const add1 = (x) => x+1;
const mul3 = (x) => x*3;
const div2 = (x) => x/2;
console.log(div2(mul3(add1(add1(0)))));
//这样写可读性太差，我们可以构建一个compose函数,他接受任意多个函数作为参数（这些函数都只能接收一个参数），然后compose返回的也是一个函数，达到以下效果
const opera = compose(div2,mul3,add1, add1);
console.log(opera(0));//相当于div2(mul3(add1(add1(0))))
console.log(opera(2));//相当于div2(mul3(add1(add1(2))))
console.log(opera());
function compose(...funcs) {
    if(funcs.length === 0){
       return arg =>{
           return arg;
       }
    }
    if(funcs.length === 1){
        return funcs[0];
    }

    return funcs.reduce((a,b)=> {
        return (...args) => {
            a(b(...args));
        }
    });

}

//.............防抖动防抖：对于频繁触发某个操作，我们只识别一次（只触发一次函数） ..................................
//点击做啥事情，一般都是防抖为主
// 防抖函数    点击做啥事情，一般都是防抖为主
// func[function]:最后要触发执行的函数
// wait[number]: 频繁的设定界限  多少时间点击算频繁
// immediate[boolean]: = true 触发第一次点击的  =false最后一次点击的  默认是最后一次点击的
// return 可以被调用执行的函数
function debounce(func,wait = 300,immediate = false){
    console.log('debounce',this)  // debounce在click执行之前执行 是debounce的执行结果给了click  这个时候 debounce里面的this 应该是window

    let timer = null
    return function anonymous(...params){
        console.log('ANY',this)  // 这个是click在页面中点击执行的 this指向元素本身

        let now = immediate && timer === null;
        // 如果是立即执行，
        now ? func.call(this,...params) : null;

        // 每次点击都把之前设置的定时器清除
        clearTimeout(timer)

        // 重新设置一个新的定时器监听wait时间内是否触发第二次
        timer = setTimeout(()=>{
            // 手动恢复初始状态
            timer = null;

            // this 是当前的元素
            // wait这么久的等待中，没有触发第二次
            !immediate ? func.call(this,...params) : null;
        },wait)
    }
}

function handle(){
    setTimeout(()=>{
        console.log('OK')
    },1000)
}

//document.body.onclick = handle; //如果疯狂点击submit，handle会触发很多次，那么一秒后会输出很多OK。

//body.onclick = function(){
//    // 在匿名函数中 我们控制handle 只执行一次
//}

document.body.onclick = debounce(handle,500,true);


//.......节流：在一段频繁操作中，可以触发多次，但是触发的频率由自己制定........................
//滚动scroll，文本框输入过程中的模糊匹配keydown都用节流
//例如：每次滚动过程中，浏览器都有最快反应时间（谷歌一般是5-6ms,ie一般是13-17ms）,只要反应过来就会触发一次函数，也就是说谷歌每5ms就会触发一次，过于频繁
function throttle(func, wait = 300) {
    let timer=null,
        previous = 0;//上一次触发时间
    return function anonymous(...params) {
        let now = new Date(),
            remaining = wait - (now - previous) // 还差多长时间 达到一次触发频率
        if(remaining<=0){
            // 两次操作间隔时间已经超过wait了 可以触发了
            window.clearTimeout(timer)
            previous = now
            timer = null
            func.call(this,...params)
        }else if(!timer){
            // 不符合触发的频率 设置定时器等待
            timer = setTimeout(()=>{
                timer = null
                previous = new Date()
                func.call(this,...params)
            },remaining)
        }
    }
}
function handle() {
    console.log(ok);
}
// window.scroll = handle; // 谷歌每5ms就会触发一次，过于频繁
window.scroll = throttle(handle);//每300ms触发一次