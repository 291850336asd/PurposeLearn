export const state = ()=>({
  bNav: false,
  bLoading:false
});
export const mutations = {
  M_UPDATE_NAV(state, payload){
    state.bNav = payload;
  },
  M_UPDATE_LOADING(state,payload){
    state.bLoading = payload;
  }
};

export const getters = {
  getNav(state){
    return state.bNav ? '显示':'隐藏'
  }
};


export const actions ={
  nuxtServerInit(store, {app:{$cookies}}){
    //初始化东西到store中
    // console.log("nuxtServerInit", store, context)
    let user = $cookies.get('user') ?  $cookies.get('user') : {err:2, msg:'未登录'};
    store.commit('user/M_UPDATE_USER', user);
    console.log("nuxtServerInit")
  }
}
