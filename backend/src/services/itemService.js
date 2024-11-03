import axios from 'axios'
import { Schema, model } from 'mongoose'

const ItemsCollection = model('ItemsCollection', new Schema({}, { strict: false }))

const getItems = async () => {
  const items = await ItemsCollection.findOne()

  const oneMonthAgo = new Date().setMonth(new Date().getMonth - 1)
  //TODO actually thats not right to leave this functionality to end user. separate all the fetch-if-empty-in-db functionality to admin dashboard. add new subdomain name: dashboard.frametrade.online
  if (!items || !items.items || items.lastUpdate < oneMonthAgo) {
    const fetchedItems = await fetchItems()
    insertItems({ items: fetchedItems, lastUpdate: Date.now() })
    return fetchedItems
  }

  return items.items
}
function insertItems(items) {
  ItemsCollection.insertMany(items)
}

async function fetchItems() {
  const response = await axios.get('https://api.warframe.market/v1/items')
  const data = await response.data
  return data.payload.items
}

export { getItems }
