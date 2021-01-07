function direct1(el,binding,vnode) {
  console.log("全局指令1")
}
export default {
  bind(el,binding,vnode){
    direct1(el, binding, vnode);
  }
}
