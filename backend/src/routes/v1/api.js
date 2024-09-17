import { Router } from 'express'
const router = Router()

import { getInventory, addInventoryItem } from '../../controllers/inventoryController.js'
import { authMiddleware } from '../../middleware/authMiddleware.js'
router
  .route('/user/inventory')
  .get(authMiddleware, getInventory)
  .post(authMiddleware, addInventoryItem)

//stub for now
const marketController = { market: () => 'market' }
router.get('/market', marketController.market)

//stub for now
const itemController = { getItems: () => ['power_drift', 'nyx_prime_set'] }
router.get('/item', itemController.getItems)

export { router }
/**
      /v1
        /user
          /inventory
          /wfmCredentials
          /order  authorized warframe.market
        /market 	basically proxy to warframe.market non authorized
        /item		uses data from warframestats once in a month or so and caches it 
 */
