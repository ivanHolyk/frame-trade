<template>
    <tbody>
        <tr v-for="(warframe, index) in warframes" :key="index">
            <WarframeTableRow v-if="warframe" :warframe=warframe :index="index"></WarframeTableRow>
        </tr>
    </tbody>

</template>
<script setup>
import WarframeTableRow from '@/components/WarframeTableRow.vue';

const props = defineProps(['warframes']);
const warframes = props.warframes;


</script>