<template>
    <div>
        detail
    </div>
</template>

<script>
    export default {
        name: "Detail",
        created() {
            console.log(":qqq", this.$route.params.qqq)
            setTimeout(() => {
                this.$router.push('/home')
            }, 1000)
        }
    }
</script>

<style scoped>

</style>