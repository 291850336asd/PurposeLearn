/**
 * 所有的类都是函数数据类型的 即  所有的函数都是Function的实例
 * 每个类（函数）都具备prototype（显式原型）,并且属性值是一个对象，对象中存储的是供‘对象实例’能调用的公共属性和方法
 * 并且类的原型对象天生具备一个属性：constructor,指向类本身
 * 每个对象（普通对象、prototype、实例、函等数）都具备：_proto_原型链,属性值是当前实例所属类的原型
 * 实例._proto_ === 类.prototype
 * 函数._proto_ === Function.prototype
 * Object._proto_._proto_ = Object.prototype
 * Function.._proto_ = Function.prototype
 * Object是Function的一个实例，Function也是Object的一个实例（骚操作）
 * 每个实例对象（ object ）都有一个私有属性（称之为 __proto__ （隐式原型））指向它的构造函数的原型对象（prototype ）。
 *     该原型对象也有一个自己的原型对象( __proto__ ) ，层层向上直到一个对象的原型对象为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节
 *
 * https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes
 *
 *
 * 对象数据类型
 *   + 普通对象、数组对象、正则对象、日期对象、类数组对象、dom对象
 *   + 大部分数据对象除了基本数据类型
 *   + 类的原型 prototype
 *   + 函数也是对象‘函数的三种角色’，最后会说三种角色
 *
 *
 * JS 中创建变量的存储值有两中方案
 *   + 字面量方式
 *   + 构造函数方式
 *   不论哪一种方法，创造出来的值都是所属类的实例
 * 【基本数据类型值】
 *   + 字面量创造出来的值是基本类型
 *   + 构造函数创造出来的是引用数据类型
 *       特殊性：Symbol和BigInt不是构造函数，不能使用new创建
 * 【引用数据类型】
 *   + 两种创建方法的结果是一样的
 */
function Fn() {
    this.x = 100;
    this.y = 200;
    this.getX = function () {
        console.log(this.x);
    }
}
Fn.prototype.getX = function () { //给原型上扩展属性方法
    console.log(this.x);
}
Fn.prototype.getY = function () {
    console.log(this.y);
}
Fn.prototype.getZ = function () {
    console.log(y);
}
let f1 = new Fn;
let f2 = new Fn;
console.log(f1.getX == f2.getX); // false;
console.log(f1.getY == f2.getY); // true;
// f1.getX();首先看是否是自己的私有属性，如果是私有的则操作私有属性，如果不是则操作基于_proto_找所属类原型上公共的属性方法，
// 如果原型上也没有则基于原型的_proto_查找，直到找到Object.prototype为止，我们把这种查找直接称为原型链机制
// f1._proto_.getX 或者 Fn.prototype.getX 相当于跳过私有查找直接找所属类原型上公共的属性方法，f1._proto_这种模式在ie浏览器被保护起来，不允许访问
console.log(f1.__proto__.getY === Fn.prototype.getY); // true
console.log(f1.__proto__.getX === f2.getX);// false
console.log(f1.getX === Fn.prototype.getX); // false
console.log(f1.constructor); // Fn(){ ... }
console.log(Fn.prototype.__proto__.constructor); // Object() { [native code] }
f1.getX(); // 100
f1.__proto__.getX(); // undefined
f2.getY(); // 200
Fn.prototype.getY(); // undefined
f1.__proto__.getZ();// error y is not defined
Fn.prototype.getZ(); // error y is not defined

