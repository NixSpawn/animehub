import { useState, useCallback } from 'react';
import type { CartItem, PaymentMethod, PreferenceResponse } from '../types/mercadopago';

interface UseMercadoPagoReturn {
  preferenceId: string | null;
  loading: boolean;
  error: string | null;
  createPreference: (items: CartItem[], method: PaymentMethod) => Promise<void>;
  resetPreference: () => void;
}

export const useMercadoPago = (): UseMercadoPagoReturn => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createPreference = useCallback(async (items: CartItem[], method: PaymentMethod): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          paymentMethod: method
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PreferenceResponse = await response.json();
      setPreferenceId(data.id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error creating preference';
      setError(errorMessage);
      console.error('Error creating preference:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPreference = useCallback(() => {
    setPreferenceId(null);
    setError(null);
  }, []);

  return {
    preferenceId,
    loading,
    error,
    createPreference,
    resetPreference
  };
};
