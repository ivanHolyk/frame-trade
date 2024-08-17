const tradeableService = require('../services/tradeableService')

const getInventory = async (req, res) => {
  try {
    const tradeables = await tradeableService.getTradeables()
    res.json(tradeables)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory', error })
  }
}

const addInventoryItem = async (req, res) => {
  try {
    const newTradeable = await tradeableService.addTradeable(req.body)
    res.status(201).json(newTradeable)
  } catch (error) {
    res.status(500).json({ message: 'Error adding tradeable item', error })
  }
}

module.exports = {
  getInventory,
  addInventoryItem
}
