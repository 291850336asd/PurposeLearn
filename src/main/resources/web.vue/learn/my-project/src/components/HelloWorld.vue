<template>
  <div class="hello">

    <h1>{{ $store.state.count }}</h1>
    <h1>{{ $store.state.moduleA.colorA }}</h1>
    <h1>{{ $store.state.moduleB.colorA }}</h1>
    <h1>{{ $store.getters.colorCount }}</h1>
    <h1>{{ msg }}</h1>
    <slot name="hwheader" :user="user" aa="1">
    </slot>
    <myapp>
      <div slot="header">
        my global my title 1
      </div>
      <div slot="header">
        my global my title 2
      </div>
       myapp child 1
      <div slot="footer">
        my global footer
      </div>
      myapp child 2

<!--      <template v-slot:header>-->
<!--        dududhihihihihihihihiihihihi-->
<!--      </template>-->
    </myapp>
<!--    <my-app></my-app>-->

    <slot></slot>
  </div>
</template>

<script>
import Bus from '../bus';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      user:{
        name:"meng"
      }
    }
  },
  created() {
      console.log(Bus.aa);
      console.log('hello',this)
      console.log( this.$store.getters.colorCount)
      this.$store.commit('changeCount', 1111)
      this.$store.dispatch('increment', 1111)
      // this.$store.dispatch('changeColorAAsync', 1111) //没有命名空间 则moduleA 和moduleB 都会被调用
      this.$store.dispatch('moduleA/changeColorAAsync', 1111) //没有命名空间 则moduleA 和moduleB 都会被调用
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
