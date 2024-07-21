import { z } from 'zod'

export const env = z
  .object({
    DB_HOST: z.string(),
    DB_PORT: z.coerce.number(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),

    SSO_CLIENT_ID: z.string(),
    SSO_CLIENT_SECRET: z.string(),
    SSO_REDIRECT_URI: z.string().url(),
  })
  .parse(process.env)
