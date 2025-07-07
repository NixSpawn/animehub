'use server'

import { randomUUID } from 'crypto'

export async function pagarConTarjeta(data: {
  cardNumber: string
  expiryMonth: number
  expiryYear: number
  cvv: string
  cardholderName: string
  amount: number
  paymentMethodId: string // "visa", "mastercard", etc.
  payer: {
    email: string
    first_name: string
    last_name: string
    identification: {
      type: string
      number: string
    }
  }
}) {
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY
  const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN

  if (!PUBLIC_KEY || !ACCESS_TOKEN) {
    throw new Error('Credenciales de Mercado Pago no configuradas')
  }

  console.log({data});

  // 1. Generar token de tarjeta
  const tokenRes = await fetch('https://api.mercadopago.com/v1/card_tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      card_number: data.cardNumber,
      expiration_month: data.expiryMonth,
      expiration_year: data.expiryYear,
      security_code: data.cvv,
      cardholder: {
        name: data.cardholderName,
        identification: {
          type: data.payer.identification.type,
          number: data.payer.identification.number
        }
      }
    })
  })

  if (!tokenRes.ok) {
    const err = await tokenRes.json()
    throw new Error(`Error al tokenizar tarjeta: ${err.message || tokenRes.statusText}`)
  }

  const tokenData = await tokenRes.json()
  console.log({tokenData});

  // 2. Realizar el pago con el token
  const paymentRes = await fetch('https://api.mercadopago.com/v1/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'X-Idempotency-Key': randomUUID()
    },
    body: JSON.stringify({
      token: tokenData.id,
      transaction_amount: data.amount,
      installments: 1,
      description: "Pago con tarjeta de prueba",
      payment_method_id: data.paymentMethodId,
      payer: {
        email: data.payer.email,
        first_name: data.payer.first_name,
        last_name: data.payer.last_name,
        identification: {
          type: data.payer.identification.type,
          number: data.payer.identification.number
        }
      }
    })
  })
  

  if (!paymentRes.ok) {
    const err = await paymentRes.json()
    console.log({err});
    throw new Error(`Error al procesar el pago: ${err.message || paymentRes.statusText}`)
  }

  const paymentData = await paymentRes.json()
  console.log({paymentData});

  return {
    success: paymentData.status === 'approved' && paymentData.status_detail === 'accredited',
    id: paymentData.id,
    status: paymentData.status,
    detail: paymentData.status_detail
  }
}
