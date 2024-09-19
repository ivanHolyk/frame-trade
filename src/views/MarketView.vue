<template>
  <main>
    <button class="btn" disabled>Login into Warframe market</button>

    <button class="btn btn-primary" @click="getItems" :disabled="!isLoadComplete"> <span v-if="!isLoadComplete"
        class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Get list from Warframe market</button>


    <table class="table table-striped-columns table-hover">
      <tbody>

        <tr>
          <td>There is total items in trade</td>
          <td> {{ itemStore?.items?.length }}</td>
        </tr>

        <tr>
          <td>Among them sets</td>
          <td> {{ itemStore?.sets?.length }}</td>
        </tr>

        <tr>
          <td>Warframes</td>
          <td> {{ warframes?.length }}</td>
        </tr>

        <tr>
          <td>Weapons</td>
          <td> </td>
        </tr>

        <tr>
          <td>Others</td>
          <td> </td>
        </tr>

        <tr>
          <td>Companions</td>
          <td> </td>
        </tr>

        <tr>
          <td>Archwing</td>
          <td> </td>
        </tr>
      </tbody>

    </table>
    <WarframeTable :warframes="warframes"></WarframeTable>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useTradeableItemStore } from '@/stores/tradeable';
import WarframeTable from '@/components/WarframeTable.vue'
const itemStore = useTradeableItemStore()


const warframes = ref(itemStore.warframes)
const isLoadComplete = ref(true)

const getItems = async () => {
  isLoadComplete.value = false
  await itemStore.getItems()
  isLoadComplete.value = true
}

</script>
