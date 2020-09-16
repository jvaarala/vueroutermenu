<template>
    <b-table :items="events"/>
</template>
<script>
    export default {
        props: {
            events: Array,
        },
        name: 'ListEvent'
    };
</script>
<style scoped>

</style>