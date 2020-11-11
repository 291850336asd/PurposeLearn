/**
 * 数据类型检测
 * typeof  正规军  根据计算机底层存储的二进制检测的
 *   + 返回结果是一个字符串，字符串包含数据类型 例如number\string\boolean\undefined\symbol\bigint\object\function
 * instanceof 基于xxx instanceof 类检测时，浏览器会把它转换为类.[Symbol.hasInstance](xxx),Symbol.hasInstance在Function原型上，所以instanceof后面必须是类
 *   + 并不是检测数据类型的，只是检测实例是否属于某个类
 *   + 原型链查找导致instanceof不准确
 * constructor 获取实例的构造函数，基于这个特点可以充当数据类型检测。比instanceof准确一点，而且constructor可以随意修改
 *   + 可以识别基本类型的值
 * Object.prototype.toString.call  正规军
 *   + 专门用来检测数据类型的（很强大很暴力的一种办法，基本零瑕疵）
 *   + Number\String\Boolean\Symbol\BigInt\Function\Array\RegExp\Date\Object...的原型上都有toString,除了Object.prototype.toString不是转换转换字符串的，其余都是
 *     Object.prototype.toString是用来检测数据类型的
 *   + 返回结果“[object 对象[Symbol.toStringTag]|| 对象.构造函数（不受自己更改的影响，对内置有效，自定义类无效）  || Object]”
 *   + Object.prototype.toString.call(value) 或者 ({}).toString.call(value)
 */
typeof null ;// object
typeof a; // undefined     a不存在返回 undefined
let arr = [];
console.log(arr instanceof Array); // true   相当于 Array[Symbol.hasInstance](arr);
console.log(arr instanceof Object);// true  决定不能证明 xxx instanceof Object 是true就是普通对象
console.log(arr instanceof RegExp);// false

let n = 10,m = new Number(10);
n.toFixed(2); //隐式转换
m.toFixed(2);
console.log(typeof n); // number
console.log(n instanceof Number); // false  不存在隐式转换
console.log(m instanceof Number); // true
console.log(m instanceof Object); // true

function Person(){}
Person.prototype = Array.prototype;
let p1 = new Person();
console.log(p1); //虽然p1可以基于__proto__找到，但是p1不具备数组的任何特征（length\索引），所以断定p1不是数组
console.log(p1 instanceof Array) ;// true
console.log(typeof  p1);// object

// constructor
let arr = [];
//constructor不被修改的情况下，可以区分
console.log(arr.constructor === Array);// true
console.log(arr.constructor === Object);// false
console.log(arr.constructor === RegExp);// false
let n = 10,m = new Number(10);
console.log(typeof n); // number
console.log(n.constructor === Number); // true
console.log(m.constructor === Number); // true

//constructor被修改
function Person(){}
Person.prototype = Array.prototype;
let p1 = new Person();
console.log(p1.constructor == Array); ///true


class Person {
}
let p1 = new Person();
console.log(({}).toString.call(p1)); //[object Object]

class Person {
    get[Symbol.toStringTag](){
        return "Person";
    }
}
let p1 = new Person();
console.log(({}).toString.call(p1)); //[object Person]

//重写 instanceof
function instance_of(obj, constructor){

}


//............克隆.................
//=>浅克隆：只复制对象或者数组的第一级内容
//=>深克隆：克隆后数组的每一级都和原始数组没有关联
let obj = {
    a: 100,
    b: [10, 20, 30],
    c: {
        x: 10
    },
    d: /^\d+$/
};
//浅克隆
let cloneObj = { ...obj };
console.log(cloneObj == obj);; // false
console.log(cloneObj.b == obj.b);;// true
console.log(cloneObj.c == obj.c);; // true

let newObj = Object.assign(obj, {});
console.log(newObj == obj); //true
newObj = Object.assign({}, obj);
console.log(newObj == obj); //false 浅克隆

///////////////

// for in在遍历对象的时候，遍历的是当前可枚举（列举）的属性
//     + 私有属性（除一些特殊的内置属性是不可枚举的例如数组的length）
//     + 公有属性大部分是不可枚举的，但是自己在类原型上扩展的属性一般都是可枚举的，也说明在遍历的过程中，
//             很可能遍历到公有的属性方法，所以for in循环的时候，需要判断是否是私有的
// for of 遍历私有属性
let newObj = {};
for(let key in obj){
    if(!obj.hasOwnProperty(key)) break;
    newobj[key] = obj[key];
}

//.............深克隆............
//方案一：变成字符串再变为对象
//JSON.stringify BUG 正则变成空对象{ }、日期变成字符串、Symbol/function/bigint/undefined丢失、其它
//这种只适用于number\string\boolean\null\uindefined\普通对象\数组对象等
let obj = {
    a: 100,
    b: [10, 20, 30],
    c: {
        x: 10
    },
    d: /^\d+$/
};
let newObj = JSON.parse(JSON.stringify(obj));// 新对象 d:{},正则数据丢失
console.log(newObj);

//方案二：自己单独实现层层遍历
function cloneDeep(obj) {

    if(obj === null){
        return null;
    }
    if(undefined === null){
        return undefined;
    }
    let constructor = obj.constructor; //获取
    if(/^(RegExp|Date)$/i.test(constructor.name)){
        return new constructor(obj);
    }
    let type = typeof obj;
    if(type != "object"){
        return obj;
    }
    let newObj = new constructor();
    for (let key in obj){
        if(!obj.hasOwnProperty(key)){
            break;
        }
        if(obj[key] == obj){
            newObj[key] = newObj;
        } else {
            newObj[key] = cloneDeep(obj[key]);
        }
    }
    return newObj;
}
