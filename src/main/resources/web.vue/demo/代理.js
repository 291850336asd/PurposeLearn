
// 监听方式1
var obj2 = {
    name: 'aaa',
    age:123
}

function dereactive(obj, key, value) {
    Object.defineProperty(obj, key,{
        // value: 123,
        // enumerable: false, //是否可枚举
        // configurable: true, // 是否可以删除
        // writable: false, //是否改写
        get(){
            console.log("get " + key)
            return value
        },
        set(val) {
            console.log("set name " + val)
            value = val;
        }
    });
}
function fn(obj2) {
    for (let key in obj2){
        if(typeof obj2[key] === "object"){
            fn(obj2[key]);
        } else {
            dereactive(obj2, key, obj2[key])
        }
    }
}
fn(obj2);


//监听方式2
var obj2 = {
    name: 'aaa',
    age:123
}
var objProxy = new Proxy(obj2,{

    set(target, key, value, receiver) {
        console.log(arguments)
        target[key] = value;
    },
    /**
     *
     * @param target  obj2
     * @param key
     * @param receiver
     */
    get(target, key, receiver) {
        console.log(arguments)
        return target[key];
    }
});
objProxy.name;
objProxy.name = '23232';