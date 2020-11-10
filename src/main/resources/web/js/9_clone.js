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
//
let newObj = {};
for(let key in obj){
    if(!obj.hasOwnProperty(key)) break;
    newobj[key] = obj[key];
}

let arr = [10, [100, 200], {
    x: 10,
    y: 20
}];

