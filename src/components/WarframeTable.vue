<template>
    <table class="table table-striped-columns table-hover">
        <thead>
            <tr>
                <th>#</th>
                <th>Warframe</th>
                <th>Action</th>
                <th>Parts</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(warframe, index) in warframes" :key="index">
                <WarframeTableRow v-if="warframe" :warframe=warframe :index="index"></WarframeTableRow>
            </tr>
        </tbody>

    </table>
</template>
<script setup>
import WarframeTableRow from '@/components/WarframeTableRow.vue';

const props = defineProps(['warframes']);
const warframes = props.warframes;


</script>