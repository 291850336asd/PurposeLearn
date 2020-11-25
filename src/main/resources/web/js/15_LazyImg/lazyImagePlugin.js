/**
 * 延迟加载插件
 *  只处理图片的延迟加载
 *  规定：图片放到一个盒子当中
 *  <div>
 *     <img src="" alt="" lazy-image="1.jpg">
 *  </div>
 *  盒子是图片没有加载前的占位，src是空的，而且给图片设置一个属性lazy-image
 *
 *
 *  导入插件后,可以暴露出一个api(例如：init)，主要执行init方法，就开始执行图片的延迟加载，而且我们还可以配置一些参数
 *  {
 *      //  指定上下文
 *      context：document,
 *      //什么阶段做延迟加载
 *      threshold:[1],
 *      //是否有动画效果：渐现的动画（需要给图片设定opacity\transition 样式）
 *      animate:true,
 *      //配置具备哪个属性的img 需要做延迟加载（属性值是真实图片地址）
 *      attr :'lazy-image',
 *      //图片加载完的回调函数
 *       + callback: Function.prototype 图片加载成功后触发的回调函数（img处理好的图片）
 *  }
 */
(function () {
    function LazyImage(options) {
        options = options || {}
        let defaults = {
            context: document,
            attr: 'lazy-image',
            threshold: 1,
            speed: 300,
            callback:Function.prototype
        }
        return new LazyImage.prototype.init(Object.assign(defaults,options))
    }

    LazyImage.prototype = {
        constructor: LazyImage,
        init: function init(config) {
            // 把信息挂载到实例上：在其他方法中，基于实例即可获取这些信息
            this.config = config
            this.imageBoxList = []

            // 创建监听器
            const oboptions = {
                threshold:[config.threshold]
            }
            this.ob = new IntersectionObserver(changes => {
                changes.forEach(item => {
                    let { isIntersecting, target } = item;
                    if (isIntersecting) {
                        // 单张图片的延迟加载
                        this.singleHandle(target)
                        // 移除
                        this.ob.unobserve(target)
                    }
                })
            }, oboptions)
            this.observeAll()
        },
        // 单张图片的延迟加载
        singleHandle: function singleHandle(imgbox) {
            let config = this.config
            let imgObj = imgbox.querySelector('img')
            let trueImage = imgObj.getAttribute(config.attr)
            imgObj.src = trueImage
            imgObj.removeAttribute(config.attr)
            imgObj.onload = () => {
                imgObj.style.transition = `opacity ${config.speed}ms`
                imgObj.style.opacity = 1;
                // 回调函数 -> 插件的生命周期函数 回调函数&发布订阅
                config.callback.call(this,imgObj)
            }
        },
        // 监听需要的DOM元素
        observeAll(refresh) {
            let config = this.config
            let allImages = config.context.querySelectorAll(`img[${config.attr}]`);
            [].forEach.call(allImages, item => {
                let imageBox = item.parentNode
                if(refresh && this.imageBoxList.includes(imageBox)) return
                this.imageBoxList.push(imageBox)
                this.ob.observe(imageBox)  
            })
        },
        // 刷新：获取新增的需要延迟加载的图片，做延迟加载
        refresh() {
            this.observeAll(true)
        }
    }

    // 工厂模式 转一下
    LazyImage.prototype.init.prototype = LazyImage.prototype

    if (typeof window !== 'undefined') {
        window.LazyImage = LazyImage
    }
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = LazyImage
    }
})()



 
 

// let obj = {
//     init() {
//         // 不允许被new
//     },
//     init2: function () {
        
//     }
// }
 


// 执行这个方法就可以把页面中需要延迟加载的图片做延迟加载
LazyImage({});

// 支持自定义配置
//  + context：document 指定上下文
//  + attr :'lazy-image'  具备哪个属性的img 需要做延迟加载（属性值是真实图片地址）
//  + threshold: 1 完全出现在视口中， 0 /0.5
//  + speed:300  出现真实图片动画的时间
//  + callback: Function.prototype 图片加载成功后触发的回调函数（img处理好的图片）
//  ...

// 参数传递成对象 不传有默认值。最后插件中合并对象即可。
// LazyImage({
//     threshold: 0.5,
//     context:'box'
// });

// 一个页面多次调用，即想实现信息的独立，也可以一些方法的公用 ----用面向对象oop
// LazyImage(); 应该都是创建一个类的实例