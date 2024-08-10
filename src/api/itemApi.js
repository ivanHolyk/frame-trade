import axios from '@/api/axios'
const baseUrl = '/api/v1'

export async function fetchItems() {
  let response = await axios.get(`${baseUrl}/items`)
  return await response.data.payload.items
}
export async function fetchItem(urlName) {
  const response = await axios.get(`${baseUrl}/items/${urlName}`)
  const data = await response.data

  return data.payload.item
}
