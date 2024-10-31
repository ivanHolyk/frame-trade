import { Axios } from 'axios'
const baseURL = 'https://api.warframe.market'
/**
 * @type {Axios | undefined}
 */
let axios = undefined
let authToken
let authCookie
const getWfmAxios = () => {
  if (!axios) {
    axios = new Axios({ baseURL })
    axios.interceptors.request.use(
      (config) => {
        if (authToken) {
          config.headers['Authorization'] = `Bearer ${authToken}`
        } else if (authCookie) {
          config.headers['Cookie'] = authCookie // Set the Cookie header if authCookie is available
        }
        return config
      },
      (error) => Promise.reject(error)
    )
  }
  return axios
}
const setWfmAuthToken = (token) => {
  authToken = token
}
const setWfmAuthCookie = (cookie) => {
  authCookie = cookie
}
export { getWfmAxios, setWfmAuthToken, setWfmAuthCookie }
