import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './user'
import { decodeJwt } from 'jose'

const baseUrl = 'http://localhost:8000/v1'

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

    let response
    try {
      response = await axios.post(`${baseUrl}/auth`, request)

      const accessToken = await response.data
      jwt.value = accessToken
    } catch (error) {
      const status = error.response.status
      console.log(error)

      if (status === 400) {
        const responseError = error.response.data
        throw responseError
      }
    }
    console.log(header.value)
    response = await axios.get(`${baseUrl}/user`, header.value)
    const user = response.data
    userStore.setUser(user)

    return user
  }
  const header = computed(() => {
    if (jwt.value) {
      return {
        // withCredentials: true,
        headers: {
          Authorization: `Bearer ${jwt.value}`
        }
      }
    }
  })
  async function logout() {
    jwt.value = undefined
    let response = await axios.delete(`${baseUrl}/auth/logout`)
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
