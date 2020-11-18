/**
 * 什么是事件
 *    https://developer.mozilla.org/zh-CN/docs/Web/Events
 *    https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events
 *    事件是浏览器赋予元素的默认行为，也可以理解为是天生具备的，不论我们是否为其绑定方法，当某些行为触发时，相关的事件都会被执行
 *
 * 常用事件
 *    - 资源事件
 *         + load 加载成功（window.onload\img.onload）
 *         + error 加载失败
 *         + abort 正在加载资源已经被中止时。
 *         + unload 文档或一个依赖资源正在被卸载。
 *         + beforeunload   (window,document及其资源即将被卸载。 window.beforeunload)
 *    - 鼠标事件
 *         + click 点击事件（PC端：点击多次则触发多次， 移动端：300ms内没有触发第二次则当做单击事件，所以移动端会有300ms延迟）
 *         + dbclick 双击事件 移动端
 *         + contextmenu 右击事件
 *         + mousedown
 *         + mouseup
 *         + mousemove
 *         + mouseover 鼠标滑入
 *         + mouseout 鼠标滑出
 *         + mouseenter 鼠标进入
 *         + mouseleave 鼠标离开
 *         + mousewheel 鼠标滚动
 *         + select	有文本被选中
 *         + ...
 *     - 键盘事件
 *         + keydown
 *         + keyup
 *         + keypress 长按（除了shift/Fn/GapsLock）
 *     - 手指事件
 *         [Touch Event]单手指
 *         + touchstart
 *         + touchend
 *         + touchmove
 *         + touchcancel
 *         [Gesture Event]多手指
 *     - 表单事件
 *         + focus 获取焦点
 *         + blur 失去焦点
 *         + submit 前提：表单元素都包含在form中，并且提交按钮是submit
 *         + reset 前提：表单元素都包含在form中，并且提交按钮是reset
 *         + selected 下拉框内容改变
 *         + checked 单选框按钮
 *         + changed 内容改变
 *         + input 移动端中监控文本框内容改变
 *     - CSS3动画事件
 *         + transitionend 动画结束
 *         + transitionstart 动画开始
 *         + transitionrun    A CSS transition has begun running (fired before any delay starts).
 *         + transitioncancel
 *      - 视图事件
 *         + resize 元素或者浏览器大小改变
 *         + scroll 滚动
 *         + fullscreenchange
 *         + fullscreenerror
 *     - ...
 * 事件绑定
 *    给元素默认的事件行为绑定方法，触发时执行这个方法
 *    - DOM0级事件绑定
 *         语法：元素.onxxx = function
 *               document.body.onclick = function(){}
 *         移除事件document.body.onclick = null或者非函数;
 *         原理：每一个DOM元素对象的私有属性上都有很多类似于onxxx的属性，给这些属性赋值就是DOM0级事件绑定
 *            + 如果没有对应事件的私有属性例如onContrentLoad,则无法基于这种方法进行事件绑定
 *            + 只能给当前元素的某个事件行为绑定一个方法，绑定多个则最后一个覆盖前面的
 *            + 好处：执行效率快，开发方便
 *    - DOM2级事件绑定
 *         https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
 *         语法：元素.addEventListener([事件],[方法],[捕获/冒泡])
 *         document.body.addEventListener('click',fn1, false);
 *         移除：元素.removeEventListener([事件],[方法],[捕获/冒泡])
 *         document.body.removeEventListener('click',fn1, false);
 *         原理：每一个DOM元素都会基于原型链查找机制，查找到EventTarget
 *         Element -> Node -> EventTarget
 *         EventTarget.addEventListener() 方法将指定的监听器注册到 EventTarget 上，当该对象触发指定的事件时，指定的回调函数就会被执行。
 *         事件目标可以是一个文档上的元素 Element,Document和Window或者任何其他支持事件的对象 (比如 XMLHttpRequest)。
 *         addEventListener()的工作原理是将实现EventListener的函数或对象添加到调用它的EventTarget上的指定事件类型的事件侦听器列表中。
 *             + DOM2级事件绑定采用事件池机制
 *             + DOM2事件绑定，绑定的方法一般不是匿名函数，匿名函数无法移除
 *             + 凡是浏览器提供的事件行为，都可以基于这种模式完成事件的绑定和移除，不局限于onxxx事件
 *             + 可以给当前元素的某个事件绑定多个方法，这样事件触发就会从事件池按照绑定顺序触发多个方法
 *
 *
 */