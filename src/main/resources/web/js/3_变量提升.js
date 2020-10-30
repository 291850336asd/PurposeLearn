/**
 * 变量提升：在当前上下文中（全局/私有/块级）,JS代码自上而下执行之前，浏览器会提前处理一下事情
 * 可以理解为词法解析的一个环节
 *
 * 会把当前上下文所有带var、function关键词的进行提前声明或者定义。es6中的let\const不会
 * var a= 10;
 * 声明declare: var a;
 * 定义defined：a=10;
 *var、function 没有优先级，自上而下查找提升，不会重复声明 ***
 *
 * 基于var\function 在全局上下文中声明的全局变量,会映射到window上而且一个修改另一个也会修改
 *
 * 函数每次执行都会形成全新的私有上下文
 */

/**
 * 代码执行之前：全局上下文中的变量提升
 *   带var的会提前声明
 *   带function会提前声明定义
 */
console.log(a); //undefined
var a= 12; //创建值12，不需要在声明a了（变量提升阶段完成了，完成的事情不会重复处理）
a= 13;
console.log(a); //13
console.log(b); //报错，b is not defined


/**
 * 全局下的变量提升
 *  func=函数，提升阶段赋值了
 *  真实项目中使用var func = function(){},方式创建函数，这种方式在变量声明阶段只会声明func，不会赋值
 */
func();
function func(){
    var d = 12;//d不会变量提升,未执行时存的字符串
    console.log("ok");
}

/**
 * 以下代码报错
 */
func(); //报错：func is not a function
var func =function(){
    var d = 12;//d不会变量提升,未执行时存的字符串
    console.log("ok");
}


/**
 * 函数匿名化
 */
var func =function aaa(){
    //把原本作为值的函数表达式匿名函数“具名化”(虽说起了名字，但是不能用,未在当前上下文中创建aaa)
    //当函数执行，在形成的私有上下文中，会把这个具名化名字作为私有上下文变量
    //aaa()递归调用，   ...这样做是因为严格模式下不支持arguments.callee??
    /**
     * setTimeout(function aa(){
     *     aa();
     * }，1000)
     */
    console.log("ok");
    console.log(aaa);//输出函数内容
}
aaa();//报错,aaa is not defined


/**
 * 没有变量提升
 */
console.log("ok"); //ok
console.log(g); //报错g is not defined
g = 13;
console.log(g);

/**
 * 没有变量提升
 */
console.log(g); //报错g is not defined  或 can't access lexical declaration 'g' before initialization
                //报错内容跟版本有关
let g = 13;
console.log(g);

/**
 * 没有变量提升
 */
g = 13;//如果没有定义过，直接赋值则为window属性
console.log(g); //13

/**
 *EC(G):全局上下文中的变量提升
 * 判断体中：不论条件是否成立都要进行变量提升（细节点：条件中带function的在新版本浏览器中，只会提升名字，不会赋值分界点ie11）
 */
if(!("a" in window)){
    var a= 1;
}
console.log(a); //undefined


console.log(a, func);// undefined,undefined 新版本
if(!("a" in window)){//检测是否为window属性
    var a= 1;
    function func(){
    }
}
console.log(a); //undefined


/**
 * EC(G):全局上下文中的变量提升
 *   func => 1 //声明定义
 *   func => 2 //已经声明过，只赋值
 *   var func ;//已声明跳过
 *   func=> 4;//只赋值
 *   func=> 5;//只赋值
 *   到此全局上下文中只有一个变量func，输出结果是5
 *   然后开始运行自上而下
 *   到var func 时重新赋值 输出结果为3
 *
 */
func();//5
function  func() {
    console.log(1);
}
func();//5
function  func() {
    console.log(2);
}
func();//5
var func = function() {
    console.log(3);
}
func();//3
function  func() {
    console.log(4);
}
func();//3
function  func() {
    console.log(5);
}
func();//3


/**
 * 示例1
 *首先形成全局变量foo bar
 * 然后开始执行bar,加载bar的内容
 * 此时进行bar私有变量提升  bar内的foo
 * 此时bar内的foo 只声明了，值为undefined
 * undefined 对应的数字为0
 * 所以运行var foo =10；
 * 得出输出结果为10
 */
var foo = 1;
function bar() {
    console.log(foo);//undefined
    if(!foo){
        var foo = 10;
    }
    console.log(foo);
}
bar();// 10

/**
 *
 */
var e = 0;
if(true){
    e = 1;
    function  e() {
        console.log("aaaa")
    }
    e = 2;
    console.log(e);  //2
}
console.log(e) // 1






//..............块级作用域变量提升.......................

//全局上下文变量提升会产生foo变量
{
    function foo() { //新版本浏览器中   块级作用域 只声明,由于全局变量提升此处会对全局的变量进行赋值，即会将当先上线文的foo值映射给全局上下文中的foo
    }
    foo = 1;
}
console.log(foo);//foo() {}


//全局上下文变量提升会产生foo变量
{
    //形成块级上下文:两次 声明+定义 foo
    function foo(n) {  //由于全局变量提升此处会对全局的变量进行赋值，即会将当先上线文的foo值映射给全局上下文中的foo,此时当前上下文中的foo=foo(m){}
    }
    foo = 1;
    function foo(m) { //由于全局变量提升此处会对全局的变量进行赋值，即会将当先上线文的foo值映射给全局上下文中的foo,此时当前上下文中的foo=1
    }
}
console.log(foo);//1


//......................
var x = 1;
function func(x,y=function anonymous1() {x =2;}) {
    x = 3;
    y();
    console.log(x);
}
func(5); //2
console.log(x);//1

//............
var x = 1;
function func(x,y=function anonymous1() {x =2;}) {
    // console.log(x); // 5
    var x = 3; // 在新版本浏览器中如果形参有默认值，参数类型随意，不管有没有传参，在函数体内出现了基于var\let\const变量声明（let\const不能重复声明即不能和形参名一致），除了生成自身的上下文，
               // 函数体还会产生新的块级上下文并且只有声明的x变量才属于新生成的块级上下文  并且块级上下文中声明的变量如何和行参名一样还会将行参变量值映射到新产生的块级变量
               //操蛋玩意
    y();
    console.log(x);//导致此处的x跟anonymous1和func形成的上下文没有关系
}
func(5); //3
console.log(x);//1


var x = 1;
function func(x,y=function anonymous1() {x =2;}) {
    var x = 3;
    var y = function anonymous2() {x =4;}
    y();
    console.log(x);
}
func(5); //4
console.log(x);//1