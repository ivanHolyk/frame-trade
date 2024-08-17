const Tradeable = require('../models/Tradeable')

const getTradeables = async () => {
  return await Tradeable.find()
}

const addTradeable = async (data) => {
  const newTradeable = new Tradeable(data)
  return await newTradeable.save()
}

module.exports = {
  getTradeables,
  addTradeable
}
