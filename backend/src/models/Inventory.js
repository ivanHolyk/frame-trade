import { Schema, model } from 'mongoose'
import { Resource } from './Resource.js'

import { Tradeable } from './Tradeable.js'
import { Syndicate } from './Syndicates.js'

const inventorySchema = new Schema({
  tradeable: [Tradeable.schema],
  resources: [Resource.schema],
  syndicates: [Syndicate.schema],
  platinum: Number,
  credits: Number
})

const Inventory = model('Inventory', inventorySchema)

export { Inventory }
/**
 * What inventory should have:
 * tradeables:[{
 *    user that owns this item,
 *    item id? not sure what service id to choose,
 *    date of creation,
 *    last update,
 *    amount,
 *    purchase price,
 *    date of purchase,
 *    subtype,
 *    rank?,
 *    user from whom we bought item,
 * }],
 *
 *
 * resources:[{
 *    id,
 *    name,
 *    amount
 * }],
 *
 * also includes platinum, credits, endo, nora smth etc.
 *
 * syndicates:[{
 *    name,
 *    rep_digit,
 *    level
 * }]
 */
