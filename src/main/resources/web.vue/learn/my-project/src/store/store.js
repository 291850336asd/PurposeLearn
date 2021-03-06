import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from '../modules/moduleA'
import moduleB from '../modules/moduleB'
// const modulesAll  = require.context('../modules', false, /\.js$/)
// modulesAll.keys().forEach(item => {
//     console.log(item)
//     console.log(modulesAll(item).default)
//
//     modulesAll(item).default
// })
// console.log(modulesAll.keys())
Vue.use(Vuex)
var store = new Vuex.Store(
    {
        //用来放公共数据
        state:{
            count: 100,
            color: 'red'
        },
        mutations:{
            //这些放的都是一些函数，用来修改state中的属性,规范：不能是异步方法
            // this.$store.commit('changeCount', 1111) commit最后传递两个参数，传对象即可
            changeCount(state, options){ // options 参数值
                console.log(state, options);
                state.count ++;
            },
            changeColor(state){
                state.color = 'blue'
            }
        },
        actions:{
            //Action 提交的是 mutation，而不是直接变更状态。
            // Action 可以包含任意异步操作。
            // 一般存放一些ajax请求
            increment (store) {
                store.commit('changeCount')
            },
            changeColorAsync(store){
                setTimeout(function () {
                    store.commit('changeColor');
                },1000);
            }
        },
        getters: {
            // 存在一些计算属性
            colorCount: state => {
                return state.color + state.count;
            }
        },
        modules:{
            //如果没设置命名空间，存在重名的方法则都会执行
            moduleA: moduleA,
            moduleB: moduleB
        }
    }
);
export default  store;