export default function ({$axios, redirect,route, store,app:{$cookies}}) {
  $axios.defaults.timeout = 10000;
  $axios.onRequest(config => {
    console.log(store.state.user)
    config.headers.token = store.state.user.token ?  store.state.user.token: '';
    return config;
  });
  $axios.onResponse(response => {

    //校验token过期
    // if(response.data.err===2  &&  route.fullPath !== '/login'){
    //   redirect("/login?path="+ route.fullPath);
    // }
    return response;
  });
}
