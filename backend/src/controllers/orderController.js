import { addTradeable } from '../services/inventoryService.js'
import { fetchOrders } from '../services/orderService.js'

const getOrders = async (req, res) => {
  try {
    const orders = await fetchOrders()
    console.log(orders)

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error })
  }
}

const addOrder = async (req, res) => {
  try {
    const newTradeable = await addTradeable(req.body)
    res.status(201).json(newTradeable)
  } catch (error) {
    res.status(500).json({ message: 'Error adding tradeable item', error })
  }
}

export { getOrders, addOrder }
