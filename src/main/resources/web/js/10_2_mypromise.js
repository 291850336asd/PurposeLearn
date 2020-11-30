(function () {
    function MyPromise(executor) {
        if(typeof executor !== 'function'){
            throw new TypeError("MyPromise resolver undefined is not a function");
        }

        //每个MyPromise应该具备
        this.PromiseState = "pending";
        this.PromiseValue = undefined;
        this.resolveFunc = function () {};//成功之后执行的方法
        this.rejectFunc = function () {};// 失败之后执行的方法

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
        };
        var resolve = function(result){
            change("fulfilled", result);
        };
        var reject = function(reason){
            change("rejected", reason);
        };
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
            if(typeof  resolveFunc !== 'function'){
                resolveFunc = function resolveFunc(result) {
                    return MyPromise.resolve(result);
                }
            }
            if(typeof rejectFunc != 'function'){
                rejectFunc = function (reason) {
                    return MyPromise.reject(reason);
                }
            }
            this.resolveFunc = resolveFunc; //直接赋值无法拿到执行后的结果，所以需要封装处理
            this.rejectFunc = rejectFunc;
            //每次执行then返回一个新的实例resolveFunc和rejectFunc进行包装处理
            //  + resolve/reject 是控制新实例的成功和失败的
            //  + 需要把传递进来的
            var _this = this;
            return new MyPromise(function (resolve, reject) {
                _this.resolveFunc = function (result) {
                    try{
                        //返回不报错则返回成功的实例（特殊：方法放回的是新的MyPromise实例,则新实例的状态和结果决定返回的值）
                        var x = resolveFunc(result);
                        x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                    }catch (e) {
                        //执行报错，则返回新的失败实例
                        reject(e);
                    }
                };
                _this.rejectFunc =  function (reason) {
                    try{
                        //返回不报错则返回成功的实例（特殊：方法放回的是新的MyPromise实例,则新实例的状态和结果决定返回的值）
                        var x = rejectFunc(reason);
                        x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                    }catch (e) {
                        //执行报错，则返回新的失败实例
                        reject(e);
                    }
                };
            });
        },
        catch: function (rejectFunc) {
            //xxx.catch(func) 相当于 xxx.then(null, func);
            return this.then(null, rejectFunc);
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

    MyPromise.all = function (promiseArr) {
        return new MyPromise((resolve, reject) => {
            var index = 0,results = [];

            var fire = function () {
                if(index >= promiseArr.length){
                    resolve(results);
                }
            }
            for (var i = 0; i < promiseArr.length; i++) {
                (function (i) {
                    var item = promiseArr[i];
                    if(!(item instanceof MyPromise)){
                        results[i] = item;
                        index ++;
                        fire();
                        return;
                    }
                    item.then((result) => {
                        results[i] = result;
                        index ++;
                        fire();
                    }).catch(reason => {
                        //只要是失败，整体都是失败的
                        reject(reason);
                    });
                })(i)
            }
        });
    }

    //支持浏览器导入和ComonJS/ES6Module模块导入规范
    if(typeof window !== 'undefined'){
        window.MyPromise = MyPromise;
    }
    if(typeof module === 'object' && typeof module.exports === 'object'){
        module.exports = MyPromise;
    }


})();
// var p1 = new MyPromise(function (resolve, reject) {
//     resolve("ok");
//     reject("no");
// });
// var p2 = p1.then(result => {
//     console.log("成功 ->" + result);
//     return "P1 OK";
// }, reason => {
//     console.log("失败 ->" + reason);
//     return "P1 NO";
// });
// var p3 = p2.then(result => {
//     console.log("P2成功 ->" + result);
//     return "P2 OK";
// }, reason => {
//     console.log("P2失败 ->" + reason);
//     return "P2 NO";
// });


function fn1(){
    return MyPromise.resolve(10);
}
function fn2(){
    return MyPromise.reject(0);
}
function fn3(){
    return new MyPromise((resolve)=>{
        setTimeout(()=>{
            resolve(20);
        },5000);
    })
}
// MyPromise.All 返回的也是MyPromise实例
//  + 数组中的每个实例是成功的，返回值才是成功的
//  + 数组中只要有一个是失败的，返回值就是失败的
//  + 如果最后都是成功的，返回值的PromiseValue存储到的也是一个数组，按照之前存放的顺序存放之前每个MyPromise实例
let p = MyPromise.all([fn3(), fn1(), 40]);
p.then(result => {
    console.log("成功1 ->" + result);
    return "OK";
}).catch(reason => {
    console.log("catch " + reason);
});
