import { config } from 'dotenv'
config()

import { createApp } from './app.js'

const port = process.env.PORT || 3000
const app = createApp()
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
export { server }
