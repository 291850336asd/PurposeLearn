<template>
    <div>
        list
        <h2 @click="$store.commit('add')">{{$store.state.count}}</h2>

    </div>
</template>

<script>
    export default {
        name: "List",
        //触发action后，返回Promise以便确定请求结果
        asyncData({store, route}){
            //触发action后，返回Promise以便确定请求结果
            return store.dispatch('getCount');
        }
    }
</script>

<style scoped>

</style>