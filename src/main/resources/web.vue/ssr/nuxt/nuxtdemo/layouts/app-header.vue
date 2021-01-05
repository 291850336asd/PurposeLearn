<template>
    <nav>
      <el-menu default-active="activeIndex" @select="handlerSelect" mode="horizontal">
        <el-menu-item v-for="(item,index) of navs" :key="index" >{{item.title}}</el-menu-item>
      </el-menu>
      <nuxt-link to="/index" active-class="app_header--active">首页</nuxt-link>
      <nuxt-link to="/goods" active-class="app_header--active">商品</nuxt-link>
      <nuxt-link to="/goods2" active-class="app_header--active">商品2同级展示</nuxt-link>
      <nuxt-link to="/user" active-class="app_header--active">用户</nuxt-link>
      <nuxt-link to="/reg" active-class="app_header--active">注册</nuxt-link>
      <nuxt-link to="/login" active-class="app_header--active">登录</nuxt-link>
    </nav>
</template>

<script>
  export default {
    data(){
      return {
        activeIndex: '-1',
        navs:[
          {path:'/index', title:'首页'},
          {path:'/user', title:'用户'},
          {path:'/goods', title:'商品'}
        ]
      }
    },
    watch:{
      $route:{
        immediate: true,
        handler(route){
          if(route.fullPath == '/'){
            this.$router.push({name:'root'});
            return
          }
          var isfind = false;
          this.navs.map((item, index)=>{
            if(route.fullPath == item.path){
              this.activeIndex = index + '';
              isfind = true;
            }
          });
          if(!isfind){
            this.activeIndex = '-1';
          }
        }
      }
    },
    methods:{
      handlerSelect(key){
        this.$router.push(this.navs[parseInt(key)].path);
      }
    }
  }
</script>

<style scoped>
  .app_header--active{
    background: #399;
    color: #fff;
  }
</style>
