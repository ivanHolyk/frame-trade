<template>
  <v-container class="py-10">
    <v-btn disabled class="mb-4"> Login into Warframe market </v-btn>

    <v-btn
      color="primary"
      class="mb-4"
      @click="getItems"
      :loading="!isLoadComplete"
      :disabled="!isLoadComplete"
      block
    >
      <template v-slot:loader>
        <v-progress-circular indeterminate color="white" size="20" />
      </template>
      Get list from Warframe market
    </v-btn>

    <v-table>
      <tbody>
        <tr>
          <td>There is total items in trade</td>
          <td>{{ itemStore?.items?.length }}</td>
        </tr>

        <tr>
          <td>Among them sets</td>
          <td>{{ itemStore?.sets?.length }}</td>
        </tr>

        <tr>
          <td>Warframes</td>
          <td>{{ warframes?.length }}</td>
        </tr>

        <tr>
          <td>Weapons</td>
          <td></td>
        </tr>

        <tr>
          <td>Others</td>
          <td></td>
        </tr>

        <tr>
          <td>Companions</td>
          <td></td>
        </tr>

        <tr>
          <td>Archwing</td>
          <td></td>
        </tr>
      </tbody>
    </v-table>

    <WarframeTable :warframes="warframes"></WarframeTable>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useTradeableItemStore } from '@/stores/tradeable'
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