const mongoose = require('mongoose')

const syndicateSchema = new mongoose.Schema({
  name: String,
  reputation: Number,
  level: String
})

const Syndicate = mongoose.model('Syndicates', syndicateSchema)

module.exports = Syndicate
