import { Hono } from 'hono'

import { env } from '@/env'

const app = new Hono({ strict: false })

// Routes
app.get('/', (c) => {
  return c.json({ message: 'Hello World!', env }, 200)
})

export default app
