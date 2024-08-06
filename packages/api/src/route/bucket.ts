import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

import { createGetUrl, createPutUrl } from '@/lib/r2'

const app = new Hono()
  .get(
    '/geturl',
    zValidator(
      'query',
      z.object({
        key: z.string(),
      }),
    ),
    async (c) => {
      const { key } = c.req.valid('query')
      const url = await createGetUrl(key)
      return c.json(url)
    },
  )
  .get(
    '/puturl',
    zValidator(
      'query',
      z.object({
        key: z.string(),
      }),
    ),
    async (c) => {
      const { key } = c.req.valid('query')
      const url = await createPutUrl(key)
      return c.json(url)
    },
  )

export default app
