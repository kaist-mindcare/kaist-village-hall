import { drizzle } from 'drizzle-orm/postgres-js'
import * as postgres from 'postgres'

import * as schema from '@/db/schema'
import { env } from '@/env'

const queryClient = postgres({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
})

export const db = drizzle(queryClient, { schema })
