import { Schema, model } from 'mongoose'

const syndicateSchema = new Schema({
  name: String,
  reputation: Number,
  level: String
})

const Syndicate = model('Syndicates', syndicateSchema)

export { Syndicate }
