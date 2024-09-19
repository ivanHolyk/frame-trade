import axios from 'axios'

const getDroptable = async (req, res) => {
  try {
    const response = await axios.get('https://drops.warframestat.us/data/all.json')
    const data = await response.data
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching droptable', error })
  }
}

export { getDroptable }
