export default {
    namespaced: true,
    state:{
        colorA: 'redA'
    },
    mutations:{
        changeColor(state){
            state.colorA = 'blueAAAAA'
        }
    },
    actions:{
        changeColorAAsync(store){
            setTimeout(function () {
                store.commit('changeColor');
            },1000);
        }
    },
    getters: {
        // 存在一些计算属性
        colorACount: state => {
            return state.colorA + 1111;
        }
    }
}