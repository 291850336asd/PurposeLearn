/**
 * 遍历器Iterator是一种接口机制：为各种不同的数据结构提供统一的访问机制，
 * 任何数据只要部署Iterator接口，就可以完成遍历操作，依次处理该数据结构的所有成员
 *   + 拥有next方法用于依次遍历数据结构的所有成员
 *   + 每一次遍历返回的结果是一个对象 { done：false,value:xxx }
 *       -- done是否完成遍历  value当前遍历的结果
 *
 *  拥有Symbol.iterator属性的数据结构，被称为可遍历的，可以基于for of 循环处理
 *    + 数组
 *    + 部分类数组 arguments\NodeList\HTMLCollection...
 *    + String
 *    + Set
 *    + Map
 *    + generator object
 *    + ...
 * 对象默认不具备Symbol.iterator，属于不可遍历的数据结构
 */

//Iterator
class Iterator{
    constructor(arr){
        this.arr = arr;
        this.index = 0;
    }

    next(){
        let index = this.index, arr = this.arr;
        if(index > ar.length -1){
            return {
                done: true,
                value: undefined
            }
        }
        return {
            done: false,
            value:  arr[this.index++]
        }
    }
}

let arr = [10, 20, 30];
arr[Symbol.iterator] = function () {
    let index = 0,self = this;
    return {
        next() {
            if(index > self.length - 1){
                return {
                    done: true,
                    value: undefined
                }
            }
            console.log(self[index]);
            return {
                done: false,
                value: self[index ++]
            }
        }
    }
}
for (let item of arr){
    console.log(item);
}

// 展开运算符也是Iterator机制
//首先校验是否存在Symbol.iterator，如果存在则按照这个遍历
console.log(...arr);

//对象本身不符合Symbol.iterator 规范
let obj = {
    0: 10,
    1:20,
    2:30,
    length:3,
    //为了让对象也能for of遍历,则需要加入Symbol.iterator
    // [Symbol.iterator]: function () {
    //     let index = 0,self = this;
    //     return {
    //         next() {
    //             if(index > self.length - 1){
    //                 return {
    //                     done: true,
    //                     value: undefined
    //                 }
    //             }
    //             return {
    //                 done: false,
    //                 value: self[index ++]
    //             }
    //         }
    //     }
    // }
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of obj){ //报错： obj is not iterable
    console.log(item);
}


//
Object.prototype[Symbol.iterator] =  function () {
    let self = this,
        keys = [
            ...Object.getOwnPropertyNames(self),
            ...Object.getOwnPropertySymbols(self)
        ],
        index = 0;
    return {
        next() {
            return index > keys.length-1 ?  {
                done: true,
                value: undefined
            } : {
                done: false,
                value: self[keys[index ++]]
            }
        }
    }
}
let obj = {
    name: "xxx",
    age: 11,
    [Symbol('aa')]: 100,
}
for (let item of obj){
    console.log(item);
}

// 知识点： Symbol(Symbol.iterator.description).description === "Symbol.iterator"

/**
 * generator
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator
 * 生成器对象是由一个 generator function 返回的,并且它符合可迭代协议和迭代器协议
 *    -- 无法new对象
 *    -- 函数结果返回的是当前函数的实例
 *    -- 没有自己的this
 *    Generator.prototype.next()  返回一个由 yield表达式生成的值。   {  done: true,  value: xxx }
 *    Generator.prototype.return()   返回给定的值并结束生成器。
 *    Generator.prototype.throw()    向生成器抛出一个错误。
 */
function* fun() {
    console.log(this); // window
    yield 1;
    yield 2;
    yield 3;
    return 4;
}
let iterator = fun();
console.log(iterator instanceof fun); // true
console.log(iterator.next().value);  // 1  done:false
console.log(iterator.next().value);  // 2  done:false
console.log(iterator.next().value);  // 3  done:false
console.log(iterator.next().value);  // 4  done:true
new fun();// 报错，无法new对象  fun is not a constructor

////
function* fun() {
    let x = yield 1;
    console.log(x); //undefined
}
let iterator = fun();
console.log(iterator.next());
console.log('AAAA');
console.log(iterator.next());
// AAAA  undefined

////
function* fun() {
    let x = yield 1;
    console.log(x); //10
}
let iterator = fun();
console.log(iterator.next());
console.log('AAAA');
console.log(iterator.next(10));
// AAAA  10

////
function* fun1() {
    yield 1;
    yield 2;
}
function* fun2() {
    yield 3;
    yield fun1();
    yield 4;
}
let iterator = fun2();
console.log(iterator.next());// { done:false, value:3 }
console.log(iterator.next());// { done:false, value:fun1 }  fun1 itterator值
console.log(iterator.next());// { done:false, value:4 }
console.log(iterator.next());// { done:true, value:undefined }
console.log(iterator.next());// { done:true, value:undefined }

////
function* fun1() {
    yield 1;
    yield 2;
}
function* fun2() {
    yield 3;
    yield* fun1();
    yield 4;
}
let iterator = fun2();
console.log(iterator.next());// { done:false, value:3 }
console.log(iterator.next());// { done:false, value:1 }
console.log(iterator.next());// { done:false, value:2 }
console.log(iterator.next());// { done:false, value:4 }
console.log(iterator.next());// { done:true, value:undefined }

////
function* fun1() {
    yield 1;
    yield 2;
}
function* fun2() {
    yield 3;
    fun1(); //不会触发迭代，相当于let cc = fun1(); 不会有任何效果
    yield 4;
}
let iterator = fun2();
console.log(iterator.next());// { done:false, value:3 }
console.log(iterator.next());// { done:false, value:4 }
console.log(iterator.next());// { done:true, value:undefined }
console.log(iterator.next());// { done:true, value:undefined }
console.log(iterator.next());// { done:true, value:undefined }


////
function* fun(x) {
    yield ++x;
    yield* fun(x);
}
let ss = fun(0);
console.log(ss.next());
console.log(ss.next());
console.log(ss.next());
console.log(ss.next());


////
const func = x=> {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve(++x);
        },1000)
    })
};
func(10).then(result=> {
   console.log(result);
   return func(result);
}).then(result=>{
    console.log(result)
});

/**
 *
 */
const func = x=> {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve(++x);
        },1000)
    })
};
(async function anonymous() {
    let x = await func(0);
    console.log(x);

    x = await func(x);
    console.log(x);

    x = await func(x);
    console.log(x);
})();

////
const func = x=> {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve(++x);
        },1000)
    })
};
function* anonymous(x) {
    x = yield func(x);
    console.log(x); // 想让x=1

    x = yield func(x);
    console.log(x); // 想让x=2

    x = yield func(x);
    console.log(x); // 想让x=3
}
let iterator = anonymous(0);
var promiseValue = iterator.next().value;  //// iterator.next().value 是一个promise实例
promiseValue.then(x=>{
    var pV = iterator.next(x).value;
    pV.then(x=>{
       pV =  iterator.next(x).value;
       pV.then(result => {
           var next = iterator.next(result);
           if(next.done){
               console.log("finish");
           }
       })
    });
});
//// 加强版
/**
 *
 * @param generator 生成器函数
 * @param params  传递的实际参数
 */
function AysncFunc(generator, ...params) {
    const iterator  = generator(...params);
    const next = (x) => {
        let { value, done } = iterator.next(x);
        if(!done){
            value.then(result => {
                next(result);
            });
        } else {
            return;
        }
    };
    next();
}

/**
 * async await   就是generator 和 promise结合的语法糖
 */