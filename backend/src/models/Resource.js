import { Schema, model } from 'mongoose'

const resourceSchema = new Schema({
  id: String, // Consider using MongoDB ObjectId for unique IDs
  amount: Number,
  name: String
})

const Resource = model('Resource', resourceSchema)

export { Resource }
