function MyPromise(executor) {
    if(typeof executor !== 'function'){
        throw new TypeError("MyPromise resolver undefined is not a function");
    }

    //每个MyPromise应该具备
    this.PromiseState = "pending";
    this.PromiseValue = undefined;
    this.resolveFunc = function () {};//成功之后执行的方法
    this.rejectFunc = function () {};// 失败之后执行的方法


    var resolve = function(result){
        change("fulfilled", result);
    };
    var reject = function(reason){
        change("rejected", reason);
    };
    //修改状态并且通知指定到的方法执行
    var _this = this;
    var change = function(state, value) {
       if(_this.PromiseState !== "pending"){
           return;//一旦状态改变则不再能改变
        }
        _this.PromiseState = state;
        _this.PromiseValue = value;
        //必须保证then执行，否则resolveFunc和rejectFunc还是为原始值
        setTimeout(function () {
            state === "fulfilled" ? _this.resolveFunc(_this.PromiseValue) : _this.rejectFunc(_this.PromiseValue);
        },0)
    }
    try{
        executor(resolve, reject); //executor执行报错也会让实例状态变成失败
    }catch (e) {
        change("rejected", e);
    }

};
MyPromise.prototype = {
    constructor: MyPromise,
    then:function (resolveFunc, rejectFunc) {
        //参数不传递：顺延
        if(typeof  rejectFunc !== 'function'){
            resolveFunc = function resolveFunc(result) {
                return result;
            }
        }
        if(typeof rejectFunc != 'function'){
            rejectFunc = function (reason) {
                return MyPromise.reject(reason);
            }
        }
        this.resolveFunc = resolveFunc;
        this.rejectFunc = rejectFunc;

    }
};
//返回一个状态成功的MyPromise
MyPromise.resolve = function (value) {
    return new MyPromise(function (resolve) {
        resolve(value);
    });
};
//返回一个状态失败的MyPromise
MyPromise.reject = function (reason) {
    return new MyPromise(function (resolve, reject) {
        reject(reason);
    });
};
var p1 = new MyPromise(function (resolve, reject) {
    resolve("ok");
    reject("no");
});
p1.then(result => {
    console.log("成功 ->" + result);
}, reason => {
    console.log("失败 ->" + reason);
});

