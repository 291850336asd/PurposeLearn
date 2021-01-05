<template>
  <div>
    登录
    <button @click="login">登录</button>
  </div>
</template>
<script>
  export default {
    methods:{
      login(){
        //调用登录接口返回数据时同步token和vuex
        this.$axios({
          url:'/api/login',
          method:'post',
          data:{
            name:'xxx',
            password:'xxxx'
          }
        }).then(res=>{
          this.$cookies.set('user', res.data);
          this.$store.commit('user/M_UPDARTE_USER',res.data);
          if(!this.$route.query.path || /login|reg/.test(this.$route.query.path)){
            this.$router.replace('/user');
          }else{
            this.$router.replace(this.$route.query.path);
          }
        });
      }
    }
  }
</script>
