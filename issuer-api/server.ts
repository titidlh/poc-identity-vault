import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { webcrypto as crypto } from "crypto";
import { SignJWT } from 'jose';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors());
app.use(express.json());

const privateKey = readFileSync('./private.pem', 'utf8');
const issuer = 'did:example:issuer1';

app.post('/issue', async (req, res) => {
  try {
    const payload = req.body;
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuer(issuer)
      .setSubject(payload.name || 'unknown')
      .setExpirationTime('1y')
      .setIssuedAt()
      .setJti(uuidv4())
      .sign(await importPrivateKey(privateKey));
    res.json({ ...payload, jwt });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3001, () => {
  console.log('Issuer API running on port 3001');
});

async function importPrivateKey(pem: string) {
  const key = pem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\n/g, '');
  const buf = Buffer.from(key, 'base64');
  return crypto.subtle.importKey(
    'pkcs8',
    buf,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
}
