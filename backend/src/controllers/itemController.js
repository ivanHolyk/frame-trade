import {getItems as getItemsService} from '../services/itemService.js'

const getItems = async (req, res) => {
  try {
const items=await getItemsService()
    res.json(items)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error fetching items', error })
  }
}

export { getItems }
