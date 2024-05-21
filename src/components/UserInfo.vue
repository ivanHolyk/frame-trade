<template>
    <div class="d-inline">
        <span class="h3 me-3">
            <slot></slot>
        </span>
        <span class="h4 me-3"><i class="bi bi-person"></i> {{ user.ingame_name }}</span>
        <span class="h5">Rep: {{ user.reputation }}</span>
        <p>Locale: {{ user.locale }}, region: {{ user.region }}</p>
    </div>

</template>
<script setup>
const props = defineProps(['user'])
const user = props.user
</script>