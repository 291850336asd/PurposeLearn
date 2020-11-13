/**
 * THIS 函数的执行主体，跟执行上下文不是一个概念
 *全局的this是window
 *this跟函数在哪执行和在哪定义没有必然联系
 *
 * 可以按照一下规律确实执行主体是谁：
 *   + 给当前元素的某个事件行为绑定方法，事件触发，方法中的this是当前元素本身
 *       例如给body的click绑定方法，则方法中的this就是body,(特殊情况 ie678下基于attachEvent实现的DOM2事件绑定，绑定方法中的this不是元素本身，而是window)
 *   + 函数执行，先看函数名之前是否有‘.’,有‘.’，‘.’前是谁this就是谁,没有‘.’则this就是window（在js的严格模式下，没有'.',方法中的this是undefined）
 *       + 匿名函数（自执行函数、回调函数）一般this也是window、undefined，除非做了特殊处理
 *       + 括号表达式中有多项只取最后一项作,但是this为window
 *       + use strict;//在当前上下文起作用,只对当前和下级上下文起作用
 *         匿名函数中的this,一般都是window、undefined
 *         回调函数中的this一般都是window、undefined,除非特殊处理了
 *   + new构造函数中的this是当前实例
 *   + 箭头函数没有自己的this，用到的this是上下文中的this,以及{ }块级上下文里面没有this，如果代码中遇到this也不是函数自己的，而是它所在的上级上下文的this
 *   + 基于call\appply\bind可以强制改变this指向,对箭头函数没用
 *
 */

function fn() {
    console.log(this);
}
let obj = {"name":"xxxx", fn:fn};
fn();//this=> window
obj.fn();//this =》obj;
//..........................................
"use strict";
function fn() {
    console.log(this);
}
let obj = {"name":"xxxx", fn:fn};
fn();//this=> undefined
obj.fn();//this =》obj;

//.................................................
var num =10;
var obj = { num:20 };
obj.fn = (function (num) {
    this.num = num * 3;
    num++;
    return function (n) {
        //console.log(this);
        this.num +=n;
        num++;
        console.log(num);
    }
})(obj.num);
var fn = obj.fn;
fn(5);// 输出22   //此时的this是window,没有‘.’则this就是window
obj.fn(10);//23
console.log(num,obj.num);//65 30
////////////////
[1,2].sort(function (a, b) {
    console.log(this); //window
});
[1,2].forEach(function (item,index) {
    console.log(this); //window
});
[1,2].forEach(function (item,index) { //foreach做了特殊处理，传递的第二个参数是为了改变会调函数中的this指向
    console.log(this); //obj
}, obj);

(obj.fn)(); //  this -> obj;
(10,20,obj.fn)(); //  this -> window;
//////////////////
let obj = {
    name: "obj",
    fn(){
        console.log(this); // obj
        setTimeout(function () {
            this.name = "aa"; //window.name
            console.log(this); // window 这个回调函数
        },1000);
    }
};
//
let obj = {
    name: "obj",
    fn(){
        let _this = this; // obj
        setTimeout(() => {
            _this.name = "aaa"; // _this -> obj;
            console.log(this); //window
        },1000);
    }
};
//
let obj = {
    name: "obj",
    fn(){
        let _this = this; // obj
        setTimeout(function () {
            _this.name = "aa";// obj.name
            console.log(this); // window 这个回调函数
        },1000);
    }
};
//////////
(function () {
    var val = 1;
    var json ={
        val:10,//属性
        dbl:function () {
          val *=2; //val是变量，不是自己的私有变量，是自执行函数创建出来的上下文中的变量
        }
    };
    json.dbl();
    alert(json.val + val);  //"12";alert输出的都是字符串
})();


//.........arguments............
var a = 4;
function b(x,y,a) {
    /**
     *  EC(b)
     *    x = 1, y=2, a =3
     *   作用域链：EC(B). EC(G)
     *   初始化this:window
     *   初始化arguments=>{0:1,1:2,3:3,length:3}
     *       在非严格模式下：初始化的arguments和行参建立一个‘映射’机制，并且映射机制只能在这个阶段建立
     *                       arguments跟传值有关，传值的才有映射关系，默认值不形成映射关系，并且只要传递实参，arguments中就有值，不传值就是一个空的数组集合
     *       严格模式下不存在映射机制
     *
     */
    console.log(a); //3
    arguments[2] = 10;
    console.log(a);// 10

}
a = b(1,2,3); //b没有返回值就是undefined
console.log(a); // undefined

//.........arguments............
var a = 4;
function b(x,y,a) {
   a = 3;
   console.log(arguments[2]); //undefined
}
a = b(1,2);

