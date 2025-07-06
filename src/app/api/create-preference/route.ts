import { NextRequest, NextResponse } from 'next/server';
import MercadoPago from 'mercadopago';
import type { PreferenceRequest, PreferenceResponse } from '@/types/mercadopago';

interface ErrorResponse {
  error: string;
  details?: string;
}

// Inicializa el cliente de Mercado Pago con las variables de entorno
const client = new MercadoPago({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
  options: {
    timeout: 5000, // Opcional: tiempo de espera en milisegundos
  },
});

export async function POST(request: NextRequest): Promise<NextResponse<PreferenceResponse | ErrorResponse>> {
  try {
    const body: PreferenceRequest = await request.json();
    const { items, paymentMethod = 'all' } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items are required' },
        { status: 400 }
      );
    }

    const preferenceData = {
      items: items.map(item => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        currency_id: 'PEN',
        unit_price: item.price,
        description: item.description,
        picture_url: item.picture_url
      })),
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        included_payment_methods: [],
        installments: 12,
        default_installments: 1
      },
      back_urls: {
        success: `${request.headers.get('origin') || 'http://localhost:3000'}/payment/success`,
        failure: `${request.headers.get('origin') || 'http://localhost:3000'}/payment/failure`,
        pending: `${request.headers.get('origin') || 'http://localhost:3000'}/payment/pending`
      },
      auto_return: 'approved',
      statement_descriptor: 'Tu Tienda',
      external_reference: `order-${Date.now()}`,
      notification_url: `${request.headers.get('origin') || 'http://localhost:3000'}/api/webhook`,
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 horas
    };

    // Configurar métodos de pago específicos para Perú
    switch (paymentMethod) {
      case 'yape':
        preferenceData.payment_methods.included_payment_methods = ['yape'];
        break;
      case 'plin':
        preferenceData.payment_methods.included_payment_methods = ['plin'];
        break;
      case 'card':
        preferenceData.payment_methods.excluded_payment_types = ['digital_wallet'];
        break;
      case 'all':
      default:
        // Permitir todos los métodos de pago
        break;
    }

    const preference = await client.createPreference(preferenceData);

    return NextResponse.json({
      id: preference.body.id,
      init_point: preference.body.init_point,
      sandbox_init_point: preference.body.sandbox_init_point
    });
  } catch (error) {
    console.error('Error creating preference:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        error: 'Error creating payment preference',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}