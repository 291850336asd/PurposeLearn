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
