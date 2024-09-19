<template>

    <div class="input-group">
        <input ref="input" class="form-control" v-model="text">
        <button class="btn btn-outline-primary" v-on:click="copyText()">{{ copyStatus }}
            <ClipboardIcon />
        </button>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import ClipboardIcon from '@/assets/ClipboardIcon.vue';

const props = defineProps(['item', 'order', 'operation'])
const item = props.item;
const order = props.order;
const operation = props.operation
const input = ref(null)
const text = computed(() => `/w ${order.user.ingame_name} Hi! I want to ${operation}: "${item.en.item_name}" for ${order.platinum} platinum. (frametrade.online)`)

const copyStatus = ref('Copy')

function copyText() {
    input.value.select()
    navigator.clipboard.writeText(text.value)

    copyStatus.value = 'Copied!'
    setTimeout(() => {
        copyStatus.value = 'Copy';
    }, 3000);
}


</script>