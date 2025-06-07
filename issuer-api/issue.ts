import { SignJWT } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'secret');

export async function issueCredential(payload: any): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .sign(SECRET);
}
