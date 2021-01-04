<template>
    <div>
      <h3>商品评论</h3>
      <nuxt-link to="/goods/comment/11?a=44">评论11</nuxt-link>
      <nuxt-link to="/goods/comment/22?b=55">评论22</nuxt-link>
      <nuxt-link :to="{ name:'goods-comment-id', params:{ id:33}, query:{a:33,b:66 }}">评论33</nuxt-link>
      <nuxt/>
    </div>
</template>
<script>
  export default {
    transition:'test'
  }
</script>

<style scoped>
  .test-enter-active, .test-leave-active{
    transition: .5s ease all;
  }
  .test-enter, .test-leave-active{
    margin-left: -100px;
  }
</style>
