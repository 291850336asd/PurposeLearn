import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        state:{
            count: 100
        },
        mutations:{
            add(state){
                state.count +=1;
            },
            init(state, count){
                state.count = count;
            }
        }
    });
}