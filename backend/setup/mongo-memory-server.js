import { afterAll, beforeAll } from 'vitest'
import { setup, teardown } from '../test/mongodb-vitest.js'

beforeAll(async () => {
  await setup()
})

afterAll(async () => {
  await teardown()
})
