import { getItems as getItemsService } from '../services/itemService.js'

const getItems = async (req, res) => {
  try {
    const items = await getItemsService()
    res.json(items)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error fetching items', error })
  }
}
const getItemByName = (req, res) => {
  try {
    const { item_name } = req.params

    // Logic to find the item by name, such as querying a database or external API
    const item = findItemByName(item_name)

    if (item) {
      res.json(item)
    } else {
      res.status(404).json({ message: 'Item not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error fetching items', error })
  }
}
export { getItems }
