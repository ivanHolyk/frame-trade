import { getInventory as _getInventory, addTradeable } from '../services/inventoryService.js'

const getInventory = async (req, res) => {
  try {
    const inventory = await _getInventory()
    res.json(inventory)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory', error })
  }
}

const addInventoryItem = async (req, res) => {
  try {
    const newTradeable = await addTradeable(req.body)
    res.status(201).json(newTradeable)
  } catch (error) {
    res.status(500).json({ message: 'Error adding tradeable item', error })
  }
}

export { getInventory, addInventoryItem }
