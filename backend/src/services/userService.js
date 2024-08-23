import axios from 'axios'
import { decodeJwt } from 'jose'
import { User } from '../models/User.js'
const wfmApiV1Url = 'https://api.warframe.market/v1'
const wfmApiV2Url = 'https://api.warframe.market/v2'

const setUser = async (user) => {
  let dbUser = await User.findOne({ id: user.id })
  if (!dbUser) {
    dbUser = await User.create(user)
  }
  return dbUser
}

export { setUser }
