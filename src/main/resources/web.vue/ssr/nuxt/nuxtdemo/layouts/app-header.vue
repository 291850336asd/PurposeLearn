<template>
    <nav>
      <nuxt-link to="/index" active-class="app_header--active">首页</nuxt-link>
      <nuxt-link to="/goods" active-class="app_header--active">商品</nuxt-link>
      <nuxt-link to="/goods2" active-class="app_header--active">商品2同级展示</nuxt-link>
      <nuxt-link to="/user" active-class="app_header--active">用户</nuxt-link>
      <nuxt-link to="/reg" active-class="app_header--active">注册</nuxt-link>
      <nuxt-link to="/login" active-class="app_header--active">登录</nuxt-link>
    </nav>
</template>


<style scoped>
  .app_header--active{
    background: #399;
    color: #fff;
  }
</style>
