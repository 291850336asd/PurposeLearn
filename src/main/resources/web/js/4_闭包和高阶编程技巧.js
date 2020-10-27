/**
 * 函数执行，会形成一个私有的上下文，这个私有上下文会保护里面的私有变量不受外界的干扰，我们把函数的这种保护机制成为闭包
 *
 * 示例1
 *
 * 正常情况下函数执行完后所形成的上下文都会出栈释放，私有上下文中的一切东西都销毁，优化栈内存控件
 * 如果函数执行所形成的的上下文中有一个东西（一般是引用类型的地址）被当前上下文以外的事务所占用，
 * 则当前上下文将不会释放，将导致栈内存变大
 *
 * 函数每次执行都会形成全新的私有上下文
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