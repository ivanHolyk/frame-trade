<template>
  <main>
    <button class="btn" disabled>Login into Warframe market</button>
    <button class="btn btn-primary" @click="itemStore.getItems">Get list from Warframe market</button>
    <p>There is total items in trade: {{ itemStore.items.length }}</p>
    <p>Among them sets: {{ itemStore.sets.length }}</p>
    <p>Warframes: {{ warframes.length }}</p>
    <p>Weapons: </p>
    <p>Others: </p>
    <p>Companions: </p>
    <p>Archwing: </p>
    <WarframeTable :warframes="warframes"></WarframeTable>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useTradeableItemStore } from '@/stores/tradeable';
import WarframeTable from '@/components/WarframeTable.vue'
const itemStore = useTradeableItemStore()


const warframes = ref(itemStore.warframes)


</script>
