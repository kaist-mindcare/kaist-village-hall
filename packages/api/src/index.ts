import { Hono } from 'hono'
import { logger } from 'hono/logger'

import auth from '@/route/auth'

const app = new Hono({ strict: false })

// Debugging
app.use(logger())

// Routes
app.route('/auth', auth)

export default app
