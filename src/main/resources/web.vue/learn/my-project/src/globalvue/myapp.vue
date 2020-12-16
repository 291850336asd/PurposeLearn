<template>
    <div>
        <slot name="header"></slot>
           my global vue ok 1
        <slot></slot>
        my global vue ok 2
        {{ mycount }} {{colorCount}}  {{mycount2}}
        <slot name="footer"></slot>
    </div>
</template>

<script>
import { mapState, mapGetters,mapActions,mapMutations   } from 'vuex'
export default {
    name: "myapp",
    computed:{
        // ...mapState(['count']),
        ...mapState({
            mycount: 'count',
            mycount2: function (state) {
                return state.count + "zzz"
            }
        }),
        ...mapGetters(['colorCount']),
        ...mapActions([
            'changeColorAsync'
        ]),
        ...mapMutations({
            bb:'moduleB/changeB'
        })
    },
    created() {
        // this.$store.commit('moduleB/changeB');
        this.bb
    }
}
</script>

<style scoped>

</style>