const mongoose = require('mongoose')
const Resource = require('./Resource')
const Tradeable = require('./Tradeable')
const Syndicate = require('./Syndicates')

const inventorySchema = new mongoose.Schema({
  tradeable: [Tradeable.schema],
  resources: [Resource.schema],
  syndicates: [Syndicate.schema],
  platinum: Number,
  credits: Number
})

const Inventory = mongoose.model('Inventory', inventorySchema)

module.exports = Inventory
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
