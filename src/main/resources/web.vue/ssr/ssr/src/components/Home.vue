<template>
    <div>
        home
        <h2 @click="$store.commit('add')">{{$store.state.count}}</h2>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>

</style>