import Tradeable from '../models/Tradeable.js'

const getTradeables = async () => {
  return await Tradeable.find()
}

const addTradeable = async (data) => {
  const newTradeable = new Tradeable(data)
  return await newTradeable.save()
}

export { getTradeables, addTradeable }
