<template>
    <div>
        list
        <h2 @click="$store.commit('add')">{{$store.state.count}}</h2>

    </div>
</template>

<script>
    export default {
        name: "List"
    }
</script>

<style scoped>

</style>