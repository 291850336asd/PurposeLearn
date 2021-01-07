function direct2(el,binding,vnode) {
  console.log("全局指令2")
}

export default {
  inserted(el,binding,vnode){
    direct2(el, binding, vnode);
  },
  componentUpdated(el,binding,vnode){
    direct2(el, binding, vnode);
  }
}
