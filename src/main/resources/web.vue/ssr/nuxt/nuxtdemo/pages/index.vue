<template>
  <section class="container">
    <div>
      <h3>首页</h3>
      <app-logo/>
      <!--<h1 class="title">-->
        <!--nuxtdemo   {{ a }} -  {{ b }}-->
      <!--</h1>-->
      <!--<h2 class="subtitle">-->
        <!--Nuxt.js project-->
      <!--</h2>-->
      <!--<div class="links">-->
        <!--<a-->
          <!--href="https://nuxtjs.org/"-->
          <!--target="_blank"-->
          <!--class="button&#45;&#45;green">Documentation</a>-->
        <!--<a-->
          <!--href="https://github.com/nuxt/nuxt.js"-->
          <!--target="_blank"-->
          <!--class="button&#45;&#45;grey">GitHub</a>-->
      <!--</div>-->
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
//  middleware:'auth',
  middleware(context){
    //服务器端this为undefined
    console.log("middleware pages index.vue", this)
  },
  //参数有效性
//  validate(context){
  validate({params, query}){
    // 校验业务
//    console.log('validate pages index.vue',window);//服务器端没有window报错
    console.log('validate pages index.vue')
    return true;
  },
  data(){
    return { a:1 }
  },
  //读取数据，返回给组件
  asyncData(context){
    console.log('asyncData pages index.vue')
    //异步业务逻辑，读取数据，返回数据跟data合并
    return { b:2 }
  },
  //读取数据，读取数据提交给vuex
  fetch({store}){
    console.log('fetch pages index.vue')
  },
  //ssr & csr
  beforeCreate(){
    console.log('beforeCreate pages index.vue')
  },
  //ssr & csr
  created(){
    console.log('created pages index.vue')
  },

  //csr
  beforeMount(){
    console.log('beforeMount pages index.vue')
  },
  mounted(){
    // this指向组件本身
    console.log('mounted pages index.vue', window, this)
  },
  beforeUpdate(){
    console.log('beforeUpdate pages index.vue')
  },
  updated(){
    console.log('updated pages index.vue')
  },
  beforeDestory(){
    console.log('beforeDestory pages index.vue')
  },
  destoryed(){
    console.log('destoryed pages index.vue')
  },
  components: {
    AppLogo
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

