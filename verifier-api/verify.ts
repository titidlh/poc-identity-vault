import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'secret');

export async function verifyCredential(token: string): Promise<{verified: boolean; payload?: any}> {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return { verified: true, payload }
  } catch {
    return { verified: false }
  }
}
