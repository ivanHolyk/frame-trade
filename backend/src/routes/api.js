const express = require('express')
const router = express.Router()

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
const inventoryController = require('../controllers/inventoryController')

router.get('/inventory', inventoryController.getInventory)
router.post('/inventory', inventoryController.addInventoryItem)

module.exports = router

// Example route for handling third-party API data
router.get('/third-party', (req, res) => {
  res.json({ message: 'Fetching data from third-party API...' })
})

module.exports = router
