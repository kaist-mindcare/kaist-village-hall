import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'

import { env } from '@/env'
import auth from '@/route/auth'
import bucket from '@/route/bucket'

const app = new Hono({ strict: false })

// Debugging
app.use(logger())

// Routes
const routes = app.route('/auth', auth).route('/bucket', bucket)
export type AppType = typeof routes

serve({
  fetch: app.fetch,
  port: env.API_PORT,
})
