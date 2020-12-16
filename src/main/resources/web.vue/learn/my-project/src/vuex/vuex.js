let Vue = null;
function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
       beforeCreate() {
           if(this.$options.store){
               this.$store = this.options.store;
           }else if(this.$parent){
               this.$store = this.$parent.$store;
           }
       }
    });
}

class Store {
    constructor(options) {
        // this.state = options.state;// 为了让state为响应式，借助vue实现
        let vm = new Vue({
            data() {
                state: options.state
            }
        });
        this.state = vm.state;
        this.mutations = {}
        let mutations = options.mutations || {}
        Object.keys(mutations).forEach(key => {
            this.mutations[key] = (option)=> {
                mutations[key].call(this, this.state, option);
            }
        });
        this.actions = {};
        let actions = options.actions || {}
        Object.keys(actions).forEach(key => {
            this.actions[key] = (option) => {
                actions[key].call(this, this, option);
            }
        })

        this.getters = {}
        let getters = options.getters || {};
        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get:() => {
                    return getters[key].call(this, this.state)
                }
            })
        })
        this.commit = (type, option) => {
            this.mutations[type](option);
        }
    }
    // commit(type, option){
    //     this.mutations[type](option);
    // }
    dispatch(type, option){
        this.actions[type](option);
    }
}

export function mapState(ary) {
    let obj = {}
    ary.forEach(key => {
        obj[key] = function () {
            return this.$store.state[key];
        }
    })
    return obj;
}
export function mapMutations(ary) {
    let obj = {}
    ary.forEach(key => {
        obj[key] = function (option) {
            return this.$store.commit(key, option);
        }
    })
    return obj;
}

export  default {
    install, Store
}