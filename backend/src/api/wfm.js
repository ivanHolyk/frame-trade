import { Axios } from 'axios'
const baseURL = 'https://api.warframe.market'
/**
 * @type {Axios | undefined}
 */
let axios = undefined
let authToken
const getWfmAxios = () => {
  if (!axios) {
    axios = new Axios({ baseURL })
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
const setWfmAuthToken = (token) => {
  authToken = token
}
export { getWfmAxios, setWfmAuthToken }
