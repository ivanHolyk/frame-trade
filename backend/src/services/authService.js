import axios from 'axios'
import { decodeJwt } from 'jose'
import { setUser } from './userService.js'
let jwt
const wfmApiV1Url = 'https://api.warframe.market/v1'

async function login(req) {
  await axios.options(`${wfmApiV1Url}/auth/signin`)
  let response = await axios.post(`${wfmApiV1Url}/auth/signin`, req, {
    withCredentials: true,
    headers: {
      Authorization: prepareAuthorizationMethod(req.email, req.password)
    }
  })

  jwt = response.headers.getAuthorization()

  const user = await response.data.payload.user
  setUser(user)
  return user
}
function logout() {
  jwt.value = undefined
}

function prepareAuthorizationMethod(email, password) {
  return isJwtValid() ? jwt : `Basic ${btoa(`${email}:${password}`)}`
}

function isJwtValid() {
  return jwt && new Date() < new Date(decodeJwt(jwt).exp * 1000)
}

export { login, logout }
