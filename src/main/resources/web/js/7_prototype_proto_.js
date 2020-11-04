/**
 * 所有的类都是函数数据类型的
 * 每个类（函数）都具备prototype（显式原型）,并且属性值是一个对象，对象中存储的是供‘对象实例’能调用的公共属性和方法
 * 并且类的原型对象天生具备一个属性：constructor,指向类本身
 * 每个对象（普通对象、prototype、实例、函等数）都具备：_proto_原型链,属性值是当前实例所属类的原型
 * 实例._proto_ === 类.prototype
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
 *   + 函数也是对象‘函数的三种角色’
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