export default {
    namespaced: true,
    state:{
        colorA: 'redB'
    },
    mutations:{
        changeAColor(state){
            state.colorA = 'blueB'
        }
    },
    actions:{
        changeColorAAsync(store){
            setTimeout(function () {
                store.commit('changeAColor');
            },1000);
        }
    },
    getters: {
        // 存在一些计算属性
        colorBCount: state => {
            return state.colorA + 1111;
        }
    }
}