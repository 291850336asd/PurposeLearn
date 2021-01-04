export const state = ()=>({
  bNav: false,
  bLoading:false
});
export const mutations = ()=>({
  M_UPDATE_NAV(state, payload){
    state.bNav = payload;
  },
  M_UPDATE_LOADING(state,payload){
    state.bLoading = payload;
  }
});

export const getters = ()=>({
  getNav(state){
    return state.bNav ? '显示':'隐藏'
  }
});


export const actions ={
  nuxtServerInit(store, context){
    //初始化东西到store中
    // console.log("nuxtServerInit", store, context)
    console.log("nuxtServerInit")
  }
}
