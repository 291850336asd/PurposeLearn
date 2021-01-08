<template>
    <div>
      <h3>商品详情</h3>
      {{ this.$route.params }}
      {{ this.$route.query }}
    </div>
</template>
<script>
  export default {

    head(){
      return {
        meta:[
          { name: 'keywords', content: this.content }
        ]
      }
    },
    data(){
      return {
        content:'xxxx'
      }
    },
    validate({params, query}){
      // return params.id > 0;
      if(params.id){
        return params.id > 0;
      }
      return true;
    }
  }

</script>
