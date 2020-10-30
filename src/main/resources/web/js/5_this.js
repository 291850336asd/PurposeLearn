/**
 * THIS 函数的执行主体，跟执行上下文不是一个概念
 *全局的this是window
 *this跟函数在哪执行和在哪定义没有必然联系
 *
 * 可以按照一下规律确实执行主体是谁：
 *   + 给当前元素的某个事件行为绑定方法，事件触发，方法中的this是当前元素本身
 *       例如给body的click绑定方法，则方法中的this就是body,(特殊情况 ie678下基于attachEvent实现的DOM2事件绑定，绑定方法中的this不是元素本身，而是window)
*    + 函数执行，先看函数名之前是否有‘.’,有‘.’，‘.’前是谁this就是谁,没有‘.’则this就是window（在js的严格模式下，没有'.',方法中的this是undefined）
 *       use strict;//在当前上下文起作用,只对当前和下级上下文起作用
*        匿名函数中的this,一般都是window、undefined
 *       回调函数中的this一般都是window、undefined,除非特殊处理了
 *   + 构造函数中的this是当前实例
 *   + 箭头函数没有自己的this，用到的this是上下文中的this
 *   + 基于call\appply\bind可以强制改变this指向
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
    this.num = num + 3;
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
console.log(num,obj.num);//28 30










