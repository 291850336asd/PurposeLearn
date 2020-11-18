/*
 * 设计模式是一种思想：用来有效管理代码的思想
 *  「经典设计模式：发布订阅」 DOM2级事件的事件池机制
 */
//写法二：
(function () {
   function Sub() {
       return new init();
   }
   function init() {
       //每一次创建实例都创建一个私有的事件池
       this.listeners = {};
   }

   Sub.prototype = {
       constructor: Sub,
       // 添加方法
       on(type, func) {
           // 验证当前事件池中是否存在这个自定义事件:不存在则新增一个
           !this.listeners.hasOwnProperty(type) ? this.listeners[type] = [] : null;
           let arr = this.listeners[type];
           // 重复验证
           // if (arr.includes(func)) return;
           for (let i = 0; i < arr.length; i++) {
               if (arr[i] === func) {
                   return;
               }
           }
           arr.push(func);
       },
       // 移除方法
       off(type, func) {
           let arr = this.listeners[type] || [];
           for (let i = 0; i < arr.length; i++) {
               if (arr[i] === func) {
                   // 想要移除的
                   // arr.splice(i, 1);

                   // 防止数组塌陷，实现当前项的假删除
                   arr[i] = null;
                   break;
               }
           }
           // arr = arr.filter(item => item !== func);
       },
       // 执行方法
       fire(type, ...params){
           let arr = this.listeners[type] || [];
           for (let i = 0; i < arr.length; i++) {
               let item = arr[i];
               if (typeof item === "function") {
                   item(...params);
                   continue;
               }
               // 如果当前项是null，在这里把它删除
               arr.splice(i, 1);
               i--;
           }
           // arr.forEach(item => item(...params));
       }
   };
   init.prototype = Sub.prototype;
   window.Sub = Sub;

})();