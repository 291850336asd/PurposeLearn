<template>
  <div>
    <h1 v-if="error.statusCode">页面不存在: {{error.message}}</h1>
    <h1 v-else>应用发送异常</h1>
    <button @click="$router.replace('/index')">跳转到首页</button>
  </div>
</template>
<script>
  export default {
    props:['error']
  }
</script>
