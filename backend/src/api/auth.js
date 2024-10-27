import { Axios } from 'axios'
const url = 'http://localhost:8000'

/**
 * @type {Axios | undefined}
 * An instance of Axios for making authenticated requests.
 */
let axios = undefined

/**
 * @type {string | undefined}
 * Stores the current authorization token.
 */
let authToken = undefined

/**
 * Initializes the Axios instance with the specified base URL and interceptors.
 * @returns {Axios} - The Axios instance with request interceptors for authorization.
 */
const getAuthAxios = () => {
  if (!axios) {
    axios = new Axios({ baseURL: url })

    // Add a request interceptor to attach the token
    axios.interceptors.request.use(
      (config) => {
        if (authToken) {
          config.headers['Authorization'] = `Bearer ${authToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
  }

  return axios
}

/**
 * Sets the authorization token for the Axios instance.
 * @param {string} token - The authorization token to be used in requests.
 */
const setAuthToken = (token) => {
  authToken = token
}

export { getAuthAxios, setAuthToken }
