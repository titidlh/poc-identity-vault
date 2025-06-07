import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { webcrypto as crypto } from 'crypto';
import { jwtVerify } from 'jose';

const registry = JSON.parse(readFileSync('./did-registry.json', 'utf8'));
const app = express();
app.use(cors());
app.use(express.json());

app.post('/verify', async (req, res) => {
  try {
    const token = req.body.credential;
    const decoded = await verifyJWT(token);
    res.json({ verified: true, payload: decoded });
  } catch (e: any) {
    res.status(400).json({ verified: false, error: e.message });
  }
});

app.listen(3002, () => {
  console.log('Verifier API running on port 3002');
});

async function verifyJWT(token: string) {
  const key = await importPublicKey(registry["did:example:issuer1"].publicKey);
  const { payload } = await jwtVerify(token, key, { issuer: "did:example:issuer1" });
  return payload;
}

async function importPublicKey(pem: string) {
  const key = pem
    .replace('-----BEGIN PUBLIC KEY-----', '')
    .replace('-----END PUBLIC KEY-----', '')
    .replace(/\n/g, '');
  const buf = Buffer.from(key, 'base64');
  return crypto.subtle.importKey(
    'spki',
    buf,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify']
  );
}
