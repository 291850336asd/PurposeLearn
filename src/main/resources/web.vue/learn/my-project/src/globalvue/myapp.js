import Vue from 'vue';
import myapp from './myapp.vue';
Vue.component('myapp',{
    render: function (createElement) {
        return createElement(myapp, [
            createElement('header',this.$slots.header),
            createElement('main',this.$slots.default),
            createElement('footer',this.$slots.footer)]);
    }
})