<template>
  <div>
    <div class="box">用户</div>
    <div class="box2">用户2</div>
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
<style lang="scss" scoped>
$bg:#999;
.box {
  background: $bg;
}
.box2 {
  background: $theme-bg;
}
</style>
