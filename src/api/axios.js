import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

// Create an instance of axios (optional, to use a dedicated config)
const authApi = axios.create({
  baseURL: 'http://localhost:8000' // Replace with your API base URL
})

// Set up an interceptor to append the token to every request
authApi.interceptors.request.use(
  (config) => {
    // Get the token from localStorage, sessionStorage, or any other storage
    const token = useAuthStore().token // Or however you store it

    // If token exists, append it to the request headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    // Handle any error that occurs during the request preparation
    return Promise.reject(error)
  }
)
const backendApi = axios.create({
  baseURL: 'http://localhost:8080' // Replace with your API base URL
})

// Set up an interceptor to append the token to every request
backendApi.interceptors.request.use(
  (config) => {
    // Get the token from localStorage, sessionStorage, or any other storage
    const token = useAuthStore().token // Or however you store it

    // If token exists, append it to the request headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    // Handle any error that occurs during the request preparation
    return Promise.reject(error)
  }
)
export { authApi, backendApi }
