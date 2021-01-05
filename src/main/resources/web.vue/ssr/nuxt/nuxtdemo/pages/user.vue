<template>
  <div>
    用户
    <el-divider></el-divider>
    <el-button @click="logout">注销</el-button>
  </div>
</template>
<script>
  export default {
    middleware(){

    },
    methods:{
      logout(){
        //删除cookie，清空vuex
        this.$cookies.remove('user');
        this.$store.commit('user/M_UPDARTE_USER',{
          err: 1,
          msg:'未登录',
          token:'',
          data:{}
        });
        this.$router.push('/login');
      }
    }
  }
</script>
