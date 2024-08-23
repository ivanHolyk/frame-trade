import { config } from 'dotenv'
config()

import express, { json } from 'express'
import morgan from 'morgan' // For logging HTTP requests
import cors from 'cors' // For handling CORS requests

const app = express()
const port = process.env.PORT || 3000

app.use(json())
app.use(morgan('dev'))
app.use(cors())

import { router as apiRoutes } from './routes/v1/api.js'
app.use('/api/v1', apiRoutes)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

import { connect } from 'mongoose'

connect(
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
