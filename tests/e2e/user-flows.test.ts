// tests/e2e/user-flows.test.ts

import axios from 'axios';
import { encryptVault, decryptVault } from '../../frontend/src/lib/crypto';

async function run() {
  const pin = '1234';
  const credentialData = {
    name: 'Alice Martin',
    type: 'VaccinationCertificate',
    vaccine: 'Moderna',
    date: '2023-12-01'
  };

  // Step 1: Appel à /issue
  const issueRes = await axios.post('http://localhost:3001/issue', credentialData);
  const credential = issueRes.data;
  console.log('✅ Credential émis:', credential);

  // Step 2: Chiffrement
  const encrypted = await encryptVault(JSON.stringify([credential]), pin);
  console.log('🔐 Coffre chiffré:', encrypted.slice(0, 50) + '...');

  // Step 3: Déchiffrement
  const decrypted = await decryptVault(encrypted, pin);
  const vault = JSON.parse(decrypted);
  console.log('🔓 Coffre déchiffré:', vault);

  // Step 4: Envoi à /verify
  const verifyRes = await axios.post('http://localhost:3002/verify', {
    credential: vault[0].jwt || vault[0]
  });
  console.log('✅ Vérification réussie:', verifyRes.data);
}

run().catch((e) => {
  console.error('❌ Test échoué:', e.response?.data || e);
});
