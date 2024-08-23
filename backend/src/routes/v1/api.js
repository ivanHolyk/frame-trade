import { Router } from 'express'
const router = Router()

// Example route for fetching user inventory
// router.get('/inventory', (req, res) => {
//   res.json({ message: 'Fetching user inventory...' })
// })

// router.post('/inventory', (req, res) => {
//   //check auth? skip for now

//   //save item to db

//   //return item

//   res.json({ message: 'Fetching user inventory...' })
// })

//TODO finish later
const userController = {}
// router.get('/user', userController)

import { auth } from '../../controllers/authController.js'
router.post('/auth', auth)

import { getInventory, addInventoryItem } from '../../controllers/inventoryController.js'
import { authMiddleware } from '../../middleware/authMiddleware.js'
router.get('/user/inventory', authMiddleware, getInventory)
router.post('/user/inventory', authMiddleware, addInventoryItem)

const marketController = { market: () => 'market' }
router.get('/market', marketController.market)

const itemController = { getItems: () => ['power_drift', 'nyx_prime_set'] }
router.get('/item', itemController.getItems)

export { router }
/**
 *  /api
      /v1
        /user
          /inventory
        /auth
        /market 	basically proxy to warframe.market
        /item		uses data from warframestats once in a month or so and caches it
        
 */
