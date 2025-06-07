// frontend/src/pages/ShareCredential.tsx

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { decryptVault } from '@/lib/crypto';
import { toast, Toaster } from 'sonner';

export default function ShareCredential() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const pin = localStorage.getItem('pin');
    const blob = localStorage.getItem('vault');
    if (pin && blob) {
      decryptVault(blob, pin).then((res) => {
        if (res) {
          const list = JSON.parse(res);
          setData(list[parseInt(id!)]);
        }
      });
    }
  }, [id]);

  const handleSend = async () => {
    try {
      const res = await fetch('http://localhost:3002/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: data?.jwt || data })
      });
      const result = await res.json();
      if (result.verified) toast.success('✅ Vérifié');
      else toast.error('❌ Invalide');
    } catch {
      toast.error('Erreur lors de la vérification');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Partager le credential</h2>
      {data && (
        <>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto mb-4">{JSON.stringify(data, null, 2)}</pre>
          <button onClick={handleSend} className="bg-blue-600 text-white p-2 w-full rounded">Envoyer au vérificateur</button>
        </>
      )}
      <Toaster />
    </div>
  );
}
