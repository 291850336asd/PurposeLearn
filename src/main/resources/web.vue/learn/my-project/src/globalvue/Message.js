//渲染 message.vue到body,并调用核心方法
import MessageVue from './Message.vue';
import Vue from 'vue';
let getInstance = ()=> {
    let vm = new Vue({
        render: h => h(MessageVue)

    }).$mount();

    document.body.appendChild(vm.$el);

    //获取MessageVue组件，拿到方法
    let component = vm.$children[0];
    return {
        add: (options) => {
            component.add(options);
        },
        remove: (layer) => {
            component.remove(layer);
        }
    }
};
let instance;
let getIns = () => {
    instance = instance || getInstance();
    return instance;
}
const Message = {
    info(options){
        // 调用message.vue 的方法add
        getIns().add(options);
    }
}

Message.install = (Vue) => {
    let $message = {};
    Object.keys(Message).forEach(key => {
        $message[key] = Message[key];
    })
    Vue.prototype.$message = $message;
}
export {
    Message
};