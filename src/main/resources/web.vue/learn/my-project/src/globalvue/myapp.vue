<template>
    <div>
        <slot name="header"></slot>
           my global vue ok 1
        <slot></slot>
        my global vue ok 2
        <slot name="footer"></slot>
    </div>
</template>

<script>
export default {
    name: "myapp"
}
</script>

<style scoped>

</style>