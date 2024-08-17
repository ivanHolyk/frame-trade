const Inventory = require('../models/Inventory')
const Tradeable = require('../models/Tradeable')

const getInventory = async () => {
  return await Inventory.find()
}

const addTradeable = async (data) => {
  const newTradeable = new Inventory(data)
  return await newTradeable.save()
}

module.exports = {
  getInventory,
  addTradeable
}
