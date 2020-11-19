/**
 * 事件是浏览器赋予元素的默认行为操作，只要我们触发这些操作一定会触发相关事件
 * 如果我们做了事件绑定DOM0/DOM2，在事件触发时可以做一些事情，如果不错，事件也会触发，只不过什么都不做
 *
 * 事件传播机制
 *    + 冒泡阶段
 *    + 目标阶段
 *    + 捕获阶段
 *    + mouseenter VS mouseover
 *
 *
 */


/**
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
 *
 */

let box = document.querySelector(".box");
let outer = document.querySelector(".outer");
let inner = document.querySelector(".inner");

inner.onclick = function (ev) {
    console.log("INNER == > ", ev);
};
outer.onclick = function (ev) {
    console.log("OUTER == > ", ev);
};
box.onclick = function (ev) {
    console.log("BOX == > ", ev);
};
window.document.body.onclick = function (ev) {
    console.log("BODY == > ", ev);
};
window.document.onclick = function (ev) {
    console.log("DOCUMENT == > ", ev);
};
window.onclick = function (ev) {
    console.log("WINDOW == > ", ev);
};