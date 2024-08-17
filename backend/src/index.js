require('dotenv').config()

const express = require('express')
const morgan = require('morgan') // For logging HTTP requests
const cors = require('cors') // For handling CORS requests

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

const apiRoutes = require('./routes/api')
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

const mongoose = require('mongoose')

mongoose
  .connect(
    process.env.MONGODB_URI ||
      'mongodb://localhost:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0'
  )
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message)
  })

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
