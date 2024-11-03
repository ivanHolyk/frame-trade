import { Router } from 'express'
const router = Router()

import { getInventory, addInventoryItem } from '../../controllers/inventoryController.js'
import { authMiddleware } from '../../middleware/authMiddleware.js'
router
  .route('/user/inventory')
  .get(authMiddleware, getInventory)
  .post(authMiddleware, addInventoryItem)

import { getOrders, addOrder } from '../../controllers/orderController.js'

router.route('/user/order').get(authMiddleware, getOrders).post(authMiddleware, addOrder)

//stub for now
const marketController = { market: (req, res) => res.send('market') }
router.get('/market', marketController.market)

import { getDroptable } from '../../controllers/droptableController.js'
router.get('/droptable', getDroptable)

import { getItems } from '../../controllers/itemController.js'
router.get('/item', getItems)

export { router }
/**
      /v1
        /user
          /inventory
          /wfmCredentials
          /order    authorized warframe.market
        /market 	  basically proxy to warframe.market non authorized
        /item		    uses data from api.warframe.market/v1/item
          /:item_name
        /droptable  uses data from warframestats once in a month or so and caches it 
 */
