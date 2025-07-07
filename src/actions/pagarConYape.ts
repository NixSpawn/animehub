'use server'

import { randomUUID } from 'crypto'

export async function pagarConYape(data: {
  phoneNumber: string
  otp: string
  requestId: string
  amount: number
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

  // 1. Generar token de Yape
  const tokenResponse = await fetch(
    `https://api.mercadopago.com/platforms/pci/yape/v1/payment?public_key=${PUBLIC_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phoneNumber: data.phoneNumber,
        otp: data.otp,
        requestId: data.requestId
      })
    }
  )

  if (!tokenResponse.ok) {
    const err = await tokenResponse.json()
    throw new Error(`Token Yape falló: ${err.message || tokenResponse.statusText}`)
  }

  const tokenJson = await tokenResponse.json()
  console.log({tokenJson});
  const token = tokenJson.id

  // 2. Realizar el pago con el token generado
  const paymentResponse = await fetch('https://api.mercadopago.com/v1/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'X-Idempotency-Key': randomUUID() // asegura que el mismo pago no se duplique
    },
    body: JSON.stringify({
      token,
      transaction_amount: data.amount,
      installments: 1,
      payment_method_id: 'yape',
      payer: data.payer
    })
  })

  if (!paymentResponse.ok) {
    const err = await paymentResponse.json()
    throw new Error(`Pago con Yape falló: ${err.message || paymentResponse.statusText}`)
  }

  const paymentJson = await paymentResponse.json()
  console.log({paymentJson});

  // 3. Validar si el pago fue aprobado
  const success = paymentJson.status === 'approved' && paymentJson.status_detail === 'accredited'

  return {
    success,
    payment_id: paymentJson.id,
    status: paymentJson.status,
    detail: paymentJson.status_detail
  }
}
