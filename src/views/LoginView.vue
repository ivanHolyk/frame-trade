<template>
    <div class="vh-100 d-flex align-items-center justify-content-center">
        <div class="m-auto col-xl-5 col-lg-6 p-4 rounded shadow bg-white" style="margin-top: 25vh!important;">
            <div class="text-center mb-4">
                <h2>Login</h2>
            </div>
            <input type="text" class="form-control mb-3" placeholder="Email" v-model="loginInfo.email"
                :disabled="!isLoadComplete">
            <input type="password" class="form-control mb-3" placeholder="Password" v-model="loginInfo.password"
                :disabled="!isLoadComplete">
            <button class="btn btn-primary w-100 mt-3" @click="login" :disabled="!isLoadComplete">
                <span v-if="!isLoadComplete" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                Log in
            </button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';

const loginInfo = ref({})
const authStore = useAuthStore()

const isLoadComplete = ref(true)
const login = async () => {
    isLoadComplete.value = false
    const user = await authStore.login(loginInfo.value.email, loginInfo.value.password)
    isLoadComplete.value = true
    // router.push(`/user`)
    router.push(`/user/${user.ingame_name}`)
    // router.go(-1)
}
</script>
