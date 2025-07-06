import { NextRequest, NextResponse } from 'next/server';
import MercadoPago from 'mercadopago';
import type { PaymentNotification } from '@/types/mercadopago';

interface WebhookResponse {
  received: boolean;
  error?: string;
}

// Inicializa el cliente de Mercado Pago con las variables de entorno
const client = new MercadoPago({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
  options: {
    timeout: 5000, // Opcional: tiempo de espera en milisegundos
  },
});

export async function POST(request: NextRequest): Promise<NextResponse<WebhookResponse>> {
  try {
    const notification: PaymentNotification = await request.json();

    if (notification.type === 'payment') {
      const payment = new MercadoPago({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '' });
      const paymentInfo = await payment.payment.findById(notification.data.id);

      console.log('Payment notification received:', {
        id: paymentInfo.body.id,
        status: paymentInfo.body.status,
        external_reference: paymentInfo.body.external_reference,
        transaction_amount: paymentInfo.body.transaction_amount,
        payment_method_id: paymentInfo.body.payment_method_id
      });

      // Aquí puedes actualizar tu base de datos según el estado del pago
      await processPaymentUpdate(paymentInfo.body);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        received: false, 
        error: `Webhook processing failed: ${errorMessage}` 
      },
      { status: 500 }
    );
  }
}

// Permitir también GET para verificación de webhook
export async function GET(request: NextRequest): Promise<NextResponse> {
  return NextResponse.json({ status: 'Webhook endpoint is active' });
}

async function processPaymentUpdate(paymentInfo: any): Promise<void> {
  const paymentData = {
    id: paymentInfo.id,
    status: paymentInfo.status,
    external_reference: paymentInfo.external_reference,
    transaction_amount: paymentInfo.transaction_amount,
    payment_method_id: paymentInfo.payment_method_id
  };

  switch (paymentInfo.status) {
    case 'approved':
      console.log('Payment approved:', paymentData);
      // Aquí actualizarías tu base de datos para marcar el pedido como pagado
      break;
    case 'pending':
      console.log('Payment pending:', paymentData);
      // Aquí actualizarías el estado a pendiente
      break;
    case 'rejected':
      console.log('Payment rejected:', paymentData);
      // Aquí actualizarías el estado a rechazado
      break;
    default:
      console.log('Payment status unknown:', paymentData);
  }
}