//....................call\appply\bind................................
/**
 * fun.call(obj,...args)  立即执行
 *    首先fun基于原型链找到Function.prototype.call方法，并且把call方法执行
 *    call中的this就是fn,传递给call方法的第一个实参就是未来改变fn中的this,...args是传给fun的实参信息
 *    并且接受fn执行的返回结果，作为返回值给外部
 *    fun.call(10,20);//  this-> 10 Number
 *    fun.call();fun.call(null);//如果不传参数或者传递的是null/undefinded,在js非严格模式下this-》window。在严格模式下this->undefined
 *
 * fun.apply(obj,[args])
 *    跟call没有区别，唯一区别参数只能是[10,20]数组，表现形式不一样call需要把参数一个一个传递给call，call在一个一个传递给fun
 *    apply需要把参数放到数组中传递给apply,但是apply内部也是把数组每一项一个一个传给fun
 *
 * fun.bind(obj,...args)
 *    call、apply在执行函数时会立即把函数执行，并改变this
 *    bind是预先处理，执行bind只会预先把函数需要改变的this等信息存储起来，但是此时函数并不会执行并返回一个匿名函数，
 *    当后期执行匿名函数时才会把需要执行的函数执行，并且改变this的预设值
 *
 */
const  fn = function fn(x, y) {
    console.log(this.name);
    console.log(x + y);
    return this;
}
window.name = "window";
let obj = {
    name: "obj"
}
fn(10, 20); // window  this -> window
let res = fn.call(obj, 10, 20); //obj  this-> obj
res == obj ;// true
fn.bind(obj, 10 ,20)();
let resapp = fn.apply(obj, [10,20]);
resapp == res;// true
obj.fn(); //this->obj   obj.fn is not a function

setTimeout(fn.call(obj, 10, 20), 1000);// 错误处理，这种在设置是fn.call已经执行，相当于把fn.call返回的结果绑定给定时器，会报Uncaught SyntaxError: Unexpected identifier
setTimeout(fn.bind(obj, 10 ,20), 1000);
setTimeout(function () {
    fn.call(obj, 10, 20)
},1000);

const  fn = function fn(x, y, ev) {
    console.log(this.name);
    console.log(x + y);
    return this;
};
document.body.click = fn.bind(obj, 10, 20);
document.body.click = function (ev) {
    fn.call(obj,10 ,20, ev);
};

//................fun.bind(obj,...args)自定义实现..........................

Function.prototype.bind = function bind(context, ...params) { //运行时参数是10,20
    //此时this是.bind之前的对象fn
    //context 为需要改变this成context
    // return function anonyous(...args) {
    //     //此处的this是body
    // }
    return (...args) => { //运行时 参数是 ev
        //此时this 上级上下文 fn
        this.apply(context, params.concat(args));
        // this.call(context, ...params.concat(args));
    }
};
const  fn = function fn(x, y, ev) {
    console.log(this.name);
    console.log(x + y);
    return this;
};
let obj = {
    name: "obj"
}
document.body.click = fn.bind(obj, 10, 20);


//................fun.call(obj,...args)自定义实现..........................
const  fn = function fn(x, y, ev) {
    console.log(this.name);
    console.log(x + y);
    return this;
};
let obj = {
    name: "obj"
}
//fn 和obj 本来没关系
obj.fn = fn;
obj.fn(10, 20);//此时中this->obj;
delete obj.fn;
////call实现同理
Function.prototype.call = function call(context, ...params) {
    //细节点：对于context类型处理，基本数据类型无法设置键值对
    context == null ? window : null;
    if(!/^(object|function)$/i.test(typeof context)){
        //基本数据类型
        // context = new context.constructor(context); //但是对于Symbol\BigInt不友好，没有构造函数
        context = Object(context);//直接变成引用类型值
    }

    let res;
    //this -> fn
    //context->obj 为需要改变this成context
    // context['my_' + this.name] = this; // this-> fn //可能产生命名冲突
    let key = Symbol("key");
    context[key] = this;
    res = context[key](...params);//函数中this->obj
    delete context[key];
    return res;
};
const  fn = function fn(x, y) {
    console.log(this.name);
    console.log(x + y);
    return this;
};
let obj = {
    name: "obj"
}
let res = fn.call(obj, 10, 20);


//......call 深层理解..................基于Function.prototype.call = function call(context, ...params)分析即可
var name = "zhuzhu";
function A(x, y) {
    var res = x + y;
    console.log(res, this.name);
}
function B(x, y) {
    var res = x - y;
    console.log(res, this.name);
}
B.call(A, 40 , 30); // 10 "A"
B.call.call.call(A, 20, 10); // NaN, undefined
//B.call.call.call(A, 20, 10);
//开始 this->B.call.call   context->A
// A.key = call
//相当于把call.call(A,20, 10)执行  A.key= call 相当于 A.call(10, 20) 即CALL第二次执行
// this->A  context-> new Number(20)   params-> 10
//结果 NaN, undefined
Function.prototype.call(A, 60, 50);  //没有任何输出
//Function.prototype.call(A, 60, 50);
// 开始 this->Function.prototype context->A parmas->60,50
//A.key = Function.prototype  相当于 Function.prototype(60,50)
//Function.prototype 为匿名空函数 即啥都不处理即没有任何输出
Function.prototype.call.call.call(A, 80, 70);// NaN, undefined
//Function.prototype.call.call.call(A, 80, 70);
// 开始 this->Function.prototype.call.call context->A parmas->80, 70
//A.key = Function.prototype.call.call  相当于 call.call(A, 80, 70) 即CALL第二次执行
// this->A  context-> new Number(80)   params-> 70
//结果 NaN, undefined