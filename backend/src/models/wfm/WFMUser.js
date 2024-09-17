import { Schema, model } from 'mongoose'
import { Inventory } from '../Inventory.js'

const wfmUserSchema = new Schema({
  id: {
    type: String
  },
  anonymous: {
    type: Boolean,
    default: false
  },
  verification: {
    type: Boolean,
    default: false
  },
  ingame_name: {
    type: String,
    required: true
  },
  check_code: {
    type: String,
    required: false
  },
  role: {
    type: String,
    enum: ['anonymous', 'user', 'moderator', 'admin'],
    default: 'user'
  },
  patreon_profile: {
    patreon_founder: {
      type: Boolean,
      default: false
    },
    subscription: {
      type: Boolean,
      default: false
    },
    patreon_badge: {
      type: String,
      enum: ['bronze', 'gold', 'silver', 'platinum'],
      default: 'bronze'
    }
  },
  platform: {
    type: String,
    enum: ['ps4', 'pc', 'xbox']
  },
  region: {
    type: String
  },
  banned: {
    type: Boolean,
    default: false
  },
  ban_reason: {
    type: String
  },
  avatar: {
    type: String,
    default: null // Nullable field
  },
  background: {
    type: String,
    default: null // Nullable field
  },
  linked_accounts: {
    steam_profile: {
      type: Boolean,
      default: false
    },
    patreon_profile: {
      type: Boolean,
      default: false
    },
    xbox_profile: {
      type: Boolean,
      default: false
    }
  },
  has_email: {
    type: Boolean,
    default: false
  },
  written_reviews: {
    type: Number,
    default: 0
  },
  unread_messages: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['ingame', 'online', 'offline'],
    default: 'offline'
  },
  reputation: {
    type: Number,
    default: 0
  },
  last_seen: {
    type: Date,
    default: null // Nullable field
  },
  inventory: Inventory.schema
})

const WFMUser = model('wfmUser', wfmUserSchema)

export { WFMUser }
