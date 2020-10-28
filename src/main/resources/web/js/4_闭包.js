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
function fn(x) {//行参变量也属于私有变量
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



//-----------------------
var fnA= [];
for(var i = 0; i<5;i++){
    fnA[i] = function () {
        return i;
    }
}
fnA[0]();//5
fnA[4]();//5

//-----------------
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

