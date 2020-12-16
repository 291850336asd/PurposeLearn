<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="app">
      <img alt="Vue logo" src="./assets/logo.png">
      <router-link to="/list">Go to List</router-link>
      <router-link active-class="router-link-active" to="/home">Go to home</router-link>
      <router-view></router-view>
    <myvue></myvue>
    <HelloWorld msg="Welcome to Your Vue.js App">
<!-- 老写法     <template v-slot:hwheader ='userScope'>-->
     <template slot='hwheader' slot-scope='userScope'>
       <!-- userScope 包含所有行内属性  -->
       <div>
         {{ userScope.user.name }}
         {{ userScope.aa }}
         hwheader
       </div>
     </template>
      app
    </HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import myvue from './components/myvue.vue'

export default {
  name: 'App',
  data(){
    return {
    }
  },
  components: {
    HelloWorld,myvue
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.router-link-active {
    color: red;
}
</style>
