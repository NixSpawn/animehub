"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, ArrowLeft, Shield, Sparkles } from "lucide-react"
import { detectCardType, formatCardNumber, formatExpiryDate } from "@/lib/checkout-utils"
import { CardInfo } from "@/types/checkout-types"

interface CardPaymentFormProps {
  initialData: CardInfo
  onSubmit: (data: CardInfo) => void
  onBack: () => void
  total: number
}

export function CardPaymentForm({ initialData, onSubmit, onBack, total }: CardPaymentFormProps) {
  const [formData, setFormData] = useState<CardInfo>(initialData)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const cardType = detectCardType(formData.cardNumber)
    setFormData((prev) => ({ ...prev, cardType }))
  }, [formData.cardNumber])

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value)
    setFormData({ ...formData, cardNumber: formatted })
  }

  const handleExpiryDateChange = (value: string) => {
    const formatted = formatExpiryDate(value)
    setFormData({ ...formData, expiryDate: formatted })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 2000))

    onSubmit(formData)
  }

  const isFormValid = () => {
    return (
      formData.cardName &&
      formData.cardNumber.replace(/\s/g, "").length >= 13 &&
      formData.expiryDate.length === 5 &&
      formData.cvv.length >= 3
    )
  }

  const getCardIcon = () => {
    switch (formData.cardType) {
      case "visa":
        return "💳"
      case "mastercard":
        return "💳"
      case "amex":
        return "💳"
      default:
        return "💳"
    }
  }

  return (
    <Card className="py-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25 transition-all duration-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <CreditCard className="h-5 w-5 text-purple-300" />
          Información de la Tarjeta
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardName" className="text-white">
              Nombre en la Tarjeta *
            </Label>
            <Input
              id="cardName"
              value={formData.cardName}
              onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
              placeholder="Como aparece en tu tarjeta"
              className="bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber" className="text-white">
              Número de Tarjeta *
            </Label>
            <div className="relative">
              <Input
                id="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => handleCardNumberChange(e.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm pr-12"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl">{getCardIcon()}</div>
            </div>
            {formData.cardType && <p className="text-sm text-purple-300 capitalize">{formData.cardType} detectada</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate" className="text-white">
                Fecha de Vencimiento *
              </Label>
              <Input
                id="expiryDate"
                value={formData.expiryDate}
                onChange={(e) => handleExpiryDateChange(e.target.value)}
                placeholder="MM/AA"
                maxLength={5}
                className="bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv" className="text-white">
                CVV *
              </Label>
              <Input
                id="cvv"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                placeholder="123"
                maxLength={4}
                className="bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300 bg-green-500/20 p-3 rounded border border-green-500/30">
            <Shield className="h-4 w-4 text-green-400" />
            Procesado de forma segura por Mercado Pago
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="flex-1 border-purple-400/50 text-white hover:bg-purple-500/20 hover:border-purple-400 backdrop-blur-sm bg-transparent"
              disabled={isProcessing}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid() || isProcessing}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>Procesando...</>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Pagar S/ {total.toFixed(2)}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
