// frontend/src/pages/Home.tsx

import { useNavigate } from 'react-router-dom';
import { simulateBiometric, verifyPIN } from '@/lib/auth';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

export default function Home() {
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  async function handleLogin() {
    const biometricOK = await simulateBiometric();
    if (!biometricOK) return toast.error('Échec biométrique');

    const ok = verifyPIN(pin);
    if (!ok) return toast.error('Code PIN invalide');

    localStorage.setItem('pin', pin);
    navigate('/dashboard');
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Coffre-fort d'identité</h1>
      <input
        className="border p-2 w-full mb-4"
        type="password"
        placeholder="Code PIN"
        onChange={(e) => setPin(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-blue-600 text-white p-2 w-full rounded">
        Connexion
      </button>
      <Toaster />
    </div>
  );
}
