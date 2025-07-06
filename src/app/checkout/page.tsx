import React from 'react';
import Checkout from '@/components/Checkout';
import type { CartItem } from '@/types/mercadopago';

// Metadata para la página
export const metadata = {
  title: 'Checkout - Tu Tienda',
  description: 'Procesa tu pago de forma segura',
};

const CheckoutPage: React.FC = () => {
  // Ejemplo de items - en producción estos vendrían de tu base de datos o estado global
  const items: CartItem[] = [
    {
      id: '1',
      title: 'Producto de ejemplo',
      quantity: 1,
      price: 50.00,
      description: 'Descripción del producto'
    },
    {
      id: '2',
      title: 'Otro producto',
      quantity: 2,
      price: 25.00,
      description: 'Otro producto de ejemplo'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Checkout
        </h1>
        <Checkout items={items} />
      </div>
    </div>
  );
};

export default CheckoutPage;
