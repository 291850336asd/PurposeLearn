/**
 *
 *
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
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
