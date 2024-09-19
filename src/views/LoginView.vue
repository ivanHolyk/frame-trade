<template>
    <div class="vh-100 d-flex align-items-center justify-content-center">
        <div class="m-auto col-xl-5 col-lg-6 p-4 rounded shadow bg-white" style="margin-top: 25vh!important;">
            <div class="text-center mb-4">
                <h2>Login</h2>
            </div>
            <form>
                <input type="text" class="form-control mb-3" placeholder="Email" v-model="loginInfo.email"
                    :disabled="!isLoadComplete">
                <input type="password" class="form-control mb-3" placeholder="Password" v-model="loginInfo.password"
                    :disabled="!isLoadComplete">

                <span v-if="errorMessage" class="text-danger"> {{ errorMessage.message }}</span>
                <button type="submit" class="btn btn-primary w-100 mt-3" @click="login" :disabled="!isLoadComplete">
                    <span v-if="!isLoadComplete" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    Log in
                </button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';
import { useUserStore } from '@/stores/user';

const loginInfo = ref({})
const authStore = useAuthStore()


const errorMessage = ref()


const isLoadComplete = ref(true)
const login = async () => {
    errorMessage.value = undefined
    isLoadComplete.value = false
    try {
        const user = await authStore.login(loginInfo.value.email, loginInfo.value.password)
        isLoadComplete.value = true
        // router.push(`/user`)
        const userStore = useUserStore()
        router.push(`/user/${userStore.username}`)
        // router.go(-1)
    } catch (error) {
        errorMessage.value = error
    } finally {
        isLoadComplete.value = true

    }
}
</script>
