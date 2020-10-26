/**
 * 变量提升：在当前上下文中（全局/私有/块级）,JS代码自上而下执行之前，浏览器会提前处理一下事情
 * 可以理解为词法解析的一个环节
 *
 * 会把当前上下文所有带var、function关键词的进行提前声明或者定义
 * var a= 10;
 * 声明declare: var a;
 * 定义defined：a=10;
 *
 *
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