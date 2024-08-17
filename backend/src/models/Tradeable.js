const mongoose = require('mongoose')

const tradeableSchema = new mongoose.Schema({
  user: String,
  id: String, // Consider using MongoDB ObjectId for unique IDs
  dateOfCreation: Date,
  lastUpdate: Date,
  amount: Number,
  purchasePrice: Number,
  dateOfPurchase: Date,
  subtype: String,
  rank: String,
  userFromWhomBought: String,
  wfm_order: Object
})

const Tradeable = mongoose.model('Tradeable', tradeableSchema)

module.exports = Tradeable
