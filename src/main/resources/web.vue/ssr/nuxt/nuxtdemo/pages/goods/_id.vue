<template>
    <div>
      <h3>商品详情</h3>
      {{ this.$route.params }}
      {{ this.$route.query }}
    </div>
</template>
<script>
  export default {
    validate({params, query}){
      // return params.id > 0;
      if(params.id){
        return params.id > 0;
      }
      return true;
    }
  }

</script>
