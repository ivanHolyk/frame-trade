import { backendApi } from '@/api/axios'
const baseUrl = '/v1'

export async function fetchItems() {
  let response = await backendApi.get(`http://localhost:8080/v1/item`)
  return await response.data
}
export async function fetchItem(urlName) {
  const response = await backendApi.get(`${baseUrl}/item/${urlName}`)
  const data = await response.data

  return data.payload.item
}
