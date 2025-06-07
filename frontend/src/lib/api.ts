export async function issueCredential(data: any) {
  const res = await fetch('http://localhost:3001/issue', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function verifyCredential(token: string) {
  const res = await fetch('http://localhost:3002/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential: token }),
  });
  return res.json();
}
