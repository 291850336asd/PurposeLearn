export const state = ()=>({
  err: 1,
  msg:'未登录',
  token:'',
  data:{}
});


export const mutations = {
  M_UPDATE_USER(state, payload){
    state.err = payload.err;
    state.msg = payload.msg;
    state.token = payload.token;
    state.data = payload.data;
  }
};

export const actions = {
  A_UPDATE_USER({commit,state}, payload){
    commit('M_UPDATE_USER', payload)
  }
};
