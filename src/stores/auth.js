import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './user'
import { decodeJwt } from 'jose'

const baseUrl = '/api/v1'

export const useAuthStore = defineStore('auth', () => {
  const jwt = ref('')
  const userStore = useUserStore()

  async function login(email, password) {
    console.log(document.cookie)

    const request = {
      auth_type: 'header',
      email: email,
      password: password,
      device_id: ''
    }

    await axios.options(`${baseUrl}/auth/signin`)
    let response = await axios.post(`${baseUrl}/auth/signin`, request, {
      withCredentials: true,
      headers: {
        Authorization: prepareAuthorizationMethod(email, password)
      }
    })

    jwt.value = response.headers.getAuthorization()

    const user = await response.data.payload.user
    userStore.setUser(user)

    return user
  }
  const header = computed(() => {
    if (token) {
      return {
        withCredentials: true,
        headers: {
          Authorization: jwt.value
        }
      }
    }
  })
  function logout() {
    jwt.value = undefined
  }

  const isAuth = computed(() => jwt)

  function prepareAuthorizationMethod(email, password) {
    return isJwtValid() ? jwt.value : `Basic ${btoa(`${email}:${password}`)}`
  }

  function isJwtValid() {
    return jwt.value && new Date() < new Date(decodeJwt(jwt.value).exp * 1000)
  }

  const requiresAuth = computed(() => !jwt.value)

  const token = computed(() => jwt.value)

  return { login, isAuth, requiresAuth, token, logout, header }
})
