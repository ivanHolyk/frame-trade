<template>
  <v-container class="ga-20">
    <WarframeTableRow
      v-for="(warframe, index) in warframes"
      :key="index"
      :warframe="warframe"
      :index="index"
    >
    </WarframeTableRow>
  </v-container>
</template>
<script setup>
import WarframeTableRow from '@/components/WarframeTableRow.vue'

const props = defineProps(['warframes'])
const warframes = props.warframes
</script>
