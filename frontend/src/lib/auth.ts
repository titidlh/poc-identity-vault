// frontend/src/lib/auth.ts

export function verifyPIN(pin: string): boolean {
  const existing = localStorage.getItem('pin');
  if (!existing) {
    localStorage.setItem('pin', pin);
    return true;
  }
  return existing === pin;
}

export async function simulateBiometric(): Promise<boolean> {
  return new Promise((res) => setTimeout(() => res(true), 500));
}
