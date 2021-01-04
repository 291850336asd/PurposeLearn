<template>
  <div>
    <h3>商品</h3>
    <nuxt-link to="/goods/1?a=1&b=2">商品01</nuxt-link>
    <nuxt-link to="/goods/2?a=2&b=4">商品02</nuxt-link>
    <nuxt-link :to="{ name:'goods-id', params:{ id:3}, query:{a:3,b:6 }}">商品03</nuxt-link>
    <nuxt-link to="/goods/comment">商品评论</nuxt-link>
    <nuxt/>
  </div>
</template>
