export default ({app, redirect})=>{
  //app === vue实例
  console.log("插件");
  // app.router.beforeEach((to, from,next)=>{
  //   // 全局前置守卫，插件
  //   // next(true/false)
  //   // next('/login');//error    => redirect("/login")
  //   console.log('插件配置 全局前置', to);
  //   if(to.name == 'login' || to.name=='reg'){
  //     next();
  //   } else {
  //     redirect({name:'login'});
  //   }
  // });
  // app.router.afterEach((to, from)=>{
  //   console.log('插件配置 全局后置');
  // });
}
