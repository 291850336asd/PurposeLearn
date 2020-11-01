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










