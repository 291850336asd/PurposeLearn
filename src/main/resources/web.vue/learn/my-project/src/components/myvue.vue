<template>
    <div v-myclick="aaa" v-color='"red"' v-permission="5" >
        {{ name }}

        <div v-permission="35">
            nihao
        </div>
    </div>
</template>

<script>
    import Bus from '../bus';
    export default {
        name: "myvue",
        data(){
            return {
                name: "myvue",
                aaa: "dudu"
            }
        },
        directives:{
            color(el, obj){
                el.style.color = obj.value;
            }
        },
        created() {
            console.log(Bus.aa);
        }
    }
</script>

<style scoped>

</style>