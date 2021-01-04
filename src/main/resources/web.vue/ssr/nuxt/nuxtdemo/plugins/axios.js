export default function ({$axios, redirect,route, store}) {
  $axios.default.timeout = 10000;
  $axios.onRequest(config => {
    // config.headers.token = '加token';
    return config;
  });
  $axios.onResponse(response => {

    //校验token过期
    // if(response.data && response.data.errStatus === 555 &&  route.fullPath !== '/login'){
    //   redirect("/login?path="+ route.fullPath);
    // }
    return response;
  });
}
