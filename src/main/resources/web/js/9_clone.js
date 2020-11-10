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




let arr = [10, [100, 200], {
    x: 10,
    y: 20
}];