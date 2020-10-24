/**
 * js类型分为两大类型主要是因为堆栈的原因
 *
 * 基本数据类型
 * number
 *   NAN:not a numbner
 *        NAN==NAN -> false
 *        isNaN("ss") -> true
 *        Object.is(NaN,NaN)  ->true
 *        任何值 == NAN -> false
 *        let a = NaN;console.log(a == a); -> false;
 *   Infinity:无穷大
 * string
 *    单引号 双引号 单引号
 * boolean
 * null
 *   null == undefinded -> true
 * undefined
 * symbol  ： 创建为一值
 *     Symbol("AA") == Symbol("AA");  -> false
 *     let a = Symbol("AA");console.log(a == a); -> true;
 * bigint
 *    超过Number.MAX_SAFE_INTEGER   9007199254740991 使用bigint 处理
 *    例如 9007199254740991n + 1n
 * 引用数据类型
 * object
 *    {}普通对象   []数组对象    //当行注释  正则对象  日期对象
 * function
 *
 */

var a = {},b='0',c=0;//对象的属性可以是字符串、Symbol
a[b] = "珠峰";
a[c] = "web";
console.log(a[b]);//web

var a = {},b=Symbol("1"),c=Symbol("1");
a[b] = "珠峰";
a[c] = "web";
console.log(a[b]);//珠峰

var a = {},b={n:"1"},c={"sss":"222"},d=[{"bb":"ss"}];//对象属性会转化成字符串toString
a[b] = "珠峰";
a[c] = "web";
a[d] = "html";
console.log(a[b]); // html

var a={"n":"1"};
var b= a;
a.x = a={n:2};
console.log(a.x); // undefined  运算优先级  a.x
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
console.log(a);  //{n:2};


var a={"n":"1"};
var b= a;
a.x = b={n:2};
console.log(a.x); //{n: 2}
