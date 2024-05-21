<template>
  <main>
    <button class="btn" v-on:click="login" disabled>Login into Warframe market</button>
    <button class="btn btn-primary" v-on:click="itemStore.getItems">Get list from Warframe market</button>
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
import axios from 'axios';
import { ref } from 'vue';
import { useTradeableItemStore } from '@/stores/tradeable';
import WarframeTable from '@/components/WarframeTable.vue'
const baseUrl = "/api"
const itemStore = useTradeableItemStore()


const warframes = ref(itemStore.warframes)



const loginResponse = ref({})
async function login() {
  const url = baseUrl + "/auth/signin";
  loginResponse.value = await axios.post(url, {
    "email": "email",
    "password": "password"
  })
  console.log(loginResponse)
}

</script>
