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
 * 事件对象
 *    给当前元素的某个事件绑定方法，当事件触发，方法执行时不仅把方法执行而且还会给方法默认传递一个实参，就是事件对象
 *    存储当前事件操作及触发相关信息的（浏览器本身记录的，记录的是当前操作的信息，和在哪个函数无关）
 *
 */


/**
 * 鼠标事件对象 MouseEvent
 *   + clientX/clientY 鼠标触发点距离当前窗口的X/Y坐标
 *   + pageX/pageY 鼠标出发点距离BODY的X/Y坐标
 *   + type 事件类型
 *   + target/srcElement 获取当前事件源（当前操作的元素）
 *   + path 传播路径
 *   + ev.prventDefault() / ev.returnValue=false 阻止默认行为
 *   + ev.stopPropagation / ev.cancelBubble=true 阻止冒泡传播
 *   + ...
 */
let n = null;
document.body.addEventListener("click", function (ev) { //MouseEvent
    n = ev;
});
document.body.addEventListener("click", function (ev) {
    n === ev;  // true  当前函数触发后，两个函数中获取的ev是同一个
});


/**
 * 键盘事件对象
 *   + key/code 存储按键的名字 貌似不准
 *   + which/keyCode 获取键盘码
 *   + 方向键 左37 上38 右39 下40
 *   + Space 32
 *   + BackSpace 8
 *   + Del 46  MAC电脑中没有BackSpace，delete键是8
 *   + Enter 13
 *   + Shift 16
 *   + Ctrl 17
 *   + Alt 18
 *   + altKey 是否按下alt键（组合按键）
 *   + ctrlKey 是否按下ctrl键（组合按键）
 *   + shiftKey 是否按下shift键（组合按键）
 *   + ...
 * @param ev  KeyboardEvent
 *
 */
document.body.onkeydown = function (ev) {
};


/**
 * 手指事件对象（移动端）
 *    + changedTouched / touches 都是用来记录手指新的，常用的是changedTouches，
 *        获取的结果都是一个TouchList集合，记录每一个手指信息
 *    + 手指按下、移动、离开屏幕changedTouches都存储了对应的手指信息，哪怕离开屏幕后，存储的也是最后一次手指在屏幕
 *       中的信息；而touches在手指离开屏幕后，就没有任何信息了只获取离开前的信息
 *    +  ev.changedTouches[0]; 获取第一根手指信息
 * @param ev  TouchEvent
 */
document.body.ontouchstart = function (ev) {
    let point = ev.changedTouches[0];
    console.log(point);
};


/**
 * 默认行为：浏览器会赋予元素很多默认的行为操作
 *    + 鼠标右键菜单
 *    + 点击A标签实现页面跳转
 *    + 部分浏览器会记录输入信息，在下一次输入的时候有模糊匹配
 *    + 键盘按下会输入内容
 *    + ...
 *  我们可以基于ev.preventDefault()来禁用这些默认行为
 * @param ev
 */



/**
 * A标签默认行为
 *  + 页面跳转 <a href="网址">
 *  + 锚点定位，定位到当前页面当中指定ID位置 <a href="#id"> id为其它元素id
 *
 *  第一种阻止默认行为
 *      <a href="javascript:;">
 */
// <a href= "www.baidu.com" id= "link">跳转</a>
link.onclick = function(ev){
    ev.preventDefault();//阻止默认行为
};
//或
link.onclick = function(ev){
    return false;//阻止默认行为
};
/**
 * 禁用右键菜单（改为自己的菜单）
 */
window.oncontextmenu = function (ev) {
    ev.preventDefault();//阻止默认行为
    //如果没有右键菜单则创建一个
    let contextMenu = document.querySelector(".contentmenu");
    if(!contextMenu){
        contextMenu = document.createElement('div');
        contextMenu.className = 'contextMenu';//自定义样式即可
        contextMenu.innerHTML = "<url><li>跳转到首页</li><li>跳转到详情</li><li>逗你玩</li></url>";
        contextMenu.body.appendChild(contextMenu);
    }
    contextMenu.style.left = `${ev.clientX + 10}px`;
    contextMenu.style.top = `${ev.clientY + 10}px`;

    //点击其它内容，右键菜单消失
    window.onclick = function (ev) {
        let target = ev.target, targetTag = target.tagName;
        if(targetTag === 'LI'){
            target = target.parentNode;
            targetTag = target.tagName;
        }
        if(targetTag === "UL" && target.parentNode.className === "contextnemu"){
            return;
        }
        let contextMenu = document.querySelector(".contentmenu");
        if(contextMenu){
            document.body.removeChild(contextMenu);
        }
    }
}

