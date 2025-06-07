// frontend/src/pages/ImportCredential.tsx

import { useState } from 'react';
import { encryptVault } from '@/lib/crypto';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from '@/components/ui/sonner';

export default function ImportCredential() {
  const [form, setForm] = useState({ name: '', type: 'VaccinationCertificate', vaccine: '', date: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:3001/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const credential = await res.json();
      const pin = localStorage.getItem('pin')!;
      const current = JSON.parse(await decryptVault(localStorage.getItem('vault') || '', pin) || '[]');
      const updated = [...current, credential];
      const encrypted = await encryptVault(JSON.stringify(updated), pin);
      localStorage.setItem('vault', encrypted);
      toast.success('Credential importé');
      navigate('/dashboard');
    } catch (e) {
      toast.error('Erreur import credential');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Importer un credential</h2>
      {['name', 'vaccine', 'date'].map((key) => (
        <input
          key={key}
          className="border p-2 mb-2 w-full"
          placeholder={key}
          value={form[key as keyof typeof form]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
      ))}
      <button onClick={handleSubmit} className="bg-green-600 text-white p-2 w-full rounded">
        Envoyer au serveur
      </button>
      <Toaster />
    </div>
  );
}
