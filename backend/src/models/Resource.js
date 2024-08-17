const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
  id: String, // Consider using MongoDB ObjectId for unique IDs
  amount: Number,
  name: String
})

const Resource = mongoose.model('Resource', resourceSchema)

module.exports = Resource
