import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

// TODO: Use hono/client after resolving the issue:
// `hono/client could not be found within the project or in these directories`

type UploadImageOption = {
  prefix?: string
  key?: string
}

type UploadImageResponse =
  | { ok: true; url: string }
  | { ok: false; code: 'FAIL_TO_GET_SIGNED_URL' | 'FAIL_TO_UPLOAD' }

/**
 * Uploads an image to the server.
 * It uses random uuid for the key if not provided.
 */
export const uploadImage = async (
  image: string,
  options?: UploadImageOption,
): Promise<UploadImageResponse> => {
  const prefix = options?.prefix ?? ''
  const key = options?.key ? options.key : uuidv4()

  const searchParam = new URLSearchParams([
    ['key', `${prefix}/${key}`],
  ]).toString()

  const urlRes = await fetch(
    new URL(`bucket/puturl?${searchParam}`, process.env.EXPO_PUBLIC_API_URL),
  )
  if (!urlRes.ok) {
    return { ok: false, code: 'FAIL_TO_GET_SIGNED_URL' }
  }

  const signedUrl: string = await urlRes.json()
  const blob = await (await fetch(image)).blob()

  const uploadRes = await fetch(signedUrl, { method: 'PUT', body: blob })
  if (!uploadRes.ok) {
    return { ok: false, code: 'FAIL_TO_UPLOAD' }
  }

  return {
    ok: true,
    url: `${process.env.EXPO_PUBLIC_BUCKET_URL}/${prefix}/${key}`,
  }
}
