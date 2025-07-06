'use client'

import React, { useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useMercadoPago } from '../hooks/useMercadoPago';
import type { CartItem, PaymentMethod } from '../types/mercadopago';
import PaymentButton from './PaymetButton';

interface CheckoutProps {
  items: CartItem[];
}

// Inicializar MercadoPago
const publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY;
if (!publicKey) {
  throw new Error('NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY is not defined');
}
initMercadoPago(publicKey);

const Checkout: React.FC<CheckoutProps> = ({ items }) => {
  const { preferenceId, loading, error, createPreference, resetPreference } = useMercadoPago();

  useEffect(() => {
    return () => {
      resetPreference();
    };
  }, [resetPreference]);

  const handlePaymentMethodClick = async (method: PaymentMethod): Promise<void> => {
    await createPreference(items, method);
  };

  const calculateTotal = (): number => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const paymentButtons = [
    { method: 'yape' as const, label: 'Yape', color: 'bg-purple-600 hover:bg-purple-700' },
    { method: 'plin' as const, label: 'Plin', color: 'bg-blue-600 hover:bg-blue-700' },
    { method: 'card' as const, label: 'Tarjeta', color: 'bg-green-600 hover:bg-green-700' },
    { method: 'all' as const, label: 'Todos los métodos', color: 'bg-gray-600 hover:bg-gray-700' }
  ];

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Métodos de Pago
      </h2>
      
      {/* Resumen del pedido */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-2">Resumen del pedido:</h3>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm text-gray-600 mb-1">
            <span>{item.title} x {item.quantity}</span>
            <span>S/ {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-semibold text-gray-800">
            <span>Total:</span>
            <span>S/ {calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Botones de pago */}
      <div className="space-y-3">
        {paymentButtons.map((button) => (
          <PaymentButton
            key={button.method}
            method={button.method}
            label={button.label}
            color={button.color}
            onClick={handlePaymentMethodClick}
            disabled={loading}
            loading={loading}
          />
        ))}
      </div>

      {/* Wallet de MercadoPago */}
      {preferenceId && (
        <div className="mt-6">
          <Wallet 
            initialization={{ preferenceId }}
          />
        </div>
      )}
    </div>
  );
};

export default Checkout;
