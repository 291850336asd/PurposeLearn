// 工具类方法库
(function () {
    let class2type = {},
        toString = class2type.toString,
        hasOwn = class2type.hasOwnProperty,
        getProto = Object.getPrototypeOf,
        fnToString = hasOwn.toString,
        ObjectFunctionString = fnToString.call(Object),
        utils = {};

    // 数据类型检测
    ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error", "Symbol", "BigInt"].forEach(
        name => {
            class2type[`[object ${name}]`] = name.toLowerCase();
        }
    );
    const toType = function toType(obj) {
        if (obj == null) return obj + "";
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[toString.call(obj)] || "object" :
            typeof obj;
    };

    //校验是否为空对象 {}
    function isEmptyObject(obj) {
        let arr = [...Object.keys(obj),...Object.getOwnPropertySymbols(obj)];
        return arr.keys.length === 0 ? true:false;
    }

    // 检测是否为函数
    const isFunction = function isFunction(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    };

    // 检测是否为window
    const isWindow = function isWindow(obj) {
        return obj != null && obj === obj.window;
    };

    // 检测是否为数组 & 类数组
    const isArrayLike = function isArrayLike(obj) {
        let length = !!obj && "length" in obj && obj.length,
            type = toType(obj);
        if (isFunction(obj) || isWindow(obj)) return false;
        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj;
    };

    // 检测是否为普通对象
    const isPlainObject = function isPlainObject(obj) {
        let proto, Ctor;
        if (!obj || toString.call(obj) !== "[object Object]") return false;
        proto = getProto(obj);
        if (!proto) return true;
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    };

    // 遍历数组/类数组/对象
    const each = function each(obj, callback) {
        callback = callback || Function.prototype;
        if (isArrayLike(obj)) {
            for (let i = 0; i < obj.length; i++) {
                let item = obj[i],
                    result = callback.call(item, item, i);
                if (result === false) break;
            }
            return obj;
        }
        for (let key in obj) {
            if (!hasOwn.call(obj, key)) break;
            let item = obj[key],
                result = callback.call(item, item, key);
            if (result === false) break;
        }
        return obj;
    };

    // 支持Symbol属性的遍历
    const eachAll = function eachAll(obj, callback) {
        let keys = [
            ...Object.keys(obj),
            ...Object.getOwnPropertySymbols(obj)
        ];
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i],
                item = obj[key],
                result = callback.call(item, item, key);
            if (result === false) break;
        }
        return obj;
    };

    // 浅克隆 & 深克隆
    const shallowClone = function shallowClone(obj) {
        let type = toType(obj),
            Ctor = obj.constructor;
        if (/^(symbol|bigint)$/i.test(type)) return Object(obj);
        if (/^(regexp|date)$/i.test(type)) return new Ctor(obj);
        if (/^error$/i.test(type)) return new Ctor(obj.message);
        if (/^function$/i.test(type)) {
            return function () {
                return obj.call(this, ...arguments);
            };
        }
        if (/^(object|array)$/i.test(type)) {
            let result = new Ctor();
            eachAll(obj, (_, key) => {
                result[key] = obj[key];
            });
            return result;
        }
        return obj;
    };
    const deepClone = function deepClone(obj, cache = new Set()) {
        let type = toType(obj),
            Ctor = obj.constructor;
        if (!/^(object|array)$/i.test(type)) return shallowClone(obj);
        if (cache.has(obj)) return obj;
        cache.add(obj);
        let result = new Ctor();
        eachAll(obj, (item, key) => {
            result[key] = deepClone(item, cache);
        });
        return result;
    };

    // 深度合并
    /* 
     * 几种情况的分析
     *   A->options中的key值  B->params中的key值
     *   1.A&B都是原始值类型:B替换A即可
     *   2.A是对象&B是原始值:抛出异常信息
     *   3.A是原始值&B是对象:B替换A即可
     *   4.A&B都是对象:依次遍历B中的每一项,替换A中的内容
     */
    const merge = function merge(options, params = {}) {
        if (!isPlainObject(options) || !isPlainObject(params)) throw new TypeError(`options and params must be an plain object!`);
        eachAll(params, (_, key) => {
            let isA = isPlainObject(options[key]),
                isB = isPlainObject(params[key]);
            if (isA && !isB) throw new TypeError(`${key} in params must be an plain object`);
            if (isA && isB) {
                options[key] = merge(options[key], params[key]);
                return;
            }
            options[key] = params[key];
        });
        return options;
    };

    // 暴露API：支持浏览器导入和CommonJS/ES6Module规范
    utils = {
        toType,
        isEmptyObject,
        isFunction,
        isWindow,
        isArrayLike,
        isPlainObject,
        each,
        eachAll,
        shallowClone,
        deepClone,
        merge
    };
    if (typeof window !== "undefined") {
        window._ = window.utils = utils;
    }
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = utils;
    }
})();