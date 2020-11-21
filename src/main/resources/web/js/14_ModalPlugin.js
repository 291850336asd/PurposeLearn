/**
 * 实现一款插件UI的封装
 *   样式和结构的处理
 *    -- 样式
 *      + 在插件内部创建元素的时候，把样式基于‘行内嵌入式’写进去
 *          调用方便，代码量大，不利于样式统一修改
 *      + 把样式写入到样式表，如果不期望用户导入样式，我们在JS中动态创建link导入样式
 *          调用方便，样式统一处理，必须联网并且导入的样式资源部署到CDN上否则速度可能慢
 *      + 最好的方案还是用户自己导入css样式
 *      + 样式中尽可能不要出现图片或者其它需要依赖的资源，因为只要出现都需要用户管控好资源目录或者单独下载资源
 *      + 如果一定要用图片最好是BASE64、字体图片最好放到一个目录下
 *    -- JS
 *      + 最好都是基于面向对象的思想开发，插件本身是一个类，可以创建类的实例，实例之间互不影响并且类还可以当做对象提供工具方法等
 *      + 共存性，是否允许同时出现多个控件，DOM结构是否动态创建
 *          1.页面中存在原始结构，我们只需要控制显示和隐藏即可，性能会好，但是同时只存在一个，需要用户自己把结构提前写好，还需要注意控件位置等
 *          2.所有结构都是基于JS动态创建的，性能不如第一只种，但是可同时存在多个，用起来方便
 *
 *  封装插件组件的目的：构建敏捷化平台的重要环节
 *    + 易用性  调用简单，需要要太多依赖最好无依赖，各种容错处理和错误提示，详细的说明文档的demo
 *    + 尽可能强大  功能强大、项目中经常出现的方式基本都支持、适配更多需求、自定义配置例如样式和内容以及功能等
 *    + 升级及向后兼容
 *    + 高性能 性能优化、轻量级
 *    + 可维护性，各种设计模式的应用
 */

/**
 * 插件支持的配置信息（基于不同的配置信息实现不同的功能）
 * 可以存在多个
 *    每调用一次创建一个新的插件结构，而关闭的时候就把这套结构移除
 *    + title（string）
 *    + template（string） 自定义的内容或者模板（基于es6的模板字符串拼接更丰富的内容）
 *    + buttons（array） 自定义按钮（组）
 *    + opened[boolean] 刚打开是是否隐藏，默认是true显示
 *      {"title":"xxx",click:[callback],...}
 *    + modal[boolean] 控制遮罩层是否显示
 *    + drag[boolean] 按住头部是否允许拖拽
 *    + 生命周期函数，允许用户自定义处理是事情
 *        打开onopen、关闭onclose、拖拽开始ondragstart、拖拽中ondragind、拖拽结束ondragend等
 */

// 结构写法一
(function () {
    /** 核心类 */
    function ModalPlugin() {
    }

    ModalPlugin.prototype = {
        constructor: ModalPlugin,
        version:"1.0.0"
    };

    const isObject = function isObject(value) {
        let class2Type = {};
        var type = class2Type.toString.call(value);
        return /Object/.test(type);
    };

    const props = {
        title: {
            type:'string',
            default: '系统温馨提示'
        },
        template: {
            type: 'string',
            required: true
        },
        buttons: {
            type: 'array',
            default: []
        },
        modal: {
            type: 'boolean',
            default: true
        },
        drag: {
            type: 'boolean',
            default: true
        },
        opened: {
            type: 'boolean',
            default: true
        }
    };

    function ProxyModalPlugin(options={}){
        //参数处理：格式校验  合并默认值
        if(isObject(options)){
            options = Object.assign({
                title:'系统温馨提示',
                template:'',
                buttons:[],
                modal: true,
                drag: true,
                opened: true
            },options);
        }else {
            throw new TypeError("options must be an Object");
        }
        return new ModalPlugin();
    }

    //支持浏览器导入和ComonJS/ES6Module模块导入规范
    if(typeof window !== 'undefined'){
        window.M = window.ModalPlugin = ProxyModalPlugin;
    }
    if(typeof module === 'object' && typeof module.exports === 'object'){
        module.exports = ProxyModalPlugin;
    }

})();
var m = new M();




// 结构写法二
// (function () {
//     /** 核心类 */
//     function ModalPlugin() {
//         return new init();
//     }
//     function init(){
//     }
//
//     ModalPlugin.prototype = {
//         constructor: ModalPlugin,
//         version:"1.0.0"
//     };
//     init.prototype = ModalPlugin.prototype;
//
//     //支持浏览器导入和ComonJS/ES6Module模块导入规范
//     if(typeof window !== 'undefined'){
//         window.ModalPlugin = ModalPlugin;
//     }
//     if(typeof module === 'object' && typeof module.exports === 'object'){
//         module.exports = ModalPlugin;
//     }
//
// })();
