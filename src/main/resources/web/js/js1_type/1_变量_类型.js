/**
 * 在全局上下文中，基于var/function 声明的全局变量，也会给GO(window)中新增一个对应的私有属性，并且和全局的变量有“映射机制”：
 *一个修改，另一个也会跟着修改
 *例如 var a= 10;声明一个全局变量a=10,给window新增一个私有属性window.a = 10;
 *console.log(a);//首先看a是否是全局变量，如果是按照全局变量处理，如果不是全局变量，再看是否是window的一个属性，如果也不是window的
 * 属性则报：a is not defined
 * console.log(window.a);//直接访问对象的成员
 *winsow.a=20; //“映射机制”全局变量a=20;
 * console.log(a);//20
 *
 *
 * 基于let/const 声明的全局变量和window没有关系
 * let a=10;//全局变量a
 * console.log(a);//10
 * console.log(window.a);//undefined
 *
 * 在全局上下文中
 * a=10;//不是全局变量，window.a=10；相当于省略了window（前提：确定之前没有声明过）
 *
 *带声明的关键词和不带是不一样的机制，所以项目中不要省略声明
 *
 * js类型分为两大类型主要是因为堆栈的原因
 *
 * 基本数据类型
 * number
 *   NAN:not a numbner
 *        NAN==NAN -> false
 *         NAN===NAN -> false
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


// -----------let var----------
/**
 *声明变量的方式
 * var function 传统方式
 * let const import  es6新方式
 *
 */

/**
 * let 和 const
 *   + const声明的变量不允许指针重新指向新地址，不允许即重新赋值，但是对象的内容可以改变，即可以改变堆信息
 *
 *
 *
 *
 */


/**
 * var 和 let
 *   + 带var\function存在变量提升，而带let\const不存在
 *       代码执行之前：全局上下文中的变量提升
 *       带var的会提前声明
 *       带function会提前声明定义
 *   + 声明的都是变量,在同一个上下文中都不允许重复声明，重复定义代码无法执行，检测是否重复发生在词法解析阶段
 *       词法解析-》变量提升-》代码执行
 *   + var暂时性死区（浏览器遗留bug）,基于typeof 检测一个未被声明的变量，不会报错，而是返回undefined，
 *       console.log(aaaa);//报错 aaaa is not defined
 *       console.log(typeof aaaa);//undefined
 *     但是let不存在此问题
 *   + 块级作用域
 *       除函数或者对象的大括号之外，如果括号中出现let\const\function都会出现块级上下文
 *       块级上下文也只是对let\const\function 声明的变量起作用，不会对var产生的变量有保护作用
 */
console.log(a);//undefined
var a = 10;

console.log(b);//报错g is not defined  或 can't access lexical declaration 'g' before initialization  报错内容跟版本有关
let b =10;

//建议使用函数表达式创建函数
const fn = function(){}

//函数的变量提升在新版浏览器中很变态  声明+定义
console.log(fn());
function fn(){ console.log("ok") }

/**
 * 新版本浏览器中只声明，为了兼容es3/es6，处理规则非常复杂
 *    + 全局变量提升：如果创建函数的代码出现在‘非函数或者对象’大括号中，例如判断体、循环体、代码块...中，则只会声明
 *    + 代码执行进入到大括号中：如果存在let\const\ function xxx{}，此时当前大括号会形成一个私有上下文,私有上下文第一件事也是变量提升,function会声明+定义，属于私有变量
 * 老版本浏览器不论条件是否成立都是声明+定义，而且fn是全局上下文的
 */

console.log(fn()); //报错，fn is not a function ，此时值为undefined
if(1==1){
    function fn(){
        console.log("ok");
    }
}
// --------------------
var a=0;
if(1==1){
    console.log(a); //报错Cannot access 'a' before initialization
    let a=0;
    function fn(){
        console.log("ok");
    }
}
//-------------
if(1==1){
    console.log(fn()); //ok
    function fn(){
        console.log("ok");
    }
}
//----------

// 新版本
console.log(fn); // 全局上下文fn
if(1==1){
    //此时大括号代码中出现了function、let、const ，形成全新的私有块级EC(BLOCK)上下文，声明+定义
    //导致   console.log(fn());  function fn(){ console.log("ok");}fn =12; console.log(fn); 中的代码为变量提升两次
    console.log(fn());//私有上下文fn
    function fn(){   //代码执行到此处是由于全局上下文也提升过一次fn,此处会把当前代码映射给全局一份，但是之后的代码都是操作私有的，跟全局没有关系
        console.log("ok");
    }
    fn =12;
    console.log(fn);
}
fn();