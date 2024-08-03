<template style="margin-top: 1rem;">
    <div style="margin-top: 1rem;">
        <UserInfo :user="user"></UserInfo>
    </div>

</template>
<script setup>
import { useUserStore } from '@/stores/user';
import UserInfo from '@/components/UserInfo.vue';
import { storeToRefs } from 'pinia';


const userStore = useUserStore()
const { user } = storeToRefs(userStore)


</script>