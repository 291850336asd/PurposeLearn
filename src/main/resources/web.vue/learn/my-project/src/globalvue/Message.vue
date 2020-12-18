<template>
    <div class="message">
        <div v-for="(item,index) in messages" :key="index">
            {{ item.message }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "Message",
        data(){
            return {
                messages:[],
                id: 0
            }
        },
        methods:{
            add(options){
                //增加消息
                let id = this.id ++;
                let layer = {...options,id}
                this.messages.push(layer);
                layer.timer = setTimeout(()=> {
                    this.remove(layer);
                    document.body.removeChild(this);
                }, options.duration);
            },
            remove(layer){
                //移除消息
                clearTimeout(layer.timer);
                this.messages = this.messages.filter(item => item.id != layer.id);
            }
        }
    }
</script>

<style scoped>
.message{
    width: 100%;
    height: 100%;
    position: absolute;
    background: gray;
    top: 0px;
    left: 0px;
}
</style>