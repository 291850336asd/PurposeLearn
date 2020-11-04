function sum(x, y) {
    let total = x+y;
    this.total = total;
    return total;
}
let res = sum(10, 20);
console.log(res); //30
console.log(window.total);// 30

let res = new sum(10,20); //new执行，则sum不再是普通函数，而是构造函数或者类
console.log(res); //{total: 30}
console.log(window.total);// undefined

/**
 * 所有的类都是函数数据类型的值：内置类 、自定义类
 *   typeof Object : "function"
 * new 执行的特点：
 *  1.和普通的函数一样，形成私有上下文EC(xxx)、AO(xxx)、作用域链...
 *  2.new执行会在函数执行之前创建一个对象，this会指向当前创建的对象，构造函数就是的当前函数
 *  3.函数如果没有返回值则把当前对象返回，如果有返回值不是引用类型也不以当前返回值为主，返回的还是当前对象
 *      如果返回的是引用类型值，则以返回对象为主
 *  4.this.xxx都是给当前实例对象设置的私有属性方法
 *let res = new sum(10,20);这种写法成为构造函数模式
 *
 */
// 一般约定自己构造的类，首字母大写
function Fn(x, y) {
    let  str = "ten";
    this.total = x+ y;
    this.say = function () {
        console.log("ok");
    };
}
let res = new Fn(10, 20);
console.log(res);//{total: 30, say: ƒ}
let res2 = new Fn;//这些写Fn也会执行
                  // new Fn(10,20)带参数列表  优先级 19
                  // new Fn 不带参数列表new   优先级 18
                  //并且new Fn(10,20) 优先级高于new Fn
console.log(res2);//{total: NaN, say: ƒ}
console.log(res.say == res2.say) ;// false

console.log(res instanceof Fn);//检测res是否是Fn的实例  instanceof 有坑慎用

//  检测属性是否属于这个对象 使用 in,无论属于私有还是公有结果都是true
console.log('say' in res);// true
console.log('str' in res);// false
// 检测属性是否属于这个对象的私有属性 使用 hasOwnProperty,必须是私有属性才是true
console.log(res.hasOwnProperty('say')); //true
