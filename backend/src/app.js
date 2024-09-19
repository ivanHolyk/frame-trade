import { config } from 'dotenv'
config()

import express, { json } from 'express'
import morgan from 'morgan' // For logging HTTP requests
import cors from 'cors' // For handling CORS requests
import { router as apiRoutes } from './routes/v1/api.js'
import { connect } from 'mongoose'
import cookieParser from 'cookie-parser'

export function createApp(db) {
  const app = express()

  app.use(json())
  app.use(morgan('dev'))
  app.use(cors())
  app.use(cookieParser())

  app.use('/v1', apiRoutes)

  app.get('/', (req, res) => {
    res.send({ message: 'bruh, nice try' })
  })

  connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err.message)
    })

  return app
}
