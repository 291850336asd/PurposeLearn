<template>
  <div>
    登录
    <el-divider></el-divider>
    <el-input v-model="username">
      <template slot="prepend">用户</template>
    </el-input>
    <el-input v-model="password">
      <template slot="prepend">密码</template>
    </el-input>
    <button @click="login">登录</button>
    <button @click="$router.push('/reg')">注册</button>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        username: null,
        password: null
      }
    },
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
        }).catch(err=>{
          this.$router.replace('/');
        });
      }
    }
  }
</script>
