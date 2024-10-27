<template>
  <v-row>
    <v-col cols="12">
      <v-text-field v-model="text" label="Message" ref="input" outlined hide-details></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-btn color="primary" @click="copyText">{{ copyStatus }}
        <ClipboardIcon />
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, ref } from 'vue'
import ClipboardIcon from '@/assets/ClipboardIcon.vue'

const props = defineProps(['item', 'order', 'operation'])
const item = props.item
const order = props.order
const operation = props.operation

const input = ref(null)
const text = computed(
  () =>
    `/w ${order.user.ingame_name} Hi! I want to ${operation}: "${item.en.item_name}" for ${order.platinum} platinum. (frametrade.online)`
)

const copyStatus = ref('Copy')

function copyText() {
  input.value.$el.querySelector('input').select()
  navigator.clipboard.writeText(text.value)

  copyStatus.value = 'Copied!'
  setTimeout(() => {
    copyStatus.value = 'Copy'
  }, 3000)
}
</script>

<style scoped>
.v-text-field {
  width: 100%;
}
</style>