//....................原型重定向.....................................、
//原型重定向是为了批量给原型扩充方法
//新定向的原型对象上没有constructor,结构不完整
//浏览器默认生成的原型对象因为缺少引用会被释放掉，可能导致原始加入的属性方法丢失
//内置的原型对象不允许重定向
function fun() {
    this.a = 0;
    this.b = function () {
        alert(this.a);
    }
}
fun.prototype.getAA = function(){};//丢失
fun.prototype = { // 原型重定向
    b: function() {
        this.a = 20;
        alert(this.a);
    },
    c: function () {
        this.a = 30;
        alert(this.a);
    }
}
var my_fun=new fun();
my_fun.b(); // 0
my_fun.c();// 30
//为了防止丢失，如果原型上没有其他方法则添加constructor
fun.prototype = { // 原型重定向
    constructor: fun,
    b: function() {
        this.a = 20;
        alert(this.a);
    },
    c: function () {
        this.a = 30;
        alert(this.a);
    }
}
//为了防止丢失，如果原型上有其他方法则使用对象合并
fun.prototype = Object.assign(Fn.prototype, {
    b: function() {
        this.a = 20;
        alert(this.a);
    },
    c: function () {
        this.a = 30;
        alert(this.a);
    }
})


//.................向内置类原型扩展方法.....................................
//调用起来方便
//数组去重
let arr = [1,3,4,5,7,8,5,7,3,1];
var set = new Set(arr);
console.log(Array.from(set));
//扩展Array方法
let arr = [1,3,4,5,7,8,5,7,3,1];
//自定义的属性方法名最好设置前缀：myXXX,为了防止自己的方法覆盖默认的方法
Array.prototype.myUnique = function myUnique() {
    // 保证this是当前数组
    if(!Array.isArray(this)){
        throw new TypeError("确保操作的是一个数组");
    }
    return Array.from( new Set(this))
}
arr = arr.myUnique();
//.............................
let n = 10;
const validateNum = function validateNum(num){
    num = Number(num);
    return isNaN(num)? 0 : num;
}
Number.prototype = Object.assign(Number.prototype,{
    plus: function (val) {
        console.log(typeof this);//object  this一定是一个引用类型的值
        // 对象 + 数字 ：大部分情况下会转换成字符串拼接，除 {} + 数字 以及对象有原始值[[PrimitiveValue]]
        // 把对象转换为数字，首先调用valueOf方法获取原始值（number、string、boolean、Date有原始值）
        //                如果有原始值则直接获取原始值结果并且参与到运算中，如果没有原始值则继续调用toString转换为字符
        return this + validateNum(val);
    },
    minus: function (val) {
        return this - validateNum(val);
    }
})

let m = n.plus(10).minus(5); //n.plus 此时n是引用类型的值,隐式转换
console.log(m);//=>15（10+10-5）


//........................Function.................................
/**
 * 所有的函数都是Function的实例
 * Function 的原型prototype并不是对象而是匿名空函数，但是操作上和其他的原型一样，但是这个函数没有prototype,只有__proto__并指向Object.prototype
 *
 * 所有的函数都有三种角色
 *   + 普通函数
 *   + 构造函数 new执行
 *   + 普通对象
 * 这三个角色没有必然联系
 *
 * Function.prototype上有call/apply/bind三种改变THIS的方案，所有函数都可以调用这三个方法
 */



function Foo() {
    getName = function () {
        console.log(1);

    }
    this.getX = function () {//还有this产生生成的函数才会对 new Foo()时产生影响

    }
    return this;
}

Foo.getName = function () { //把Foo当做普通对象设置私有键值对，注意此处的Foo是对象，并不会引起Foo函数的变化
    console.log(2);
}
Foo.prototype.getName = function () { // 把Foo当做类，扩展Foo的原型方法
    console.log(3);
}
var getName =function () { //全局getName赋值
    console.log(4);
}
function getName() {
    console.log(5);
}
Foo.getName(); // 2  当做普通对象处理
getName(); // 4  //全局getName
Foo().getName(); // 1  //普通函数 Foo()返回的this是window ,并且全局getName被修改
getName(); // 1 //全局getName
//以下涉及运算符优先级的问题 xx.xx 优先级19  new Foo优先级18  new Foo()带参数优先级19  ，优先级一样一般从左到右
new Foo.getName(); // 2  new函数会把函数当做普通函数执行
new Foo().getName(); // 3 //首先创造new Foo()实例，再调用getName ,会调用Foo函数上的方法
new new Foo().getName(); // 3  执行let a= new Foo() ,然后执行new a.getName()，会执行原型上的getName