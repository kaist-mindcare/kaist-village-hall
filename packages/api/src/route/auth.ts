import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { stringify } from 'qs'
import { z } from 'zod'

import { env } from '@/env'

const app = new Hono()

app.post(
  '/kaist/callback',
  zValidator(
    'form',
    z.object({
      code: z.string(),
      state: z.string(),
    }),
  ),
  async (c) => {
    const { code, state } = c.req.valid('form')
    console.log({ code, state })

    const res = await fetch('https://sso.kaist.ac.kr/auth/api/single/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: stringify({
        client_id: env.SSO_CLIENT_ID,
        client_secret: env.SSO_CLIENT_SECRET,
        code,
        redirect_uri: env.SSO_REDIRECT_URI,
      }),
    })
    const data = await res.json()

    return c.json(data)
  },
)

export default app
