'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaymentData {
  collection_id?: string;
  collection_status?: string;
  payment_id?: string;
  status?: string;
  external_reference?: string;
}

const PaymentSuccess: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<PaymentData>({});

  useEffect(() => {
    const data: PaymentData = {
      collection_id: searchParams.get('collection_id') || undefined,
      collection_status: searchParams.get('collection_status') || undefined,
      payment_id: searchParams.get('payment_id') || undefined,
      status: searchParams.get('status') || undefined,
      external_reference: searchParams.get('external_reference') || undefined
    };
    
    setPaymentData(data);
    console.log('Payment success data:', data);
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Procesando pago...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Pago Exitoso!</h2>
          <p className="text-gray-600">Tu pago ha sido procesado correctamente.</p>
        </div>
        
        {paymentData.payment_id && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">ID de Pago: {paymentData.payment_id}</p>
            {paymentData.external_reference && (
              <p className="text-sm text-gray-600">Referencia: {paymentData.external_reference}</p>
            )}
          </div>
        )}
        
        <button
          onClick={() => router.push('/')}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
