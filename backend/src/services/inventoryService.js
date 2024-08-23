import { Inventory } from '../models/Inventory.js'
import { Tradeable } from '../models/Tradeable.js'

const getInventory = async () => {
  return await Inventory.find()
}

const addTradeable = async (data) => {
  const newTradeable = new Inventory(data)
  return await newTradeable.save()
}

export { getInventory, addTradeable }
