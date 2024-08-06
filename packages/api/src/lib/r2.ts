import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { env } from '@/env'

const client = new S3Client({
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
  region: 'auto',
})

export const createPutUrl = (key: string) =>
  getSignedUrl(
    client,
    new PutObjectCommand({
      Bucket: env.R2_BUCKET_NAME,
      Key: key,
    }),
    { expiresIn: 60 },
  )

export const createGetUrl = (key: string) =>
  getSignedUrl(
    client,
    new GetObjectCommand({
      Bucket: env.R2_BUCKET_NAME,
      Key: key,
    }),
    { expiresIn: 60 },
  )
