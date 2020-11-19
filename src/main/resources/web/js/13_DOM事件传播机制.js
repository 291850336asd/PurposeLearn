/**
 * 事件是浏览器赋予元素的默认行为操作，只要我们触发这些操作一定会触发相关事件
 * 如果我们做了事件绑定DOM0/DOM2，在事件触发时可以做一些事情，如果不错，事件也会触发，只不过什么都不做
 *
 *
 *
 */


/**
 *
 * 事件传播机制
 *    + 冒泡阶段
 *    + 目标阶段
 *    + 捕获阶段
 *    + mouseenter VS mouseover
 *
 * <div class="box">
 *     <div class="outer">
 *         <div class="inner">
 *         </div>
 *     </div>
 * </div>
 *
 *  window  -> document -> html -> body -> box -> outer -> innter
 *
 *  点击inner时
 *     + 先进入捕获阶段CAPTURING_PHASE 从最外层一级级查找找到事件源 window  -> document -> html -> body -> box -> outer -> innter
 *           目的是为冒泡阶段的传播提供路径 ev.path就是捕获阶段存放的路径
 *     + 再进入目标阶段AT_TARGET 触发事件源的相关事件行为
 *     + 再进入冒泡阶段BUBBLING_PHASE 从当前事件源一层一层向完成查找，有的没有此阶段
 *           按照捕获阶段收集的传播路径，不仅触发事件源的相关事件行为，而且从内到外，其父类的相关事件绑定行为也会触发
 *
 * DOM0级事件绑定给元素的方法都是在目标阶段/冒泡阶段触发的
 *
 * DOM2级事件绑定可以控制在捕获阶段触发（虽然没有实际意义）
 *   + 元素.addEventListener("事件"，方法， false/true默认false   false控制方法是在冒泡阶段执行，true在捕获阶段执行)
 *
 *
 * 阻止事件冒泡传播
 *    ev.stopPropagation / ev.cancelBubble=true 阻止冒泡传播
 *    兼容性处理 ev.ststopPropagation ? ev.stopPropagation(); ev.cancelBubble=true
 *
 */

let box = document.querySelector(".box");
let outer = document.querySelector(".outer");
let inner = document.querySelector(".inner");
//
// inner.onclick = function (ev) {
//     console.log("INNER == > ", ev);
// };
// outer.onclick = function (ev) {
//     console.log("OUTER == > ", ev);
// };
// box.onclick = function (ev) {
//     console.log("BOX == > ", ev);
//     ev.stopPropagation(); // 阻止事件冒泡传播
// };
// window.document.body.onclick = function (ev) {
//     console.log("BODY == > ", ev);
// };
// window.document.onclick = function (ev) {
//     console.log("DOCUMENT == > ", ev);
// };
// window.onclick = function (ev) {
//     console.log("WINDOW == > ", ev);
// };
// box.addEventListener('click',function (ev) {
//     console.log("BOX_  EventListener == > ", ev); //先执行
// }, true);
//需要写多个方法开辟多个内存，不是很好



/**
 * 事件委托机制或事件代理
 *    因为点击事件存在冒泡机制，无论点击什么按钮都会传播到body上，触发body的点击行为。
 *    我们可以把一个容器当中的所有的元素行为触发的行为委托给当前容器的事件行为
 *
 *    target/srcElement属性为事件源可以获取当前操作的哪个元素,可以根据事件源的不同做不同处理
 *
 *     + 性能好 能提高60%左右
 *     + 可以操作动态绑定的元素
 *     + 某些需求必须基于它完成
 *
 */


document.body.onclick = function (ev) {
    let target = ev.target;
    let targetClass = target.className;
    if(targetClass === 'inner'){
        console.log("inner");
        return;
    }
    if(targetClass === 'outer'){
        console.log("outer");
        return;
    }
    if(targetClass === 'box'){
        console.log("box");
        return;
    }
}