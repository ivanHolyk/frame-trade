<template>
    <h3>
        <slot></slot>
    </h3>
    <h4>User: {{ user.ingame_name }}</h4>
    <h5>Rep: {{ user.reputation }}</h5>
    <p>Locale: {{ user.locale }}, region: {{ user.region }}</p>

</template>
<script setup>
const props = defineProps(['user'])
const user = props.user
</script>