import { z } from 'zod'

export const env = z
  .object({
    API_PORT: z.coerce.number(),

    DB_HOST: z.string(),
    DB_PORT: z.coerce.number(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),

    SSO_CLIENT_ID: z.string(),
    SSO_CLIENT_SECRET: z.string(),
    SSO_REDIRECT_URI: z.string().url(),

    R2_ACCOUNT_ID: z.string(),
    R2_BUCKET_NAME: z.string(),
    R2_TOKEN_VALUE: z.string(),
    R2_ACCESS_KEY_ID: z.string(),
    R2_SECRET_ACCESS_KEY: z.string(),
  })
  .parse(process.env)
