const inventoryService = require('../services/inventoryService')

const getInventory = async (req, res) => {
  try {
    const inventory = await inventoryService.getInventory()
    res.json(inventory)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory', error })
  }
}

const addInventoryItem = async (req, res) => {
  try {
    const newTradeable = await inventoryService.addTradeable(req.body)
    res.status(201).json(newTradeable)
  } catch (error) {
    res.status(500).json({ message: 'Error adding tradeable item', error })
  }
}

module.exports = {
  getInventory,
  addInventoryItem
}
