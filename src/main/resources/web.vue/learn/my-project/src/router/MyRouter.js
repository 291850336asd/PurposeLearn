let Vue = null;
function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            if(this.$options.router){
                this.$router = this.options.router;
            }else if(this.$parent){
                this.$router = this.$parent.$router;
            }
        }
    });

    Vue.component('router-link',{
        props:{
            to:{
                required: true
            }
        },
        render(h){
            return h('a',{
                attrs : {
                    href: '#' + this.to
                }
            }, this.$slots.default)
        }
    });
    Vue.component('router-view', {
        render(h){
            this.$router.routerMap[this.$router._route]
            return h('h1')
        }
    });
}

class VueRouter {
    constructor(options){
        let {routers} = options;
        this.routerMap = {};
        routers.forEach( item => {
            this.routerMap[item.path] = item.component;
        })
        window.addEventListener('load', ()=> {
            location.hash = location.hash || '/';
            this._route = location.hash.slice(1);
        })
        this._route = location.hash.slice(1);
        window.onhashchange = ()=> {
            this._route = location.hash.slice(1);
        }
    }
}

VueRouter.install = install;

export default VueRouter;