import React from 'react';
import type { PaymentMethod } from '../types/mercadopago';

interface PaymentButtonProps {
  method: PaymentMethod;
  label: string;
  color: string;
  onClick: (method: PaymentMethod) => void;
  disabled?: boolean;
  loading?: boolean;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ 
  method, 
  label, 
  color, 
  onClick, 
  disabled = false,
  loading = false 
}) => {
  return (
    <button
      onClick={() => onClick(method)}
      disabled={disabled || loading}
      className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${color} ${
        disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 hover:shadow-lg'
      }`}
    >
      {loading ? 'Procesando...' : `Pagar con ${label}`}
    </button>
  );
};

export default PaymentButton;