// frontend/src/pages/Dashboard.tsx

import { useEffect, useState } from 'react';
import { decryptVault } from '@/lib/crypto';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    const pin = localStorage.getItem('pin');
    const blob = localStorage.getItem('vault');
    if (pin && blob) {
      const decrypted = decryptVault(blob, pin);
      decrypted.then((res) => {
        if (res) setList(JSON.parse(res));
      });
    }
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Mes credentials</h2>
      <Link to="/import" className="text-blue-600 underline">+ Importer un nouveau credential</Link>
      <ul className="mt-4 space-y-2">
        {list.map((item, i) => (
          <li key={i} className="bg-gray-100 p-3 rounded">
            <pre className="text-sm overflow-x-auto">{JSON.stringify(item, null, 2)}</pre>
            <Link to={`/share/${i}`} className="text-blue-500 underline text-sm">Partager</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
